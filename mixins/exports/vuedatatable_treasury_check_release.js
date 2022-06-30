export const treasury_exports_check_release = {
    data: () => ({
      serverParams_treasury_check_release: {
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
      columns_treasury_check_release: [
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
          label: 'Action',
          field: 'action',
        },
      ],
      rows_treasury_check_release: [],
      totalRecords_treasury_check_release: 0,
    }),
    methods: {
      updateParams_treasury_check_release(newProps) {
        this.serverParams_treasury_check_release = Object.assign(
          {},
          this.serverParams_treasury_check_release,
          newProps
        )
      },
  
      onPageChange_treasury_check_release(params) {
        this.updateParams_treasury_check_release({ page: params.currentPage })
        this.loadItems_treasury_check_release()
      },
  
      onPerPageChange_treasury_check_release(params) {
        this.updateParams_treasury_check_release({ perPage: params.currentPerPage })
        this.loadItems_treasury_check_release()
      },
  
      onSortChange_treasury_check_release(params) {
        this.updateParams_treasury_check_release({
          sort: [
            {
              type: params[0].type,
              field: params[0].field,
            },
          ],
        })
        this.loadItems_treasury_check_release()
      },
  
      onColumnFilter_treasury_check_release(params) {
        this.updateParams_treasury_check_release(params)
        this.loadItems_treasury_check_release()
      },
  
      onSearch_treasury_check_release(params) {
        this.updateParams_treasury_check_release({ searchTerm: params.searchTerm })
        this.loadItems_treasury_check_release()
      },
    },
  }
  