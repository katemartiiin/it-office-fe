export const accounting_exports_voucher = {
  data: () => ({
    serverParams_accounting_voucher: {
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
    columns_accounting_voucher: [
      {
        label: 'Request ID.',
        field: 'id',
      },
      {
        label: 'Control No.',
        field: 'cafoa_id',
      },
      {
        label: 'Name',
        field: 'payee',
      },
      {
        label: 'Date / Time ',
        field: 'updated',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_accounting_voucher: [],
    totalRecords_accounting_voucher: 0,
  }),
  methods: {
    updateParams_accounting_voucher(newProps) {
      this.serverParams_accounting_voucher = Object.assign(
        {},
        this.serverParams_accounting_voucher,
        newProps
      )
    },

    onPageChange_accounting_voucher(params) {
      this.updateParams_accounting_voucher({ page: params.currentPage })
      this.loadItems_accounting_voucher()
    },

    onPerPageChange_accounting_voucher(params) {
      this.updateParams_accounting_voucher({ perPage: params.currentPerPage })
      this.loadItems_accounting_voucher()
    },

    onSortChange_accounting_voucher(params) {
      this.updateParams_accounting_voucher({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_accounting_voucher()
    },

    onColumnFilter_accounting_voucher(params) {
      this.updateParams_accounting_voucher(params)
      this.loadItems_accounting_voucher()
    },

    onSearch_accounting_voucher(params) {
      this.updateParams_accounting_voucher({ searchTerm: params.searchTerm })
      this.loadItems_accounting_voucher()
    },
  },
}
