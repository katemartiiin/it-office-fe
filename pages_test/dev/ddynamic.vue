<template>
  <div>
    <vue-good-table
      mode="remote"
      :totalRows="totalRecords"
      :isLoading.sync="isLoading"
      :pagination-options="{
        enabled: true,
        perPageDropdown: [10, 20, 30, 40, 50, 100],
        dropdownAllowAll: false,
      }"
      :rows="rows"
      :columns="columns"
    />
  </div>
</template>
<script>
export default {
  mounted() {
    this.fetch()
  },
  data() {
    return {
      isLoading: false,
      columns: [
        //...
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
  methods: {
    async fetch() {
      await this.$axios
        .post('/api/fetch/requests')
        .then((response) => {
          this.requests = response.data.requests

          if (this.dataTable) {
            this.dataTable.destroy()
          }

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

            this.totalRecords = data
          })
        })
        .catch((error) => {
          this.error = error
        })
    },
    loadItems() {
      getFromServer(this.serverParams).then((response) => {
        // this.totalRecords = response.totalRecords
        // this.rows = response.rows
      })
    },
  },
}
</script>
