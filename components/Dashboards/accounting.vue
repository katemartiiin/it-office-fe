<template>
  <div>
    <h2 class="py-5 text-xl font-bold">Accounting Department Dashboard</h2>
    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">
            Pending Cafoa Certifications
          </h3>
        </div>
      </div>
    </div>

    <div class="pb-10">
      <vue-good-table
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
    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">
            Accounting Voucher Check Validation
          </h3>
        </div>
      </div>
    </div>

    <div >
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
    <div class="w-full my-5">
      <hr class="my-1 order-4 border-slate-600 border-2" />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'items',
    'itemsFor',
    'columns_accounting_cafoa',
    'rows_accounting_cafoa',
    'totalRecords_accounting_cafoa',

    'totalRecords_accounting_voucher',
    'columns_accounting_voucher',
    'rows_accounting_voucher',
  ],

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
  },
}
</script>
