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
    
      <NuxtLink to="/forms/cafoa" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
            <p class="text-xs mt-5">Create Request</p>
            <h1 class="text-xl font-bold mb-5">CERTIFICATION ON APPROPRIATIONS, FUNDS AND OBLIGATION OF ALLOTMENT</h1>
            <form class="w-full">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Request
                        </label>
                        <select v-model="payload.requestType" class="form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" aria-label="Default select example">
                            <option v-for="request in requests" :key="request.id" :value="request.name">{{ request.name }}</option>
                        </select>
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-payee">
                            Payee
                        </label>
                        <input v-model="payload.payee" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Name of Payee">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Obligation No.
                        </label>
                        <input v-model="payload.obligationNo" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Obligation No.">
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-payee">
                            Approved Amount
                        </label>
                        <input v-model="payload.approvedAmount" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Approved Amount">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-function">
                            Function
                        </label>
                        <textarea
                        v-model="payload.function"
                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-gray-100 bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="grid-function"
                        rows="3"
                        placeholder="Type function here"
                        ></textarea>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <div class="requested-amount-header flex flex-wrap my-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Requested Amount
                            </label>
                            <a v-if="requestedAmounts.length < 6" class="ml-3 block hover:text-green-600 tracking-wide text-green-500 text-xs font-bold mb-2" href="#" @click.prevent="addRequestAmount"><small>Add amount</small></a>
                        </div>
                        <div class="w-full border-1 p-2 border-gray-200 rounded requested-amount-group flex flex-wrap my-3" v-for="(req, index) in requestedAmounts" :key="index">
                            <div class="w-full md:w-1/4 md:pr-2 py-2">
                                <input v-model="allotmentCodes[index]" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Allotment Code">
                            </div>
                            <div class="w-full md:w-1/4 md:px-2 py-2">
                                <input v-model="expensesCodes[index]" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Expenses Code">
                            </div>
                            <div class="w-full md:w-1/4 md:px-2 py-2">
                                <input v-model="amountData[index]" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Amount">
                            </div>
                            <div class="w-full md:w-1/4 md:pl-2 py-2">
                                <a class="h-full rounded text-center py-3 block hover:bg-red-500 tracking-wide bg-red-400 text-white text-xs font-bold my-auto" href="#" @click.prevent="removeRequestAmount(index)">Remove</a>   
                            </div>                  
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <div class="requested-amount-header flex flex-wrap my-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Requesting Official
                            </label>
                        </div>
                        <div class="w-full total-amount-group flex flex-wrap my-3">
                            <div class="w-full md:w-1/2 md:pr-2 py-2">
                                <input v-model="payload.requestingOfficial" class="w-full appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Name of Official">
                            </div>
                            <div class="w-full md:w-1/2 md:pl-2 py-2">
                                <select v-model="payload.requestingOffice" class="form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                    <option v-for="office in offices" :key="office.id" :value="office.name">{{ office.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <div class="ledger-group-header flex flex-wrap my-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Subsidiary Ledger
                            </label>
                            <a v-if="ledgers.length < 4" class="ml-3 block hover:text-green-600 tracking-wide text-green-500 text-xs font-bold mb-2" href="#" @click.prevent="addLedger"><small>Add ledger</small></a>
                        </div>
                        <div v-for="(ledger, key) in ledgers" :key="key" class="border-1 p-2 rounded w-full total-amount-group flex flex-wrap my-3">
                            <div class="w-full flex flex-wrap">
                                <div class="w-full md:w-1/3 md:pr-2 py-2">
                                    <input v-model="ledgerDates[key]" class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="date" placeholder="Date">
                                </div>
                                <div class="w-full md:w-1/3 md:px-2 py-2">
                                    <input v-model="ledgerParticulars[key]" class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Particular">
                                </div>
                                <div class="w-full md:w-1/3 md:pl-2 py-2">
                                    <input v-model="ledgerLiquidations[key]" class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Liquidations">
                                </div>
                            </div>
                            <div class="w-full flex flex-wrap">
                                <div class="w-full md:w-1/3 md:pr-2 py-2">
                                    <input v-model="ledgerObligations[key]" class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Obligation Increase (Decrease)">
                                </div>
                                <div class="w-full md:w-1/3 md:px-2 py-2">
                                    <input v-model="ledgerBalances[key]" class="w-full text-xs appearance-none block bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Balance">
                                </div>
                                <div class="w-full md:w-1/3 md:pl-2 py-2">
                                    <a class="h-full rounded text-center py-3 block hover:bg-red-500 tracking-wide bg-red-400 text-white text-xs font-bold my-auto" href="#" @click.prevent="removeLedger(key)">Remove</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label for="formFileMultiple" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Supporting Files</label>
                        <input class="form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            type="file" 
                            id="formFileMultiple" 
                            multiple
                        >
                    </div>
                </div>
                <div class="w-full flex flex-wrap justify-end my-5">
                    <button type="button" @click="create" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3">Create</button>
                </div>
            </form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import ModalSuccess from '@/components/Modals/Modal.vue';
export default {
  components: {
    ModalSuccess,
  },
  layout: 'dashboard',
  data() {
    return {
      showModal: false,
      payload: {
          requestType: "Medical Assistance", // default
          payee: null,
          function: null,
          requestedAmounts: [],
          totalAmount: 0,
          requestingOfficial: null,
          requestingOffice: "City Mayor's Office", // default
          ledgers: [],
          approvedAmount: null,
          obligationNo: null,
      },
      requests: [
          { id: 1, name: "Medical Assistance" },
          { id: 2, name: "Burial Assistance" },
          { id: 3, name: "Financial Assistance" },
      ],

      requestedAmounts: [],
      requestAmount: {
          allotmentCode: null,
          expensesCode: null,
          amount: null,
      },
      allotmentCodes: [],
      expensesCodes: [],
      amountData: [],

      offices: [
          { id: 1, name: "City Mayor's Office" },
          { id: 2, name: "Chief-of-Staff" },
          { id: 3, name: "City Disaster Risk Reduction Management Office" },
          { id: 4, name: "City Information & Technology Office" },
          { id: 5, name: "City Traffic Management Office" },
          { id: 6, name: "City Environment & Management Office" },
          { id: 7, name: "City Information Office" },
          { id: 7, name: "City Tourism, Arts, Culture & Sports Division" },
          { id: 8, name: "Sangguniang Panlungsod ng Lungsod ng Malolos" },
          { id: 9, name: "City Administrator’s Office" },
          { id: 10, name: "City Treasury Office" },
          { id: 11, name: "City Assessor Office" },
          { id: 12, name: "City Accounting Office" },
          { id: 13, name: "City Budget Office" },
          { id: 14, name: "City Planning & Development Office" },
          { id: 15, name: "City Engineering Office" },
          { id: 16, name: "City Health Office" },
          { id: 17, name: "City Civil Registry Office" },
          { id: 18, name: "City Legal Office" },
          { id: 19, name: "City Social Welfare & Development Office" },
          { id: 20, name: "City Architect’s Office" },
          { id: 21, name: "City Agriculture Office" },
          { id: 22, name: "City Training Employment & Cooperative Office" },
          { id: 23, name: "City Economic Enterprise & Development Office" },
          { id: 24, name: "City Veterinary Office" },
          { id: 25, name: "City General Services Office" },
          { id: 26, name: "City Human Resource Management Office" }
      ],

      ledgers: [],
      ledger: { date: null, particular: null, liquidation: null, obligation: null, balance: null },
      ledgerDates: [],
      ledgerParticulars: [],
      ledgerLiquidations: [],
      ledgerObligations: [],
      ledgerBalances: [],

      errors: [],
      message: null,
    }
  },
  
  mounted() {
      this.requestedAmounts.push(this.requestAmount);
      this.ledgers.push(this.ledger);
  },
  methods: {
    addRequestAmount() {
        if (this.requestedAmounts.length < 6 ) {
            this.requestedAmounts.push(this.requestAmount);
        }
    },

    removeRequestAmount(index) {
        this.requestedAmounts.splice(index);
    },

    addLedger() {
        if (this.ledgers.length < 4) {
            this.ledgers.push(this.ledger);
        }
    },

    removeLedger(index) {
        this.ledgers.splice(index);
    },

    create() {
        this.payload.requestedAmounts = [];

        this.requestedAmounts.map((amount, index) => {
            this.payload.totalAmount += parseFloat(this.amountData[index]);
            this.payload.requestedAmounts.push({ allotmentCode: this.allotmentCodes[index], expensesCode: this.expensesCodes[index], amount: this.amountData[index] });
        });

        this.payload.ledgers = [];

        this.ledgers.map((ledger, key) => {
            this.payload.ledgers.push({
                date: this.ledgerDates[key],
                particulars: this.ledgerParticulars[key],
                liquidation: this.ledgerParticulars[key],
                obligation: this.ledgerObligations[key],
                balance: this.ledgerBalances[key]
            });
        });

        this.$axios
            .$post('api/cafoa/store', this.payload)
            .then((res) => {
                this.message = res.message;
                this.toggleModal();
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
            });
    },

    toggleModal() {
      this.showModal = !this.showModal;
    },

    redirectToIndex() {
        window.location.href = '/forms/cafoa';
    }
  },
}
</script>
<style scoped>
.border-1 {
    border-width: 0.5px;
}
</style>
