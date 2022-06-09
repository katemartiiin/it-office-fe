export const exports_budget = {
  data: () => ({
    serverParams_budget: {
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
    columns_budget: [
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Citizens Name',
        field: 'citizen_name',
      },
      {
        label: 'Request Type',
        field: 'typeofrequest',
      },
      {
        label: 'Status',
        field: 'status',
      },
      {
        label: 'Request Date',
        field: 'requestdate',
      },
      {
        label: 'Date / Time ',
        field: 'created',
      },
      {
        label: 'Action',
        field: 'action',
        sortable: false,
      },
    ],
    rows_budget: [],
    totalRecords_budget: 0,
  }),
  methods: {
    updateParams_budget(newProps) {
      this.serverParams_budget = Object.assign(
        {},
        this.serverParams_budget,
        newProps
      )
    },

    onPageChange_budget(params) {
      this.updateParams_budget({ page: params.currentPage })
      this.loadItems_budget()
    },

    onPerPageChange_budget(params) {
      this.updateParams_budget({ perPage: params.currentPerPage })
      this.loadItems_budget()
    },

    onSortChange_budget(params) {
      this.updateParams_budget({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_budget()
    },

    onColumnFilter_budget(params) {
      this.updateParams_budget(params)
      this.loadItems_budget()
    },

    onSearch_budget(params) {
      this.updateParams_budget({ searchTerm: params.searchTerm })
      this.loadItems_budget()
    },
  },
}
