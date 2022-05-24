<template>
  <div class="flex flex-wrap mt-4">
    <ModalSuccess
      @deleteconfirm="redirectToIndex()"
      :showmodal="showModal"
      type="success"
      :action="true"
      :cancel="false"
    >
      <span slot="title">Success</span>
      <span slot="description">{{ message }}</span>
      <span slot="btn-delete">Okay</span>
    </ModalSuccess>
    <div class="w-full mb-12 px-4">
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
          <p class="text-xs mt-5">Create Voucher</p>
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
                  v-model="payload.lgu"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-lgu"
                  type="text"
                  value="City Government of Malolos"
                  readonly
                />
                <small v-if="errors.lgu" class="text-xs text-red-500">{{
                  errors.lgu[0]
                }}</small>
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
                    v-model="payload.fund"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-fund"
                    type="text"
                    placeholder="Fund"
                  />
                  <small v-if="errors.fund" class="text-xs text-red-500">{{
                    errors.fund[0]
                  }}</small>
                </div>
                <div class="w-full md:w-1/3 md:px-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >DV No.</label
                  >
                  <input
                    v-model="payload.dv_no"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-dv"
                    type="text"
                    placeholder="DV No."
                  />
                  <small v-if="errors.dv_no" class="text-xs text-red-500">{{
                    errors.dv_no[0]
                  }}</small>
                </div>
                <div class="w-full md:w-1/3 md:pl-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >Date</label
                  >
                  <input
                    v-model="payload.date"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5"
                    id="grid-date"
                    type="date"
                    placeholder="Date"
                  />
                  <small v-if="errors.date" class="text-xs text-red-500">{{
                    errors.date[0]
                  }}</small>
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
                  v-model="payload.payee"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-payee"
                  type="text"
                  placeholder="Payee"
                />
                <p v-if="errors.payee" class="text-xs text-red-500 mb-2">
                  {{ errors.payee[0] }}
                </p>

                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                  >Address</label
                >
                <input
                  v-model="payload.address"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1"
                  id="grid-address"
                  type="text"
                  placeholder="Address"
                />
                <small v-if="errors.address" class="text-xs text-red-500">{{
                  errors.address[0]
                }}</small>
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
                    v-model="payload.id_no"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1"
                    id="grid-id"
                    type="text"
                    placeholder="ID No./TIN"
                  />
                  <small v-if="errors.id_no" class="text-xs text-red-500">{{
                    errors.id_no[0]
                  }}</small>
                </div>
                <div class="w-full md:w-1/3 md:px-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >CAFOA No.</label
                  >
                  <input
                    v-model="payload.cafoa_id"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1"
                    id="grid-cafoa"
                    type="text"
                    placeholder="CAFOA No."
                  />
                  <small v-if="errors.cafoa_id" class="text-xs text-red-500">{{
                    errors.cafoa_id[0]
                  }}</small>
                </div>
                <div class="w-full md:w-1/3 md:pl-3 py-2">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-request"
                    >Responsibilty Center</label
                  >
                  <input
                    v-model="payload.responsibility_center"
                    class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1"
                    id="grid-rc"
                    type="text"
                    placeholder="Responsibility Center"
                  />
                  <small
                    v-if="errors.responsibility_center"
                    class="text-xs text-red-500"
                    >{{ errors.responsibility_center[0] }}</small
                  >
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
                  v-model="payload.particulars_description"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="grid-function"
                  rows="3"
                  placeholder="Type particulars here"
                ></textarea>
                <p
                  v-if="errors.particulars_description"
                  class="text-xs text-red-500 mb-2"
                >
                  {{ errors.particulars_description[0] }}
                </p>
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-5 mb-0"
                  for="grid-particulars"
                >
                  Amount
                </label>
                <input
                  v-model="payload.particulars_amount"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-amount"
                  type="text"
                  placeholder="Amount"
                />
                <small
                  v-if="errors.particulars_amount"
                  class="text-xs text-red-500"
                  >{{ errors.particulars_amount[0] }}</small
                >
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
                      v-model="payload.requesting_official"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      placeholder="Name"
                    />
                    <small
                      v-if="errors.requesting_official"
                      class="text-xs text-red-500"
                      >This field is required.</small
                    >
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <input
                      v-model="payload.requesting_office"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-office"
                      type="text"
                      placeholder="Office"
                    />
                    <small
                      v-if="errors.requesting_office"
                      class="text-xs text-red-500"
                      >This field is required.</small
                    >
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
                      value="Ma. Eugene T. Dimagiba"
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
                      value="Anthony A. Mendoza"
                      disabled
                    />
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
                  v-model="payload.approved_payment"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-amount"
                  type="text"
                  placeholder="Amount"
                />
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <input
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      value="Engr. Gilbert T. Gatchalian"
                      disabled
                    />
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
                  v-model="payload.check_no"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-check"
                  type="text"
                  placeholder="Check No."
                />
                <p v-if="errors.check_no" class="text-xs text-red-500 mb-2">
                  {{ errors.check_no[0] }}
                </p>
                <div class="w-full flex flex-wrap">
                  <div class="w-full md:w-1/2 md:pr-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Bank Name</label
                    >
                    <input
                      v-model="payload.bank_name"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-bank"
                      type="text"
                      placeholder="Bank Name"
                    />
                    <small
                      v-if="errors.bank_name"
                      class="text-xs text-red-500"
                      >{{ errors.bank_name[0] }}</small
                    >
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Date</label
                    >
                    <input
                      v-model="payload.check_date"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="date"
                    />
                    <small
                      v-if="errors.check_date"
                      class="text-xs text-red-500"
                      >{{ errors.check_date[0] }}</small
                    >
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
                      v-model="payload.receiver_name"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-bank"
                      type="text"
                      placeholder="Bank Name"
                    />
                    <small
                      v-if="errors.receiver_name"
                      class="text-xs text-red-500"
                      >{{ errors.receiver_name[0] }}</small
                    >
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Date</label
                    >
                    <input
                      v-model="payload.receive_date"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="date"
                    />
                    <small
                      v-if="errors.receive_date"
                      class="text-xs text-red-500"
                      >{{ errors.receive_date[0] }}</small
                    >
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
                  class="border-1 py-2 px-3 rounded w-full flex flex-wrap my-2"
                  v-for="(n, key) in 4"
                  :key="key"
                >
                  <div class="w-full md:w-1/4 md:pr-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Name</label
                    >
                    <input
                      v-model="accountNames[key]"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      placeholder="Name"
                    />
                  </div>

                  <div class="w-full md:w-1/4 md:px-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Account Code</label
                    >
                    <input
                      v-model="accountCodes[key]"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="text"
                      placeholder="Account Code"
                    />
                  </div>

                  <div class="w-full md:w-1/4 md:px-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Debit</label
                    >
                    <input
                      v-model="accountDebits[key]"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-name"
                      type="text"
                      placeholder="Debit"
                    />
                  </div>

                  <div class="w-full md:w-1/4 md:pl-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold"
                      for="grid-request"
                      >Credit</label
                    >
                    <input
                      v-model="accountCredits[key]"
                      class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                      id="grid-date"
                      type="text"
                      placeholder="Credit"
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
                  v-model="payload.prepared_by"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-name"
                  type="text"
                  placeholder="Name"
                />
                <small v-if="errors.prepared_by" class="text-xs text-red-500">{{
                  errors.prepared_by[0]
                }}</small>
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
                  v-model="payload.certified_correct_by"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-name"
                  type="text"
                  placeholder="Name"
                />
                <small
                  v-if="errors.certified_correct_by"
                  class="text-xs text-red-500"
                  >{{ errors.certified_correct_by[0] }}</small
                >
              </div>
            </div>
            <div class="w-full flex flex-wrap justify-end my-5">
              <button
                type="button"
                @click="create"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
              >
                Create
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
import ModalSuccess from '@/components/Modals/Modal.vue'
export default {
  mixins: [disbursementvoucher],
  components: {
    ModalSuccess,
  },
  layout: 'dashboard',
  data() {
    return {
      showModal: false,
      payload: {
        lgu: 'City Government of Malolos',
        fund: null,
        dv_no: null,
        date: null,
        payee: null,
        address: null,
        id_no: null,
        cafoa_id: null,
        responsibility_center: null,
        particulars_description: null,
        particulars_amount: null,
        requesting_official: null,
        requesting_office: null,
        approved_payment: null,
        check_no: null,
        bank_name: null,
        check_date: null,
        receiver_name: null,
        receive_date: null,
        accounting_entries: [],
        prepared_by: null,
        certified_correct_by: null,
      },

      accountNames: [],
      accountCodes: [],
      accountDebits: [],
      accountCredits: [],

      errors: [],
    }
  },
  mounted() {},
  methods: {
    create() {
      this.payload.accounting_entries = []

      this.accountNames.map((name, index) => {
        this.payload.accounting_entries.push({
          name: name,
          code: this.accountCodes[index],
          debit: this.accountDebits[index],
          credit: this.accountCredits[index],
        })
      })

      this.$axios
        .$post('api/disbursement/store', this.payload)
        .then((res) => {
          this.message = res.message
          this.toggleModal()
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          this.$toast.error(error.response.data.message)
        })
    },

    toggleModal() {
      this.showModal = !this.showModal
    },

    redirectToIndex() {
      window.location.href = '/forms/disbursement'
    },
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
