export const treasury_exports_cafoa = {
  data: () => ({
    serverParams_treasury_cafoa: {
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
    columns_treasury_cafoa: [
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
        label: 'Request',
        field: 'request',
      },
      {
        label: 'Date / Time',
        field: 'created',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_treasury_cafoa: [],
    totalRecords_treasury_cafoa: 0,
  }),
  methods: {
    updateParams_treasury_cafoa(newProps) {
      this.serverParams_treasury_cafoa = Object.assign(
        {},
        this.serverParams_treasury_cafoa,
        newProps
      )
    },

    onPageChange_treasury_cafoa(params) {
      this.updateParams_treasury_cafoa({ page: params.currentPage })
      this.loadItems_treasury_cafoa()
    },

    onPerPageChange_treasury_cafoa(params) {
      this.updateParams_treasury_cafoa({ perPage: params.currentPerPage })
      this.loadItems_treasury_cafoa()
    },

    onSortChange_treasury_cafoa(params) {
      this.updateParams_treasury_cafoa({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_treasury_cafoa()
    },

    onColumnFilter_treasury_cafoa(params) {
      this.updateParams_treasury_cafoa(params)
      this.loadItems_treasury_cafoa()
    },

    onSearch_treasury_cafoa(params) {
      this.updateParams_treasury_cafoa({ searchTerm: params.searchTerm })
      this.loadItems_treasury_cafoa()
    },
  },
}
