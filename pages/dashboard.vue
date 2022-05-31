<template>
  <div class="py-10 px-3">
    <ModalNote
      @toggleModal="toggleModal()"
      :showmodal="showModal"
      :status="statusModal"
      @submit-note="submitNote(...arguments)"
    >
      <span slot="title">Add Note</span>
      <span slot="title_textarea">Please enter a note</span>
      <span slot="btn_cancel">Cancel</span>
      <span slot="btn-action">Submit</span>
    </ModalNote>

    <div v-if="roleId == roles.TREASURY">
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
                  <div class="p-1">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      title="View"
                      v-on:click="addNote(props.row.control_no)"
                    >
                      Add Note
                    </button>
                  </div>

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
                  <div class="p-1">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      title="View"
                      v-on:click="addNote(props.row.control_no)"
                    >
                      Add Note
                    </button>
                  </div>
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
    <div v-else-if="$auth.user['role'] == roles.ACCOUNTING">
      <h1 class="text-xl font-bold">Accounting Dashboard</h1>
      <br />
      <br />

      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">
              Pending Cafoa Certifications
            </h3>
          </div>
        </div>
      </div>
      <div class="">
        <vue-good-table
          @on-page-change="onPageChange_accounting_cafoa"
          @on-search="onSearch_accounting_cafoa"
          @on-per-page-change="onPerPageChange_accounting_cafoa"
          @on-sort-change="onSortChange_accounting_cafoa"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
          :totalRows="totalRecords_accounting_cafoa"
          :pagination-options="{
            enabled: true,
          }"
          :columns="columns_accounting_cafoa"
          :rows="rows_accounting_cafoa"
          :line-numbers="true"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-wrap">
                <div class="p-1">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="addNote(props.row.control_number)"
                  >
                    Add Note
                  </button>
                </div>
                <div class="p-1" v-if="props.row.accounting_status == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_cafoa(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Acceptance
                  </button>
                </div>
                <div class="p-1">
                  <button
                    type="button"
                    @click="create(props.row.disbursement_vouchers_id)"
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Create{{ itemsFor }}
                  </button>
                </div>
                <div class="p-1" v-if="props.row.accounting_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_cafoa(
                        props.row.originalIndex,
                        'submit'
                      )
                    "
                  >
                    Submit to Treasury Department
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
              Accounting Voucher Check Validation
            </h3>
          </div>
        </div>
      </div>
      <div class="">
        <vue-good-table
          @on-page-change="onPageChange_accounting_voucher"
          @on-search="onSearch_accounting_voucher"
          @on-per-page-change="onPerPageChange_accounting_voucher"
          @on-sort-change="onSortChange_accounting_voucher"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
          :totalRows="totalRecords_accounting_voucher"
          :pagination-options="{
            enabled: true,
          }"
          :columns="columns_accounting_voucher"
          :rows="rows_accounting_voucher"
          :line-numbers="true"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-wrap">
                <div class="p-1">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="addNote(props.row.cafoa_id)"
                  >
                    Add Note
                  </button>
                </div>
                <div class="p-1" v-if="props.row.accounting_status == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_voucher(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Acceptance
                  </button>
                </div>
                <div class="p-1">
                  <button
                    type="button"
                    @click="create(props.row.id)"
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Update {{ itemsFor }} Check
                  </button>
                </div>
                <div class="p-1" v-if="props.row.accounting_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_voucher(
                        props.row.originalIndex,
                        'submit'
                      )
                    "
                  >
                    Submit to Mayors Office for Awarding
                  </button>
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div v-else-if="$auth.user['role'] == roles.MAYOR_AWARDING_CHECK">
      <h1 class="text-xl font-bold">Mayors Awading Check - Dashboard</h1>

      <br />
      <br />

      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">
              Awarding Bank Checks
            </h3>
          </div>
        </div>
      </div>
      <div class="">
        <vue-good-table
          @on-page-change="onPageChange_award"
          @on-search="onSearch_award"
          @on-per-page-change="onPerPageChange_award"
          @on-sort-change="onSortChange_award"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
          :totalRows="totalRecords_award"
          :pagination-options="{
            enabled: true,
          }"
          :columns="columns_award"
          :rows="rows_award"
          :line-numbers="true"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="p-1" v-if="props.row.award_status != 2">
                <button
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  title="View"
                  v-on:click="addNote(props.row.cafoa_id)"
                >
                  Add Note
                </button>
              </div>
              <div class="flex flex-wrap">
                <div class="p-1" v-if="props.row.award_status == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="manageAward(props.row.originalIndex, 'accept')"
                  >
                    Acceptance
                  </button>
                </div>
                <div class="p-1" v-if="props.row.award_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="manageAward(props.row.originalIndex, 'award')"
                  >
                    Award Check to Payee
                  </button>
                </div>
                <div class="p-1" v-if="props.row.award_status == 2">
                  Awarded
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div
      v-else-if="
        roleId != roles.TREASURY &&
        roleId != roles.ACCOUNTING &&
        roleId != roles.TREASURY &&
        roleId != roles.MAYOR_AWARDING_CHECK
      "
    >
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
                        roleId == roles.BUDGET
                          ? props.row.control_number
                          : props.row.id
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
import AdminTable from '@/components/AdminTable.vue'
import { treasury_exports_cafoa } from '~/mixins/exports/vuedatatable_treasury_cafoa.js'
import { treasury_exports_voucher } from '~/mixins/exports/vuedatatable_treasury_voucher.js'
import { accounting_exports_cafoa } from '~/mixins/exports/vuedatatable_accounting_cafoa.js'
import { accounting_exports_voucher } from '~/mixins/exports/vuedatatable_accounting_voucher.js'
import { exports_award } from '~/mixins/exports/vuedatatable_mo_award.js'
import ModalNote from '@/components/Modals/Message.vue'
import roles from '/mixins/data/roles.js'
import const_roles from '~/mixins/constants/roles.js'

export default {
  mixins: [
    treasury_exports_cafoa,
    treasury_exports_voucher,
    accounting_exports_cafoa,
    accounting_exports_voucher,
    exports_award,
    roles,
  ],
  async created() {},
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
    ModalNote,
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
    noteControlNumber: false,
    showModal: false,
    statusModal: 'action',
  }),
  middleware: 'auth',
  layout: 'admin',
  async mounted() {
    this.roleId = this.$auth.$state.user['role']

    if (this.roleId == const_roles.BUDGET) {
      this.items = 'Requests'
      this.itemsFor = 'CAFOA'
    } else if (this.roleId == const_roles.TREASURY) {
      this.items = 'Treasury'
      this.itemsFor = 'Treasury'
      // Treasury
      // certification table for cafoa budget
      // certification table for voucher
    } else if (this.roleId == const_roles.ACCOUNTING) {
      this.items = 'CAFOA'
      this.itemsFor = 'Voucher'
    }

    if (this.roleId == const_roles.TREASURY) {
      await this.loadItems_treasury_cafoa()
      await this.loadItems_treasury_voucher()
    } else if (this.roleId == const_roles.ACCOUNTING) {
      await this.loadItems_accounting_cafoa()
      await this.loadItems_accounting_voucher()
    } else if (this.roleId == const_roles.MAYOR_AWARDING_CHECK) {
      await this.loadItems_award()
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
          if (
            this.roleId != const_roles.ADMIN &&
            this.roleId != const_roles.TREASURY
          ) {
            this.totalRecords = response.totalRecords
            var data = []

            for (const i in response.data) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                status: response.data[i].statusLabel,
                payee: response.data[i].payee,
                disbursement_id: response.data[i].disbursement_vouchers_id,
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

    async loadItems_accounting_cafoa() {
      this.$axios
        .$post(
          '/api/cafoa/pendingAccountingDashboard',
          this.serverParams_accounting_cafoa,
          {}
        )
        .then((response) => {
          this.totalRecords_accounting_cafoa = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_no,
              payee: response.data[i].payee,
              accounting_status: response.data[i].accounting_status,
              disbursement_vouchers_id:
                response.data[i].disbursement_vouchers_id,
            })
          }

          this.rows_accounting_cafoa = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageAccountingStatus_cafoa(originalItemIndex, status) {
      let accounting_status
      switch (status) {
        case 'accept':
          accounting_status = 1
          break
        case 'submit':
          accounting_status = 2
          break
      }
      this.$axios
        .$post('/api/cafoa/accounting_status/' + accounting_status, {
          id: this.rows_accounting_cafoa[originalItemIndex].id,
          payee: this.rows_accounting_cafoa[originalItemIndex].payee,
          controlNo:
            this.rows_accounting_cafoa[originalItemIndex].control_number,
        })
        .then((response) => {
          if (accounting_status == 2) {
            this.rows_accounting_cafoa.splice(originalItemIndex, 1)
          } else {
            this.rows_accounting_cafoa[originalItemIndex].accounting_status = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async loadItems_accounting_voucher() {
      this.$axios
        .$post(
          '/api/disbursement/AccountingDashboard',
          this.serverParams_accounting_voucher,
          {}
        )
        .then((response) => {
          this.totalRecords_accounting_voucher = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              cafoa_id: response.data[i].cafoa_id,
              payee: response.data[i].payee,
              accounting_status: response.data[i].accounting_status,
            })
          }

          this.rows_accounting_voucher = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    manageAccountingStatus_voucher(originalItemIndex, status) {
      let accounting_status
      switch (status) {
        case 'accept':
          accounting_status = 1
          break
        case 'submit':
          accounting_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/accounting_status/' + accounting_status, {
          id: this.rows_accounting_voucher[originalItemIndex].id,
          payee: this.rows_accounting_voucher[originalItemIndex].payee,
          controlNo: this.rows_accounting_voucher[originalItemIndex].cafoa_id,
        })
        .then((response) => {
          if (accounting_status == 2) {
            this.rows_accounting_voucher.splice(originalItemIndex, 1)
          } else {
            this.rows_accounting_voucher[
              originalItemIndex
            ].accounting_status = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_award() {
      this.$axios
        .$post(
          '/api/disbursement/getPendingAwards',
          this.serverParams_award,
          {}
        )
        .then((response) => {
          this.totalRecords_award = response.totalRecords
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              cafoa_id: response.data[i].cafoa_id,
              payee: response.data[i].payee,
              request: response.data[i].request,
              award_status: response.data[i].award_status,
            })
          }

          this.rows_award = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    manageAward(originalItemIndex, status) {
      let award_status
      switch (status) {
        case 'accept':
          award_status = 1
          break
        case 'award':
          award_status = 2
          break
      }
      this.$axios
        .$post('/api/disbursement/award_status/' + award_status, {
          id: this.rows_award[originalItemIndex].id,
          payee: this.rows_award[originalItemIndex].payee,
          controlNo: this.rows_award[originalItemIndex].cafoa_id,
        })
        .then((response) => {
          if (award_status == 2) {
            // this.rows_award.splice(originalItemIndex, 1)
            this.rows_award[originalItemIndex].award_status = 2
          } else {
            this.rows_award[originalItemIndex].award_status = 1
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    toggleModal() {
      this.statusModal = 'action'
      this.showModal = !this.showModal
    },
    async submitNote(note) {
      this.$axios
        .$post('/api/papar_trail/addnote', {
          control_number: this.noteControlNumber,
          note: note,
        })
        .then((response) => {
          this.statusModal = 'done'
          console.log(note)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    addNote(control_number) {
      this.noteControlNumber = control_number
      this.toggleModal()
    },
  },
}
</script>
