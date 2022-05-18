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
                        <input class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-lgu" type="text" value="City Government of Malolos" readonly>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <input class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5" id="grid-fund" type="text" placeholder="Fund">
                        <input class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5" id="grid-dv" type="text" placeholder="DV No.">
                        <input class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1 mr-5" id="grid-date" type="date" placeholder="Date">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-payee" type="text" placeholder="Payee">
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-1" id="grid-address" type="text" placeholder="Address">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <input class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1" id="grid-id" type="text" placeholder="ID No./TIN">
                        <input class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1" id="grid-cafoa" type="text" placeholder="CAFOA No.">
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mr-5 my-1" id="grid-rc" type="text" placeholder="Responsibility Center">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-particulars">
                            Particulars
                        </label>
                        <textarea
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
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-amount" type="text" placeholder="Amount">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            A. Certified
                        </label>
                        <p class="text-xs">Expenses/Cash Advances necessary, valid, proper, lawful, and incurred under my direct supervision.</p>
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-office" type="text" placeholder="Office">
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
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-amount" type="text" placeholder="Amount">
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" value="Engr. Gilbert T. Gatchalian" readonly>
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-office" type="text" value="Local Chief Executive" readonly>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Payment
                        </label>
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-check" type="text" placeholder="Check No.">
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-bank" type="text" placeholder="Bank Name">
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="date">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            E. Received Payment
                        </label>
                        <input class="appearance-none w-full md:w-1/2 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                        <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="date">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            F. Accounting Entries
                        </label>
                        <div v-for="(n, key) in 4" :key="key">
                            <input class="appearance-none w-full md:w-1/3 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                            <input class="appearance-none w-full md:w-1/4 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="text" placeholder="Account Code">
                            <input class="appearance-none w-full md:w-1/5 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Debit">
                            <input class="appearance-none w-full md:w-1/5 bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-date" type="text" placeholder="Credit">
                            <hr>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Prepared By (Accounting Personnel)
                        </label>
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">
                            Certified Correct (Head, Accounting Division/Unit)
                        </label>
                        <input class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3" id="grid-name" type="text" placeholder="Name">
                    </div>
                </div>
                <div class="w-1/2 px-3 float-right my-5">
                    <button class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-1/2 float-right">Create</button>
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
     
    }
  },
  mounted() {
      
  },
  methods: {
    
  },
}
</script>
