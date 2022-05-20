<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div class="w-full">
        <NuxtLink
          to="/forms/cafoa/create"
          class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Create Request
        </NuxtLink>
      </div>

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Requests</h3>
            </div>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <vue-good-table
            mode="remote"
            @on-page-change="onPageChange"
            @on-per-page-change="onPerPageChange"
            @on-sort-change="onSortChange"
            :totalRows="totalRecords"
            :pagination-options="{
              enabled: true,
            }"
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <!-- {{ props.row }} -->
                <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/cafoa/' + props.row.id"
                  class="text-xs bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-eye"></i
                ></NuxtLink>

                <a
                  @click.prevent="downloadpdf(props.row.id)"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                >
                  <i class="fas fa-print"></i>
                </a>

                <!-- <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/cafoa/' + props.row.id"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  ><i class="fas fa-print"></i
                ></NuxtLink> -->
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      originalIndex: -1,
      delete_id: false,
      showModal: false,

      currentIndex: -1,
      isActive: false,

      error: '',

      isLoading: false,
      columns: [
        {
          label: 'CAFOA No.',
          field: 'id',
        },
        {
          label: 'Request',
          field: 'request',
        },
        {
          label: 'Payee',
          field: 'payee',
        },

        {
          label: 'Approved Amount',
          field: 'approved_amount',
        },
        {
          label: 'Requesting Official',
          field: 'requesting_official',
        },
        {
          label: 'Action',
          field: 'action',
          sortable: false,
        },
      ],
      rows: [],
      totalRecords: 0,
      serverParams: {
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
    }
  },
  created() {
    this.requests = []
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$get('/api/cafoa/fetch', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              request: response.data[i].request,
              payee: response.data[i].payee,
              approved_amount: response.data[i].approved_amount,
              requesting_official: response.data[i].requesting_official,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },

    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems()
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },

    async downloadpdf(id) {
      this.$toast.success('Processing')
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      try {
        this.$axios
          .$post(`api/pdf/cafoa/${id}`)
          .then((res) => {
            const url = this.$config.api + '/download/' + res.path
            window.location.href = url
          })
          .catch((error) => {})
          .finally(() => {})
        this.$toast.success('Done.')
      } catch (error) {
        this.$toast.error('Failed.')
      }
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
