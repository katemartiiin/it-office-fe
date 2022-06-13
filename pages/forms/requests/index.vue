<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4 dark:bg-slate-900">
      <div class="w-full" v-if="roleId == 2 || roleId == 3">
        <NuxtLink
          to="/forms/requests/create"
          class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Create Request
        </NuxtLink>
      </div>

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-slate-400"
      >
        <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Requests</h3>
            </div>
          </div>
        </div>
        <TableTab tab="approved"></TableTab>
        <div class="block w-full overflow-x-auto">
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
              perPageDropdown: [10, 20, 30, 40, 50, 100],
              dropdownAllowAll: false,
            }"
            :columns="columns"
            :rows="rows"
            :line-numbers="true"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'action'">
                <div class="flex flex-row">
                  <div class="p-1">
                    <button
                      class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                      title="View"
                    >
                      <NuxtLink
                        aria-expanded="false"
                        :to="'/forms/requests/' + props.row.id"
                        ><i class="fas fa-eye"></i
                      ></NuxtLink>
                    </button>
                  </div>
                  <div class="p-1">
                    <button
                      class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                      title="Edit"
                    >
                      <NuxtLink
                        aria-expanded="false"
                        :to="'/forms/requests/edit/' + props.row.id"
                        ><i class="fas fa-edit"></i
                      ></NuxtLink>
                    </button>
                  </div>
                  <!-- <div class="p-1">
                    <button
                      v-on:click="
                        manageStatus(props.row.originalIndex, 'pending')
                      "
                      class="text-xs bg-yellow-700 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded"
                    >
                      <i class="fa fa-pause"></i>
                    </button>
                  </div>
                  <div class="p-1">
                    <button
                      v-on:click="
                        manageStatus(props.row.originalIndex, 'decline')
                      "
                      class="text-xs bg-orange-700 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                    >
                      <i class="fa fa-thumbs-down"></i>
                    </button>
                  </div>
                  <div class="p-1" v-if="$auth.user['role'] == 1">
                    <button
                      class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                      title="Delete"
                      v-on:click="deleteRequest(props.row.originalIndex)"
                    >
                      <i class="fa fa-trash"></i>
                    </button>
                  </div> -->
                </div>
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Status_Pending = 0
const Status_Approved = 1
const Status_Declined = 2
import TableTab from '@/components/Tabs/Table_tab_revised.vue'
import { table_methods } from '~/mixins/methods/vuedatatable.js'
import { requestform } from '~/mixins/middleware/requestform_pages.js'
export default {
  head() {
    return {
      title: 'Form Request',
      meta: [
        {
          hid: 'B',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [requestform],
  components: {
    TableTab,
  },
  mixins: [table_methods],
  layout: 'dashboard',
  // middleware: 'admin',
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
          label: 'Control No.',
          field: 'control_number',
        },
        {
          label: 'Citizen`s Name',
          field: 'citizen_name',
        },
        {
          label: 'Request Type',
          field: 'request_type',
        },
        {
          label: 'Request Date',
          field: 'requestdate',
        },
        {
          label: 'Date - Time',
          field: 'created_at',
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
      payload: {
        id: null,
      },
      roleId: null,
    }
  },
  created() {
    this.requests = []
  },
  mounted() {
    this.roleId = this.$auth.$state.user['role'];
    this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$axios
        .$post(
          '/api/requestform/fetch_via_stat/' + Status_Approved,
          this.serverParams,
          {}
        )
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              citizen_name: response.data[i].citizen_name,
              control_number: response.data[i].control_number,
              created_at: response.data[i].created,
              status: response.data[i].statusLabel,
              request_type: response.data[i].typeofrequest,
              requestdate: response.data[i].requestday,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async manageStatus(ItemIndex, status) {
      console.log(status)
      let event
      switch (status) {
        case 'pending':
          event = 0
          break
        case 'approve':
          event = 1
          break
        case 'decline':
          event = 2
          break
      }
      this.payload.id = this.rows[ItemIndex].id

      this.$axios
        .$post('/api/requestform/managestatus/' + event, this.payload, {})
        .then((response) => {
          this.rows.splice(ItemIndex, 1)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async deleteRequest(index) {
      this.$axios
        .$delete('/api/requestform/delete/' + this.rows[index].id, '', {})
        .then((response) => {
          this.rows.splice(index, 1)
        })
        .catch((error) => {})
        .finally(() => {})
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
