<template>
  <div>
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <!-- <div class="w-full">
        <NuxtLink
          to="/forms/disbursement/create"
          class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Create Voucher
        </NuxtLink>
      </div> -->

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900 mt-5"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Vouchers</h3>
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
                  :to="'/forms/disbursement/' + props.row.id"
                  class="text-xs bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-pencil"></i
                ></NuxtLink>

                <!-- <a
                  @click.prevent="downloadpdf(props.row.id)"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                  <i class="fas fa-print"></i>
                </a> -->

                <!-- <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/disbursement/' + props.row.id"
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
import { disbursementvoucher } from '~/mixins/middleware/disbursementvoucher_pages.js'
import { table_methods } from '~/mixins/methods/vuedatatable.js'
export default {
  mixins: [table_methods, disbursementvoucher],
  layout: 'dashboard',
  data() {
    return {
      originalIndex: -1,
      delete_id: false,
      showModal: false,
      // modalDelete: false,
      currentIndex: -1,
      isActive: false,

      error: '',
      tabledata: [],

      isLoading: false,
      columns: [
        {
          label: 'Voucher ID',
          field: 'id',
        },
        {
          label: 'CAFOA No.',
          field: 'cafoa_no',
        },
        {
          label: 'Payee',
          field: 'payee',
        },

        {
          label: 'Amount',
          field: 'amount',
        },
        // {
        //   label: 'Prepared by',
        //   field: 'prepared_by',
        // },
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
    // modal.show()
    this.requests = []
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$get('/api/disbursement/fetch', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              cafoa_no: response.data[i].cafoa_id,
              payee: response.data[i].payee,
              amount: response.data[i].approved_payment,
              // prepared_by: response.data[i].prepared_by,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async downloadpdf(id) {
      this.$toast.success('Processing')
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      try {
        this.$axios
          .$post(`api/pdf/voucher/${id}`)
          .then((res) => {
            const url = this.$config.api + '/download/voucher/' + res.path
            window.location.href = url
          })
          .catch((error) => {})
          .finally(() => {})
        this.$toast.success('Done.')
      } catch (error) {
        this.$toast.error('Failed.')
      }
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
