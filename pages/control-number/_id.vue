<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/requests" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <h1 class="text-xl font-bold mb-5">
            Paper Trail of control number : {{ this.$route.params.id }}
          </h1>
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
  mixins: [table_methods],
  components: {},
  layout: 'dashboard',
  data() {
    return {
      item: '',
      columns: [
        {
          label: 'Control Number',
          field: 'control_number',
        },
        {
          label: 'Full Name',
          field: 'name',
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
      },
    }
  },

  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post(
          '/api/assessment_report/control_number/' + this.$route.params.id,
          this.serverParams,
          {}
        )
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []
          var rowcount = 1

          for (const i in response.data) {
            data.push({
              // no: rowcount,
              id: response.data[i].id,
              name: response.data[i].name,
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
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
