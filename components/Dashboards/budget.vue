<template>
  <div>
    <h1 class="text-xl font-bold">Pending {{ items }} for {{ itemsFor }}s</h1>
    <div class="block w-full overflow-x-auto mt-5">
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
                  Create {{ itemsFor }}
                </button>
              </div>
            </div>
          </span>
        </template>
      </vue-good-table>
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
