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
      <span slot="description">{{ response.message }}</span>
      <span slot="btn-delete">Okay</span>
    </ModalSuccess>
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/requests" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>
      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <h1 class="text-xl font-bold mb-5">Create Request</h1>
          <form ref="requestForm" class="w-full">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 pb-2 mb-6">
                <div
                  class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4"
                  v-if="errors.value == true"
                  role="alert"
                >
                  <div class="w-full">
                    <button
                      class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded float-right"
                      title="Delete"
                      @click.prevent="hideError()"
                    >
                      <i class="fa fa-close"></i>
                    </button>
                  </div>
                  <p class="font-bold">Error</p>
                  <p>{{ this.errors.message }}</p>
                </div>
              </div>

              <div class="w-full md:w-1/2 px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-6"
                  for="grid-payee"
                >
                  Citizen's Name
                  <small class="pl-2"
                    >If citizen's name is not on the list,
                    <NuxtLink
                      :to="'/forms/citizens/create'"
                      class="underline hover:text-green-500"
                      >create record here.</NuxtLink
                    ></small
                  >
                </label>

                <v-selectize
                  key-by="id"
                  label="full_name"
                  :searchFn="search"
                  :create-item="false"
                  :options="options"
                  v-model="citizenname"
                  disableSearch
                  @blur="$v.citizenname.$touch()"
                  @input="$v.citizenname.$touch()"
                  :error-messages="citizennameErrors"
                >
                  <template v-slot:option="{ option }">
                    <div class="text-base">
                      <i class="fa fa-user"></i>
                      <b class="ml-1">{{ option.full_name }}</b>
                      <span v-if="beginsearch == true"
                        >Address : {{ option.res_street }} |
                        Birthdate (mm-dd-yyyy) : {{ option.dob_month }}-
                        {{ option.dob_day }}-{{ option.dob_year }}
                      </span>
                    </div>
                  </template>
                </v-selectize>

                <!-- <template v-if="$v.request_citizenname.$error">
                  <div
                    v-if="!$v.request_citizenname.required"
                    class="errorMessage text-red-500"
                  >
                    Citizen's Name is required.
                  </div>
                </template> -->
              </div>
              <div class="w-full md:w-1/2 px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-payee"
                >
                  Request Date
                </label>
                <input
                  v-model="requestdate"
                  class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                  id="grid-date"
                  type="date"
                  :max="currentDate"
                />

                <!-- @blur="$v.requestdate.$touch()  -->
                <!-- @input="$v.requestdate.$touch()" -->
                <!-- :error-messages="requestdateErrors" -->
                <!-- <template v-if="$v.requestdate.$error">
                  <div
                    v-if="!$v.requestdate.required"
                    class="errorMessage text-red-500"
                  >
                    Date is required.
                  </div>
                </template> -->
              </div>
              <div class="w-full md:w-1/2 px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Type of Request
                </label>

                <select
                  v-model="typeofrequest"
                  class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  aria-label="Default select example"
                  @blur="$v.typeofrequest.$touch()"
                  @input="$v.typeofrequest.$touch()"
                  :error-messages="requesttypeErrors"
                >
                  <option
                    v-for="request in requeststype"
                    :key="request.id"
                    :value="request.name"
                  >
                    {{ request.name }}
                  </option>
                </select>
                <template v-if="$v.typeofrequest.$error">
                  <div
                    v-if="!$v.typeofrequest.required"
                    class="errorMessage text-red-500"
                  >
                    Request Type is required.
                  </div>
                </template>
                <small v-if="errors.requestType" class="text-xs text-red-500">{{
                  errors.requestType[0]
                }}</small>
              </div>

              <div class="w-full md:w-1/2 px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Request Amount
                </label>
                <input
                  v-model="request_amount"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Request Amount"
                  @blur="$v.request_amount.$touch()"
                  @input="$v.request_amount.$touch()"
                />
                <!-- :error-messages="requestamountErrors" -->
                <template v-if="$v.request_amount.$error">
                  <div v-if="!$v.request_amount.required" class="errorMessage">
                    <p class="text-red-500">Request Amount is required.</p>
                  </div>
                  <div
                    v-if="!$v.request_amount.numeric"
                    class="errorMessage red--text"
                  >
                    <p class="text-red-500">
                      Request Amount should be an amount.
                    </p>
                  </div>
                </template>
              </div>
              <div class="w-full md:w-1/2 px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Requesting Official
                </label>

                <select
                  class="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  v-model="request.requestingofficial"
                >
                  <option
                    v-for="request in signatories"
                    :key="request.id"
                    :value="request.id"
                  >
                    {{ request.name }}
                  </option>
                </select>

                <div class="form-check">
                  <!-- appearance-none -->
                  <input
                    class="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    v-model="request.preferred"
                    value=""
                  />
                  <label
                    class="form-check-label inline-block text-gray-800"
                    for="flexCheckChecked"
                  >
                    set as preferred
                  </label>
                </div>
              </div>
              <div class="w-full px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-function"
                >
                  Description
                </label>
                <textarea
                  v-model="description"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  rows="3"
                  placeholder="Request description"
                  @blur="$v.description.$touch()"
                  @input="$v.description.$touch()"
                  :error-messages="descriptionErrors"
                ></textarea>

                <template v-if="$v.description.$error">
                  <div
                    v-if="!$v.description.required"
                    class="errorMessage text-red-500"
                  >
                    Description is required.
                  </div>
                </template>
              </div>
              <div class="w-full px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-function"
                >
                  Beneficiary's Name
                </label>
                <!-- <input
                  v-model="request.beneficiary"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Beneficiary's Name"
                /> -->

                <v-selectize
                  key-by="id"
                  label="full_name"
                  :searchFn="search_beneficiary"
                  :create-item="false"
                  :options="options"
                  v-model="request.beneficiary"
                  disableSearch
                >
                  <template v-slot:option="{ option }">
                    <div class="text-base">
                      <i class="fa fa-user"></i>
                      <b class="ml-1">{{ option.full_name }}</b>
                      <small class="ml-1">
                        <span v-if="beginsearch == true"
                          >Address : {{ option.res_street }} |
                          Birthdate (mm-dd-yyyy) : {{ option.dob_month }}-
                          {{ option.dob_day }}-{{ option.dob_year }}
                        </span>
                      </small>
                    </div>
                  </template>
                </v-selectize>
              </div>
              <div class="w-full px-3 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Upload supporting documents
                </label>

                <div
                  class="border-dashed border-2 border-indigo-600 p-12 bg-gray-100"
                  @dragover="dragover"
                  @dragleave="dragleave"
                  @drop="drop"
                >
                  <input
                    type="file"
                    ref="file"
                    multiple
                    name="fields[assetsFieldHandle][]"
                    id="assetsFieldHandle"
                    class="w-px h-px opacity-0 overflow-hidden absolute"
                    @change="uploadFile"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />

                  <label for="assetsFieldHandle" class="block cursor-pointer">
                    <div
                      class="flex flex-col justify-center items-center pt-5 pb-6"
                    >
                      <svg
                        class="mb-3 w-10 h-10 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>

                      <p
                        class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                        for="assetsFieldHandle"
                      >
                        <span class="underline font-semibold"
                          >Click to upload </span
                        >or drag and drop
                      </p>
                      <p
                        class="text-xs text-gray-500 dark:text-gray-400 cursor-pointer"
                      >
                        PNG, JPG , JPEG or GIF (MAX. 10MB File)
                      </p>
                    </div>
                  </label>
                  <ul class="mt-4" v-if="this.newFileList.length" v-cloak>
                    <li
                      class="text-sm p-1"
                      v-for="(file, index) in newFileList"
                      :key="index"
                    >
                      {{ file.name }}

                      <!-- <button
                        class="ml-2"
                        type="button"
                        @click="remove(filelist.indexOf(file))"
                        title="Remove file"
                      >
                        remove
                      </button> -->
                    </li>
                  </ul>
                </div>
              </div>
              <!-- <div class="w-full px-3 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Status
                </label>
                <select
                  class="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  v-model="request.status"
                >
                  <option value="0" selected>Pending</option>
                  <option value="1">Approve</option>
                  <option value="2">Decline</option>
                </select>
              </div> -->
            </div>
            <div class="w-full flex flex-wrap justify-end my-5">
              <button
                type="button"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                v-on:click="handleCreate()"
              >
                Submit
              </button>
            </div>
          </form>

          <div
            v-if="this.images != ''"
            class="border-dashed border-2 border-sky-500 bg-gray-300 p-4 content-center"
          >
            <div class="p-2 m-2 relative pb-5">
              <div class="absolute left-0">
                <label
                  for="imagepreview"
                  class="block uppercase tracking-wide text-gray-700 text-s font-bold"
                  >Image Preview</label
                >
              </div>
              <div class="absolute right-0">
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  v-on:click="handleRemoveImage()"
                >
                  <label v-if="this.images != ''" onclick="return false"
                    >Remove All</label
                  >
                </button>
              </div>
            </div>
            <div class="w-full flex pt-5">
              <div
                v-for="(image, key) in this.images"
                :key="key"
                class="flex-auto"
              >
                <div class="p-1">
                  <img :ref="'image'" :src="image" width="400" class="pb-1" />

                  <button
                    type="button"
                    class="pt-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                  >
                    <a :href="image" target="_blank" class="">View </a>
                  </button>
                  <button
                    type="button"
                    class="pt-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                    v-on:click="remove_image(key)"
                  >
                    <label onclick="return false">Remove</label>
                  </button>
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
import 'selectize/dist/css/selectize.css'
import VSelectize from '@isneezy/vue-selectize'
import debounce from 'lodash.debounce'

import ModalSuccess from '@/components/Modals/Modal.vue'
import { requestform } from '~/mixins/middleware/requestform_pages.js'
import { maxdate } from '~/mixins/currentdate.js'

// validation
import Vue from 'vue'
import { Vuelidate, validationMixin } from 'vuelidate'
import { required, numeric } from 'vuelidate/lib/validators'
Vue.use(Vuelidate)

export default {
  head() {
    return {
      errors: false,
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
  components: {
    ModalSuccess,
    VSelectize,
  },
  mixins: [requestform, maxdate, validationMixin],
  layout: 'dashboard',
  computed: {
    // requestdateErrors() {
    //   const errors = []
    //   if (!this.$v.requestdate.$dirty) {
    //     return errors
    //   }
    //   !this.$v.requestdate.required && errors.push('Request Date is required.')
    //   return errors
    // },
    citizennameErrors() {
      const errors = []
      if (!this.$v.citizenname.$dirty) {
        return errors
      }
      !this.$v.citizenname.required && errors.push('Citizen name is required.')
      return errors
    },
    descriptionErrors() {
      const errors = []
      if (!this.$v.description.$dirty) {
        return errors
      }
      !this.$v.description.required && errors.push('Description is required')
      return errors
    },
    requesttypeErrors() {
      const errors = []
      if (!this.$v.typeofrequest.$dirty) {
        return errors
      }
      !this.$v.typeofrequest.required && errors.push('Field is required')
      return errors
    },
    requestamountErrors() {
      const errors = []
      // if (!this.$v.requestamount.$dirty) return errors
      // !this.$v.requestamount.required && errors.push('Content is required.')
      // !this.$v.requestamount.numeric &&
      //   errors.push('amount should be a number.')
      return errors
    },
    // url() {
    //   return this.selected ? this.selected.name : null
    // },
  },
  data() {
    return {
      description: '',
      request_amount: '',
      typeofrequest: '',
      beginsearch: false,
      options: [
        {
          id: '0',
          res_street: '',
          full_name: 'Please enter citizens name.',
        },
      ],
      citizenname: null,
      filelist: [],
      select: {
        limit: 3,
      },
      errors: {
        value: false,
        message: '',
      },
      request: {
        preferred: false,
        requestingofficial: 0,
        fullname: '',
        citizen_id: '',
        citizen_fullname: '',
        request_date: '',
        request_amount: '',
        typeofrequest: '',
        description: '',
        name: '',
        image: '',
        image_preview: '',
        status: 1,
        beneficiary: '',
      },
      response: {
        message: '',
      },
      images: [],
      selected: '',
      newFileList: false,
      showModal: false,

      requeststype: [
        { id: 1, name: 'Medical - Hospital Bill' },
        { id: 2, name: 'Medical - Medications / Laboratory Expenses' },
        { id: 3, name: 'Medical - Hemodialysis / Chemotherapy' },
        { id: 4, name: 'Burial' },
        { id: 5, name: 'Financial' },
      ],
      payload: {},
      citizens: [],
      signatories: [],
    }
  },
  validations: {
    // requestdate: { required },
    citizenname: { required },
    request_amount: { required, numeric },
    description: { required },
    typeofrequest: { required },
  },
  async mounted() {
    await this.fetchCitizens()
    await this.fetchrequestingofficial()
    await this.fetchpreferred()
  },

  methods: {
    async fetchCitizens() {
      this.$axios
        .get('/api/requestform/citizens')
        .then((res) => {
          this.citizens = res.data.citizens
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
    async handleCreate() {
      // return 0
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$toast.error('Validation failed.')
        return
      }

      if (this.request_amount) {
        this.request.citizen_fullname = this.citizenname.full_name
        this.request.citizen_id = this.citizenname.id

        this.$toast.success('Sending')

        let payload = new FormData()
        payload.append('citizen_name', this.request.citizen_fullname)
        payload.append('citizen_id', this.request.citizen_id)
        payload.append('description', this.description)
        payload.append('request_amount', this.request_amount)
        payload.append('request_date', this.requestdate)
        payload.append('status', 0)
        payload.append('typeofrequest', this.typeofrequest)

        payload.append('requestingofficial', this.request.requestingofficial)
        payload.append('preferred', this.request.preferred)
        payload.append('beneficiary', this.request.beneficiary)

        for (const i in this.newFileList) {
          payload.append('files[' + i + ']', this.newFileList[i])
        }

        // return 0
        this.$axios
          .post('/api/requestform/create', payload, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((res) => {
            this.response.message = res.data.message
            this.toggleModal()
            this.$toast.success('Done.')
            this.errors.value = false

            this.request.citizen_fullname = ''
            this.request.citizen_id = ''
            this.request.description = ''
            this.request.request_amount = ''
            this.request.request_date = ''
            this.request.typeofrequest = ''
            this.request.fullname = ''

            this.request.citizen_fullname = ''
            this.request.citizen_id = ''
            this.description = ''
            this.request_amount = ''
            this.requestdate = ''
            this.typeofrequest = ''
            this.options = []
            this.options.id = '0'
            this.options.res_street = ''
            this.options.full_name = 'Please enter citizens name.'
            this.citizenname = []
            this.handleRemoveImage()
            this.$v.$reset()
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
          .finally(() => {})
      } else {
        this.$toast.error('Validation failed.')
      }
    },
    uploadFile() {
      this.filelist = [...this.$refs.file.files]
      this.images = []
      this.newFileList = this.filelist
      var selectedFiles = this.filelist
      for (let i = 0; i < selectedFiles.length; i++) {
        this.images.push(URL.createObjectURL(selectedFiles[i]))
      }
    },

    handleRemoveImage() {
      // Remove upload
      this.$refs.file.value = null
      this.images = []
      this.newFileList = []
      return false
    },
    remove_image(index) {
      this.newFileList.splice(index, 1)
      this.images.splice(index, 1)
    },
    // modal
    toggleModal() {
      this.showModal = !this.showModal
    },
    hideError() {
      this.errors.value = false
    },
    onChange() {
      this.filelist = [...this.$refs.file.files]
    },
    remove(i) {
      this.filelist.splice(i, 1)
    },
    dragover(event) {
      event.preventDefault()
      // Add some visual fluff to show the user can drop its files
      if (!event.currentTarget.classList.contains('bg-green-300')) {
        event.currentTarget.classList.remove('bg-gray-100')
        event.currentTarget.classList.add('bg-green-300')
      }
    },
    dragleave(event) {
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
    drop(event) {
      event.preventDefault()
      this.$refs.file.files = event.dataTransfer.files
      this.uploadFile()
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },

    search: debounce(function (text, done) {
      if (text.length < 3) done()

      this.payload.search_term = text

      this.$axios
        .$post('/api/citizens/seek', this.payload, {})
        .then((response) => {
          this.options = response.citizens
          this.beginsearch = true
        })
        .catch((error) => {
          this.beginsearch = true
        })
        .finally(() => {})
    }, 500),

    search_beneficiary: debounce(function (text, done) {
      if (text.length < 3) done()

      this.payload.search_term = text

      this.$axios
        .$post('/api/citizens/seek', this.payload, {})
        .then((response) => {
          this.options = response.citizens
          this.beginsearch = true
        })
        .catch((error) => {
          this.beginsearch = true
        })
        .finally(() => {})
    }, 500),

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
    async fetchpreferred() {
      this.$axios
        .get('/api/user/prefered_requestingofficial')
        .then((response) => {
          if (response.data.data.signatories_id) {
            this.request.requestingofficial = response.data.data.signatories_id
            this.request.preferred = true
          } else {
            this.request.requestingofficial = 0
            this.request.preferred = false
          }
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
