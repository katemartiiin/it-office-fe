<template>
  <div>
    <div for="header">
      <div>
        <div
          class="float-right 2xl:flex 2xl:items-start 2xl:float-right xl:flex xl:items-start xl:float-right lg:flex lg:items-start lg:float-right w-full 2xl:w-1/2 xl:w-1/2 lg:w-1/2"
        >
          <div
            class="py-4 w-full 2xl:w-full xl:w-full lg:w-1/2 md:w-full sm:w-full hidden 2xl:block xl:block lg:block"
          >
            <button
              v-if="selected_budget.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_budget()"
            >
              Accept Selected
            </button>
          </div>
          <div
            class="py-4 px-1 w-full 2xl:w-full xl:w-full lg:w-1/2 md:w-full sm:w-full"
          >
            <select
              @change="selectTransmittalOffice"
              v-model="budget_status"
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
            class="py-4 px-1 w-full 2xl:w-full xl:w-full lg:w-1/2 md:w-full sm:w-full"
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
            class="py-4 px-1 w-full 2xl:w-1/3 xl:w-1/3 lg:w-1/3 md:w-full sm:w-full flex flex-nowrap sm:content-center md:content-center "
          >
            <div class="w-1/2">
              <button
                v-if="selected_budget.length > 0"
                class="visible 2xl:hidden xl:hidden lg:hidden mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                @click.prevent="accept_budget()"
              >
                Accept Selected
              </button>
            </div>
            <div class="w-1/2">
              <button
                class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                @click="budgetTransmit"
              >
                Transmit
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2 class="text-xl font-bold py-5">Budget Department Dashboard</h2>

      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">
              Pending {{ items }} for {{ itemsFor }}s
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto">
      <vue-good-table
        @on-selected-rows-change="OnSelectedRows_budget"
        :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        @on-page-change="onPageChange_budget"
        @on-search="onSearch_budget"
        @on-per-page-change="onPerPageChange_budget"
        @on-sort-change="onSortChange_budget"
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        mode="remote"
        :totalRows="totalRecords_budget"
        :pagination-options="{
          enabled: true,
        }"
        :columns="columns_budget"
        :rows="rows_budget"
        :line-numbers="true"
        id="budget"
        ref="budget"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <div class="flex flex-wrap grid grid-cols-2 gap-2">
              <!-- <div class="p-1">
                <button
                  class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  @click.prevent="view_note(props.row.control_number)"
                >
                  View Note <i class="fas fa-sticky-note"></i>
                </button>
              </div> -->
              <div class="p-1" v-if="props.row.acceptance == 0">
                <button
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  v-on:click="
                    manage_accept_transmittal(props.row.originalIndex, 'accept')
                  "
                >
                  Accept
                </button>
              </div>
              <!-- <div class="p-1" v-if="props.row.acceptance == 1">
                <button
                  class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  @click="addNote(props.row.control_number)"
                >
                  Add Note
                </button>
              </div> -->
              <div class="p-1" v-if="props.row.acceptance == 1">
                <button
                  type="button"
                  @click="create(props.row.control_number)"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                  <div class="flex">
                    <i class="fas fa-pencil text-xs"></i
                    ><span class="ml-1">CAFOA</span>
                  </div>
                </button>
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
          <span v-else-if="props.column.field == 'amount'" class="text-right">
            {{ props.row.amount }}
          </span>
          <span v-else>
            {{ props.formattedRow[props.column.field] }}
          </span>
        </template>
      </vue-good-table>
    </div>
    <div class="w-full my-5">
      <hr class="my-1 order-4 border-slate-600 border-2" />
    </div>
  </div>
</template>
<script>
import CardNoteField from '@/components/Cards/CardNoteField.vue'
import status from '/mixins/data/status.js'
export default {
  components: { CardNoteField },
  props: [
    'totalRecords_budget',
    'columns_budget',
    'rows_budget',
    'items',
    'itemsFor',
  ],
  mixins: [status],
  data: () => ({
    selected_budget: [],
    budget_status: 11,
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
  }),
  methods: {
    onPageChange_budget(params) {
      this.$emit('on-page-change', params)
    },
    onSearch_budget(params) {
      this.$emit('on-search', params)
    },
    onPerPageChange_budget(params) {
      this.$emit('on-per-page-change', params)
    },
    onSortChange_budget(params) {
      this.$emit('on-sort-change', params)
    },
    create(controlNo) {
      this.$emit('create', controlNo)
    },
    manage_accept_transmittal(index, status) {
      this.$emit('manage-accept-transmittal', index, status)
    },
    OnSelectedRows_budget() {
      this.selected_budget = this.$refs['budget'].selectedRows
    },
    accept_budget() {
      this.$emit('accept-budget', this.$refs['budget'].selectedRows)
    },
    budgetTransmit() {
      this.$emit(
        'transmit-budget-dashboard',
        this.$refs['budget'].selectedRows,
        this.generateFormStatus(this.budget_status, this.officeStatus)
      )
    },
    // view_note(ctrl_number) {
    //   console.log(ctrl_number)
    //   this.$emit('view-note', ctrl_number)
    // },
    addNote(controlNo) {
      this.$emit('add-note', controlNo)
    },
    ViewNote(ctrl_number) {
      this.$emit('view-note', ctrl_number)
    },
    selectTransmittalOffice() {
      this.office_statuses = this.transmittal_offices.filter((office) => {
        return this.budget_status === office.id
      })
      this.office_statuses = this.office_statuses[0]
      this.officeStatus = 1
    },
  },
}
</script>
