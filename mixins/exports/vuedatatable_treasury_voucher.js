export const treasury_exports_voucher = {
  data: () => ({
    serverParams_treasury_voucher: {
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
    columns_treasury_voucher: [
      {
        label: 'Request ID.',
        field: 'id',
      },
      {
        label: 'Control No.',
        field: 'control_no',
      },
      {
        label: 'Name',
        field: 'payee',
      },
      {
        label: 'Amount',
        field: 'particulars_amount',
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
    rows_treasury_voucher: [],
    totalRecords_treasury_voucher: 0,
  }),
  methods: {
    updateParams_treasury_voucher(newProps) {
      this.serverParams_treasury_voucher = Object.assign(
        {},
        this.serverParams_treasury_voucher,
        newProps
      )
    },

    onPageChange_treasury_voucher(params) {
      this.updateParams_treasury_voucher({ page: params.currentPage })
      this.loadItems_treasury_voucher()
    },

    onPerPageChange_treasury_voucher(params) {
      this.updateParams_treasury_voucher({ perPage: params.currentPerPage })
      this.loadItems_treasury_voucher()
    },

    onSortChange_treasury_voucher(params) {
      this.updateParams_treasury_voucher({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_treasury_voucher()
    },

    onColumnFilter_treasury_voucher(params) {
      this.updateParams_treasury_voucher(params)
      this.loadItems_treasury_voucher()
    },

    onSearch_treasury_voucher(params) {
      this.updateParams_treasury_voucher({ searchTerm: params.searchTerm })
      this.loadItems_treasury_voucher()
    },
  },
}
