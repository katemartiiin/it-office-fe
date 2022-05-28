<template>
  <div class="py-10 px-3">
    <div v-if="roleId != 1">
      <h1 class="text-xl font-bold">Pending {{ items }} for {{ itemsFor }}s</h1>
      <div class="block w-full overflow-x-auto mt-5">
        <vue-good-table
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
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
              <div class="flex flex-wrap grid grid-cols-2 gap-2">
                <div class="pr-3">
                  <button
                    type="button"
                    @click="
                      create(
                        roleId == 4 ? props.row.control_number : props.row.id
                      )
                    "
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >
                    Create {{ itemsFor }}
                  </button>
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div v-else>
      <AdminTable
        :cafoa="cafoa"
        :cafoaTotal="cafoaTotal"
        :requests="requests"
        :requestsTotal="requestsTotal"
      />
    </div>
  </div>
</template>
<script>
import const_roles from '~/mixins/constants/roles.js'
import AdminTable from '@/components/AdminTable.vue'
export default {
  async created() {
    console.log(const_roles.ADMIN)
  },
  head() {
    return {
      title: 'Dashboard',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  components: {
    AdminTable,
  },
  data: () => ({
    originalIndex: -1,
    currentIndex: -1,
    isActive: false,
    isLoading: false,
    columns: [
      {
        label: 'Control No.',
        field: 'control_number',
      },
      {
        label: 'Status',
        field: 'status',
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
    roleId: null,
    items: 'Requests',
    itemsFor: 'CAFOA',
    redirect: null,

    cafoa: [],
    cafoaTotal: 0,
    requests: [],
    requestsTotal: 0,
  }),
  middleware: 'auth',
  layout: 'admin',
  mounted() {
    // this.$auth.strategy.refreshToken.get()
    this.roleId = this.$auth.$state.user['role']

    if (this.roleId == 4) {
      this.items = 'Requests'
      this.itemsFor = 'CAFOA'
    } else if (this.roleId == 6) {
      this.items = 'CAFOA'
      this.itemsFor = 'Voucher'
    }

    this.fetchItems()
  },
  async created() {
    await this.$axios.$get('/sanctum/csrf-cookie')
  },
  methods: {
    async fetchItems() {
      this.$axios
        .$post('/api/dashboard/pending', {
          roleId: this.roleId,
        })
        .then((response) => {
          if (this.roleId != 1) {
            this.totalRecords = response.totalRecords
            var data = []

            for (const i in response.data) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                status: response.data[i].statusLabel,
              })
            }

            this.rows = data
          } else {
            this.adminItems(response)
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    adminItems(response) {
      this.cafoaTotal = response.cafoaTotal
      var data = []

      for (const i in response.cafoa) {
        data.push({
          id: response.cafoa[i].id,
          control_number: response.cafoa[i].control_number,
          status: response.cafoa[i].statusLabel,
        })
      }

      this.cafoa = data

      this.requestsTotal = response.requestsTotal
      data = []

      for (const i in response.requests) {
        data.push({
          id: response.requests[i].id,
          control_number: response.requests[i].control_number,
          status: response.requests[i].statusLabel,
        })
      }

      this.requests = data
    },

    create(controlNo) {
      window.localStorage.setItem('controlNumber', JSON.stringify(controlNo))
      if (this.roleId == const_roles.BUDGET) {
        // window.location.href = '/forms/cafoa/create'
        this.$router.push('/forms/cafoa/create')
      } else if (this.roleId == const_roles.ACCOUNTING) {
        this.$router.push('/forms/disbursement/' + controlNo)
        // window.location.href = '/forms/disbursement/' + controlNo
      }
    },
  },
}
</script>
