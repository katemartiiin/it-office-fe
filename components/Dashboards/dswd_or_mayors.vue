<template>
  <div>
    <h2 class="text-xl font-bold">Approved Form Requests</h2>
    <div class="block w-full overflow-x-auto mt-5">
      <vue-good-table
        @on-page-change="onPageChange_dswd"
        @on-search="onSearch_dswd"
        @on-per-page-change="onPerPageChange_dswd"
        @on-sort-change="onSortChange_dswd"
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        mode="remote"
        :totalRows="totalRecords_dswd"
        :pagination-options="{
          enabled: true,
        }"
        :columns="columns_dswd"
        :rows="rows_dswd"
        :line-numbers="true"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <div class="p-1">
              <NuxtLink
                :to="'/forms/requests/' + props.row.id"
                class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                title="View"
              >
                <i class="fas fa-eye"></i>
              </NuxtLink>
            </div>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['columns_dswd', 'rows_dswd', 'totalRecords_dswd'],
  data: () => ({}),
  mounted() {},
  methods: {
    onPageChange_dswd(params) {
      this.$emit('on-page-change-dswd', params)
    },
    onSearch_dswd(params) {
      this.$emit('on-search-dswd', params)
    },
    onPerPageChange_dswd(params) {
      this.$emit('on-per-page-dswd', params)
    },
    onSortChange_dswd(params) {
      this.$emit('on-sort-change-dswd', params)
    },
  },
}
</script>
