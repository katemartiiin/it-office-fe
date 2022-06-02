<template>
  <div>
    <h2 class="text-xl font-bold py-5">Treasury Department Dashboard</h2>
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
  ],
  data: () => ({}),
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
  },
}
</script>
