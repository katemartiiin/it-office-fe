<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div class="w-full" v-if="roleId == 1 || roleId == 2 || roleId == 3">
        <div class="flex items-start float-right">
          <div class="py-4 px-1">
            <select
              v-model="selectedStatus"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in transmittal_offices"
                :key="index"
                :value="stat.id"
              >
                {{ stat.short_name }}
              </option>
            </select>
          </div>
          <div class="py-4 px-1">
            <select
              v-model="officeStatus"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in offices_statuses.statuses"
                :key="index"
                :value="stat.selectId"
              >
                {{ stat.value }}
              </option>
            </select>
          </div>
          <div class="py-4 px-1">
            <button
              class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              @click.prevent="transmitRequest()"
            >
              Transmit
            </button>
          </div>
        </div>
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
        <TableTab tab="declined"></TableTab>
        <div class="block w-full overflow-x-auto">
          <vue-good-table
            ref="formrequests"
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
            :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <div class="flex flex-row">
                  <div class="p-1">
                    <NuxtLink
                      aria-expanded="false"
                      :to="'/forms/requests/edit/' + props.row.id"
                    >
                      <button
                        class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                        title="Edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </NuxtLink>
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
const Status_Pending = 0
const Status_Approved = 1
const Status_Declined = 2
import TableTab from '@/components/Tabs/Table_tab_revised.vue'
import { table_methods } from '~/mixins/methods/vuedatatable.js'
import { requestform } from '~/mixins/middleware/requestform_pages.js'
import status from '~/mixins/data/status.js'
export default {
  head() {
    return {
      title: 'Form Request',
      meta: [
        {
          hid: 'B',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [requestform, status, table_methods],
  components: {
    TableTab,
  },
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
          label: 'Citizen`s Name',
          field: 'citizen_name',
        },
        // {
        //   label: 'Status',
        //   field: 'status',
        // },
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
      payload: {
        id: null,
      },
      selectedStatus: 1,
      roleId: null,
      offices_statuses: {
        statuses: [
          { selectId: 1, value: 'For Request' },
          { selectId: 2, value: 'For Approval' },
          { selectId: 3, value: 'For Check Signing' },
          { selectId: 4, value: 'For Release' },
        ],
      },
      officeStatus: 2,
    }
  },
  created() {
    this.requests = []
  },
  mounted() {
    this.roleId = this.$auth.$state.user['role']
    this.loadItems()
  },
  watch: {
    selectedStatus(value) {
      if (value) {
        this.offices_statuses = this.transmittal_offices.filter((office) => {
          return value === office.id
        })
        this.offices_statuses = this.offices_statuses[0]
        this.officeStatus = 1
      }
    },
  },
  methods: {
    async loadItems() {
      this.$axios
        .$post(
          '/api/requestform/fetch_via_stat/' + Status_Declined,
          this.serverParams,
          {}
        )
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              citizen_name: response.data[i].citizen_name,
              control_number: response.data[i].control_number,
              created_at: response.data[i].created,
              status: response.data[i].statusLabel,
              flag_transmittal_in_budget:
                response.data[i].flag_transmittal_in_budget,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async manageStatus(ItemIndex, status) {
      let event
      switch (status) {
        case 'pending':
          event = 0
          break
        case 'approve':
          event = 1
          break
        case 'decline':
          event = 2
          break
      }
      this.payload.id = this.rows[ItemIndex].id

      this.$axios
        .$post('/api/requestform/managestatus/' + event, this.payload, {})
        .then((response) => {
          this.rows.splice(ItemIndex, 1)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async deleteRequest(index) {
      this.$axios
        .$delete('/api/requestform/delete/' + this.rows[index].id, '', {})
        .then((response) => {
          this.rows.splice(index, 1)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async transmitRequest() {
      this.$toast.success('Sending')
      if (this.$refs['formrequests'].selectedRows.length === 0) {
        this.$toast.error('Error.')
        this.$toast.error('Please select rows to transmit.')
        return 0
      }

      var data = []
      var data_oii = []
      var data_controlnumber = []

      let flag_transmittal_budget = false
      let counterror = 0
      let status = this.generateFormStatus(
        this.selectedStatus,
        this.officeStatus
      )

      if (this.$refs['formrequests'].selectedRows) {
        this.$refs['formrequests'].selectedRows.map(function (value, key) {
          if (value['flag_transmittal_in_budget'] == 0 && status > 3) {
            flag_transmittal_budget = true
            counterror++
          }

          data.push(value['id'])
          data_oii.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      if (flag_transmittal_budget == true) {
        this.$toast.error(
          '( ' +
            counterror +
            ' ) of the selected row cannot be transmitted because transmittal must be processed in budget department first.'
        )
        return false
      }

      this.rows = this.rows.filter(function (value, index) {
        return data_oii.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)

      payload.append('transmit_controlnumber', data_controlnumber)
      payload.append(
        'status',
        this.generateFormStatus(this.selectedStatus, this.officeStatus)
      )

      this.$axios
        .$post('/api/tx/universal', payload, {})
        .then((response) => {
          this.$toast.success('Transmittal form generated.')
          const url =
            this.$config.api + '/download_transmittal/' + response.path
          window.open(url)
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
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
