<template>
  <div>
    <!-- table 1 -->
    <div>
      <div for="headers">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_treasury_0.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_treasury_0()"
            >
              Accept Selected
            </button>
          </div>

          <div class="py-4">
            <select
              v-model="payload.treasury_status_1"
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
              @click.prevent="transmit_treasury_1()"
            >
              Transmit
            </button>
          </div>
        </div>

        <h2 class="text-xl font-bold py-5">Pending CAFOAs</h2>

        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Initial Signing
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div for="tabledata" class="pb-5">
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_0"
          id="cafoa_budget"
          ref="cafoa_budget"
          mode="remote"
          :pagination-options="{
            enabled: true,
          }"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          @on-page-change="onPageChange_treasury_cafoa(...arguments)"
          @on-search="onSearch_treasury_cafoa(...arguments)"
          @on-per-page-change="onPerPageChange_treasury_cafoa(...arguments)"
          @on-sort-change="onSortChange_treasury_cafoa(...arguments)"
          :columns="columns_treasury_cafoa"
          :rows="rows_treasury_cafoa"
          :line-numbers="true"
          :totalRows="totalRecords_treasury_cafoa"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <div class="p-1" v-if="props.row.acceptedStatus == 1">
                  <p
                    class="text-sm bg-green-100 text-green-700 font-bold py-2 px-4"
                  >
                    Accepted
                  </p>
                </div>
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasuryStatus(props.row.originalIndex, 'accept')
                    "
                  >
                    Accept
                  </button>
                </div>
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 2 -->
    <div>
      <div for="header">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_treasury_1.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_treasury_1()"
            >
              Accept Selected
            </button>
          </div>
          <div class="py-4">
            <select
              v-model="payload.treasury_status_2"
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
              @click.prevent="transmit_treasury_2()"
            >
              Transmit
            </button>
          </div>
          <!-- <button
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click.prevent="tx_voucher_treasury_to_accounting()"
        >
          Transmit to Accounting
        </button> -->
        </div>

        <h2 class="text-xl font-bold py-5">Pending Vouchers</h2>
        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Creating Bank Check
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div for="datatable">
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_1"
          id="voucher_budget"
          ref="voucher_budget"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :pagination-options="{
            enabled: true,
          }"
          @on-page-change="onPageChange_treasury_voucher"
          @on-search="onSearch_treasury_voucher"
          @on-per-page-change="onPerPageChange_treasury_voucher"
          @on-sort-change="onSortChange_treasury_voucher"
          mode="remote"
          :totalRows="totalRecords_treasury_voucher"
          :columns="columns_treasury_voucher"
          :rows="rows_treasury_voucher"
          :line-numbers="true"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <!-- <div class="p-1">
                  <button
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click.prevent="ViewNote(props.row.control_number)"
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
                </div> -->
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasuryStatus_voucher(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
                <div class="p-1" v-if="props.row.acceptedStatus == 1">
                  <p
                    class="text-sm bg-green-100 text-green-700 font-bold py-2 px-4"
                  >
                    Accepted
                  </p>
                </div>
                <!-- <div class="p-1" v-if="props.row.treasury_status == 1">
                  <button
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    title="Edit"
                    v-on:click="
                      manageTreasuryStatus_voucher(
                        props.row.originalIndex,
                        'submit'
                      )
                    "
                  >
                    Submit to Accounting Department
                  </button>
                </div> -->
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- table 3 -->

    <div class="mt-7 mb-2">
      <div for="header">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_treasury_2.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_treasury_2()"
            >
              Accept Selected
            </button>
          </div>
          <div class="py-4">
            <select
              v-model="payload.treasury_status_3"
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
              @click.prevent="transmit_treasury_3()"
            >
              Transmit
            </button>
          </div>

          <!-- <button
          class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          @click.prevent="tx_voucher_treasury_to_mayors()"
        >
          Transmit to Mayors for Check Signing
        </button> -->
        </div>

        <h2 class="text-xl font-bold py-5">Pending Bank Checks</h2>
        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Check Signing
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_2"
          id="voucher_treasury_to_mo"
          ref="voucher_treasury_to_mo"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :pagination-options="{
            enabled: true,
          }"
          @on-page-change="onPageChange_treasury_mo_voucher"
          @on-search="onSearch_treasury_mo_voucher"
          @on-per-page-change="onPerPageChange_treasury_mo_voucher"
          @on-sort-change="onSortChange_treasury_mo_voucher"
          mode="remote"
          :totalRows="totalRecords_treasury_mo_voucher"
          :columns="columns_treasury_mo_voucher"
          :rows="rows_treasury_mo_voucher"
          :line-numbers="true"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <!-- <div class="p-1">
                  <button
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click.prevent="ViewNote(props.row.control_number)"
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
                </div> -->
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasuryMoStatus_voucher(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
                <div class="p-1" v-if="props.row.acceptedStatus == 1">
                  <p
                    class="text-sm bg-green-100 text-green-700 font-bold py-2 px-4"
                  >
                    Accepted
                  </p>
                </div>
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <!-- Table 4 -->
    <div class="mt-7 mb-2">
      <div for="header">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_treasury_3.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_treasury_3()"
            >
              Accept Selected
            </button>
          </div>
          <div class="py-4">
            <select
              v-model="payload.treasury_status_4"
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
              @click="transmit_treasury_4"
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

        <h2 class="text-xl font-bold py-5">Pending Bank Checks</h2>
        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">
                For Check Release
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_treasury_3"
          id="treasury_check_release"
          ref="treasury_check_release"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :pagination-options="{
            enabled: true,
          }"
          @on-page-change="onPageChange_treasury_check_release"
          @on-search="onSearch_treasury_check_release"
          @on-per-page-change="onPerPageChange_treasury_check_release"
          @on-sort-change="onSortChange_treasury_check_release"
          mode="remote"
          :totalRows="totalRecords_treasury_check_release"
          :columns="columns_treasury_check_release"
          :rows="rows_treasury_check_release"
          :line-numbers="true"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <!-- <div class="p-1">
                  <button
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click.prevent="ViewNote(props.row.control_number)"
                  >
                    View Note <i class="fas fa-sticky-note"></i>
                  </button>
                </div> -->
                <!-- <div
                  class="p-1"
                  v-if="
                    props.row.acceptedStatus == 1 && props.row.released == 0
                  "
                >
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-2 rounded"
                    title="View"
                    v-on:click="addNote(props.row.control_number)"
                  >
                    Add Note
                  </button>
                </div> -->
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
                <div class="p-1" v-if="props.row.acceptedStatus == 0">
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasury_check_release(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- Table 5 -->

    <div class="mt-7 mb-2">
      <div for="header">
        <div class="flex items-start float-right">
          <div class="py-4">
            <button
              v-if="selected_treasury_5.length > 0"
              class="mx-2 space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              @click.prevent="accept_treasury_4()"
            >
              Accept Selected
            </button>
          </div>
        </div>

        <h2 class="text-xl font-bold py-5">Pending Collections</h2>
        <div class="rounded-t mb-0 px-4 py-5 border-0 bg-slate-600">
          <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 class="font-semibold text-lg text-white">Collection</h3>
            </div>
          </div>
        </div>
      </div>

      <div>
        <vue-good-table
          @on-selected-rows-change="OnSelectedRows_collection"
          id="treasury_collection"
          ref="treasury_collection"
          :search-options="{
            enabled: true,
            trigger: 'enter',
          }"
          :pagination-options="{
            enabled: true,
          }"
          @on-page-change="onPageChange_treasury_collection"
          @on-search="onSearch_treasury_collection"
          @on-per-page-change="onPerPageChange_treasury_collection"
          @on-sort-change="onSortChange_treasury_collection"
          mode="remote"
          :totalRows="totalRecords_treasury_collection"
          :columns="columns_treasury_collection"
          :rows="rows_treasury_collection"
          :line-numbers="true"
          :select-options="{ enabled: true, selectOnCheckboxOnly: true }"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <div class="flex flex-row">
                <!-- <div class="p-1">
                  <button
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                    v-on:click.prevent="ViewNote(props.row.control_number)"
                  >
                    View Note <i class="fas fa-sticky-note"></i>
                  </button>
                </div> -->

                <!-- <div
                  class="p-1"
                  v-if="
                    props.row.acceptedStatus == 1 && props.row.completed == 0
                  "
                >
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-2 rounded"
                    title="View"
                    v-on:click="addNote(props.row.control_number)"
                  >
                    Add Note
                  </button>
                </div> -->

                <div
                  class="p-1"
                  v-if="
                    props.row.acceptedStatus == 0 && props.row.completed == 0
                  "
                >
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasury_collection(
                        props.row.originalIndex,
                        'accept'
                      )
                    "
                  >
                    Accept
                  </button>
                </div>
                <div
                  class="p-1"
                  v-if="
                    props.row.acceptedStatus == 1 && props.row.completed == 0
                  "
                >
                  <button
                    class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                    title="View"
                    v-on:click="
                      manageTreasury_complete(
                        props.row.originalIndex,
                        props.row.control_number
                      )
                    "
                  >
                    Complete
                  </button>
                </div>
                <div class="p-1" v-if="props.row.completed == 1">
                  <p
                    class="text-xs bg-green-300 text-green-700 font-bold py-2 px-4"
                  >
                    Completed
                  </p>
                </div>
              </div>
            </span>
            <span v-if="props.column.field == 'note'">
              <CardNoteField
                :control_number="props.row.control_number"
                @add-note="addNote(...arguments)"
                @view-note="ViewNote(...arguments)"
              ></CardNoteField>
            </span>
            <span v-else>
              {{ props.formattedRow[props.column.field] }}
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
import CardNoteField from '@/components/Cards/CardNoteField.vue'
import status from '/mixins/data/status.js'
export default {
  components: { CardNoteField },
  mixins: [status],
  props: [
    'columns_treasury_cafoa',
    'rows_treasury_cafoa',
    'totalRecords_treasury_cafoa',

    'totalRecords_treasury_voucher',
    'columns_treasury_voucher',
    'rows_treasury_voucher',

    'totalRecords_treasury_mo_voucher',
    'columns_treasury_mo_voucher',
    'rows_treasury_mo_voucher',

    'totalRecords_treasury_check_release',
    'columns_treasury_check_release',
    'rows_treasury_check_release',

    'totalRecords_treasury_collection',
    'columns_treasury_collection',
    'rows_treasury_collection',
  ],
  data: () => ({
    selected_treasury_0: [],
    selected_treasury_1: [],
    selected_treasury_2: [],
    selected_treasury_3: [],
    selected_treasury_5: [],

    payload: {
      treasury_status_1: 5,
      treasury_status_2: 7,
      treasury_status_3: 9,
      treasury_status_4: 13,
      treasury_status_5: 13,
    },
  }),
  mounted() {},
  methods: {
    // 1
    onPageChange_treasury_cafoa(params) {
      this.$emit('on-page-change-treasury-cafoa', params)
    },
    onSearch_treasury_cafoa(params) {
      this.$emit('on-search-treasury-cafoa', params)
    },
    onPerPageChange_treasury_cafoa(params) {
      this.$emit('on-per-page-change-treasury-cafoa', params)
    },
    onSortChange_treasury_cafoa(params) {
      this.$emit('on-sort-change-treasury-cafoa', params)
    },
    // addNote(controlNo) {
    //   this.$emit('add-note-treasury-cafoa', controlNo)
    // },
    releaseCheck(index, controlNo) {
      this.$emit('release-treasury-check', index, controlNo)
    },
    manageTreasuryStatus(index, status) {
      this.$emit('manage-treasury-status', index, status)
    },
    // 2
    onPageChange_treasury_voucher(params) {
      this.$emit('on-page-change-treasury-voucher', params)
    },
    onSearch_treasury_voucher(params) {
      this.$emit('on-search-treasury-voucher', params)
    },
    onPerPageChange_treasury_voucher(params) {
      this.$emit('on-per-page-change-treasury-voucher', params)
    },
    onSortChange_treasury_voucher(params) {
      this.$emit('on-sort-change-treasury-voucher', params)
    },
    manageTreasuryStatus_voucher(id, status) {
      this.$emit('manage-treasurystatus-voucher', id, status)
    },
    tx_cafoa_to_accounting() {
      this.$emit(
        'transmit-cafoa-to-accounting',
        this.$refs['cafoa_budget'].selectedRows
      )
    },
    tx_voucher_treasury_to_accounting() {
      this.$emit(
        'transmit-voucher-treasury-to-accounting',
        this.$refs['voucher_budget'].selectedRows
      )
    },

    onPageChange_treasury_mo_voucher(params) {
      this.$emit('on-page-change-treasury-mo-voucher', params)
    },
    onSearch_treasury_mo_voucher(params) {
      this.$emit('on-search-treasury-mo-voucher', params)
    },
    onPerPageChange_treasury_mo_voucher(params) {
      this.$emit('on-per-page-change-treasury-mo-voucher', params)
    },
    onSortChange_treasury_mo_voucher(params) {
      this.$emit('on-sort-change-treasury-mo-voucher', params)
    },
    manageTreasuryMoStatus_voucher(id, status) {
      this.$emit('manage-treasurymostatus-voucher', id, status)
    },
    onPageChange_treasury_check_release(params) {
      this.$emit('on-page-change-treasury-check-release', params)
    },
    onSearch_treasury_check_release(params) {
      this.$emit('on-search-treasury-check-release', params)
    },
    onPerPageChange_treasury_check_release(params) {
      this.$emit('on-per-page-change-treasury-check-release', params)
    },
    onSortChange_treasury_check_release(params) {
      this.$emit('on-sort-change-treasury-check-release', params)
    },
    manageTreasury_check_release(id, status) {
      this.$emit('manage-treasury-check-release', id, status)
    },
    tx_voucher_treasury_to_mayors() {
      this.$emit(
        'transmit-voucher-treasury-to-mayors',
        this.$refs['voucher_treasury_to_mo'].selectedRows
      )
    },

    OnSelectedRows_treasury_0() {
      this.selected_treasury_0 = this.$refs['cafoa_budget'].selectedRows
    },

    OnSelectedRows_treasury_1() {
      this.selected_treasury_1 = this.$refs['voucher_budget'].selectedRows
    },

    OnSelectedRows_treasury_2() {
      this.selected_treasury_2 =
        this.$refs['voucher_treasury_to_mo'].selectedRows
    },
    OnSelectedRows_treasury_3() {
      this.selected_treasury_3 =
        this.$refs['treasury_check_release'].selectedRows
    },
    OnSelectedRows_collection() {
      console.log(this.$refs['treasury_collection'].selectedRows)
      this.selected_treasury_5 = this.$refs['treasury_collection'].selectedRows
    },
    accept_treasury_0() {
      this.$emit('accept-treasury-0', this.$refs['cafoa_budget'].selectedRows)
    },
    accept_treasury_1() {
      this.$emit('accept-treasury-1', this.$refs['voucher_budget'].selectedRows)
    },
    accept_treasury_2() {
      this.$emit(
        'accept-treasury-2',
        this.$refs['voucher_treasury_to_mo'].selectedRows
      )
    },
    accept_treasury_3() {
      this.$emit(
        'accept-treasury-3',
        this.$refs['treasury_check_release'].selectedRows
      )
    },

    transmit_treasury_1() {
      this.$emit(
        'transmit-treasury-1',
        this.$refs['cafoa_budget'].selectedRows,
        this.payload.treasury_status_1
      )
    },
    transmit_treasury_2() {
      this.$emit(
        'transmit-treasury-2',
        this.$refs['voucher_budget'].selectedRows,
        this.payload.treasury_status_2
      )
    },
    transmit_treasury_3() {
      this.$emit(
        'transmit-treasury-3',
        this.$refs['voucher_treasury_to_mo'].selectedRows,
        this.payload.treasury_status_3
      )
    },
    transmit_treasury_4() {
      this.$emit(
        'transmit-treasury-4',
        this.$refs['treasury_check_release'].selectedRows,
        this.payload.treasury_status_4
      )
    },
    releaseMultiple() {
      this.$emit(
        'release-treasury-multiple',
        this.$refs['treasury_check_release'].selectedRows
      )
    },

    accept_treasury_4() {
      this.$emit(
        'accept-treasury-4',
        this.$refs['treasury_collection'].selectedRows
      )
    },

    onPageChange_treasury_collection(params) {
      this.$emit('on-page-change-treasury-collection', params)
    },
    onSearch_treasury_collection(params) {
      this.$emit('on-search-treasury-collection', params)
    },
    onPerPageChange_treasury_collection(params) {
      this.$emit('on-per-page-change-treasury-collection', params)
    },
    onSortChange_treasury_collection(params) {
      this.$emit('on-sort-change-treasury-collection', params)
    },
    manageTreasury_collection(index, status) {
      this.$emit('manage-treasury-collection', index, status)
    },
    manageTreasury_complete(index, controlNo) {
      this.$emit('manage-treasury-complete', index, controlNo)
    },
    ViewNote(ctrl_number) {
      this.$emit('view-note', ctrl_number)
    },
    addNote(controlNo) {
      this.$emit('add-note', controlNo)
    },
  },
}
</script>
