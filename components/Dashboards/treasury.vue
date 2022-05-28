<template>
  <div>
    <h1 class="text-xl font-bold py-5">Treasury Dashboard</h1>
    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">
            Cafoa Pending List of Certifications
          </h3>
        </div>
      </div>
    </div>

    <div class="">
      <vue-good-table
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        mode="remote"
        :totalRows="totalRecords_cafoa"
        :pagination-options="{
          enabled: true,
        }"
        :columns="columns_cafoa"
        :rows="rows_cafoa"
        :line-numbers="true"
      >
      </vue-good-table>
    </div>
    <br />
    <br />
    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">
            Voucher Pending List for Bank check Certifications
          </h3>
        </div>
      </div>
    </div>
    <div class="">
      <vue-good-table
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        mode="remote"
        :totalRows="totalRecords_voucher"
        :pagination-options="{
          enabled: true,
        }"
        :columns="columns_cafoa"
        :rows="rows"
        :line-numbers="true"
      >
      </vue-good-table>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showmodal', 'type', 'action', 'cancel'],
  data: () => ({
    serverParams_cafoa: {
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
    serverParams_voucher: {
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
    columns_cafoa: [
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Request',
        field: 'request',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    columns_voucher: [
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Name',
        field: 'name',
      },
      {
        label: 'Request',
        field: 'request',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_cafoa: [],
    rows_voucher: [],
    totalRecords_cafoa: 0,
    totalRecords_voucher: 0,
  }),
  mounted() {
    this.loadItems()
  },
  methods: {
    loadItems() {
      this.$emit('load_cafoa')
    },
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems()
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },

    onSearch(params) {
      this.updateParams({ searchTerm: params.searchTerm })
      this.loadItems()
    },
  },
}
</script>
