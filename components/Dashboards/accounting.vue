<template>
  <div>
    <!-- table 1  -->
    <div>
      <div for="header">
        <div class="flex flex-col 2xl:flex-row xl:flex-row lg:flex-row">
          <div>
            <h2 class="py-5 text-xl font-bold">Pending CAFOA Requests</h2>
          </div>
          <div
            class="w-full 2xl:w-4/5 xl:w-4/5 lg:w-4/5 flex flex-col 2xl:flex-row xl:flex-row lg:flex-row justify-items-end place-content-end"
          >
            <div
              class="mt-6 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-3 2xl:order-1 xl:order-1 lg:order-1"
            >
              <button
                v-if="selected_accounting_0.length > 0"
                class="w-full space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                @click.prevent="accept_accounting_0()"
              >
                Accept Selected
              </button>
            </div>
            <div
              class="mt-2 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-1 2xl:order-2 xl:order-2 lg:order-2"
            >
              <select
                @change="selectedTransmittal1"
                v-model="payload.accounting_status_1"
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
              class="mt-2 2xl:mt-0 xl:mt-0 lg:mt-0 ml-2 order-2 2xl:order-1 xl:order-3 lg:order-3"
            >
              <select
                v-model="as1_status"
                class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option
                  v-for="(stat, index) in as1_statuses.statuses"
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
                  class="w-full space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                  @click.prevent="transmit_accounting_1()"
                >
                  Transmit
                </button>
              </div>
            </div>
            <div>
              <!-- <button
            class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            @click.prevent="tx_cafoa_accounting_to_treasury()"
          >
            Transmit to Treasury
          </button> -->
            </div>
          </div>
        </div>

        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Voucher Creation
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div class="pb-10">
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_accounting_0"
          id="accountingcafoa"
          ref="accountingcafoa"
          @on-page-change="onPageChange_accounting_cafoa(...arguments)"
          @on-search="onSearch_accounting_cafoa(...arguments)"
          @on-per-page-change="onPerPageChange_accounting_cafoa(...arguments)"
          @on-sort-change="onSortChange_accounting_cafoa(...arguments)"
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
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-wrap">
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_cafoa(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
                <div class="p-1" v-if="props.row.acceptedStatus == 1">
                  <button
                    type="button"
                    @click="create(props.row.disbursement_vouchers_id)"
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    <div class="flex">
                      <i class="fas fa-pencil text-xs"></i
                      ><span class="ml-1">Voucher</span>
                    </div>
                  </button>
                </div>
                <!-- <div class="p-1" v-if="props.row.accounting_status == 1">
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
                </div> -->
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 2 -->
    <div>
      <div for="header">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_accounting_1.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_accounting_1()"
            >
              Accept Selected
            </button>
          </div>
          <div class="py-4">
            <select
              @change="selectedTransmittal2"
              v-model="payload.accounting_status_2"
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
          <div class="p-4">
            <select
              v-model="as2_status"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in as2_statuses.statuses"
                :key="index"
                :value="stat.selectId"
              >
                {{ stat.value }}
              </option>
            </select>
          </div>
          <div class="py-4">
            <button
              class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              @click.prevent="transmit_accounting_2()"
            >
              Transmit
            </button>
          </div>
        </div>

        <h2 class="py-5 text-xl font-bold">Pending Vouchers</h2>

        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Bank Check Validation
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_accounting_1"
          id="accountingvoucher"
          ref="accountingvoucher"
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
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-wrap">
                <!-- <div class="p-1">
                  <button
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click.prevent="view_note(props.row.control_number)"
                  >
                    View Note <i class="fas fa-sticky-note"></i>
                  </button>
                </div> -->
                <!-- <div class="p-1" v-if="props.row.acceptedStatus == 1">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="addNote(props.row.control_number)"
                  >
                    Add Note
                  </button>
                </div> -->
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_voucher(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
                <div class="p-1" v-if="props.row.acceptedStatus == 1">
                  <button
                    type="button"
                    @click="create(props.row.id)"
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    <div class="flex">
                      <i class="fas fa-pencil text-xs"></i
                      ><span class="ml-1">Voucher</span>
                    </div>
                  </button>
                </div>
                <!-- <div class="p-1" v-if="props.row.accounting_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageAccountingStatus_voucher(
                        props.row.originalIndex,
                        'submit'
                      )
                    "
                  >
                    Submit to Treasury - Check Issuance
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
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 3 -->
    <div class="mt-5">
      <div for="header">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_accounting_2.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_accounting_2()"
            >
              Accept Selected
            </button>
          </div>
          <div class="py-4">
            <select
              @change="selectedTransmittal3"
              v-model="payload.accounting_status_3"
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
          <div class="p-4">
            <select
              v-model="as3_status"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in as3_statuses.statuses"
                :key="index"
                :value="stat.selectId"
              >
                {{ stat.value }}
              </option>
            </select>
          </div>
          <div class="py-4">
            <button
              class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              @click.prevent="transmit_accounting_3()"
            >
              Transmit
            </button>
          </div>
        </div>

        <h2 class="py-5 text-xl font-bold">Pending Requests</h2>

        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Accounting Advice
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        <vue-good-table
          id="accounting_validation"
          ref="accounting_validation"
          @on-selected-rows-change="OnSelectedRows_accounting_2"
          @on-page-change="onPageChange_mo_accounting_voucher"
          @on-search="onSearch_mo_accounting_voucher"
          @on-per-page-change="onPerPageChange_mo_accounting_voucher"
          @on-sort-change="onSortChange_mo_accounting_voucher"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
          :totalRows="totalRecords_mo_accounting_voucher"
          :pagination-options="{
            enabled: true,
          }"
          :columns="columns_mo_accounting_voucher"
          :rows="rows_mo_accounting_voucher"
          :line-numbers="true"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-wrap">
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manageMoAccountingStatus_voucher(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
                <div
                  class="ml-2 px-3 py-2 text-sm bg-green-200 font-semibold text-green-700"
                  v-if="props.row.acceptedStatus == 1"
                >
                  Accepted
                </div>
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="w-full my-5">
      <hr class="my-1 order-4 border-slate-600 border-2" />
    </div>
  </div>
</template>

<script>
import status from '/mixins/data/status.js'
import CardNoteField from '@/components/Cards/CardNoteField.vue'

export default {
  components: { CardNoteField },
  mixins: [status],
  props: [
    'items',
    'itemsFor',
    'columns_accounting_cafoa',
    'rows_accounting_cafoa',
    'totalRecords_accounting_cafoa',

    'totalRecords_accounting_voucher',
    'columns_accounting_voucher',
    'rows_accounting_voucher',

    'totalRecords_mo_accounting_voucher',
    'columns_mo_accounting_voucher',
    'rows_mo_accounting_voucher',
  ],
  data: () => ({
    selected_accounting_0: [],
    selected_accounting_1: [],
    selected_accounting_2: [],

    payload: {
      accounting_status_1: 11,
      accounting_status_2: 11,
      accounting_status_3: 11,
    },

    // Accounting 1
    as1_statuses: {
      statuses: [
        { selectId: 1, value: 'For CAFOA Initial' },
        { selectId: 2, value: 'For Create Check' },
        { selectId: 3, value: 'For Check Signing' },
        { selectId: 4, value: 'For Check Release' },
        { selectId: 5, value: 'For Collection' },
      ],
    },
    as1_status: 2,

    // Accounting 2
    as2_statuses: {
      statuses: [
        { selectId: 1, value: 'For CAFOA Initial' },
        { selectId: 2, value: 'For Create Check' },
        { selectId: 3, value: 'For Check Signing' },
        { selectId: 4, value: 'For Check Release' },
        { selectId: 5, value: 'For Collection' },
      ],
    },
    as2_status: 3,

    // Accounting 3
    as3_statuses: {
      statuses: [
        { selectId: 1, value: 'For CAFOA Initial' },
        { selectId: 2, value: 'For Create Check' },
        { selectId: 3, value: 'For Check Signing' },
        { selectId: 4, value: 'For Check Release' },
        { selectId: 5, value: 'For Collection' },
      ],
    },
    as3_status: 4,
  }),
  methods: {
    // 1

    onPageChange_accounting_cafoa(params) {
      this.$emit('on-page-change-accounting-cafoa', params)
    },
    onSearch_accounting_cafoa(params) {
      this.$emit('on-search-accounting-cafoa', params)
    },
    onPerPageChange_accounting_cafoa(params) {
      this.$emit('on-per-page-change-accounting-cafoa', params)
    },
    onSortChange_accounting_cafoa(params) {
      this.$emit('on-sort-change-accounting-cafoa', params)
    },

    addNote(controlNo) {
      this.$emit('add-note-accounting-cafoa', controlNo)
    },
    manageAccountingStatus_cafoa(index, status) {
      this.$emit('manage-accounting-status-cafoa', index, status)
    },
    create(voucher_id) {
      this.$emit('create', voucher_id)
    },

    // 2

    onPageChange_accounting_voucher(params) {
      this.$emit('on-page-change-accounting-voucher', params)
    },
    onSearch_accounting_voucher(params) {
      this.$emit('on-search-accounting-voucher', params)
    },
    onPerPageChange_accounting_voucher(params) {
      this.$emit('on-per-page-change-accounting-voucher', params)
    },
    onSortChange_accounting_voucher(params) {
      this.$emit('on-page-sort-accounting-voucher', params)
    },
    manageAccountingStatus_voucher(index, status) {
      this.$emit('manage-accounting-status-voucher', index, status)
    },
    tx_cafoa_accounting_to_treasury() {
      this.$emit(
        'transmit-cafoa-accounting-to-treasury',
        this.$refs['accountingcafoa'].selectedRows
      )
    },
    tx_voucher_accounting_to_mayors() {
      this.$emit(
        'transmit-voucher-accounting-to-mayors',
        this.$refs['accountingvoucher'].selectedRows
      )
    },
    manageMoAccountingStatus_voucher(index, status) {
      this.$emit('manage-mo-accounting-status', index, status)
    },

    onPageChange_mo_accounting_voucher(params) {
      this.$emit('on-page-change-mo-accounting-voucher', params)
    },
    onSearch_mo_accounting_voucher(params) {
      this.$emit('on-search-mo-accounting-voucher', params)
    },
    onPerPageChange_mo_accounting_voucher(params) {
      this.$emit('on-per-page-mo-change-accounting-voucher', params)
    },
    onSortChange_mo_accounting_voucher(params) {
      this.$emit('on-page-sort-mo-accounting-voucher', params)
    },
    OnSelectedRows_accounting_0() {
      this.selected_accounting_0 = this.$refs['accountingcafoa'].selectedRows
    },
    OnSelectedRows_accounting_1() {
      this.selected_accounting_1 = this.$refs['accountingvoucher'].selectedRows
    },
    OnSelectedRows_accounting_2() {
      this.selected_accounting_2 =
        this.$refs['accounting_validation'].selectedRows
    },
    accept_accounting_0() {
      this.$emit(
        'accept-accounting-0',
        this.$refs['accountingcafoa'].selectedRows
      )
    },
    accept_accounting_1() {
      this.$emit(
        'accept-accounting-1',
        this.$refs['accountingvoucher'].selectedRows
      )
    },
    accept_accounting_2() {
      this.$emit(
        'accept-accounting-2',
        this.$refs['accounting_validation'].selectedRows
      )
    },

    transmit_accounting_1() {
      this.$emit(
        'transmit-accounting-1',
        this.$refs['accountingcafoa'].selectedRows,
        this.generateFormStatus(
          this.payload.accounting_status_1,
          this.as1_status
        )
      )
    },
    transmit_accounting_2() {
      this.$emit(
        'transmit-accounting-2',
        this.$refs['accountingvoucher'].selectedRows,
        this.generateFormStatus(
          this.payload.accounting_status_2,
          this.as2_status
        )
      )
    },
    transmit_accounting_3() {
      this.$emit(
        'transmit-accounting-3',
        this.$refs['accounting_validation'].selectedRows,
        this.generateFormStatus(
          this.payload.accounting_status_3,
          this.as3_status
        )
      )
    },
    // view_note(ctrl_number) {
    //   console.log(ctrl_number)
    //   this.$emit('view-note', ctrl_number)
    // },

    ViewNote(ctrl_number) {
      this.$emit('view-note', ctrl_number)
    },
    addNote(controlNo) {
      this.$emit('add-note', controlNo)
    },
    selectedTransmittal1() {
      this.as1_statuses = this.transmittal_offices.filter((office) => {
        return this.payload.accounting_status_1 === office.id
      })
      this.as1_statuses = this.as1_statuses[0]
      this.as1_status = 1
    },
    selectedTransmittal2() {
      this.as2_statuses = this.transmittal_offices.filter((office) => {
        return this.payload.accounting_status_2 === office.id
      })
      this.as2_statuses = this.as2_statuses[0]
      this.as2_status = 1
    },
    selectedTransmittal3() {
      this.as3_statuses = this.transmittal_offices.filter((office) => {
        return this.payload.accounting_status_3 === office.id
      })
      this.as3_statuses = this.as3_statuses[0]
      this.as3_status = 1
    },
  },
}
</script>
