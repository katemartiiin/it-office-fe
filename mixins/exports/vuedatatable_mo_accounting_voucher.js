export const exports_mo_accounting_voucher = {
  data: () => ({
    serverParams_mo_accounting_voucher: {
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
    columns_mo_accounting_voucher: [
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
        label: 'Date / Time ',
        field: 'updated',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_mo_accounting_voucher: [],
    totalRecords_mo_accounting_voucher: 0,
  }),
  methods: {
    updateParams_mo_accounting_voucher(newProps) {
      this.serverParams_mo_accounting_voucher = Object.assign(
        {},
        this.serverParams_mo_accounting_voucher,
        newProps
      )
    },

    onPageChange_mo_accounting_voucher(params) {
      this.updateParams_mo_accounting_voucher({ page: params.currentPage })
      this.loadItems_mo_accounting_voucher()
    },

    onPerPageChange_mo_accounting_voucher(params) {
      this.updateParams_mo_accounting_voucher({
        perPage: params.currentPerPage,
      })
      this.loadItems_mo_accounting_voucher()
    },

    onSortChange_mo_accounting_voucher(params) {
      this.updateParams_mo_accounting_voucher({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_mo_accounting_voucher()
    },

    onColumnFilter_mo_accounting_voucher(params) {
      this.updateParams_mo_accounting_voucher(params)
      this.loadItems_mo_accounting_voucher()
    },

    onSearch_mo_accounting_voucher(params) {
      this.updateParams_mo_accounting_voucher({ searchTerm: params.searchTerm })
      this.loadItems_mo_accounting_voucher()
    },
  },
}
