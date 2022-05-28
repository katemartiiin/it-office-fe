<template>
  <div class="py-10 px-3">
    <div v-if="roleId == 5">
      <div>
        <h1 class="text-xl font-bold py-5">Treasury Dashboard</h1>
        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                Cafoa Pending List of Certifications
              </h3>
            </div>
          </div>
        </div>

        <div class="">
          <vue-good-table
            mode="remote"
            :pagination-options="{
              enabled: true,
            }"
            :search-options="{
              enabled: true,
              trigger: 'enter',
            }"
            @on-page-change="onPageChange_treasury_cafoa"
            @on-search="onSearch_treasury_cafoa"
            @on-per-page-change="onPerPageChange_treasury_cafoa"
            @on-sort-change="onSortChange_treasury_cafoa"
            :columns="columns_treasury_cafoa"
            :rows="rows_treasury_cafoa"
            :line-numbers="true"
            :totalRows="totalRecords_treasury_cafoa"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <div class="flex flex-row">
                  <div class="p-1" v-if="props.row.treasury_status == 0">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      title="View"
                      v-on:click="
                        manageTreasuryStatus(props.row.originalIndex, 'accept')
                      "
                    >
                      Acceptance
                    </button>
                  </div>
                  <div class="p-1" v-if="props.row.treasury_status == 1">
                    <button
                      class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      title="Edit"
                      v-on:click="
                        manageTreasuryStatus(props.row.originalIndex, 'submit')
                      "
                    >
                      Submit to Accounting Department
                    </button>
                  </div>
                </div>
              </span>
            </template>
          </vue-good-table>
        </div>
        <br />
        <br />
        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                Voucher Pending List for Bank check Certifications
              </h3>
            </div>
          </div>
        </div>
        <div class="">
          <vue-good-table
            :search-options="{
              enabled: true,
              trigger: 'enter',
            }"
            :pagination-options="{
              enabled: true,
            }"
            @on-page-change="onPageChange_treasury_voucher"
            @on-search="onSearch_treasury_voucher"
            @on-per-page-change="onPerPageChange_treasury_voucher"
            @on-sort-change="onSortChange_treasury_voucher"
            mode="remote"
            :totalRows="totalRecords_treasury_voucher"
            :columns="columns_treasury_voucher"
            :rows="rows_treasury_voucher"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <div class="flex flex-row">
                  <div class="p-1" v-if="props.row.treasury_status == 0">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      title="View"
                      v-on:click="
                        manageTreasuryStatus_voucher(
                          props.row.originalIndex,
                          'accept'
                        )
                      "
                    >
                      Acceptance
                    </button>
                  </div>
                  <div class="p-1" v-if="props.row.treasury_status == 1">
                    <button
                      class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      title="Edit"
                      v-on:click="
                        manageTreasuryStatus_voucher(
                          props.row.originalIndex,
                          'submit'
                        )
                      "
                    >
                      Submit to Accounting Department
                    </button>
                  </div>
                </div>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>

    <div v-else-if="roleId != 1">
      <h1 class="text-xl font-bold">Pending {{ items }} for {{ itemsFor }}s</h1>
      <div class="block w-full overflow-x-auto mt-5">
        <vue-good-table
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
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
              <div class="flex flex-wrap grid grid-cols-2 gap-2">
                <div class="pr-3">
                  <button
                    type="button"
                    @click="
                      create(
                        roleId == 4 ? props.row.control_number : props.row.id
                      )
                    "
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Create {{ itemsFor }}
                  </button>
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div v-else>
      <AdminTable
        :cafoa="cafoa"
        :cafoaTotal="cafoaTotal"
        :requests="requests"
        :requestsTotal="requestsTotal"
      />
    </div>
  </div>
</template>
<script>
import const_roles from '~/mixins/constants/roles.js'
import AdminTable from '@/components/AdminTable.vue'
import { treasury_exports_cafoa } from '~/mixins/exports/vuedatatable_treasury_cafoa.js'
import { treasury_exports_voucher } from '~/mixins/exports/vuedatatable_treasury_voucher.js'
export default {
  mixins: [treasury_exports_cafoa, treasury_exports_voucher],
  async created() {
    // console.log(const_roles.ADMIN)
  },
  head() {
    return {
      title: 'Dashboard',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  components: {
    AdminTable,
    // Treasury,
  },
  data: () => ({
    originalIndex: -1,
    currentIndex: -1,
    isActive: false,
    isLoading: false,
    columns: [
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Action',
        field: 'action',
        sortable: false,
      },
    ],
    rows: [],

    rows_voucher_treasury: [],
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
    roleId: null,
    items: 'Requests',
    itemsFor: 'CAFOA',
    redirect: null,

    cafoa: [],
    cafoaTotal: 0,
    requests: [],
    requestsTotal: 0,
  }),
  middleware: 'auth',
  layout: 'admin',
  async mounted() {
    this.roleId = this.$auth.$state.user['role']

    if (this.roleId == 4) {
      this.items = 'Requests'
      this.itemsFor = 'CAFOA'
    } else if (this.roleId == 5) {
      this.items = 'Treasury'
      this.itemsFor = 'Treasury'
      // Treasury
      // certification table for cafoa budget
      // certification table for voucher
    } else if (this.roleId == 6) {
      this.items = 'CAFOA'
      this.itemsFor = 'Voucher'
    }
    // await this.$axios.$get('/sanctum/csrf-cookie')

    if (this.roleId == 5) {
      await this.loadItems_treasury_cafoa()
      await this.loadItems_treasury_voucher()
    } else {
      await this.fetchItems()
    }
  },
  async created() {},
  methods: {
    async loadItems_treasury_cafoa() {
      this.$axios
        .$post(
          '/api/cafoa/fetchDashboard',
          this.serverParams_treasury_cafoa,
          {}
        )
        .then((response) => {
          this.totalRecords_treasury_cafoa = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_no: response.data[i].control_no,
              request: response.data[i].request,
              payee: response.data[i].payee,
              approved_amount: response.data[i].approved_amount,
              requesting_official: response.data[i].requesting_official,
              created_at: response.data[i].created,
              treasury_status: response.data[i].treasury_status,
            })

            console.log(response.data[i].treasury_status)
          }
          this.rows_treasury_cafoa = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_treasury_voucher() {
      this.$axios
        .$post(
          '/api/disbursement/fetchDashboard',
          this.serverParams_treasury_voucher,
          {}
        )
        .then((response) => {
          this.totalRecords_treasury_voucher = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_no: response.data[i].cafoa_id,
              payee: response.data[i].payee,
              created_at: response.data[i].created,
              treasury_status: response.data[i].treasury_status,
            })
          }
          this.rows_treasury_voucher = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async fetchItems() {
      this.$axios
        .$post('/api/dashboard/pending', {
          roleId: this.roleId,
        })
        .then((response) => {
          if (this.roleId != 1 && this.roleId != 5) {
            this.totalRecords = response.totalRecords
            var data = []

            for (const i in response.data) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                status: response.data[i].statusLabel,
              })
            }

            this.rows = data
          } else {
            this.adminItems(response)
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    adminItems(response) {
      this.cafoaTotal = response.cafoaTotal
      var data = []

      for (const i in response.cafoa) {
        data.push({
          id: response.cafoa[i].id,
          control_number: response.cafoa[i].control_number,
          status: response.cafoa[i].statusLabel,
        })
      }

      this.cafoa = data

      this.requestsTotal = response.requestsTotal
      data = []

      for (const i in response.requests) {
        data.push({
          id: response.requests[i].id,
          control_number: response.requests[i].control_number,
          status: response.requests[i].statusLabel,
        })
      }

      this.requests = data
    },

    create(controlNo) {
      window.localStorage.setItem('controlNumber', JSON.stringify(controlNo))
      if (this.roleId == const_roles.BUDGET) {
        this.$router.push('/forms/cafoa/create')
      } else if (this.roleId == const_roles.ACCOUNTING) {
        this.$router.push('/forms/disbursement/' + controlNo)
      }
    },
    manageTreasuryStatus(originalItemIndex, status) {
      let treasury_status
      switch (status) {
        case 'accept':
          treasury_status = 1
          break
        case 'submit':
          treasury_status = 2
          break
      }
      this.$axios
        .$post('/api/cafoa/treasury_status/' + treasury_status, {
          id: this.rows_treasury_cafoa[originalItemIndex].id,
          payee: this.rows_treasury_cafoa[originalItemIndex].payee,
          controlNo: this.rows_treasury_cafoa[originalItemIndex].control_no,
        })
        .then((response) => {
          if (treasury_status == 2) {
            this.rows_treasury_cafoa.splice(originalItemIndex, 1)
          } else {
            this.rows_treasury_cafoa[originalItemIndex].treasury_status = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    manageTreasuryStatus_voucher(originalItemIndex, status) {
      let treasury_status
      switch (status) {
        case 'accept':
          treasury_status = 1
          break
        case 'submit':
          treasury_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/treasury_status/' + treasury_status, {
          id: this.rows_treasury_voucher[originalItemIndex].id,
            controlNo: this.rows_treasury_voucher[originalItemIndex].control_no,
        })
        .then((response) => {
          if (treasury_status == 2) {
            this.rows_treasury_voucher.splice(originalItemIndex, 1)
          } else {
            this.rows_treasury_voucher[originalItemIndex].treasury_status = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
  },
}
</script>
