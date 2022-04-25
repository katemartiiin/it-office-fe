<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
      >
        <div >
          <button
            @click="download"
            class="bg-green-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Download
          </button>
        </div>

        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Requests</h3>
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
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const dev = process.env.DEV_API
const prod = process.env.PROD_API
const url = process.env.NODE_ENV === 'development' ? dev : prod
console.log('check node_env')
console.log(process.env.NODE_ENV)
console.log('check url')
console.log(url)
export default {
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
      // url,
    }
  },

  mounted() {
    // this.fetch()
    this.loadItems()
  },
  async created() {
    this.requests = []
    // this.timezone = timezone
    this.url = url
  },
  methods: {
    async loadItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
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
              is_admin: response.data[i].is_admin == 1 ? 'Yes' : 'No',
            })
            rowcount++
          }

          this.rows = data
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
      // this.isLoading = true
      this.updateParams(params)
      this.loadItems()
    },
    download() {
      const url = 'http://be-it.api.test' + '/users/export/'
      // const url = this.url + '/users/export/'

      console.log(this.url)
      console.log(url)
      window.location.href = url
    },
  },
}
</script>
