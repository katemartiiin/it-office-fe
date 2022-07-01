<template>
  <div>
    <!-- table 1 -->
    <div>
      <div class="flex items-start float-right">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_approval.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_selected_approval()"
            >
              Accept Selected
            </button>
          </div>
          <div class="py-4">
            <select
              v-model="payload.transmittal_mo_1"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(stat, index) in transmit_status"
                :key="index"
                :value="stat.id"
              >
                {{ stat.id }} - {{ stat.name }}
              </option>
            </select>
          </div>
          <div class="py-4">
            <button
              class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              @click.prevent="transmittal_mo_1()"
            >
              Transmit
            </button>
          </div>
        </div>
      </div>

      <h2 class="py-5 text-xl font-bold">Pending Requests</h2>

      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">
              For Amount Approval
            </h3>
          </div>
        </div>
      </div>
      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_mayors_approval"
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
                <div class="p-1">
                  <button
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click.prevent="view_note(props.row.control_number)"
                  >
                    View Note <i class="fas fa-sticky-note"></i>
                  </button>
                </div>
                <div class="p-1" v-if="props.row.acceptance == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manage_accept_request(props.row.originalIndex, 'accept')
                    "
                  >
                    Accept
                  </button>
                </div>
                <!-- props.row.approved_amount != NULL && -->
                <div
                  class="p-1"
                  v-if="
                    props.row.approved_amount == NULL &&
                    props.row.acceptance == 1
                  "
                >
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="
                      manage_request_approval(props.row.originalIndex)
                    "
                  >
                    Approve
                  </button>
                </div>
                <div class="p-1" v-if="props.row.acceptance == 1">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-2 rounded"
                    title="View"
                    v-on:click="addNote(props.row.control_number)"
                  >
                    Add Note
                  </button>
                </div>
                <!-- props.row.approved_amount != NULL && -->
                <div class="p-1" v-if="props.row.acceptance == 1">
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
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 2 -->
    <div class="mt-5 w-full">
      <div class="flex items-start float-right">
        <div class="py-4">
          <button
            v-if="selected_signing.length > 0"
            class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            @click.prevent="accept_mo_2()"
          >
            Accept Selected
          </button>
        </div>
        <div class="py-4">
          <select
            v-model="payload.transmittal_mo_2"
            class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option
              v-for="(stat, index) in transmit_status"
              :key="index"
              :value="stat.id"
            >
              {{ stat.id }} - {{ stat.name }}
            </option>
          </select>
        </div>
        <div class="py-4">
          <button
            class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            @click.prevent="transmittal_mo_2()"
          >
            Transmit
          </button>
        </div>
      </div>

      <h2 class="py-5 text-xl font-bold">Pending Bank Checks</h2>
      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">For Check Signing</h3>
          </div>
        </div>
      </div>
      <div class="">
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_mayors_signing"
          id="mayors_signing"
          ref="mayors_signing"
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
          :select-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="p-1">
                <button
                  class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  v-on:click.prevent="view_note(props.row.control_number)"
                >
                  View Note <i class="fas fa-sticky-note"></i>
                </button>
              </div>
              <div class="p-1" v-if="props.row.acceptedStatus == 1">
                <button
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  title="View"
                  v-on:click="addNote(props.row.control_number)"
                >
                  Add Note
                </button>
              </div>
              <div class="flex flex-wrap">
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="manageAward(props.row.originalIndex, 'accept')"
                  >
                    Accept
                  </button>
                </div>

                <div
                  class="ml-2 px-3 py-2 text-sm bg-green-200 font-semibold text-green-700"
                  v-if="props.row.acceptedStatus == 1"
                >
                  Accepted
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 3 -->
    <div class="mt-5 w-full">
      <div class="flex items-start float-right">
        <div class="py-4">
          <button
            v-if="selected_mo_3.length > 0"
            class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            @click.prevent="accept_mo_3()"
          >
            Accept Selected
          </button>
        </div>
        <div class="py-4">
          <select
            v-model="payload.transmittal_mo_3"
            class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option
              v-for="(stat, index) in transmit_status"
              :key="index"
              :value="stat.id"
            >
              {{ stat.id }} - {{ stat.name }}
            </option>
          </select>
        </div>
        <div class="py-4">
          <button
            class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            @click.prevent="transmittal_mo_3()"
          >
            Transmit
          </button>
        </div>
        <div class="py-4">
          <button
            class="float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
            @click="releaseMultiple()"
          >
            Mark as Released
          </button>
        </div>
      </div>

      <h2 class="py-5 text-xl font-bold">Pending Bank Checks</h2>
      <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-lg text-white">For Check Release</h3>
          </div>
        </div>
      </div>

      <div class="">
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_mo_release"
          id="mo_3"
          ref="mo_3"
          @on-page-change="onPageChange_mo_release"
          @on-search="onSearch_mo_release"
          @on-per-page-change="onPerPageChange_mo_release"
          @on-sort-change="onSortChange_mo_release"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          mode="remote"
          :totalRows="totalRecords_mo_release"
          :pagination-options="{
            enabled: true,
          }"
          :columns="columns_mo_release"
          :rows="rows_mo_release"
          :line-numbers="true"
          :select-options="{ enabled: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="p-1">
                <button
                  class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  v-on:click.prevent="view_note(props.row.control_number)"
                >
                  View Note <i class="fas fa-sticky-note"></i>
                </button>
              </div>
              <div class="p-1" v-if="props.row.acceptedStatus == 1">
                <button
                  class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                  title="View"
                  v-on:click="addNote(props.row.control_number)"
                >
                  Add Note
                </button>
              </div>
              <div class="flex flex-wrap">
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click="manage_mo_3(props.row.originalIndex, 'accept')"
                  >
                    Accept
                  </button>
                </div>
                <div
                  class="p-1"
                  v-if="
                    props.row.acceptedStatus == 1 && props.row.released == 0
                  "
                >
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      releaseCheck(
                        props.row.originalIndex,
                        props.row.control_number
                      )
                    "
                  >
                    Release
                  </button>
                </div>
                <div class="p-1" v-if="props.row.released == 1">
                  <p
                    class="text-sm bg-green-100 text-green-700 font-bold py-2 px-4"
                  >
                    Released
                  </p>
                </div>
                <div
                  class="ml-2 px-3 py-2 text-sm bg-green-200 font-semibold text-green-700"
                  v-if="
                    props.row.acceptedStatus == 1 && props.row.released == 0
                  "
                >
                  Accepted
                </div>
              </div>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <div class="w-full my-5">
      <hr class="my-1 order-4 border-slate-600 border-2" />
    </div>
  </div>
</template>

<script>
import status from '/mixins/data/status.js'
export default {
  mixins: [status],
  props: [
    'columns_award',
    'totalRecords_award',
    'rows_award',
    'columns_mayors_approval',
    'totalRecords_mayors_approval',
    'rows_mayors_approval',

    'columns_mo_release',
    'totalRecords_mo_release',
    'rows_mo_release',
  ],
  data: () => ({
    selected_approval: [],
    selected_signing: [],
    selected_mo_3: [],
    payload: {
      status: 1,
      transmittal_mo_1: 3,
      transmittal_mo_2: 10,
      transmittal_mo_3: 13,
    },
    //
  }),
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
    addNote(controlNo) {
      this.$emit('add-note', controlNo)
    },
    manageAward(index, status) {
      this.$emit('manage-award', index, status)
    },
    manage_request_approval(index) {
      this.$emit('manage-request-approval', index)
    },
    transmittal_to_budget() {
      this.$emit(
        'transmit-to-budget',
        this.$refs['requestapproval'].selectedRows
      )
    },
    transmittal_mo_to_accounting() {
      this.$emit(
        'transmit-mo-to-accounting',
        this.$refs['mayors_signing'].selectedRows
      )
    },
    manage_accept_request(index, status) {
      this.$emit('manage-accept-request', index, status)
    },
    OnSelectedRows_mayors_approval() {
      this.selected_approval = this.$refs['requestapproval'].selectedRows
    },

    accept_selected_approval() {
      this.$emit(
        'accept-selected-approval',
        this.$refs['requestapproval'].selectedRows
      )
    },

    OnSelectedRows_mayors_signing() {
      this.selected_signing = this.$refs['mayors_signing'].selectedRows
    },

    OnSelectedRows_mo_release() {
      this.selected_mo_3 = this.$refs['mo_3'].selectedRows
    },
    accept_selected_mayors_signing() {
      this.$emit(
        'accept-selected-mayors-signing',
        this.$refs['mayors_signing'].selectedRows
      )
    },

    transmittal_mo_1() {
      this.$emit(
        'transmit-mo-1',
        this.$refs['requestapproval'].selectedRows,
        this.payload.transmittal_mo_1
      )
    },
    transmittal_mo_2() {
      this.$emit(
        'transmit-mo-2',
        this.$refs['mayors_signing'].selectedRows,
        this.payload.transmittal_mo_2
      )
    },
    accept_mo_1() {
      this.$emit('accept-mo-1', this.$refs['requestapproval'].selectedRows)
    },
    accept_mo_2() {
      this.$emit('accept-mo-2', this.$refs['mayors_signing'].selectedRows)
    },

    onPageChange_mo_release(params) {
      this.$emit('on-page-change-mo-release', params)
    },
    onSearch_mo_release(params) {
      this.$emit('on-search-mo-release', params)
    },
    onPerPageChange_mo_release(params) {
      this.$emit('on-per-page-mo-release', params)
    },
    onSortChange_mo_release(params) {
      this.$emit('on-sort-change-mo-release', params)
    },

    transmittal_mo_3() {
      this.$emit(
        'transmit-mo-3',
        this.$refs['mo_3'].selectedRows,
        this.payload.transmittal_mo_3
      )
    },
    accept_mo_3() {
      this.$emit('accept-mo-3', this.$refs['mo_3'].selectedRows)
    },
    manage_mo_3(index, status) {
      this.$emit('mo_3', index, status)
    },
    releaseMultiple() {
      this.$emit('release-mayors-multiple', this.$refs['mo_3'].selectedRows)
    },
    releaseCheck(index, controlNo) {
      this.$emit('release-mayors-check', index, controlNo)
    },
    view_note(ctrl_number) {
      this.$emit('view-note', ctrl_number)
    },
  },
}
</script>
