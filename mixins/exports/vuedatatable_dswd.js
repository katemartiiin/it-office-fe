export const exports_dswd = {
  data: () => ({
    serverParams_dswd: {
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
    columns_dswd: [
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
        field: 'created',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_dswd: [],
    totalRecords_dswd: 0,
  }),
  methods: {
    updateParams_dswd(newProps) {
      this.serverParams_dswd = Object.assign(
        {},
        this.serverParams_dswd,
        newProps
      )
    },

    onPageChange_dswd(params) {
      this.updateParams_dswd({ page: params.currentPage })
      this.loadItems_dswd()
    },

    onPerPageChange_dswd(params) {
      this.updateParams_dswd({ perPage: params.currentPerPage })
      this.loadItems_dswd()
    },

    onSortChange_dswd(params) {
      this.updateParams_dswd({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_dswd()
    },

    onColumnFilter_dswd(params) {
      this.updateParams_dswd(params)
      this.loadItems_dswd()
    },

    onSearch_dswd(params) {
      this.updateParams_dswd({ searchTerm: params.searchTerm })
      this.loadItems_dswd()
    },
  },
}
