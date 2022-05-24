<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div class="w-full">
        <NuxtLink
          to="/forms/requests/create"
          class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Create Request
        </NuxtLink>
      </div>

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-400"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Requests</h3>
            </div>
          </div>
        </div>
        <ul
          class="flex flex-wrap text-sm font-medium text-center text-gray-100 border-b border-gray-200 dark:border-gray-100 dark:text-gray-400"
        >
          <li class="mr-2">
            <a
              href="#"
              aria-current="page"
              class="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500"
            >
              <strong>Pending</strong>
            </a>
          </li>
          <li class="mr-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >Approved</a
            >
          </li>
          <li class="mr-2">
            <a
              href="#"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              >Declined</a
            >
          </li>
        </ul>
        <div class="block w-full overflow-x-auto">
          <vue-good-table
            :search-options="{
              enabled: true,
              trigger: 'enter',
            }"
            mode="remote"
            @on-page-change="onPageChange"
            @on-search="onSearch"
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
                  :to="'/forms/requests/' + props.row.id"
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-eye"></i
                ></NuxtLink>

                <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/requests/edit/' + props.row.id"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-edit"></i
                ></NuxtLink>
                <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/requests/' + props.row.id"
                  class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fa fa-trash"></i
                ></NuxtLink>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { dswd } from '~/mixins/middleware/dswd_pages.js'
import { table_methods } from '~/mixins/methods/vuedatatable.js'
export default {
  mixins: [table_methods],
  layout: 'dashboard',
  // middleware: 'admin',
  data() {
    return {
      originalIndex: -1,
      delete_id: false,
      showModal: false,

      currentIndex: -1,
      isActive: false,

      error: '',

      isLoading: false,
      columns: [
        {
          label: 'Control No.',
          field: 'control_number',
        },
        {
          label: 'Payee',
          field: 'payee',
        },
        {
          label: 'Status',
          field: 'status',
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
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('/api/requestform/fetch', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              payee: response.data[i].payee,
              control_number: response.data[i].control_number,
              created_at: response.data[i].created,
              status: response.data[i].statusLabel,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
