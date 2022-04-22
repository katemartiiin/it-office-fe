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
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <button
                  :key="props.row.id"
                  v-if="props.row.approval == 0"
                  :class="props.row.classname"
                  class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  aria-expanded="false"
                  @click="approve(props.row)"
                >
                  Approve
                </button>
                <button
                  v-else
                  :class="props.row.classname"
                  class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  aria-expanded="false"
                >
                  Approve
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
export default {
  layout: 'dashboard',
  data() {
    return {
      currentIndex: -1,
      isActive: false,

      headers: [
        { name: 'Request No' },
        { name: 'Name' },
        { name: 'Email' },
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
        },

        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Browser',
          field: 'browser',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
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
    async approve(item) {
      this.rows[item.originalIndex].status = 'Approved'
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
            this.rows[item.originalIndex].status = 'Approved'
            this.rows[item.originalIndex].classname = 'bg-gray-500'
          })
          .catch((error) => {})
          .finally(() => {})
      } catch (error) {}
    },

    async loadItems() {
      // console.log()
      // getFromServer(this.serverParams).then((response) => {
      //   this.totalRecords = response.totalRecords
      //   this.rows = response.rows
      // })
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('/api/userlogin/data-table', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords

          var data = []
          var rowcount = 1

          for (const i in response.rows) {
            console.log(i)
            data.push({
              no: rowcount,
              id: response.rows[i].id,
              name: response.rows[i].user.fullname,
              email: response.rows[i].user.email,
              approval: response.rows[i].is_approved,
              browser: response.rows[i].browser,
              status:
                response.rows[i].is_approved == 1 ? 'Approved' : 'Pending',
              classname:
                response.rows[i].is_approved == 1
                  ? 'bg-gray-500'
                  : 'bg-blue-500',
            })
            rowcount++
          }
          console.log(data)
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

    async fetch() {
      await this.$axios
        .post('/api/fetch/requests')
        .then((response) => {
          this.requests = response.data.requests

          var data = []
          var rowcount = 1
          this.$nextTick(() => {
            for (const i in this.requests) {
              data.push({
                no: rowcount,
                id: this.requests[i].id,
                name: this.requests[i].user.fullname,
                email: this.requests[i].user.email,
                approval: this.requests[i].is_approved,
                browser: this.requests[i].browser,
                status:
                  this.requests[i].is_approved == 1 ? 'Approved' : 'Pending',
                classname:
                  this.requests[i].is_approved == 1
                    ? 'bg-gray-500'
                    : 'bg-blue-500',
              })
              rowcount++
            }

            this.rows = data
          })
        })
        .catch((error) => {
          this.error = error
        })
    },
  },
}
</script>
