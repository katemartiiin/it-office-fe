export const exports_award = {
  data: () => ({
    serverParams_award: {
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
    columns_award: [
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
        label: 'Request',
        field: 'requestType',
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
    rows_award: [],
    totalRecords_award: 0,
  }),
  methods: {
    updateParams_award(newProps) {
      this.serverParams_award = Object.assign(
        {},
        this.serverParams_award,
        newProps
      )
    },

    onPageChange_award(params) {
      this.updateParams_award({ page: params.currentPage })
      this.loadItems_award()
    },

    onPerPageChange_award(params) {
      this.updateParams_award({ perPage: params.currentPerPage })
      this.loadItems_award()
    },

    onSortChange_award(params) {
      this.updateParams_award({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_award()
    },

    onColumnFilter_award(params) {
      this.updateParams_award(params)
      this.loadItems_award()
    },

    onSearch_award(params) {
      this.updateParams_award({ searchTerm: params.searchTerm })
      this.loadItems_award()
    },
  },
}
