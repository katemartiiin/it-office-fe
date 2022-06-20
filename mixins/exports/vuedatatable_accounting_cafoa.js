export const accounting_exports_cafoa = {
  data: () => ({
    serverParams_accounting_cafoa: {
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
    columns_accounting_cafoa: [
      {
        label: 'Request ID.',
        field: 'id',
      },
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Name',
        field: 'payee',
      },
      {
        label: 'Date / Time',
        field: 'updated',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_accounting_cafoa: [],
    totalRecords_accounting_cafoa: 0,
  }),
  methods: {
    updateParams_accounting_cafoa(newProps) {
      this.serverParams_accounting_cafoa = Object.assign(
        {},
        this.serverParams_accounting_cafoa,
        newProps
      )
    },

    onPageChange_accounting_cafoa(params) {
      this.updateParams_accounting_cafoa({ page: params.currentPage })
      this.loadItems_accounting_cafoa()
    },

    onPerPageChange_accounting_cafoa(params) {
      this.updateParams_accounting_cafoa({ perPage: params.currentPerPage })
      this.loadItems_accounting_cafoa()
    },

    onSortChange_accounting_cafoa(params) {
      this.updateParams_accounting_cafoa({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_accounting_cafoa()
    },

    onColumnFilter_accounting_cafoa(params) {
      this.updateParams_accounting_cafoa(params)
      this.loadItems_accounting_cafoa()
    },

    onSearch_accounting_cafoa(params) {
      this.updateParams_accounting_cafoa({ searchTerm: params.searchTerm })
      this.loadItems_accounting_cafoa()
    },
  },
}
