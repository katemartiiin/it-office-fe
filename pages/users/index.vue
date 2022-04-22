<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Requests</h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <!-- @on-sort-change="onSortChange" -->
          <!-- @on-column-filter="onColumnFilter" -->
          <vue-good-table
            mode="remote"
            @on-page-change="onPageChange"
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
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('/api/user/data-table', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []
          var rowcount = 1

          for (const i in response.rows) {
            data.push({
              no: rowcount,
              id: response.rows[i].id,
              name: response.rows[i].name,
              username: response.rows[i].username,
              email: response.rows[i].email,
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
      // console.log('onPerPageChange')
      console.log(params)
      // this.isLoading = true
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      console.log('onSortChange')
      console.log(params)
      // this.isLoading = true
      this.updateParams({
        sort: [
          {
            type: params.sortType,
            field: this.columns[params.columnIndex].field,
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
  },
}
</script>
