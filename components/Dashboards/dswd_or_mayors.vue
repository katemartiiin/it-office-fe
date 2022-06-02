<template>
  <div>
    <h2 class="text-xl font-bold py-5">DSWD/ MAYORS Department Dashboard</h2>

    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">
            Approved Form Requests
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
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
    <div class="w-full my-5">
      <hr class="my-1 order-4 border-slate-600 border-2" />
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
