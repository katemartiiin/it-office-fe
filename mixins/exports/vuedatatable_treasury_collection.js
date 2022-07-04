export const treasury_collection_voucher = {
  data: () => ({
    serverParams_treasury_collection: {
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
    columns_treasury_collection: [
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
    rows_treasury_collection: [],
    totalRecords_treasury_collection: 0,
  }),
  methods: {
    updateParams_treasury_collection(newProps) {
      this.serverParams_treasury_collection = Object.assign(
        {},
        this.serverParams_treasury_collection,
        newProps
      )
    },

    onPageChange_treasury_collection(params) {
      this.updateParams_treasury_collection({ page: params.currentPage })
      this.loadItems_treasury_collection()
    },

    onPerPageChange_treasury_collection(params) {
      this.updateParams_treasury_collection({ perPage: params.currentPerPage })
      this.loadItems_treasury_collection()
    },

    onSortChange_treasury_collection(params) {
      this.updateParams_treasury_collection({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_treasury_collection()
    },

    onColumnFilter_treasury_collection(params) {
      this.updateParams_treasury_collection(params)
      this.loadItems_treasury_collection()
    },

    onSearch_treasury_collection(params) {
      this.updateParams_treasury_collection({ searchTerm: params.searchTerm })
      this.loadItems_treasury_collection()
    },
  },
}
