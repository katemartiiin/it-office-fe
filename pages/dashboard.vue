<template>
  <div class="py-10 px-3">
    <h1 class="text-xl font-bold">Pending {{ items }} for {{ itemsFor }}s</h1>
    <div class="block w-full overflow-x-auto mt-5">
      <vue-good-table
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        mode="remote"
        @on-page-change="onPageChange"
        @on-search="onSearch"
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
            <div class="flex flex-wrap grid grid-cols-2 gap-2">
              <div class="pr-3">
                <button
                  type="button"
                  @click="create(roleId == 4 ? props.row.control_number : props.row.id)"
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  >Create {{ itemsFor }}</button>
              </div>
            </div>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>
<script>
export default {
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
  }),
  middleware: 'auth',

  layout: 'admin',

  mounted() {
    this.roleId = this.$auth.$state.user['role'];

    if (this.roleId == 4) {
      this.items = 'Requests';
      this.itemsFor = 'CAFOA';
    } else if (this.roleId == 6) {
      this.items = 'CAFOA';
      this.itemsFor = 'Voucher';
    }
    this.fetchItems();
  },

  methods: {
    async fetchItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
        this.$axios
          .$post('/api/dashboard/pending', {
            roleId: this.roleId
          })
          .then((response) => {
            this.totalRecords = response.totalRecords
            var data = []

            for (const i in response.data) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                status: response.data[i].statusLabel
              });
            }

            this.rows = data;
          })
          .catch((error) => {})
          .finally(() => {})
    },

    create(controlNo) {
      window.localStorage.setItem('controlNumber', JSON.stringify(controlNo));
      
      if (this.roleId == 4) {
        window.location.href = '/forms/cafoa/create';
      } else if (this.roleId == 6) {
        window.location.href = '/forms/disbursement/' + controlNo;
      }
    },
  },
}
</script>
