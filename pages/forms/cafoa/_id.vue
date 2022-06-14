<template>
  <div class="flex flex-wrap mt-4">
    <ModalSuccess
      @deleteconfirm="toggleModal()"
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
      <NuxtLink to="/forms/cafoa" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <p class="text-xs mt-5">
            CAFOA No. <strong>{{ item.control_no }}</strong>
          </p>
          <h1 class="text-xl font-bold mb-5">
            CERTIFICATION ON APPROPRIATIONS, FUNDS AND OBLIGATION OF ALLOTMENT
          </h1>
          <form class="w-full">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 py-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Request
                </label>
                <select
                  v-model="item.request"
                  class="form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  aria-label="Default select example"
                  disabled
                >
                  <option
                    v-for="request in requests"
                    :key="request.id"
                    :value="request.name"
                  >
                    {{ request.name }}
                  </option>
                </select>
              </div>
              <div class="w-full md:w-1/2 px-3 py-2">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-payee"
                >
                  Payee
                </label>
                <input
                  v-model="item.payee"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Name of Payee"
                  disabled
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Obligation No.
                </label>
                <input
                  v-model="item.obligation_no"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Obligation No."
                  disabled
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-payee"
                >
                  Approved Amount
                </label>
                <input
                  v-model="item.approved_amount"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Approved Amount"
                  disabled
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-function"
                >
                  Function
                </label>
                <textarea
                  v-model="item.function"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="grid-function"
                  rows="3"
                  placeholder="Type function here"
                  disabled
                ></textarea>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <div class="requested-amount-header flex flex-wrap my-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Requested Amount
                  </label>
                </div>
                <div
                  class="w-full border-1 p-2 border-gray-200 rounded requested-amount-group flex flex-wrap my-3"
                  v-for="(amount, index) in item.amounts"
                  :key="index"
                >
                  <div class="w-full md:w-1/3 md:pr-2 py-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                      >Allotment Code</label
                    >
                    <input
                      v-model="amount.allotment_code"
                      class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3"
                      id="grid-payee"
                      type="text"
                      placeholder="Allotment Code"
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/3 md:px-2 py-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                      >Expenses Code</label
                    >
                    <input
                      v-model="amount.expenses_code"
                      class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3"
                      id="grid-payee"
                      type="text"
                      placeholder="Expenses Code"
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/3 md:px-2 py-2">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-password"
                      >Amount</label
                    >
                    <input
                      v-model="amount.amount"
                      class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3"
                      id="grid-payee"
                      type="text"
                      placeholder="Amount"
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <div class="requested-amount-header flex flex-wrap my-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Requesting Official
                  </label>
                </div>
                <div class="w-full total-amount-group flex flex-wrap my-3">
                  <div class="w-full md:w-1/2 md:pr-2 py-2">
                    <input
                      v-model="item.requesting_official"
                      class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-payee"
                      type="text"
                      placeholder="Name of Official"
                      disabled
                    />
                  </div>
                  <div class="w-full md:w-1/2 md:pl-2 py-2">
                    <select
                      v-model="item.requesting_office"
                      class="form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      disabled
                    >
                      <option
                        v-for="office in offices"
                        :key="office.id"
                        :value="office.name"
                      >
                        {{ office.name }}
                      </option>
                    </select>
                  </div>
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
                    Subsidiary Ledger
                  </label>
                  <!-- <a v-if="item.ledgerCount < 4" class="ml-3 block hover:text-green-600 tracking-wide text-green-500 text-xs font-bold mb-2" href="#" @click.prevent="addLedger"><small>Add ledger</small></a> -->
                </div>
                <div v-if="item.ledgerCount == 0">
                  <p class="text-xs">No subsidiary ledgers added.</p>
                </div>
                <div v-else>
                  <div
                    v-for="(ledger, key) in item.ledgers"
                    :key="key"
                    class="border-1 p-2 rounded w-full total-amount-group flex flex-wrap my-3"
                  >
                    <div class="w-full flex flex-wrap">
                      <div class="w-full md:w-1/3 md:pr-2 py-2">
                        <input
                          v-model="ledger.date"
                          class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-payee"
                          type="date"
                          placeholder="Date"
                        />
                      </div>
                      <div class="w-full md:w-1/3 md:px-2 py-2">
                        <input
                          v-model="ledger.particulars"
                          class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-payee"
                          type="text"
                          placeholder="Particular"
                        />
                      </div>
                      <div class="w-full md:w-1/3 md:pl-2 py-2">
                        <input
                          v-model="ledger.liquidations"
                          class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-payee"
                          type="text"
                          placeholder="Liquidations"
                        />
                      </div>
                    </div>
                    <div class="w-full flex flex-wrap">
                      <div class="w-full md:w-1/2 md:pr-2 py-2">
                        <input
                          v-model="ledger.obligation"
                          class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-payee"
                          type="text"
                          placeholder="Obligation Increase (Decrease)"
                        />
                      </div>
                      <div class="w-full md:w-1/2 md:px-2 py-2">
                        <input
                          v-model="ledger.balance"
                          class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-payee"
                          type="text"
                          placeholder="Balance"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <div class="requested-amount-header flex flex-wrap my-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >
                    Required Documents
                  </label>
                </div>
                <div class="w-full total-amount-group flex flex-wrap my-3">
                  <div class="w-full md:w-1/2 md:pr-2 py-2">
                    <div class="form-check">
                      <input v-model="item.complete_docs" class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="flexCheckChecked" disabled>
                      <label class="form-check-label inline-block text-gray-800" for="flexCheckChecked">
                        Received complete required documents
                      </label>
                    </div>
                  </div>
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
              <a
                @click.prevent="downloadpdf(item.id)"
                class="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
              >
                <i class="fas fa-print mr-2"></i>
                Print
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSuccess from '@/components/Modals/Modal.vue'
import { cafoa } from '~/mixins/middleware/cafoa_pages.js'
export default {
  head() {
    return {
      title: 'Cafoa',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [cafoa],
  components: {
    ModalSuccess,
  },
  layout: 'dashboard',
  data() {
    return {
      showModal: false,
      cafoaNo: null,
      requests: [
        { id: 1, name: 'Medical - Hospital Bill' },
        { id: 2, name: 'Medical - Medications / Laboratory Expenses' },
        { id: 3, name: 'Medical - Hemodialysis / Chemotherapy' },
        { id: 4, name: 'Burial' },
        { id: 5, name: 'Financial' },
      ],
      offices: [
        { id: 1, name: "City Mayor's Office" },
        { id: 2, name: 'Chief-of-Staff' },
        { id: 3, name: 'City Disaster Risk Reduction Management Office' },
        { id: 4, name: 'City Information & Technology Office' },
        { id: 5, name: 'City Traffic Management Office' },
        { id: 6, name: 'City Environment & Management Office' },
        { id: 7, name: 'City Information Office' },
        { id: 7, name: 'City Tourism, Arts, Culture & Sports Division' },
        { id: 8, name: 'Sangguniang Panlungsod ng Lungsod ng Malolos' },
        { id: 9, name: 'City Administrator’s Office' },
        { id: 10, name: 'City Treasury Office' },
        { id: 11, name: 'City Assessor Office' },
        { id: 12, name: 'City Accounting Office' },
        { id: 13, name: 'City Budget Office' },
        { id: 14, name: 'City Planning & Development Office' },
        { id: 15, name: 'City Engineering Office' },
        { id: 16, name: 'City Health Office' },
        { id: 17, name: 'City Civil Registry Office' },
        { id: 18, name: 'City Legal Office' },
        { id: 19, name: 'City Social Welfare & Development Office' },
        { id: 20, name: 'City Architect’s Office' },
        { id: 21, name: 'City Agriculture Office' },
        { id: 22, name: 'City Training Employment & Cooperative Office' },
        { id: 23, name: 'City Economic Enterprise & Development Office' },
        { id: 24, name: 'City Veterinary Office' },
        { id: 25, name: 'City General Services Office' },
        { id: 26, name: 'City Human Resource Management Office' },
      ],
      item: {},
      message: null,
      images: [],
    }
  },

  mounted() {
    this.cafoaNo = this.$route.params.id
    this.fetchItem()
  },
  methods: {
    async fetchItem() {
      const url = this.$config.api

      this.$axios
        .$get('/api/cafoa/fetch/' + this.cafoaNo)
        .then((response) => {
          this.item = response.item
          if (this.item.images) {
            for (const i in this.item.images) {
              this.images.push({ path: url + '/' + this.item.images[i] })
            }
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    addLedger() {
      if (this.item.ledgerCount < 4) {
        this.item.ledgerCount++
        this.item.ledgers.push({
          date: null,
          particulars: null,
          liquidations: null,
          obligation: null,
          balance: null,
        })
      }
    },

    save() {
      this.$axios
        .$post('/api/cafoa/update/' + this.cafoaNo, {
          ledgers: this.item.ledgers,
        })
        .then((response) => {
          this.message = response.message
          this.toggleModal()
        })
        .catch((error) => {})
    },

    toggleModal() {
      this.showModal = !this.showModal
    },

    async downloadpdf(id) {
      this.$toast.success('Processing')

      try {
        this.$axios
          .$post(`/api/pdf/cafoa/${id}`)
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
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
