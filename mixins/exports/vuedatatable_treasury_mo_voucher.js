export const treasury_mo_exports_voucher = {
  data: () => ({
    serverParams_treasury_mo_voucher: {
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
    columns_treasury_mo_voucher: [
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
        label: 'Amount',
        field: 'particulars_amount',
      },
      {
        label: 'Description',
        field: 'particulars_description',
      },
      {
        label: 'Date / Time',
        field: 'updated',
      },
      {
        label: 'Notes',
        field: 'note',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_treasury_mo_voucher: [],
    totalRecords_treasury_mo_voucher: 0,
  }),
  methods: {
    updateParams_treasury_mo_voucher(newProps) {
      this.serverParams_treasury_mo_voucher = Object.assign(
        {},
        this.serverParams_treasury_mo_voucher,
        newProps
      )
    },

    onPageChange_treasury_mo_voucher(params) {
      this.updateParams_treasury_mo_voucher({ page: params.currentPage })
      this.loadItems_treasury_mo_voucher()
    },

    onPerPageChange_treasury_mo_voucher(params) {
      this.updateParams_treasury_mo_voucher({ perPage: params.currentPerPage })
      this.loadItems_treasury_mo_voucher()
    },

    onSortChange_treasury_mo_voucher(params) {
      this.updateParams_treasury_mo_voucher({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_treasury_mo_voucher()
    },

    onColumnFilter_treasury_mo_voucher(params) {
      this.updateParams_treasury_mo_voucher(params)
      this.loadItems_treasury_mo_voucher()
    },

    onSearch_treasury_mo_voucher(params) {
      this.updateParams_treasury_mo_voucher({ searchTerm: params.searchTerm })
      this.loadItems_treasury_mo_voucher()
    },
  },
}
