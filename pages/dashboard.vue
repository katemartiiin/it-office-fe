<template>
  <div>
    <div class="bg-slate-200">
      <admin-navbar />
      <DashStatus
        :roleId="roleId"
        :completed="completed"
        :pending="pending"
        :completedCafoa="completedCafoa"
        :completedVoucher="completedVoucher"
        :pendingRequest="pendingRequest"
        :pendingCafoa="pendingCafoa"
        :pendingItem="pendingItem"
        :completedItem="completedItem"
        :award_counts="award_counts"
        :dswd_pending="dswd_pending"
      />
    </div>
    <div class="px-10">
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

        <div v-if="$auth.user['role'] == roles.TREASURY">
          <Treasury_Department
            :columns_treasury_cafoa="columns_treasury_cafoa"
            :rows_treasury_cafoa="rows_treasury_cafoa"
            :totalRecords_treasury_cafoa="totalRecords_treasury_cafoa"
            @on-page-change-treasury-cafoa="onPageChange_treasury_cafoa"
            @on-search-treasury-cafoa="onSearch_treasury_cafoa"
            @on-per-page-change-treasury-cafoa="onPerPageChange_treasury_cafoa"
            @on-sort-change-treasury-cafoa="onSortChange_treasury_cafoa"
            @add-note-treasury-cafoa="addNote(...arguments)"
            @manage-treasury-status="manageTreasuryStatus(...arguments)"
            :totalRecords_treasury_voucher="totalRecords_treasury_voucher"
            :columns_treasury_voucher="columns_treasury_voucher"
            :rows_treasury_voucher="rows_treasury_voucher"
            @on-page-change-treasury-voucher="onPageChange_treasury_voucher"
            @on-search-treasury-voucher="onSearch_treasury_voucher"
            @on-per-page-change-treasury-voucher="
              onPerPageChange_treasury_voucher
            "
            @on-sort-change-treasury-voucher="
              onSortChange_treasury_voucher(...arguments)
            "
            @manage-treasurystatus-voucher="
              manageTreasuryStatus_voucher(...arguments)
            "
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.ACCOUNTING">
          <Accounting_Department
            :columns_accounting_cafoa="columns_accounting_cafoa"
            :rows_accounting_cafoa="rows_accounting_cafoa"
            :totalRecords_accounting_cafoa="totalRecords_accounting_cafoa"
            @on-page-change-accounting-cafoa="onPageChange_accounting_cafoa"
            @on-search-accounting-cafoa="onSearch_accounting_cafoa"
            @on-per-page-change-accounting-cafoa="
              onPerPageChange_accounting_cafoa
            "
            @on-sort-change-accounting-cafoa="onSortChange_accounting_cafoa"
            @add-note-accounting-cafoa="addNote(...arguments)"
            @manage-accounting-status-cafoa="
              manageAccountingStatus_cafoa(...arguments)
            "
            @create="create(...arguments, 'accounting')"
            :totalRecords_accounting_voucher="totalRecords_accounting_voucher"
            :columns_accounting_voucher="columns_accounting_voucher"
            :rows_accounting_voucher="rows_accounting_voucher"
            @on-page-change-accounting-voucher="onPageChange_accounting_voucher"
            @on-search-accounting-voucher="onSearch_accounting_voucher"
            @on-per-page-change-accounting-voucher="
              onPerPageChange_accounting_cafoa
            "
            @on-page-sort-accounting-voucher="onSortChange_accounting_voucher"
            @manage-accounting-status-voucher="
              manageAccountingStatus_voucher(...arguments)
            "
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.MAYOR_AWARDING_CHECK">
          <MayorsAwarding_Department
            :totalRecords_award="totalRecords_award"
            :columns_award="columns_award"
            :rows_award="rows_award"
            @on-page-change-award="onPageChange_award"
            @on-search-award="onSearch_award"
            @on-per-page-award="onPerPageChange_award"
            @on-sort-change-award="onSortChange_award"
            @add-note="addNote(...arguments)"
            @manage-award="manageAward(...arguments)"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.DSWD">
          <DSWD_or_Mayors_Department
            :columns_dswd="columns_dswd"
            :rows_dswd="rows_dswd"
            :totalRecords_dswd="totalRecords_dswd"
            @on-page-change-dswd="onPageChange_dswd"
            @on-search-dswd="onSearch_dswd"
            @on-per-page-dswd="onPerPageChange_dswd"
            @on-sort-change-dswd="onSortChange_dswd"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.ADMIN">
          <DSWD_or_Mayors_Department
            :columns_dswd="columns_dswd"
            :rows_dswd="rows_dswd"
            :totalRecords_dswd="totalRecords_dswd"
            @on-page-change-dswd="onPageChange_dswd"
            @on-search-dswd="onSearch_dswd"
            @on-per-page-dswd="onPerPageChange_dswd"
            @on-sort-change-dswd="onSortChange_dswd"
          />
          <Budget_Department
            :items="items"
            :itemsFor="itemsFor"
            :totalRecords_budget="totalRecords_budget"
            :columns_budget="columns_budget"
            :rows_budget="rows_budget"
            @on-page-change="onPageChange_budget(...arguments)"
            @on-search="onSearch_budget(...arguments)"
            @on-per-page-change="onPerPageChange_budget(...arguments)"
            @on-sort-change="onSortChange_budget(...arguments)"
            @create="create(...arguments, 'budget')"
          />
          <Treasury_Department
            :columns_treasury_cafoa="columns_treasury_cafoa"
            :rows_treasury_cafoa="rows_treasury_cafoa"
            :totalRecords_treasury_cafoa="totalRecords_treasury_cafoa"
            @on-page-change-treasury-cafoa="onPageChange_treasury_cafoa"
            @on-search-treasury-cafoa="onSearch_treasury_cafoa"
            @on-per-page-change-treasury-cafoa="onPerPageChange_treasury_cafoa"
            @on-sort-change-treasury-cafoa="onSortChange_treasury_cafoa"
            @add-note-treasury-cafoa="addNote(...arguments)"
            @manage-treasury-status="manageTreasuryStatus(...arguments)"
            :totalRecords_treasury_voucher="totalRecords_treasury_voucher"
            :columns_treasury_voucher="columns_treasury_voucher"
            :rows_treasury_voucher="rows_treasury_voucher"
            @on-page-change-treasury-voucher="onPageChange_treasury_voucher"
            @on-search-treasury-voucher="onSearch_treasury_voucher"
            @on-per-page-change-treasury-voucher="
              onPerPageChange_treasury_voucher
            "
            @on-sort-change-treasury-voucher="
              onSortChange_treasury_voucher(...arguments)
            "
            @manage-treasurystatus-voucher="
              manageTreasuryStatus_voucher(...arguments)
            "
          />
          <Accounting_Department
            :columns_accounting_cafoa="columns_accounting_cafoa"
            :rows_accounting_cafoa="rows_accounting_cafoa"
            :totalRecords_accounting_cafoa="totalRecords_accounting_cafoa"
            @on-page-change-accounting-cafoa="onPageChange_accounting_cafoa"
            @on-search-accounting-cafoa="onSearch_accounting_cafoa"
            @on-per-page-change-accounting-cafoa="
              onPerPageChange_accounting_cafoa
            "
            @on-sort-change-accounting-cafoa="onSortChange_accounting_cafoa"
            @add-note-accounting-cafoa="addNote(...arguments)"
            @manage-accounting-status-cafoa="
              manageAccountingStatus_cafoa(...arguments)
            "
            @create="create(...arguments, 'accounting')"
            :totalRecords_accounting_voucher="totalRecords_accounting_voucher"
            :columns_accounting_voucher="columns_accounting_voucher"
            :rows_accounting_voucher="rows_accounting_voucher"
            @on-page-change-accounting-voucher="onPageChange_accounting_voucher"
            @on-search-accounting-voucher="onSearch_accounting_voucher"
            @on-per-page-change-accounting-voucher="
              onPerPageChange_accounting_cafoa
            "
            @on-page-sort-accounting-voucher="onSortChange_accounting_voucher"
            @manage-accounting-status-voucher="
              manageAccountingStatus_voucher(...arguments)
            "
          />
          <MayorsAwarding_Department
            :totalRecords_award="totalRecords_award"
            :columns_award="columns_award"
            :rows_award="rows_award"
            @on-page-change-award="onPageChange_award"
            @on-search-award="onSearch_award"
            @on-per-page-award="onPerPageChange_award"
            @on-sort-change-award="onSortChange_award"
            @add-note="addNote(...arguments)"
            @manage-award="manageAward(...arguments)"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.BUDGET">
          <Budget_Department
            :items="items"
            :itemsFor="itemsFor"
            :totalRecords_budget="totalRecords_budget"
            :columns_budget="columns_budget"
            :rows_budget="rows_budget"
            @on-page-change="onPageChange_budget(...arguments)"
            @on-search="onSearch_budget(...arguments)"
            @on-per-page-change="onPerPageChange_budget(...arguments)"
            @on-sort-change="onSortChange_budget(...arguments)"
            @create="create(...arguments, 'budget')"
          />
        </div>
        <div v-else-if="$auth.user['role'] == roles.MANAGER">
          <DSWD_or_Mayors_Department
            :columns_dswd="columns_dswd"
            :rows_dswd="rows_dswd"
            :totalRecords_dswd="totalRecords_dswd"
            @on-page-change-dswd="onPageChange_dswd"
            @on-search-dswd="onSearch_dswd"
            @on-per-page-dswd="onPerPageChange_dswd"
            @on-sort-change-dswd="onSortChange_dswd"
          />
          <Budget_Department
            :items="items"
            :itemsFor="itemsFor"
            :totalRecords_budget="totalRecords_budget"
            :columns_budget="columns_budget"
            :rows_budget="rows_budget"
            @on-page-change="onPageChange_budget(...arguments)"
            @on-search="onSearch_budget(...arguments)"
            @on-per-page-change="onPerPageChange_budget(...arguments)"
            @on-sort-change="onSortChange_budget(...arguments)"
            @create="create(...arguments, 'budget')"
          />
          <Treasury_Department
            :columns_treasury_cafoa="columns_treasury_cafoa"
            :rows_treasury_cafoa="rows_treasury_cafoa"
            :totalRecords_treasury_cafoa="totalRecords_treasury_cafoa"
            @on-page-change-treasury-cafoa="onPageChange_treasury_cafoa"
            @on-search-treasury-cafoa="onSearch_treasury_cafoa"
            @on-per-page-change-treasury-cafoa="onPerPageChange_treasury_cafoa"
            @on-sort-change-treasury-cafoa="onSortChange_treasury_cafoa"
            @add-note-treasury-cafoa="addNote(...arguments)"
            @manage-treasury-status="manageTreasuryStatus(...arguments)"
            :totalRecords_treasury_voucher="totalRecords_treasury_voucher"
            :columns_treasury_voucher="columns_treasury_voucher"
            :rows_treasury_voucher="rows_treasury_voucher"
            @on-page-change-treasury-voucher="onPageChange_treasury_voucher"
            @on-search-treasury-voucher="onSearch_treasury_voucher"
            @on-per-page-change-treasury-voucher="
              onPerPageChange_treasury_voucher
            "
            @on-sort-change-treasury-voucher="
              onSortChange_treasury_voucher(...arguments)
            "
            @manage-treasurystatus-voucher="
              manageTreasuryStatus_voucher(...arguments)
            "
          />
          <Accounting_Department
            :columns_accounting_cafoa="columns_accounting_cafoa"
            :rows_accounting_cafoa="rows_accounting_cafoa"
            :totalRecords_accounting_cafoa="totalRecords_accounting_cafoa"
            @on-page-change-accounting-cafoa="onPageChange_accounting_cafoa"
            @on-search-accounting-cafoa="onSearch_accounting_cafoa"
            @on-per-page-change-accounting-cafoa="
              onPerPageChange_accounting_cafoa
            "
            @on-sort-change-accounting-cafoa="onSortChange_accounting_cafoa"
            @add-note-accounting-cafoa="addNote(...arguments)"
            @manage-accounting-status-cafoa="
              manageAccountingStatus_cafoa(...arguments)
            "
            @create="create(...arguments, 'accounting')"
            :totalRecords_accounting_voucher="totalRecords_accounting_voucher"
            :columns_accounting_voucher="columns_accounting_voucher"
            :rows_accounting_voucher="rows_accounting_voucher"
            @on-page-change-accounting-voucher="onPageChange_accounting_voucher"
            @on-search-accounting-voucher="onSearch_accounting_voucher"
            @on-per-page-change-accounting-voucher="
              onPerPageChange_accounting_cafoa
            "
            @on-page-sort-accounting-voucher="onSortChange_accounting_voucher"
            @manage-accounting-status-voucher="
              manageAccountingStatus_voucher(...arguments)
            "
          />
          <MayorsAwarding_Department
            :totalRecords_award="totalRecords_award"
            :columns_award="columns_award"
            :rows_award="rows_award"
            @on-page-change-award="onPageChange_award"
            @on-search-award="onSearch_award"
            @on-per-page-award="onPerPageChange_award"
            @on-sort-change-award="onSortChange_award"
            @add-note="addNote(...arguments)"
            @manage-award="manageAward(...arguments)"
          />
        </div>
        <div
          v-else-if="
            roleId != roles.TREASURY &&
            roleId != roles.ACCOUNTING &&
            roleId != roles.TREASURY &&
            roleId != roles.MAYOR_AWARDING_CHECK &&
            roleId != roles.DSWD
          "
        >
          <h1 class="text-xl font-bold">
            Pending {{ items }} for {{ itemsFor }}s
          </h1>
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
                perPageDropdown: [10, 20, 30, 40, 50, 100],
                dropdownAllowAll: false,
              }"
              :columns="columns"
              :rows="rows"
              :line-numbers="true"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <div class="flex flex-wrap grid grid-cols-2 gap-2">
                    <div class="pr-3">
                      <button
                        type="button"
                        @click="create(props.row.control_number, 'budget')"
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
      <Footer />
    </div>
  </div>
</template>
<script>
import { treasury_exports_cafoa } from '~/mixins/exports/vuedatatable_treasury_cafoa.js'
import { treasury_exports_voucher } from '~/mixins/exports/vuedatatable_treasury_voucher.js'
import { accounting_exports_cafoa } from '~/mixins/exports/vuedatatable_accounting_cafoa.js'
import { accounting_exports_voucher } from '~/mixins/exports/vuedatatable_accounting_voucher.js'
import { exports_dswd } from '~/mixins/exports/vuedatatable_dswd.js'
import { exports_award } from '~/mixins/exports/vuedatatable_mo_award.js'
import { exports_budget } from '~/mixins/exports/vuedatatable_budget.js'

// dashboard
import Treasury_Department from '@/components/Dashboards/treasury.vue'
import Accounting_Department from '@/components/Dashboards/accounting.vue'
import MayorsAwarding_Department from '@/components/Dashboards/mayors_awarding.vue'
import DSWD_or_Mayors_Department from '@/components/Dashboards/dswd_or_mayors.vue'
import Budget_Department from '@/components/Dashboards/budget.vue'
// other components

import AdminTable from '@/components/AdminTable.vue'
import ModalNote from '@/components/Modals/Message.vue'
import roles from '/mixins/data/roles.js'
import const_roles from '~/mixins/constants/roles.js'
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Footer from '@/components/Partials/Footer.vue'
import DashStatus from '~/components/Partials/DashStatus.vue'

export default {
  components: {
    Treasury_Department,
    Accounting_Department,
    MayorsAwarding_Department,
    DSWD_or_Mayors_Department,
    Budget_Department,

    AdminNavbar,
    Sidebar,
    Footer,
    DashStatus,
    AdminTable,
    ModalNote,
  },
  mixins: [
    treasury_exports_cafoa,
    treasury_exports_voucher,
    accounting_exports_cafoa,
    accounting_exports_voucher,
    exports_award,
    exports_dswd,
    exports_budget,
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
      {
        label: 'Date',
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

    completed: 0,
    pending: 0,
    completedCafoa: 0,
    completedVoucher: 0,
    pendingRequest: 0,
    pendingCafoa: 0,
    pendingItem: 'Request',
    completedItem: 'CAFOA',
    award_counts: 0,
    dswd_pending: 0,
  }),
  middleware: 'auth',
  layout: 'dash_panel',
  async mounted() {
    this.roleId = this.$auth.$state.user['role']
    this.items = 'Requests'
    this.itemsFor = 'CAFOA'
    if (this.roleId == const_roles.BUDGET) {
      this.items = 'Requests'
      this.itemsFor = 'CAFOA'
    } else if (this.roleId == const_roles.TREASURY) {
      this.items = 'Treasury'
      this.itemsFor = 'Treasury'
    } else if (this.roleId == const_roles.ACCOUNTING) {
      this.items = 'CAFOA'
      this.itemsFor = 'Voucher'
    }
    await this.fetchDashboard()

    if (
      this.roleId == const_roles.ADMIN ||
      this.roleId == const_roles.MANAGER
    ) {
      await this.loadItems_dswd()
      await this.loadItems_budget()
      await this.loadItems_treasury_cafoa()
      await this.loadItems_treasury_voucher()
      await this.loadItems_accounting_cafoa()
      await this.loadItems_accounting_voucher()
      await this.loadItems_award()
    } else if (this.roleId == const_roles.BUDGET) {
      await this.loadItems_budget()
    } else if (this.roleId == const_roles.TREASURY) {
      await this.loadItems_treasury_cafoa()
      await this.loadItems_treasury_voucher()
    } else if (this.roleId == const_roles.ACCOUNTING) {
      await this.loadItems_accounting_cafoa()
      await this.loadItems_accounting_voucher()
    } else if (this.roleId == const_roles.MAYOR_AWARDING_CHECK) {
      await this.loadItems_award()
    } else if (this.roleId == const_roles.DSWD) {
      await this.loadItems_dswd()
    } else {
      // await this.fetchItems()
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
              created: response.data[i].created,
            })
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
              created: response.data[i].created,
            })
          }
          this.rows_treasury_voucher = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_dswd() {
      this.$axios
        .$post('/api/requestform/fetchDashboard', this.serverParams_dswd, {})
        .then((response) => {
          this.totalRecords_dswd = response.totalRecords
          this.dswd_pending = response.totalRecordsPending
          var data = []
          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              payee: response.data[i].payee,
              created: response.data[i].created,
            })
          }

          this.rows_dswd = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async loadItems_budget() {
      this.$axios
        .$post('/api/dashboard/budget',
          this.serverParams_budget
        )
        .then((response) => {
          this.totalRecords_budget = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              control_number: response.data[i].control_number,
              status: response.data[i].statusLabel,
              payee: response.data[i].payee,
              disbursement_id: response.data[i].disbursement_vouchers_id,
              created: response.data[i].created,
              requestdate: response.data[i].requestday,
              typeofrequest: response.data[i].typeofrequest,
              citizen_name: response.data[i].citizen_name,
            })
          }

          this.rows_budget = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async fetchItems() {
      this.$axios
        .$post('/api/dashboard/pending/'+this.roleId, serverParams_budget,{
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
                created: response.data[i].created,
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
          created: response.data[i].created,
        })
      }

      this.requests = data
    },

    create(controlNo, role) {
      window.localStorage.setItem('controlNumber', JSON.stringify(controlNo))
      if (role == 'budget') {
        this.$router.push('/forms/cafoa/create')
      } else {
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
              created: response.data[i].created,
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
              created: response.data[i].created,
            })
          }
          console.log(data)
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
              created: response.data[i].created,
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
    async fetchDashboard() {
      this.roleId = this.$auth.$state.user['role']

      this.pendingItem = this.roleId == 4 ? 'REQUESTS' : 'CAFOA'
      this.completedItem = this.roleId == 4 ? 'CAFOA' : 'VOUCHERS'

      this.$axios
        .$post('/api/dashboard/fetch', {
          roleId: this.roleId,
        })
        .then((response) => {
          this.award_counts = response.award_count
          this.completed = response.completed
          this.pending = response.pending
          this.completedCafoa = response.completedCafoa
          this.completedVoucher = response.completedVoucher
          this.pendingRequest = response.pendingRequest
          this.pendingCafoa = response.pendingCafoa
        })
        .catch((error) => {})
        .finally(() => {})
    },
  },
}
</script>
