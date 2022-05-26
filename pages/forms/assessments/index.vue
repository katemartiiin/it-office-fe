<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div class="w-full">
        <NuxtLink
          to="/forms/assessments/create"
          class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Create Assessment
        </NuxtLink>
      </div>

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                Assessment Reports
              </h3>
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
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-eye"></i
                ></NuxtLink>

                <!-- <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/cafoa/' + props.row.id"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-print"></i
                ></NuxtLink> -->
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { table_methods } from '~/mixins/methods/vuedatatable.js'
export default {
  head() {
    return {
      title: 'Assessment',
      meta: [
        {
          hid: 'B',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [table_methods],
  layout: 'dashboard',
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
        .$post('/api/assessment_report/fetch', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              payee: response.data[i].payee,
              control_number: response.data[i].control_number,
              created_at: response.data[i].created,
              status: 'to follow',
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
