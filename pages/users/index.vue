<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <button
        @click.prevent="download()"
        class="mb-5 float-right bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Download
      </button>
      <a
        href="/users/create"
        class="mb-5 mr-3 float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Create User
      </a>
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
            @on-search="onSearch"
            @on-per-page-change="onPerPageChange"
            @on-sort-change="onSortChange"
            :pagination-options="{
              enabled: true,
              perPageDropdown: [10, 20, 30, 40, 50, 100],
              dropdownAllowAll: false,
            }"
            :totalRows="totalRecords"
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span class="flex" v-if="props.column.field == 'action'">
                <a
                  :href="'/users/' + props.row.id"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-3"
                  aria-expanded="false"
                >
                  <i class="fas fa-eye"></i>
                </a>
                <button
                  type="button"
                  @click="deleteUser(props.row.originalIndex)"
                  class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  aria-expanded="false"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import roles_index from '~/mixins/data/roles_index.js'
import { mw_users } from '~/mixins/middleware/users_pages.js'

export default {
  mixins: [roles_index, mw_users],
  head() {
    return {
      title: '',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  layout: 'dashboard',
  data() {
    return {
      currentIndex: -1,
      isActive: false,

      error: '',
      tabledata: [],

      isLoading: false,
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
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
          label: 'Role',
          field: 'role_label',
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
    this.requests = []
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$axios
        .$post('/api/user/data-table', this.serverParams, {})
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
              role: response.data[i].role,
              role_label: response.data[i].rolelabel,
            })
            rowcount++
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
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
    onSearch(params) {
      this.updateParams({ searchTerm: params.searchTerm })
      this.loadItems()
    },
    download() {
      const url = this.$config.api + '/users/export/'
      window.location.href = url
    },
    deleteUser(originalIndex) {
      let user_id = this.rows[originalIndex].id
      this.$axios
        .$delete('/api/user/delete/' + user_id)
        .then((res) => {
          this.rows.splice(originalIndex, 1)
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
