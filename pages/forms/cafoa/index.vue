<template>
  <div>
    <!-- Modal -->
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

    <div class="">
      <!-- top select and action buttons -->
      <div class="w-full mt-5">
        <div
          class=" 2xl:w-5/5 xl:w-5/5 lg:w-5/5 flex flex-col 2xl:flex-row xl:flex-row lg:flex-row justify-items-end place-content-end"
        >
          <div
            class="mt-6 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-3 2xl:order-1 xl:order-1 lg:order-1"
          >
            <button
              @click.prevent="download()"
              class="w-full mb-5 float-right bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            >
              Download
            </button>
          </div>
          <div
            class="mt-2 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-2 2xl:order-2 xl:order-2 lg:order-2"
          >
            <select
              @change="selectTransmittalOffice"
              v-model="payload.status"
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
          <div
            class="mt-2 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-2 2xl:order-3 xl:order-3 lg:order-3"
          >
            <select
              v-model="officeStatus"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in office_statuses.statuses"
                :key="index"
                :value="stat.selectId"
              >
                {{ stat.value }}
              </option>
            </select>
          </div>
          <div
            class="mt-0 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-4 2xl:order-4 xl:order-4 lg:order-4"
          >
            <div class="">
              <button
                class=" w-full float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                @click.prevent="budget_1()"
              >
                Transmit
              </button>
            </div>
          </div>


        </div>
      </div>

      <!-- tab -->
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

        <TableTab tab="index"></TableTab>
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
            :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <!-- {{ props.row }} -->
                <div class="flex flex-items">
                  <div class="p-1">
                    <NuxtLink
                      aria-expanded="false"
                      :to="'/forms/cafoa/' + props.row.control_number"
                      class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      ><i class="fas fa-eye"></i
                    ></NuxtLink>
                  </div>
                  <div class="p-1">
                    <a
                      @click.prevent="downloadpdf(props.row.id)"
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    >
                      <i class="fas fa-print"></i>
                    </a>
                  </div>
                  <div class="p-1">
                    <NuxtLink
                      aria-expanded="false"
                      :to="'/forms/cafoa/edit/' + props.row.control_number"
                      class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      ><i class="fas fa-edit"></i>
                    </NuxtLink>
                  </div>
                  <!-- <div class="p-1">
                    <button
                      class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                      v-on:click.prevent="view_note(props.row.control_number)"
                    >
                      View note
                    </button>

                  </div> -->
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
import ModalNoteList from '@/components/Modals/Notes.vue'
import { cafoa } from '~/mixins/middleware/cafoa_pages.js'
import { table_methods } from '~/mixins/methods/vuedatatable.js'
import status from '/mixins/data/status.js'
import TableTab from '@/components/Tabs/Table_tab_cafoa.vue'
import ReturnNote from '@/components/Modals/ReturnNote.vue'
import CardNoteField from '@/components/Cards/CardNoteField.vue'
export default {
  components: {
    TableTab,
    ModalNoteList,
    ReturnNote,
    CardNoteField,
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
      control_number: '',
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
          label: 'Notes',
          field: 'note',
        },
        {
          label: 'Action',
          field: 'action',
          sortable: false,
        },
      ],
      payload: {
        status: 11,
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
      officeStatus: 1,
      office_statuses: {
        statuses: [
          { selectId: 1, value: 'For CAFOA Initial' },
          { selectId: 2, value: 'For Create Check' },
          { selectId: 3, value: 'For Check Signing' },
          { selectId: 4, value: 'For Check Release' },
          { selectId: 5, value: 'For Collection' },
        ],
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
        .$post('/api/cafoa/fetch', this.serverParams, {})
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

    budget_1() {
      this.$toast.success('Sending')

      var data = []
      var data_oii = []
      var data_controlnumber = []
      if (this.$refs['cafoarequests'].selectedRows) {
        this.$refs['cafoarequests'].selectedRows.map(function (value, key) {
          data.push(value['id'])
          data_oii.push(value['originalIndex'])
          data_controlnumber.push(value['control_number'])
        })
      }

      this.rows = this.rows.filter(function (value, index) {
        return data_oii.indexOf(index) == -1
      })

      let payload = new FormData()
      payload.append('transmit_ids', data)
      payload.append(
        'status',
        this.generateFormStatus(this.payload.status, this.officeStatus)
      )
      payload.append('transmit_controlnumber', data_controlnumber)
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
    ViewNote(control_number) {
      this.$axios
        .$get('/api/notes/control_number/' + control_number, {})
        .then((response) => {
          console.log(response.data)
          this.control_number = control_number
          this.notes = response.data
        })
        .catch((error) => {})
        .finally(() => {})

      this.toggleModal_notelist()
    },
    toggleModal_notelist() {
      this.statusModal_notelist = 'action'
      this.showModal_notelist = !this.showModal_notelist
    },
    addNote(control_number) {
      console.log(control_number)
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
    selectTransmittalOffice() {
      this.office_statuses = this.transmittal_offices.filter((office) => {
        return this.payload.status === office.id
      })
      this.office_statuses = this.office_statuses[0]
      this.officeStatus = 1
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
