<template>
  <div>
    <!-- Modal -->
    <ModalDelete
      @toggleModal="toggleModal()"
      @deleteconfirm="deleteItemConfirm()"
      :showmodal="showModal"
      :cancel="true"
      type="delete"
      :action="true"
    >
      <span slot="title">Delete</span>
      <span slot="description">Are you sure you want to delete ?</span>
      <span slot="btn-cancel">close</span>
      <span slot="btn-delete">Confirm delete</span>
    </ModalDelete>

    <!-- Modal -->

  <div class="bg-white dark:bg-black">
    <!-- ... -->
    HELLO DARK MODES
  </div>
  <div class="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
  <div>
    <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><!-- ... --></svg>
    </span>
  </div>
  <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
  <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
  </p>
</div>
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
        <div class="w-full ">

              <NuxtLink
                to="/admin/users/create"
                class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              >
                Create User
              </NuxtLink>

              <button
                @click.prevent="download()"
                class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
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
import ModalDelete from '@/components/Modals/Modal.vue'
export default {
  components: {
    ModalDelete,
  },
  layout: 'dashboard',
  data() {
    return {
      originalIndex: -1,
      delete_id: false,
      showModal: false,
      // modalDelete: false,
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
      this.showModal = !this.showModal
    },
    deleteModal(index) {
      this.originalIndex = index
      console.log(this.rows[index].name)

      this.showModal = !this.showModal
    },
    async deleteItemConfirm() {
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
