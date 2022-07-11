<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NoteModal
        @toggleModal="toggleModal()"
        :showmodal="showModal"
        :notes="notes"
        >
          <span slot="title">View Notes</span>
      </NoteModal>

      <NuxtLink
        to="/forms/disbursement"
        class="text-sm font-medium tracking-wide"
      >
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <div class="w-full mt-5 flex flex-wrap">
            <p class="text-xs">Edit Voucher</p>
            <p v-if="item.is_returned" class="text-xs ml-3"> | <a href="#" @click.prevent="toggleModal" class="ml-2 font-semibold text-orange-500 hover:text-orange-700">View Notes</a></p>
          </div>
          <h1 class="text-xl font-bold mb-5">Disbursement Voucher</h1>
          <form class="w-full">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Local Government Unit
                </label>
                <input
                  v-model="item.lgu"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-lgu"
                  type="text"
                  value="City Government of Malolos"
                  disabled
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 flex flex-wrap">
                <div class="w-full md:w-1/3 md:pr-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >Fund</label
                  >
                  <input
                    v-model="item.fund"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-fund"
                    type="text"
                    placeholder="Fund"
                    :readonly="isTreasury"
                  />
                  <!-- <input
                    v-else
                    v-model="item.fund"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-fund"
                    type="text"
                    placeholder="Fund"
                  /> -->
                </div>
                <div class="w-full md:w-1/3 md:px-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >DV No.</label
                  >
                  <input
                    v-model="item.dv_no"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-dv"
                    type="text"
                    placeholder="DV No."
                    :readonly="isTreasury"
                  />
                </div>
                <div class="w-full md:w-1/3 md:pl-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >Date</label
                  >
                  <input
                    v-model="item.date"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-date"
                    type="date"
                    placeholder="Date"
                    :readonly="isTreasury"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                  >Payee</label
                >
                <input
                  v-model="item.payee"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-payee"
                  type="text"
                  placeholder="Payee"
                  disabled
                />

                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                  >Address</label
                >
                <input
                  v-model="item.address"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1"
                  id="grid-address"
                  type="text"
                  placeholder="Address"
                  disabled
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 flex flex-wrap">
                <div class="w-full md:w-1/3 md:pr-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >ID No./TIN</label
                  >
                  <input
                    v-model="item.id_no"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1"
                    id="grid-id"
                    type="text"
                    placeholder="ID No./TIN"
                    :readonly="isTreasury"
                  />
                </div>
                <div class="w-full md:w-1/3 md:px-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >CAFOA No.</label
                  >
                  <input
                    v-model="item.cafoa_id"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1"
                    id="grid-cafoa"
                    type="text"
                    placeholder="CAFOA No."
                    :readonly="isTreasury"
                  />
                </div>
                <div class="w-full md:w-1/3 md:pl-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >Responsibilty Center</label
                  >
                  <input
                    v-model="item.responsibility_center"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1"
                    id="grid-rc"
                    type="text"
                    placeholder="Responsibility Center"
                    :readonly="isTreasury"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-particulars"
                >
                  Particulars
                </label>
                <textarea
                  v-model="item.particulars_description"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="grid-function"
                  rows="3"
                  placeholder="Type particulars here"
                  disabled
                ></textarea>
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-0"
                  for="grid-particulars"
                >
                  Amount
                </label>
                <input
                  v-model="item.particulars_amount"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-amount"
                  type="text"
                  placeholder="Amount"
                  disabled
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  A. Certified
                </label>
                <p class="text-xs">
                  Expenses/Cash Advances necessary, valid, proper, lawful, and
                  incurred under my direct supervision.
                </p>
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <input
                      v-model="item.requesting_official"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      placeholder="Name"
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <input
                      v-model="item.requesting_office"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-office"
                      type="text"
                      placeholder="Office"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  B. Certified
                </label>
                <p class="text-xs">
                  Completeness and propriety of supporting documents/previous
                  cash advance liquidated/existence of funds held in trust.
                </p>
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      :value="department.accounting"
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-office"
                      type="text"
                      value="Head of Accounting Department/Office"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  C. Certified
                </label>
                <p class="text-xs">Funds available for the purpose</p>
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      :value="department.treasury"
                      disabled
                    />
                    <!-- value="Anthony A. Mendoza" -->
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-office"
                      type="text"
                      value="Head of Treasury Department/Office"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  D. Approved For Payment
                </label>
                <input
                  v-model="item.approved_payment"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-amount"
                  type="text"
                  placeholder="Amount"
                  disabled
                />
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      :value="department.localchiefexecutive"
                      disabled
                    />
                    <!-- value="Engr. Gilbert T. Gatchalian" -->
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-office"
                      type="text"
                      value="Local Chief Executive"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Payment
                </label>
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                  for="grid-request"
                  >Check No.</label
                >
                <input
                  v-model="item.check_no"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-check"
                  type="text"
                  placeholder="Check No."
                />
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Bank Name</label
                    >
                    <input
                      v-model="item.bank_name"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-bank"
                      type="text"
                      placeholder="Bank Name"
                    />
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Date</label
                    >
                    <input
                      v-model="item.check_date"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  E. Received Payment
                </label>
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Name</label
                    >
                    <input
                      v-model="item.receiver_name"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-bank"
                      type="text"
                      placeholder="Bank Name"
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Date</label
                    >
                    <input
                      v-model="item.receive_date"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="date"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  F. Accounting Entries
                </label>
                <div
                  class="w-full flex flex-wrap my-2"
                  v-for="(entry, key) in item.entries"
                  :key="key"
                >
                  <div class="w-full md:w-1/4 md:pr-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Name</label
                    >
                    <input
                      v-model="entry.name"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      placeholder="Name"
                      :readonly="isTreasury"
                    />
                  </div>

                  <div class="w-full md:w-1/4 md:px-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Account Code</label
                    >
                    <input
                      v-model="entry.account_code"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="text"
                      placeholder="Account Code"
                      :readonly="isTreasury"
                    />
                  </div>

                  <div class="w-full md:w-1/4 md:px-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Debit</label
                    >
                    <input
                      v-model="entry.debit"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      placeholder="Debit"
                      :readonly="isTreasury"
                    />
                  </div>

                  <div class="w-full md:w-1/4 md:pl-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Credit</label
                    >
                    <input
                      v-model="entry.credit"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="text"
                      placeholder="Credit"
                      :readonly="isTreasury"
                    />
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Prepared By (Accounting Personnel)
                </label>
                <input
                  v-model="item.prepared_by"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-name"
                  type="text"
                  placeholder="Name"
                  :readonly="isTreasury"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Certified Correct (Head, Accounting Division/Unit)
                </label>
                <input
                  v-model="item.certified_correct_by"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-name"
                  type="text"
                  placeholder="Name"
                  :readonly="isTreasury"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <div class="requested-amount-header flex flex-wrap my-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Voucher Notes
                  </label>
                </div>
                <div class="w-full total-amount-group flex flex-wrap my-3">
                  <textarea
                    v-model="item.remarks"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="grid-function"
                    rows="3"
                    placeholder="Type notes here"
                    :readonly="isTreasury"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <div class="ledger-group-header flex flex-wrap my-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Supporting Files
                  </label>
                </div>
                <div
                  class="border-1 rounded px-5 py-2 my-2 w-full content-center"
                >
                  <div class="w-full flex pt-5">
                    <div
                      v-for="(image, key) in this.images"
                      :key="key"
                      class="flex-auto"
                    >
                      <div class="p-1">
                        <img :ref="'image'" :src="image.path" width="400" />
                        <a :href="image.path" target="_blank">[ View ]</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full my-5 flex flex-wrap justify-end">
              <button
                type="button"
                @click="updateItem"
                class="mr-3 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded"
              >
                <i class="fas fa-save mr-2"></i>Save
              </button>
              <button
                @click.prevent="downloadpdf(voucherId)"
                type="button"
                class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
              >
                <i class="fas fa-print mr-2"></i>Print
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { disbursementvoucher } from '~/mixins/middleware/disbursementvoucher_pages.js'
import NoteModal from '@/components/Modals/NoteModal.vue'
export default {
  head() {
    return {
      title: 'Disbursement',
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
    NoteModal,
  },
  mixins: [disbursementvoucher],
  layout: 'dashboard',
  data() {
    return {
      voucherId: null,
      item: {},
      images: [],
      showModal: false,
      notes: [],
      department: {
        acccounting: '',
        cityadministrator: '',
        treasury: '',
        budget: '',
        localchiefexecutive: '',
      },
      isTreasury: true,
      roleId: null
    }
  },
  async mounted() {
    this.voucherId = this.$route.params.id
    this.roleId = this.$auth.$state.user['role']

    this.isTreasury = this.roleId == 6 ? false : true;

    await this.fetchItem()
    await this.getaccountinghead()
    setTimeout(() => {
      if (this.item.entries.length === 0) {
        for (var i = 1; i <= 4; i++) {
          this.item.entries.push({
            name: null,
            account_code: null,
            debit: null,
            credit: null,
          })
        }
      }
    }, 1000)
  },
  methods: {
    async fetchItem() {
      const url = this.$config.api

      this.$axios
        .$get('/api/disbursement/fetch/' + this.voucherId)
        .then((response) => {
          this.item = response.item;
          this.item.address = response.address;
          this.notes = response.notes;

          if (response.images) {
            for (const i in response.images) {
              this.images.push({ path: url + '/' + response.images[i] })
            }
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },

    async updateItem() {
      const updateUrl = this.roleId == 6 ? '/api/disbursement/update/' : '/api/disbursement/treasury/update/';
      this.$axios
        .$post(updateUrl + this.voucherId, this.item, {})
        .then((response) => {
          this.$toast.success('Voucher updated.')
          this.item = response.item
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async downloadpdf(id) {
      this.$toast.success('Processing')

      try {
        this.$axios
          .$post(`api/pdf/voucher/${id}`)
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
    toggleModal() {
      this.showModal = !this.showModal
    },

    async getaccountinghead() {
      this.$toast.success('Processing')

      try {
        this.$axios
          .$get(`api/signatories/head`)
          .then((res) => {
            res.signatories.forEach((value, index) => {
              switch (value['id']) {
                case 1:
                  this.department.budget = value['name']
                  break
                case 2:
                  this.department.treasury = value['name']
                  break
                case 3:
                  this.department.accounting = value['name']
                  this.item.certified_correct_by = value['name']
                  break
                case 4:
                  this.department.localchiefexecutive = value['name']
                  break
                case 5:
                  this.department.cityadministrator = value['name']
                  break
              }
            })
            this.item.certified_correct_by = this.department.accounting
            console.log(this.department.accounting)
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
