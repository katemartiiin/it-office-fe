<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/requests" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <p class="text-xs mt-5">Request No. {{ this.$route.params.id }}</p>
          <h1 class="text-xl font-bold mb-5">
            Financial Assistance Letter to Local Chief Executive
          </h1>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Control Number
            </label>
            <input
              v-model="response.control_number"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Control Number"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Payee
            </label>
            <input
              v-model="response.name"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Name of Payee"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Type of Request
            </label>
            <input
              v-model="response.typeofrequest"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Type of request"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Description
            </label>
            <input
              v-model="response.description"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Description"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Requested Amount
            </label>
            <input
              v-model="response.requestamount"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Requested Amount"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Request Date
            </label>
            <input
              v-model="response.requestdate"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Requested Date"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-request"
            >
              Requesting Official
            </label>

            <select
              class="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              v-model="response.signatories_id"
              disabled
            >
              <option
                v-for="request in signatories"
                :key="request.id"
                :value="request.id"
              >
                {{ request.name }}
              </option>
            </select>
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Approved Amount
            </label>
            <input
              v-model="response.approved_amount"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Approved Amount"
              readonly
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-payee"
              >
                Remarks
              </label>
              <textarea
                  v-model="response.remarks"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="grid-function"
                  rows="3"
                  readonly
              ></textarea>
            </div>
          <div
            class="border-dashed border-2 border-sky-500 bg-gray-300 p-4 w-full content-center px-3"
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
    </div>
  </div>
</template>
<script>
import { requestform } from '~/mixins/middleware/requestform_pages.js'
export default {
  head() {
    return {
      title: 'Form Request',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [requestform],
  components: {},
  layout: 'dashboard',
  data() {
    return {
      payload: {
        name: '',
        control_number: '',
        file: '',
      },
      response: {
        name: '',
        control_number: '',
        file: '',
      },
      item: '',
      images: [],
      signatories: [],
      errors: []
    }
  },

  async mounted() {
    this.requestform_id = this.$route.params.id
    await this.fetchItem()
    await this.fetchrequestingofficial()
  },
  methods: {
    async fetchItem() {
      const url = this.$config.api

      this.$axios
        .$get('/api/requestform/yield/' + this.requestform_id)
        .then((response) => {
          this.item = response.item
          this.response.name = response.form.payee
          this.response.name = response.form.citizen_name
          this.response.control_number = response.form.control_number
          this.response.typeofrequest = response.form.typeofrequest
          this.response.description = response.form.description
          this.response.requestamount = response.form.requestamount
          this.response.requestdate = response.form.requestdate
          this.response.approved_amount = response.form.approved_amount
          this.response.remarks = response.form.remarks
          this.response.signatories_id = response.form.signatories_id

          var data = []
          if (response.file) {
            for (const i in response.file) {
              data.push({
                path: url + '/' + response.file[i].file,
              })
            }
            this.images = data
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async fetchrequestingofficial() {
      this.$axios
        .get('/api/signatories/requestingofficial')
        .then((response) => {

          this.signatories = response.data.data

        })
        .catch((error) => {
          this.$toast.error('Error:')
          this.errors.value = true
          this.errors.message = error.response.data.errors
          if (error.response) {
            for (var key in error.response.data.errors) {
              if (error.response.data.errors.hasOwnProperty(key)) {
                this.$toast.error(error.response.data.errors[key])
              }
            }
          }
        })
    },
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
