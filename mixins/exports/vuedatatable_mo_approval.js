export const exports_mayors_approval = {
  data: () => ({
    serverParams_mayors_approval: {
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
    columns_mayors_approval: [
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
        field: 'typeofrequest',
      },
      {
        label: 'Requested Amount',
        field: 'requestamount',
      },
      {
        label: 'Approved Amount',
        field: 'approved_amount',
      },
      {
        label: 'Date / Time',
        field: 'updated',
      },
      // {
      //   label: 'Views',
      //   field: 'view',
      // },
      {
        label: 'Notes',
        field: 'note',
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows_mayors_approval: [],
    totalRecords_mayors_approval: 0,
  }),
  methods: {
    updateParams_mayors_approval(newProps) {
      this.serverParams_mayors_approval = Object.assign(
        {},
        this.serverParams_mayors_approval,
        newProps
      )
    },

    onPageChange_mayors_approval(params) {
      this.updateParams_mayors_approval({ page: params.currentPage })
      this.loadItems_mayors_approval()
    },

    onPerPageChange_mayors_approval(params) {
      this.updateParams_mayors_approval({ perPage: params.currentPerPage })
      this.loadItems_mayors_approval()
    },

    onSortChange_mayors_approval(params) {
      this.updateParams_mayors_approval({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_mayors_approval()
    },

    onColumnFilter_mayors_approval(params) {
      this.updateParams_mayors_approval(params)
      this.loadItems_mayors_approval()
    },

    onSearch_mayors_approval(params) {
      this.updateParams_mayors_approval({ searchTerm: params.searchTerm })
      this.loadItems_mayors_approval()
    },
  },
}
