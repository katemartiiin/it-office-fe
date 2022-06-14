<template>
  <div>
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
    <div class="block w-full overflow-x-auto">
      <vue-good-table
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
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <div class="flex flex-wrap grid grid-cols-2 gap-2">
              <div class="pr-3">
                <button
                  type="button"
                  @click="create(props.row.control_number)"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                  Edit {{ itemsFor }}
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
    'totalRecords_budget',
    'columns_budget',
    'rows_budget',
    'items',
    'itemsFor',
  ],
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
  },
}
</script>
