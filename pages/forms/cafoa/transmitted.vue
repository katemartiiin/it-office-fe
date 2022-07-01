<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-300"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">List of CAFOA</h3>
            </div>
          </div>
        </div>

        <TableTab tab="transmitted"></TableTab>
        <div class="block w-full overflow-x-auto">
          <vue-good-table
            id="cafoarequests"
            ref="cafoarequests"
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
              perPageDropdown: [10, 20, 30, 40, 50, 100],
              dropdownAllowAll: false,
            }"
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
            :select-options="{ enabled: true }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <!-- {{ props.row }} -->
                <div class="flex flex-wrap grid grid-cols-2 gap-2">
                  <div class="mr-2">
                    <NuxtLink
                      aria-expanded="false"
                      :to="'/forms/cafoa/' + props.row.control_number"
                      class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      ><i class="fas fa-eye"></i
                    ></NuxtLink>
                  </div>
                  <div>
                    <a
                      @click.prevent="downloadpdf(props.row.id)"
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    >
                      <i class="fas fa-print"></i>
                    </a>
                  </div>
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
import { cafoa } from '~/mixins/middleware/cafoa_pages.js'
import { table_methods } from '~/mixins/methods/vuedatatable.js'
import status from '/mixins/data/status.js'
import TableTab from '@/components/Tabs/Table_tab_cafoa.vue'
export default {
  components: {
    TableTab,
  },
  head() {
    return {
      title: 'Cafoa',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [table_methods, cafoa, status],
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
          label: 'Request',
          field: 'request',
        },
        {
          label: 'Payee',
          field: 'payee',
        },
        {
          label: 'Approved Amount',
          field: 'approved_amount',
        },
        {
          label: 'Requesting Official',
          field: 'requesting_official',
        },
        {
          label: 'Date - Time',
          field: 'updated',
        },
        {
          label: 'Request Date',
          field: 'requestdateformat',
        },
        {
          label: 'Action',
          field: 'action',
          sortable: false,
        },
      ],
      payload: {
        status: 4,
      },
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
    window.localStorage.removeItem('controlNumber')
    this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$axios
        // .$post('/api/cafoa/fetch', this.serverParams, {})
        .$post('/api/cafoa/get_transmitted', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              request: response.data[i].request,
              payee: response.data[i].payee,
              approved_amount: response.data[i].approved_amount,
              requesting_official: response.data[i].requesting_official,
              created_at: response.data[i].created,
              requestdateformat: response.data[i].requestdateformat,
              updated: response.data[i].updated,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async downloadpdf(id) {
      this.$toast.success('Processing')

      try {
        this.$axios
          .$post(`/api/pdf/cafoa/${id}`)
          .then((res) => {
            const url = this.$config.api + '/download/' + res.path
            window.location.href = url
          })
          .catch((error) => {})
          .finally(() => {})
        this.$toast.success('Done.')
      } catch (error) {
        this.$toast.error('Failed.')
      }
    },
    download() {
      const url = this.$config.api + '/cafoa/export/'
      window.location.href = url
    },
    tx_budget_to_treasury() {
      this.$toast.success('Sending')

      var data = []
      var data_oii = []

      if (this.$refs['cafoarequests'].selectedRows) {
        this.$refs['cafoarequests'].selectedRows.map(function (value, key) {
          data.push(value['id'])
          data_oii.push(value['originalIndex'])
        })
      }

      this.rows = this.rows.filter(function (value, index) {
        return data_oii.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      this.$axios
        .$post('/api/transmit/budget_to_treasury', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api +
            '/downloads/tx_budget_to_treasury/' +
            response.path
          window.location.href = url
          this.$toast.success('Please wait for the download file.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },

    // budget_1() {
    //   this.$toast.success('Sending')

    //   var data = []
    //   var data_oii = []

    //   if (this.$refs['cafoarequests'].selectedRows) {
    //     this.$refs['cafoarequests'].selectedRows.map(function (value, key) {
    //       data.push(value['id'])
    //       data_oii.push(value['originalIndex'])
    //     })
    //   }

    //   this.rows = this.rows.filter(function (value, index) {
    //     return data_oii.indexOf(index) == -1
    //   })

    //   let payload = new FormData()
    //   payload.append('transmit_ids', data)
    //   payload.append('status', this.payload.status)

    //   this.$axios
    //     .$post('/api/tx/general', payload, {})
    //     .then((response) => {
    //       this.$toast.success('Transmittal form generated.')
    //       const url =
    //         this.$config.api +
    //         '/downloads/tx_budget_to_treasury/' +
    //         response.path
    //       window.location.href = url
    //       this.$toast.success('Please wait for the download file.')
    //     })
    //     .catch((error) => {
    //       this.$toast.error('Error.')
    //     })
    //     .finally(() => {})
    // },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
