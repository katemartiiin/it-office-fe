<template>
  <div class="flex flex-wrap mt-4">
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
                        <select v-model="payload.request" class="form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" aria-label="Default select example">
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
                        <div class="requested-amount-group flex flex-wrap my-3" v-for="(req, index) in requestedAmounts" :key="index">
                            <input v-model="allotmentCodes[index]" class="appearance-none block w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Allotment Code">
                            <input v-model="expensesCodes[index]" class="appearance-none block w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Expenses Code">
                            <input v-model="amountData[index]" class="appearance-none block w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Amount">
                            <a class="ml-3 block hover:text-red-600 tracking-wide text-red-500 text-xs font-bold my-auto" href="#" @click.prevent="removeRequestAmount(index)">X</a>
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
                        <div class="total-amount-group flex flex-wrap my-3">
                            <input v-model="payload.requestingOfficial" class="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-3" id="grid-payee" type="text" placeholder="Name of Official">
                            <select v-model="payload.requestingOffice" class="w-1/3 form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" aria-label="Default select example">
                                <option v-for="office in offices" :key="office.id" :value="office.name">{{ office.name }}</option>
                            </select>
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
                        <div v-for="(ledger, key) in ledgers" :key="key" 
                            class="total-amount-group flex flex-wrap my-3">
                            <input v-model="ledgerDates[key]" class="text-xs appearance-none block w-1/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-1" id="grid-payee" type="date" placeholder="Date">
                            <input v-model="ledgerParticulars[key]" class="text-xs appearance-none block w-1/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-1" id="grid-payee" type="text" placeholder="Particular">
                            <input v-model="ledgerLiquidations[key]" class="text-xs appearance-none block w-1/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-1" id="grid-payee" type="text" placeholder="Liquidations">
                            <input v-model="ledgerObligations[key]" class="text-xs appearance-none block w-1/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-1" id="grid-payee" type="text" placeholder="Obligation Increase (Decrease)">
                            <input v-model="ledgerBalances[key]" class="text-xs appearance-none block w-1/6 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-payee" type="text" placeholder="Balance">
                            <a class="ml-3 block hover:text-red-600 tracking-wide text-red-500 text-xs font-bold my-auto" href="#" @click.prevent="removeLedger(key)">X</a>
                        </div>
                    </div>
                </div>
                <div class="w-1/2 px-3 float-right my-5">
                    <button type="button" @click="create" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-1/2 float-right">Create</button>
                </div>
            </form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      payload: {
          request: "Medical Assistance", // default
          payee: null,
          function: null,
          requestedAmounts: [],
          totalAmount: null,
          requestingOfficial: null,
          requestingOffice: "City Mayor's Office", // default
          ledgers: [],
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
            this.payload.totalAmount += this.amountData[index];
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

        // To do: axios request, send payload
    },
  },
}
</script>
