<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <button
        @click.prevent="download()"
        class="mb-5 float-right bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      >
        Download
      </button>
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Requests</h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- -->
          <!-- @on-column-filter="onColumnFilter" -->
          <vue-good-table
            mode="remote"
            :search-options="{
              enabled: true,
              trigger: 'enter',
            }"
            @on-page-change="onPageChange"
            @on-search="onSearch"
            @on-per-page-change="onPerPageChange"
            @on-sort-change="onSortChange"
            :totalRows="totalRecords"
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
            :pagination-options="{
              enabled: true,
              perPageDropdown: [10, 20, 30, 40, 50, 100],
              dropdownAllowAll: false,
            }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <button
                  :key="props.row.id"
                  v-if="props.row.approval == 0"
                  :class="props.row.classname"
                  class="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-3 rounded text-xs"
                  aria-expanded="false"
                  @click="approve(props.row)"
                >
                  <i class="fa-solid fa-check"></i>
                </button>
                <button
                  v-else
                  :class="props.row.classname"
                  class="text-white font-bold py-2 px-3 rounded text-xs"
                  aria-expanded="false"
                  disabled
                >
                  <i class="fa-solid fa-check"></i>
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
const dev = process.env.DEV_API
const prod = process.env.PROD_API
const api = process.env.NODE_ENV === 'development' ? dev : prod
import { mw_loginrequests } from '~/mixins/middleware/loginrequests_pages.js'
export default {
  mixins: [mw_loginrequests],
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

      headers: [
        { name: 'Request No' },
        { name: 'Name' },
        { name: 'Email' },
        { name: 'Date - Time' },
        { name: 'Status' },
        { name: 'Action' },
      ],
      error: '',
      tabledata: [],

      isLoading: false,
      columns: [
        {
          label: 'Request No',
          field: 'id',
        },
        {
          label: 'Name',
          field: 'name',
          sortable: false,
        },

        {
          label: 'Email',
          field: 'email',
          sortable: false,
        },
        {
          label: 'Browser',
          field: 'browser',
          sortable: false,
        },
        {
          label: 'Date - Time',
          field: 'created_at',
        },
        {
          label: 'Status',
          field: 'is_approved',
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
        searchTerm: '',
      },
    }
  },
  created() {
    this.requests = []
    this.url = api
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async approve(item) {
      // console.log(item.originalIndex)
      this.rows[item.originalIndex].is_approved = 'Approved'
      // console.log(this.rows);
      let payload = new FormData()
      let table_id = this.rows[item.originalIndex].id

      payload.append('id', table_id)

      try {
        this.$axios
          .$post(`api/userlogin/approve/${table_id}`, payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.rows[item.originalIndex].is_approved = 'Approved'
            this.rows[item.originalIndex].classname = 'bg-gray-500'
          })
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
    },

    async loadItems() {
      this.$axios
        .$post('/api/userlogin/data-table', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords

          var data = []
          var rowcount = 1

          for (const i in response.data) {
            data.push({
              no: rowcount,
              id: response.data[i].id,
              name: response.data[i].name,
              email: response.data[i].email,
              approval: response.data[i].is_approved,
              browser: response.data[i].browser,
              created_at: response.data[i].created,
              is_approved:
                response.data[i].is_approved == 1 ? 'Approved' : 'Pending',
              status:
                response.data[i].is_approved == 1 ? 'Approved' : 'Pending',
              classname:
                response.data[i].is_approved == 1
                  ? 'bg-gray-500'
                  : 'bg-blue-500',
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
      console.log(newProps)
      console.log(this.serverParams)
      this.serverParams = Object.assign({}, this.serverParams, newProps)

      console.log(this.serverParams)
    },

    onPageChange(params) {
      console.log(params)
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
      console.log('onColumnFilter')
      console.log(params)
      this.updateParams(params)
      this.loadItems()
    },
    onSearch(params) {
      this.updateParams({ searchTerm: params.searchTerm })
      this.loadItems()
    },
    download() {
      const url = this.$config.api + '/login-request/export/'
      // const url = this.url+ '/login-request/export/'

      console.log(this.url)
      window.location.href = url
    },
  },
}
</script>
