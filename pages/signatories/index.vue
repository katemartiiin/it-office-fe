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
        href="/signatories/create"
        class="mb-5 mr-3 float-right bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Create signatory
      </a>
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Signatories</h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <vue-good-table
            :search-options="{
              enabled: true,
              trigger: 'enter',
            }"
            mode="remote"
            @on-search="onSearch"
            @on-page-change="onPageChange"
            @on-per-page-change="onPerPageChange"
            @on-sort-change="onSortChange"
            :totalRows="totalRecords"
            :pagination-options="{
              enabled: true,
              perPageDropdown: [10, 20, 30, 40, 50, 100],
              dropdownAllowAll: false,
            }"
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span class="flex" v-if="props.column.field == 'action'">
                <a
                  :href="'/signatories/' + props.row.id"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mr-3"
                  aria-expanded="false"
                >
                  <i class="fas fa-edit"></i>
                </a>
                <div v-if="props.row.id > 4">
                  <button
                    type="button"
                    @click.prevent="deleteItem(props.row.originalIndex)"
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    aria-expanded="false"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
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
import { table_methods } from '~/mixins/methods/vuedatatable.js'
export default {
  mixins: [roles_index, mw_users, table_methods],
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
          label: 'Designation',
          field: 'department',
        },
        {
          label: 'Name',
          field: 'name',
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
        .$post('/api/signatories/data-table', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []
          var rowcount = 1

          for (const i in response.data) {
            data.push({
              no: rowcount,
              id: response.data[i].id,
              name: response.data[i].name,
              department: response.data[i].department,
              created_at: response.data[i].created,
            })
            rowcount++
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    download() {
      const url = this.$config.api + '/users/export/'
      window.location.href = url
    },
    deleteItem(originalIndex) {
      this.$toast.success('Processing')

      let table_id = this.rows[originalIndex].id
      this.$axios
        .$delete('/api/signatories/delete/' + user_id)
        .then((res) => {
          this.$toast.success('Deleted')

          this.rows.splice(originalIndex, 1)
          console.log(res)
        })
        .catch((err) => {
          this.$toast.error('Error')

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
