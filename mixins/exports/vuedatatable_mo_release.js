export const exports_mo_release = {
  data: () => ({
    serverParams_mo_release: {
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
    columns_mo_release: [
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
    rows_mo_release: [],
    totalRecords_mo_release: 0,
  }),
  methods: {
    updateParams_mo_release(newProps) {
      this.serverParams_mo_release = Object.assign(
        {},
        this.serverParams_mo_release,
        newProps
      )
    },

    onPageChange_mo_release(params) {
      this.updateParams_mo_release({ page: params.currentPage })
      this.loadItems_mo_release()
    },

    onPerPageChange_mo_release(params) {
      this.updateParams_mo_release({ perPage: params.currentPerPage })
      this.loadItems_mo_release()
    },

    onSortChange_mo_release(params) {
      this.updateParams_mo_release({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems_mo_release()
    },

    onColumnFilter_mo_release(params) {
      this.updateParams_mo_release(params)
      this.loadItems_mo_release()
    },

    onSearch_mo_release(params) {
      this.updateParams_mo_release({ searchTerm: params.searchTerm })
      this.loadItems_mo_release()
    },
  },
}
