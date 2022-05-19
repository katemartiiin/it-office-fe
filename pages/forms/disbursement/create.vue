<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
    
      <NuxtLink to="/forms/disbursement" class="text-sm font-medium tracking-wide">
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
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Local Government Unit
                        </label>
                        <input v-model="payload.lgu" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-lgu" type="text" value="City Government of Malolos" readonly>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <input v-model="payload.fund" class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5" id="grid-fund" type="text" placeholder="Fund">
                        <input v-model="payload.dv_no" class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5" id="grid-dv" type="text" placeholder="DV No.">
                        <input v-model="payload.date" class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5" id="grid-date" type="date" placeholder="Date">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <input v-model="payload.payee" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-payee" type="text" placeholder="Payee">
                        <input v-model="payload.address" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1" id="grid-address" type="text" placeholder="Address">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <input v-model="payload.id_no" class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1" id="grid-id" type="text" placeholder="ID No./TIN">
                        <input v-model="payload.cafoa_id" class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1" id="grid-cafoa" type="text" placeholder="CAFOA No.">
                        <input v-model="payload.responsibility_center" class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1" id="grid-rc" type="text" placeholder="Responsibility Center">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-particulars">
                            Particulars
                        </label>
                        <textarea
                        v-model="payload.particulars_description"
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
                        placeholder="Type particulars here"
                        ></textarea>
                        <input v-model="payload.particulars_amount" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-amount" type="text" placeholder="Amount">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            A. Certified
                        </label>
                        <p class="text-xs">Expenses/Cash Advances necessary, valid, proper, lawful, and incurred under my direct supervision.</p>
                        <input v-model="payload.requesting_official" class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                        <input v-model="payload.requesting_office" class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-office" type="text" placeholder="Office">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            B. Certified
                        </label>
                        <p class="text-xs">Completeness and propriety of supporting documents/previous cash advance liquidated/existence of funds held in trust.</p>
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" value="Ma. Eugene T. Dimagiba" readonly>
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-office" type="text" value="Head of Accounting Department/Office" readonly>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            C. Certified
                        </label>
                        <p class="text-xs">Funds available for the purpose</p>
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" value="Anthony A. Mendoza" readonly>
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-office" type="text" value="Head of Treasury Department/Office" readonly>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            D. Approved For Payment
                        </label>
                        <input v-model="payload.approved_payment" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-amount" type="text" placeholder="Amount">
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" value="Engr. Gilbert T. Gatchalian" readonly>
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-office" type="text" value="Local Chief Executive" readonly>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Payment
                        </label>
                        <input v-model="payload.check_no" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-check" type="text" placeholder="Check No.">
                        <input v-model="payload.bank_name" class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-bank" type="text" placeholder="Bank Name">
                        <input v-model="payload.check_date" class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="date">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            E. Received Payment
                        </label>
                        <input v-model="payload.receiver_name" class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                        <input v-model="payload.receive_date" class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="date">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            F. Accounting Entries
                        </label>
                        <div v-for="(n, key) in 4" :key="key">
                            <input v-model="accountNames[key]" class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                            <input v-model="accountCodes[key]" class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="text" placeholder="Account Code">
                            <input v-model="accountDebits[key]" class="appearance-none w-full md:w-1/5 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Debit">
                            <input v-model="accountCredits[key]" class="appearance-none w-full md:w-1/5 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="text" placeholder="Credit">
                            <hr>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Prepared By (Accounting Personnel)
                        </label>
                        <input v-model="payload.prepared_by" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Certified Correct (Head, Accounting Division/Unit)
                        </label>
                        <input v-model="payload.certified_correct_by" class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
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
          lgu: "City Government of Malolos",
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

    }
  },
  mounted() {
      
  },
  methods: {
    create() {
        this.payload.accounting_entries = [];

        this.accountNames.map((name, index) => {
            this.payload.accounting_entries.push({
                name: name,
                code: accountCodes[index],
                debit: accountDebits[index],
                credit: accountCredits[index]
            });
        });

        // To do: axios request, send payload
    },
  },
}
</script>
