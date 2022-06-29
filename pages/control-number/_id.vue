<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <button type="button" @click="goBack" class="text-sm font-medium tracking-wide">
        &lt; Back
      </button>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <div class="float-left">
            <h1 class="text-xl font-bold mb-3">
              Paper Trail of control number : {{ this.$route.params.id }}
            </h1>
            <div class="bg-blue-100 opacity-75 mb-5">
              <p class="pt-5 pb-2 pl-5 text-sm font-semibold">Last Updated: {{ lastUpdated }}</p>
              <p class="pb-3 pr-5">
                <span class="text-lg font-semibold pl-5">Status:</span>
                <span class="text-lg font-bold pl-2">Department - {{ lastStatus }}</span>
              </p>
              <p class="pb-5 pr-5">
                <span class="text-md font-semibold pl-5">Action:</span>
                <span class="text-md font-semibold pl-2">{{ lastAction }}</span>
              </p>
            </div>
          </div>

          <div class="float-right">
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
              </vue-good-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { table_methods } from '~/mixins/methods/vuedatatable.js'
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
      account_number: null,
    }
  },
  mixins: [table_methods],
  components: {},
  layout: 'dashboard',
  async created() {
    this.account_number = this.$route.params.id
  },
  data() {
    return {
      item: '',
      columns: [
        {
          label: 'Control Number',
          field: 'control_number',
        },
        {
          label: 'Department',
          field: 'department',
        },
        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Description',
          field: 'description',
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

        lastStatus: null,
        lastAction: null,
        lastUpdated: null,
      },
    }
  },

  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      this.$axios
        .$post(
          '/api/papar_trail/control_number/' + this.$route.params.id,
          this.serverParams,
          {}
        )
        .then((response) => {
          this.totalRecords = response.totalRecords
          this.lastStatus = response.lastDepartment
          this.lastAction = response.lastAction
          this.lastUpdated = response.lastUpdated
          var data = []
          var rowcount = 1

          for (const i in response.data) {
            data.push({
              // no: rowcount,
              id: response.data[i].id,
              name: response.data[i].name,
              department: response.data[i].department,
              username: response.data[i].username,
              description: response.data[i].description,
              email: response.data[i].email,
              control_number: response.data[i].control_number,
              created_at: response.data[i].created,
            })
            rowcount++
          }

          this.rows = data
          console.log(this.rows)
        })
        .catch((error) => {})
        .finally(() => {})
    },
    download() {
      const url =
        this.$config.api +
        '/papar_trail/export_controlnumber/' +
        this.account_number
      window.location.href = url
    },
    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
