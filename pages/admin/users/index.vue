<template>
  <div>
    <!-- Modal -->
    <div
      v-if="showModal"
      class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <!-- h-5/6 -->
      <!-- max-w-6xl -->
      <!-- w-auto  -->
      <!-- w-screen -->
      <!-- h-screen -->
      <!-- mx-auto -->
      <div class="relative my-6">
        <!--content-->
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
        >
          <!--header-->

          <div
            class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t"
          >
            <h3 class="text-3xl font-semibold">Delete User</h3>
            <button
              class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              v-on:click="toggleModal()"
            >
              <span
                class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none"
              >
                ×
              </span>
            </button>
          </div>

          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-slate-500 text-lg leading-relaxed">
              Are you sure you want to delete ?
            </p>
          </div>
          <!--footer-->
          <div
            class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b"
          >
            <button
              class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleModal()"
            >
              close
            </button>
            <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="deleteItemConfirm()"
            >
              Comfirm delete
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <div class="">
          <NuxtLink
            to="/admin/users/create"
            class="space-x-1 mb-5 float-right bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Create User
          </NuxtLink>
          <button
            @click.prevent="download()"
            class="space-x-1 mb-5 float-right bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Download
          </button>
        </div>

        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-white">Users</h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <vue-good-table
              mode="remote"
              @on-page-change="onPageChange"
              @on-per-page-change="onPerPageChange"
              @on-sort-change="onSortChange"
              :totalRows="totalRecords"
              :pagination-options="{
                enabled: true,
              }"
              :columns="columns"
              :rows="rows"
              :line-numbers="true"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <!-- {{ props.row }} -->
                  <NuxtLink
                    aria-expanded="false"
                    :to="'/admin/users/' + props.row.id"
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    ><i class="fas fa-eye"></i
                  ></NuxtLink>
                  <button
                    v-on:click="deleteModal(props.row.originalIndex)"
                    aria-expanded="false"
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      originalIndex: -1,
      delete_id: false,
      showModal: false,
      modalDelete: false,
      currentIndex: -1,
      isActive: false,

      error: '',
      tabledata: [],

      isLoading: false,
      columns: [
        {
          label: 'Full Name',
          field: 'name',
        },
        {
          label: 'Username',
          field: 'username',
        },

        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Admin Account',
          field: 'is_admin',
        },
        {
          label: 'Date - Time',
          field: 'created_at',
        },
        {
          label: 'Action',
          field: 'action',
          sortable: false,
        },
      ],
      rows: [],
      totalRecords: 0,
      serverParams: {
        columnFilters: {},
        sort: [
          {
            field: '',
            type: '',
          },
        ],
        page: 1,
        perPage: 10,
      },
    }
  },
  created() {
    // modal.show()
    this.requests = []
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('/admin/user/data-table', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []
          var rowcount = 1

          for (const i in response.data) {
            data.push({
              no: rowcount,
              id: response.data[i].id,
              name: response.data[i].name,
              username: response.data[i].username,
              email: response.data[i].email,
              created_at: response.data[i].created,
              is_admin: response.data[i].is_admin == 1 ? 'Yes' : 'No',
            })
            rowcount++
          }

          this.rows = data
          console.log(this.rows)
        })
        .catch((error) => {})
        .finally(() => {})
    },

    updateParams(newProps) {
      // console.log('updateParams')
      // console.log(newProps)
      // this.isLoading = true
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      // console.log('onPageChange')
      // console.log(params)

      // this.isLoading = true
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      // console.log(params)
      // this.isLoading = true
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems()
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    download() {
      const url = this.$config.api + '/users/export/'
      window.location.href = url
    },
    toggleModal: function () {
      // console.log(id)
      this.showModal = !this.showModal
    },
    deleteModal(index) {
      this.originalIndex = index
      console.log(this.rows[index].name)
      // console.log(this.rows[])
      // console.log(id)
      // this.delete_id = id
      this.showModal = !this.showModal
    },
    async deleteItemConfirm() {
      // this.$toast.success('Processing')
      this.$toast.success('Processing')
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      let table_id = this.rows[this.originalIndex].id

      try {
        this.$axios
          .$delete(`api/user/delete/${table_id}`)
          .then((res) => {
            this.rows.splice(this.originalIndex, 1)
          })
          .catch((error) => {})
          .finally(() => {})
        this.$toast.success('Done.')
      } catch (error) {
        this.$toast.error('Failed.')
      }

      // this.closeDelete()
      this.showModal = !this.showModal
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
