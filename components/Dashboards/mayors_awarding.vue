<template>
  <div>
    <button
      class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
      @click.prevent="transmittal_to_budget()"
    >
      Transmit to Budget
    </button>
    <h2 class="py-5 text-xl font-bold">Mayors Awading Check - Dashboard</h2>

    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">
            Mayors Form Request Approval
          </h3>
        </div>
      </div>
    </div>
    <div>
      <vue-good-table
        id="requestapproval"
        ref="requestapproval"
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        :pagination-options="{
          enabled: true,
        }"
        @on-page-change="onPageChange_mayors_approval"
        @on-search="onSearch_mayors_approval"
        @on-per-page-change="onPerPageChange_mayors_approval"
        @on-sort-change="onSortChange_mayors_approval"
        mode="remote"
        :totalRows="totalRecords_mayors_approval"
        :columns="columns_mayors_approval"
        :rows="rows_mayors_approval"
        :line-numbers="true"
        :select-options="{ enabled: true }"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <div class="flex flex-wrap">
              <div class="p-1" v-if="props.row.approved_request == 0">
                <button
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  v-on:click="manage_request_approval(props.row.originalIndex)"
                >
                  Approve
                </button>
              </div>

              <div class="p-1" v-if="props.row.approved_request == 0">
                <!-- -->
                <NuxtLink
                  aria-expanded="false"
                  :to="'/forms/requests/edit/' + props.row.id"
                  ><button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    title="Edit"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                </NuxtLink>
                <!-- </button> -->
              </div>

              <div class="p-1" v-if="props.row.approved_request == 1">
                Approved
              </div>
            </div>
          </span>
        </template>
      </vue-good-table>
    </div>
    <br /><br />
    <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-white">Awarding Bank Checks</h3>
        </div>
      </div>
    </div>
    <div class="">
      <vue-good-table
        @on-page-change="onPageChange_award"
        @on-search="onSearch_award"
        @on-per-page-change="onPerPageChange_award"
        @on-sort-change="onSortChange_award"
        :search-options="{
          enabled: true,
          trigger: 'enter',
        }"
        mode="remote"
        :totalRows="totalRecords_award"
        :pagination-options="{
          enabled: true,
        }"
        :columns="columns_award"
        :rows="rows_award"
        :line-numbers="true"
      >
        <template slot="table-row" slot-scope="props">
          <span v-if="props.column.field == 'action'">
            <div class="p-1" v-if="props.row.award_status != 2">
              <button
                class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                title="View"
                v-on:click="addNote(props.row.cafoa_id)"
              >
                Add Note
              </button>
            </div>
            <div class="flex flex-wrap">
              <div class="p-1" v-if="props.row.award_status == 0">
                <button
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  v-on:click="manageAward(props.row.originalIndex, 'accept')"
                >
                  Acceptance
                </button>
              </div>
              <div class="p-1" v-if="props.row.award_status == 1">
                <button
                  class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                  v-on:click="manageAward(props.row.originalIndex, 'award')"
                >
                  Award Check to Payee
                </button>
              </div>
              <div class="p-1" v-if="props.row.award_status == 2">Awarded</div>
            </div>
          </span>
        </template>
      </vue-good-table>
    </div>

    <div class="w-full my-5">
      <hr class="my-1 order-4 border-slate-600 border-2" />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'columns_award',
    'totalRecords_award',
    'rows_award',
    'columns_mayors_approval',
    'totalRecords_mayors_approval',
    'rows_mayors_approval',
  ],
  methods: {
    onPageChange_award(params) {
      this.$emit('on-page-change-award', params)
    },
    onSearch_award(params) {
      this.$emit('on-search-award', params)
    },
    onPerPageChange_award(params) {
      this.$emit('on-per-page-award', params)
    },
    onSortChange_award(params) {
      this.$emit('on-sort-change-award', params)
    },
    onPageChange_mayors_approval(params) {
      this.$emit('on-page-change-mayors-approval', params)
    },
    onSearch_mayors_approval(params) {
      this.$emit('on-search-mayors-approval', params)
    },
    onPerPageChange_mayors_approval(params) {
      this.$emit('on-per-page-mayors-approval', params)
    },
    onSortChange_mayors_approval(params) {
      this.$emit('on-sort-change-mayors-approval', params)
    },
    addNote(accountNumber) {
      this.$emit('add-note', accountNumber)
    },
    manageAward(index, status) {
      this.$emit('manage-award', index, status)
    },
    manage_request_approval(index) {
      this.$emit('manage-request-approval', index)
    },
    transmittal_to_budget() {
      console.log('transmit')
      this.$emit(
        'transmit-to-budget',
        this.$refs['requestapproval'].selectedRows
      )
    },
  },
}
</script>
