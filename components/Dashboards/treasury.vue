<template>
  <div>
    <!-- table 1 -->
    <div>
      <div class="float-right">
        <button
          v-if="selected_treasury_0.length > 0"
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          @click.prevent="accept_treasury_0()"
        >
          Accept Selected
        </button>
        <button
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click.prevent="tx_cafoa_to_accounting()"
        >
          Transmit to Accounting
        </button>
      </div>

      <h2 class="text-xl font-bold py-5">
        Treasury Department Dashboard Cafoa
      </h2>
      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">
              Cafoa Pending List of Certifications
            </h3>
          </div>
        </div>
      </div>

      <div class="pb-5">
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_0"
          id="cafoa_budget"
          ref="cafoa_budget"
          mode="remote"
          :pagination-options="{
            enabled: true,
          }"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          @on-page-change="onPageChange_treasury_cafoa(...arguments)"
          @on-search="onSearch_treasury_cafoa(...arguments)"
          @on-per-page-change="onPerPageChange_treasury_cafoa(...arguments)"
          @on-sort-change="onSortChange_treasury_cafoa(...arguments)"
          :columns="columns_treasury_cafoa"
          :rows="rows_treasury_cafoa"
          :line-numbers="true"
          :totalRows="totalRecords_treasury_cafoa"
          :select-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <div class="p-1" v-if="props.row.treasury_status == 1">
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
                <!-- <div class="p-1" v-if="props.row.treasury_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    title="Edit"
                    v-on:click="
                      manageTreasuryStatus(props.row.originalIndex, 'submit')
                    "
                  >
                    Submit to Accounting Department
                  </button>
                </div> -->
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 2 -->
    <div>
      <div class="float-right">
        <button
          v-if="selected_treasury_1.length > 0"
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          @click.prevent="accept_treasury_1()"
        >
          Accept Selected
        </button>
        <button
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click.prevent="tx_voucher_treasury_to_accounting()"
        >
          Transmit to Accounting
        </button>
      </div>

      <h2 class="text-xl font-bold py-5">Treasury Department Voucher</h2>
      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">
              Voucher Pending List for Bank check Certifications
            </h3>
          </div>
        </div>
      </div>

      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_1"
          id="voucher_budget"
          ref="voucher_budget"
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
          :select-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <div class="p-1" v-if="props.row.treasury_status == 1">
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
                <!-- <div class="p-1" v-if="props.row.treasury_status == 1">
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
                </div> -->
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 3 -->

    <div class="my-2">
      <div class="float-right">
        <button
          v-if="selected_treasury_2.length > 0"
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          @click.prevent="accept_treasury_2()"
        >
          Accept Selected
        </button>
        <button
          class="mx-2  space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click.prevent="tx_voucher_treasury_to_mayors()"
        >
          Transmit to Mayors for Check
        </button>
      </div>

      <h2 class="text-xl font-bold py-5">Treasury Department Check Signing</h2>
      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">Check Signing</h3>
          </div>
        </div>
      </div>

      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_2"
          id="voucher_treasury_to_mo"
          ref="voucher_treasury_to_mo"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :pagination-options="{
            enabled: true,
          }"
          @on-page-change="onPageChange_treasury_mo_voucher"
          @on-search="onSearch_treasury_mo_voucher"
          @on-per-page-change="onPerPageChange_treasury_mo_voucher"
          @on-sort-change="onSortChange_treasury_mo_voucher"
          mode="remote"
          :totalRows="totalRecords_treasury_mo_voucher"
          :columns="columns_treasury_mo_voucher"
          :rows="rows_treasury_mo_voucher"
          :line-numbers="true"
          :select-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <div class="p-1" v-if="props.row.treasury_mo_status == 1">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="addNote(props.row.cafoa_id)"
                  >
                    Add Note
                  </button>
                </div>
                <div class="p-1" v-if="props.row.treasury_mo_status == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasuryMoStatus_voucher(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Acceptance
                  </button>
                </div>
                <!-- <div class="p-1" v-if="props.row.treasury_mo_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    title="Edit"
                    v-on:click="
                      manageTreasuryMoStatus_voucher(
                        props.row.originalIndex,
                        'submit'
                      )
                    "
                  >
                    Submit to Mayors for awarding
                  </button>
                </div> -->
              </div>
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
export default {
  props: [
    'columns_treasury_cafoa',
    'rows_treasury_cafoa',
    'totalRecords_treasury_cafoa',

    'totalRecords_treasury_voucher',
    'columns_treasury_voucher',
    'rows_treasury_voucher',

    'totalRecords_treasury_mo_voucher',
    'columns_treasury_mo_voucher',
    'rows_treasury_mo_voucher',
  ],
  data: () => ({
    selected_treasury_0: [],
    selected_treasury_1: [],
    selected_treasury_2: [],
  }),
  mounted() {},
  methods: {
    // 1
    onPageChange_treasury_cafoa(params) {
      this.$emit('on-page-change-treasury-cafoa', params)
    },
    onSearch_treasury_cafoa(params) {
      this.$emit('on-search-treasury-cafoa', params)
    },
    onPerPageChange_treasury_cafoa(params) {
      this.$emit('on-per-page-change-treasury-cafoa', params)
    },
    onSortChange_treasury_cafoa(params) {
      this.$emit('on-sort-change-treasury-cafoa', params)
    },
    addNote(controlNo) {
      this.$emit('add-note-treasury-cafoa', controlNo)
    },
    manageTreasuryStatus(index, status) {
      this.$emit('manage-treasury-status', index, status)
    },
    // 2
    onPageChange_treasury_voucher(params) {
      this.$emit('on-page-change-treasury-voucher', params)
    },
    onSearch_treasury_voucher(params) {
      this.$emit('on-search-treasury-voucher', params)
    },
    onPerPageChange_treasury_voucher(params) {
      this.$emit('on-per-page-change-treasury-voucher', params)
    },
    onSortChange_treasury_voucher(params) {
      this.$emit('on-sort-change-treasury-voucher', params)
    },
    manageTreasuryStatus_voucher(id, status) {
      this.$emit('manage-treasurystatus-voucher', id, status)
    },
    tx_cafoa_to_accounting() {
      this.$emit(
        'transmit-cafoa-to-accounting',
        this.$refs['cafoa_budget'].selectedRows
      )
    },
    tx_voucher_treasury_to_accounting() {
      this.$emit(
        'transmit-voucher-treasury-to-accounting',
        this.$refs['voucher_budget'].selectedRows
      )
    },

    onPageChange_treasury_mo_voucher(params) {
      this.$emit('on-page-change-treasury-mo-voucher', params)
    },
    onSearch_treasury_mo_voucher(params) {
      this.$emit('on-search-treasury-mo-voucher', params)
    },
    onPerPageChange_treasury_mo_voucher(params) {
      this.$emit('on-per-page-change-treasury-mo-voucher', params)
    },
    onSortChange_treasury_mo_voucher(params) {
      this.$emit('on-sort-change-treasury-mo-voucher', params)
    },
    manageTreasuryMoStatus_voucher(id, status) {
      this.$emit('manage-treasurymostatus-voucher', id, status)
    },
    tx_voucher_treasury_to_mayors() {
      this.$emit(
        'transmit-voucher-treasury-to-mayors',
        this.$refs['voucher_treasury_to_mo'].selectedRows
      )
    },

    OnSelectedRows_treasury_0() {
      this.selected_treasury_0 = this.$refs['cafoa_budget'].selectedRows
    },

    OnSelectedRows_treasury_1() {
      this.selected_treasury_1 = this.$refs['voucher_budget'].selectedRows
    },

    OnSelectedRows_treasury_2() {
      this.selected_treasury_2 =
        this.$refs['voucher_treasury_to_mo'].selectedRows
    },
    accept_treasury_0() {
      this.$emit('accept-treasury-0', this.$refs['cafoa_budget'].selectedRows)
    },
    accept_treasury_1() {
      this.$emit('accept-treasury-1', this.$refs['voucher_budget'].selectedRows)
    },
    accept_treasury_2() {
      this.$emit(
        'accept-treasury-2',
        this.$refs['voucher_treasury_to_mo'].selectedRows
      )
    },
  },
}
</script>
