<template>
  <div>
    <!-- Modal Start-->

    <ModalNoticeList
      @toggleModal="toggleModal_notenotice()"
      :showmodal="showModal_notenotice"
      :status="statusModal"
      :notes="notes_notice"
      :control_number="control_number"
    >
      <span slot="title">Same request in the past (3) three months</span>
      <span slot="title_textarea">Notice Notes:</span>
      <span slot="btn_cancel">Cancel</span>
      <span slot="btn-action">Okay</span>
    </ModalNoticeList>
    <ModalNoteList
      @toggleModal="toggleModal_notelist()"
      :showmodal="showModal_notelist"
      :status="statusModal"
      :notes="notes"
      :control_number="control_number"
    >
      <span slot="title">View Notes</span>
      <span slot="title_textarea">Added Notes:</span>
      <span slot="btn_cancel">Cancel</span>
      <span slot="btn-action">Okay</span>
    </ModalNoteList>
    <ReturnNote
      @toggleModal="toggleModal()"
      :showmodal="showModal"
      :status="statusModal"
      @submit-note="submitNote(...arguments)"
    >
      <span slot="title">Add Note</span>
      <span slot="title_department"
        >Select Department / Office <small>(optional)</small></span
      >
      <span slot="title_textarea">Please enter a note</span>
      <span slot="btn_cancel">Cancel</span>
      <span slot="btn-action">Submit</span>
    </ReturnNote>
    <!-- Modal End-->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div class="w-full" v-if="roleId == 1 || roleId == 2 || roleId == 3">
        <div class="flex items-start float-right">
          <div class="py-4 px-1">
            <NuxtLink
              to="/forms/requests/create"
              class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Create Request
            </NuxtLink>
          </div>
          <div class="py-4 px-1">
            <select
              v-model="selectedOffice"
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
              v-model="payload.officeStatus"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in offices_status.statuses"
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
              @click.prevent="transmittal()"
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

        <TableTab tab="approved"></TableTab>

        <div class="block w-full overflow-x-auto">
          <vue-good-table
            id="formrequests"
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
                  <!-- <div class="p-1">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      title="View"
                    >
                      <NuxtLink
                        aria-expanded="false"
                        :to="'/forms/requests/' + props.row.id"
                        ><i class="fas fa-eye"></i
                      ></NuxtLink>
                    </button>
                  </div> -->
                  <div class="p-1">
                    <NuxtLink
                      aria-expanded="false"
                      :to="'/forms/requests/edit/' + props.row.id"
                      ><button
                        class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                        title="Edit"
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                    </NuxtLink>
                  </div>
                </div>
              </span>
              <span v-if="props.column.field == 'note'">
                <CardNoteField
                  :control_number="props.row.control_number"
                  @add-note="addNote(...arguments)"
                  @view-note="ViewNote(...arguments)"
                ></CardNoteField>

                <!-- <div class="flex flex-row">
                  <div class="p-1">
                    <button
                      class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                      v-on:click.prevent="view_note(props.row.control_number)"
                    >
                      <span>
                        View Note

                        <svg
                          class="w-full h-6 icon-svg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div class="p-1">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      @click="addNote(props.row.control_number)"
                    >
                      <span>
                        Add Note
                        <svg
                          class="w-full h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div> -->
              </span>
              <span v-if="props.column.field == 'citizen_name'">
                <button
                  v-if="props.row.samerequest.length != 0"
                  @click.prevent="
                    shownotice(props.row.samerequest, props.row.control_number)
                  "
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold px-2 py-1 rounded-full"
                >
                  <i class="fas fa-info"></i>
                </button>
                {{ props.row.citizen_name }}
              </span>
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Status_Pending = 1
import TableTab from '@/components/Tabs/Table_tab_revised.vue'

import { table_methods } from '~/mixins/methods/vuedatatable.js'
import { requestform } from '~/mixins/middleware/requestform_pages.js'
import status from '/mixins/data/status.js'
// modals
import ModalNoteList from '@/components/Modals/Notes.vue'
import ModalNoticeList from '@/components/Modals/Notice.vue'
import ReturnNote from '@/components/Modals/ReturnNote.vue'
import CardNoteField from '@/components/Cards/CardNoteField.vue'
export default {
  head() {
    return {
      title: 'Form Request',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [table_methods, requestform, status],
  components: {
    TableTab,
    ModalNoteList,
    ReturnNote,
    CardNoteField,
    ModalNoticeList,
  },
  layout: 'dashboard',
  data() {
    return {
      control_number: '',
      noteDepartment: 0,
      noteControlNumber: false,
      notes: [],
      showModal_notelist: false,

      statusModal: 'action',
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
        {
          label: 'Request Type',
          field: 'request_type',
        },
        {
          label: 'Request Date',
          field: 'requestdate',
        },
        {
          label: 'Date - Time',
          field: 'updated_at',
        },
        {
          label: 'Notes',
          field: 'note',
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
        status: 1,
        officeStatus: 2,
      },
      roleId: null,
      offices_status: {
        statuses: [
          { selectId: 1, value: 'For Request' },
          { selectId: 2, value: 'For Approval' },
          { selectId: 3, value: 'For Check Signing' },
          { selectId: 4, value: 'For Release' },
        ],
      },
      selectedOffice: 1,
      showModal_notenotice: false,
      notes_notice: [],
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
    selectedOffice(value) {
      if (value) {
        this.payload.status = value
        this.offices_status = this.transmittal_offices.filter((office) => {
          return value === office.id
        })
        this.offices_status = this.offices_status[0]
        this.payload.officeStatus = 1
      }
    },
  },

  methods: {
    async loadItems() {
      this.$axios
        .$post(
          '/api/requestform/fetch_via_stat/' + Status_Pending,
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
              updated_at: response.data[i].updated,
              status: response.data[i].statusLabel,
              request_type: response.data[i].typeofrequest,
              requestdate: response.data[i].requestday,
              flag_transmittal_in_budget:
                response.data[i].flag_transmittal_in_budget,
              samerequest: response.data[i].samerequest,
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
      this.payload.status = this.generateFormStatus(
        this.selectedOffice,
        this.payload.officeStatus
      )

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

    transmittal() {
      if (this.$refs['formrequests'].selectedRows.length === 0) {
        this.$toast.error('Error.')
        this.$toast.error('Please select rows to transmit.')
        return 0
      }

      this.$toast.success('Sending')

      var data = []
      var data_oii = []
      var data_controlnumber = []

      let flag_transmittal_budget = false
      let counterror = 0
      let status = this.generateFormStatus(
        this.selectedOffice,
        this.payload.officeStatus
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
        this.generateFormStatus(this.selectedOffice, this.payload.officeStatus)
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

    toggleModal_notelist() {
      this.statusModal_notelist = 'action'
      this.showModal_notelist = !this.showModal_notelist
    },
    ViewNote(control_number) {
      this.$axios
        .$get('/api/notes/control_number/' + control_number, {})
        .then((response) => {
          this.control_number = control_number
          console.log(response.data)
          this.notes = response.data
        })
        .catch((error) => {})
        .finally(() => {})

      this.toggleModal_notelist()
    },
    addNote(control_number) {
      this.noteControlNumber = control_number
      this.toggleModal()
    },
    async submitNote(note, department) {
      this.noteDepartment = department
      this.$axios
        .$post('/api/papar_trail/addnote', {
          control_number: this.noteControlNumber,
          note: note,
          department: this.noteDepartment,
        })
        .then((response) => {
          this.statusModal = 'done'
          console.log(note)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    toggleModal() {
      this.statusModal = 'action'
      this.showModal = !this.showModal
    },
    shownotice(date_array, control_number) {
      this.control_number = control_number
      this.toggleModal_notenotice()
      this.notes_notice = date_array
      this.showModal_notenotice = true
    },
    toggleModal_notenotice() {
      this.statusModal_notenotice = 'action'
      this.showModal_notenotice = !this.showModal_notenotice
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}

[class^='icon'] {
  width: 50px;
  height: 50px;
  position: relative;
  top: 15px;
  margin-right: 10px;
  fill: #fff;
}

/* Reposition the music note icon */
.icon-music {
  right: 5px;
}
</style>
