<template>
  <div>
    <!-- Modal -->
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <div
          class="float-right"
          v-if="
            $auth.user['role'] == roles.ADMIN ||
            $auth.user['role'] == roles.MANAGER
          "
        >
          <button
            @click.prevent="download()"
            class="mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Download
          </button>
        </div>

        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-white">Paper Trail</h3>
              </div>
            </div>
          </div>
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
                <span v-if="props.column.field == 'control_number'">
                  <NuxtLink
                    aria-expanded="false"
                    :to="'/control-number/' + props.row.control_number"
                    class="underline decoration-sky-500"
                    >{{ props.row.control_number }}
                  </NuxtLink>
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { table_methods } from '~/mixins/methods/vuedatatable.js'
import roles from '/mixins/data/roles.js'
export default {
  head() {
    return {
      title: 'Trail',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [table_methods, roles],
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
          label: 'Control Number',
          field: 'control_number',
        },
        {
          label: "Citizen's Name",
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
      this.$axios
        .$post('/api/requestform/fetchAll', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []

          for (const i in response.data) {
            data.push({
              id: response.data[i].id,
              payee: response.data[i].payee,
              citizen_name: response.data[i].citizen_name,
              created_at: response.data[i].created,
              control_number: response.data[i].control_number,
              request_type: response.data[i].typeofrequest,
              requestdate: response.data[i].requestday,
            })
          }

          this.rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async downloadpdf(id) {
      this.$toast.success('Processing')

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
    download() {
      const url = this.$config.api + '/requestform/export_controlnumber'
      window.location.href = url
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
