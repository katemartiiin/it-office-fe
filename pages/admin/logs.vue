<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Users Logs</h3>
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
                <a
                  :href="'/users/' + props.row.id"
                  :key="props.row.id"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  aria-expanded="false"
                >
                  <i class="fas fa-eye"></i>
                </a>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>

      <button
        @click.prevent="download()"
        class="mb-5 float-right bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Download
      </button>
    </div>
  </div>
</template>
<script>
import { admin } from '~/mixins/middleware/admin_pages.js'
export default {
  head() {
    return {
      title: 'Admin',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  layout: 'dashboard_admin',
  mixins: [admin],
  data() {
    return {
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
        // {
        //   label: 'Username',
        //   field: 'username',
        // },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Date - Time',
          field: 'created_at',
        },
        // {
        //   label: 'Action',
        //   field: 'action',
        //   sortable: false,
        // },
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
    // this.fetch()
    this.loadItems()
  },
  methods: {
    async loadItems() {
      // await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('/admin/logs/user/data-table', this.serverParams, {})
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
              description: response.data[i].description,
              email: response.data[i].email,
              created_at: response.data[i].created,
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
      console.log('onPageChange')
      console.log(params)

      // this.isLoading = true
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      console.log(params)
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
      console.log('onColumnFilter')
      console.log(params)
      this.updateParams(params)
      this.loadItems()
    },
    download() {
      const url = this.$config.api + '/user-logs/export'
      window.location.href = url
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
