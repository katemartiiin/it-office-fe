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
          <!-- Requests table -->
          <vue-good-table
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
        { name: '#' },
        { name: 'Request No' },
        { name: 'Name' },
        { name: 'Email' },
        { name: 'Status' },
        { name: 'Action' },
      ],
      error: '',
      tabledata: [],

      tabledata: [],
      columns: [
        {
          label: '#',
          field: 'no',
        },
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
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343 },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
      ],
    }
  },
  created() {
    this.requests = []
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async approve(item) {
        console.log(item.no)
      this.currentIndex = item
      console.log(item)
      this.editedIndex = this.rows.indexOf(item.no)
      console.log('index is')
      console.log(this.editedIndex)

      // let payload = new FormData()
      // let table_id = this.tabledata[this.editedIndex].id
      // payload.append('id', table_id)

      // try {
      //   this.$axios
      //     .$post(`api/userlogin/approve/${table_id}`, payload, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     })
      //     .then((res) => {
      //       this.tabledata[this.tabledata.indexOf(item)].status = 'Approved'
      //       this.tabledata[this.tabledata.indexOf(item)].classname =
      //         'bg-gray-500'
      //     })
      //     .catch((error) => {})
      //     .finally(() => {})
      // } catch (error) {}
    },
    // async fetch() {
    //   await this.$axios
    //     .post('/api/fetch/requests')
    //     .then((response) => {
    //       this.requests = response.data.requests

    //       if (this.dataTable) {
    //         this.dataTable.destroy()
    //       }

    //       var data = []
    //       var rowcount = 1
    //       this.$nextTick(() => {
    //         for (const i in this.requests) {
    //           data.push({
    //             no: rowcount,
    //             id: this.requests[i].id,
    //             name: this.requests[i].user.fullname,
    //             email: this.requests[i].user.email,
    //             approval: this.requests[i].is_approved,
    //             status:
    //               this.requests[i].is_approved == 1 ? 'Approved' : 'Pending',
    //             classname:
    //               this.requests[i].is_approved == 1
    //                 ? 'bg-gray-500'
    //                 : 'bg-blue-500',
    //           })
    //           rowcount++
    //         }

    //         this.tabledata = data
    //       })
    //     })
    //     .catch((error) => {
    //       this.error = error
    //     })
    // },
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

            this.rows = data
            console.log(this.rows)
          })
        })
        .catch((error) => {
          this.error = error
        })
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
.dataTables_length {
  float: left;
  padding: 0.75rem;
}
.dataTables_filter {
  float: right;
  padding: 0.75rem;
}
td {
  tab-size: 4;
  -webkit-text-size-adjust: 100%;
  --fa-font-brands: normal 400 1em/1 'Font Awesome 6 Brands';
  --fa-font-regular: normal 400 1em/1 'Font Awesome 6 Free';
  --fa-font-solid: normal 900 1em/1 'Font Awesome 6 Free';
  font-family: inherit;
  overflow-wrap: break-word;
  --tw-bg-opacity: 1;
  text-indent: 0;
  border-collapse: collapse;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  --tw-border-opacity: 1;
  border-color: rgba(229, 231, 235, var(--tw-border-opacity));
  --tw-shadow: 0 0 #0000;
  --tw-ring-inset: var(--tw-empty, /*!*/ /*!*/);
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  white-space: nowrap;
  border-top-width: 0px;
  border-right-width: 0px;
  border-left-width: 0px;
  padding: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  vertical-align: middle;
  font-size: 0.8rem;
  line-height: 1.5rem;
}
.dataTables_info,
.dataTables_paginate {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.75rem;
}
</style>
