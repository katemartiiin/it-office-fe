<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <button @click="goBack" class="text-sm font-medium tracking-wide">
        &lt; Back
      </button>

      <NoteModal
          @toggleModal="toggleModal()"
          :showmodal="showModal"
          :notes="notes"
        >
          <span slot="title">View Notes</span>
      </NoteModal>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <div class="flex flex-wrap w-full mt-5">
            <p class="text-xs">Request No. {{ this.$route.params.id }}</p>
            <p v-if="payload.is_returned" class="text-xs ml-3"> | <a href="#" @click.prevent="toggleModal" class="ml-2 font-semibold text-orange-500 hover:text-orange-700">View Notes</a></p>
          </div>
          <h1 class="text-xl font-bold mb-5">
            Financial Assistance Form Request
          </h1>
          <form class="w-full">
            <div class="w-full px-3 pb-2 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-payee"
              >
                Control Number
              </label>
              <input
                v-model="payload.control_number"
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
                Citizen's Name
              </label>
              <input
                v-model="payload.citizen_name"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-payee"
                type="text"
                placeholder="Name of Payee"
              />
            </div>

            <div class="w-full px-3 pb-2 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-payee"
              >
                Type of Request
              </label>
              <!-- <input
                v-model="payload.typeofrequest"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Type of Request"
              /> -->

              <select
                v-model="payload.typeofrequest"
                class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                aria-label="Default select example"
              >
                <option
                  v-for="request in requeststype"
                  :key="request.id"
                  :value="request.name"
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
                Description
              </label>
              <textarea
                v-model="payload.description"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="Description"
              />
            </div>

            <div class="w-full px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-function"
                >
                  Beneficiary's Name
                </label>
                <input
                  v-model="payload.beneficiary"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Beneficiary's Name"
                />
              </div>

            <div class="w-full px-3 pb-2 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-payee"
              >
                Request Amount
              </label>
              <input
                v-model="payload.requestamount"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Request Amount"
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
                v-model="payload.requestdate"
                class="appearance-none w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 my-3"
                type="date"
                :max="currentDate"
              />
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
                  v-model="payload.requestingofficial"
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
                    v-model="payload.preferred"
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
                for="grid-payee"
              >
                Approved Amount
              </label>
              <input
                v-if="roleId == 8"
                v-model="payload.approveamount"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Approved Amount"
              />
              <input
                v-else
                v-model="payload.approveamount"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  v-model="payload.remarks"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-gray-100 bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="grid-function"
                  rows="3"
                  readonly
              ></textarea>
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-request"
              >
                Upload request letter
              </label>

              <div
                class="p-12 bg-gray-100 border border-dashed border-2 border-indigo-600 p-12 bg-gray-100"
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
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                </label>
                <!-- <label for="assetsFieldHandle" class="block cursor-pointer">
                  <div class="text-center w-full">
                    <i class="fa fa-upload" aria-hidden="true"></i>
                    Drag and drop your files anywhere or
                    <span class="underline">Upload files</span>
                  </div>
                </label> -->
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
            <div class="w-full flex flex-wrap justify-end my-5">
              <div class="p-1 m-1">
                <a
                  @click.prevent="downloadcafoa(requestform_id)"
                  title="Download Cafoa"
                  class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                  style="cursor: pointer"
                >
                  <i class="fas fa-print"></i> Download Cafoa
                </a>
              </div>
              <div class="p-1 m-1">
                <button class="">
                  <a
                    @click.prevent="downloadvoucher(requestform_id)"
                    title="Download Voucher"
                    class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                       style="cursor: pointer"
                  >
                    <i class="fas fa-print"></i> Download Voucher
                  </a>
                </button>
              </div>
            </div>
            <div class="w-full flex flex-wrap justify-end my-5">
              <button
                type="button"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                v-on:click.prevent="updateFormRequest(requestform_id)"
              >
                Update
              </button>
            </div>
          </form>
          <div
            class="border-dashed border-2 border-sky-500 bg-gray-300 p-4 w-full content-center"
          >
            <div class="p-2 m-2 relative pb-5" v-if="this.new_images != ''">
              <div class="absolute left-0">
                <label
                  for="imagepreview"
                  class="block uppercase tracking-wide text-gray-700 text-s font-bold"
                  >Image Preview New Uploading</label
                >
              </div>
              <div class="absolute right-0">
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  v-on:click="handleRemoveImage()"
                >
                  <label onclick="return false">Remove All</label>
                </button>
              </div>
            </div>
            <div class="w-full flex pt-5">
              <div
                v-for="(image, key) in this.new_images"
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

            <div class="p-2 m-2 relative pb-5" v-if="this.old_images != ''">
              <div class="absolute left-0">
                <label
                  for="imagepreview"
                  class="block uppercase tracking-wide text-gray-700 text-s font-bold"
                  >Image Preview Stored Uploads</label
                >
              </div>
              <div class="absolute right-0">
                <button
                  type="button"
                  class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                  v-on:click="handleOldRemoveImage()"
                >
                  <label onclick="return false">Remove All</label>
                </button>
              </div>
            </div>
            <div class="w-full flex pt-5">
              <div
                v-for="(image, key) in this.old_images"
                :key="key"
                class="flex-auto"
              >
                <template>
                  <div class="p-1">
                    <img
                      :ref="'image'"
                      :src="image.path"
                      width="400"
                      class="pb-1"
                    />
                    <button
                      type="button"
                      class="pt-1 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
                    >
                      <a :href="image.path" target="_blank" class="">View </a>
                    </button>
                    <button
                      type="button"
                      class="pt-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
                      v-on:click="remove_oldimage(key)"
                    >
                      <label onclick="return false">Remove</label>
                    </button>
                  </div>
                </template>
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
import { maxdate } from '~/mixins/currentdate.js'
import NoteModal from '@/components/Modals/NoteModal.vue'
export default {
  components: {
    NoteModal
  },
  mixins: [requestform, maxdate],
  layout: 'dashboard',
  data() {
    return {
      payload: {
        name: '',
        control_number: '',
        file: '',
        approveamount: '',
        preferred: false,
        requestingofficial: 0,
      },
      item: '',
      old_images: [],
      new_images: [],
      remove_oldimages_list: [],
      filelist: [],
      newFileList: [],
      requeststype: [
        { id: 1, name: 'Medical - Hospital Bill' },
        { id: 2, name: 'Medical - Medications / Laboratory Expenses' },
        { id: 3, name: 'Medical - Hemodialysis / Chemotherapy' },
        { id: 4, name: 'Burial' },
        { id: 5, name: 'Financial' },
      ],
      signatories: [],
      errors: [],
      notes: [],
      showModal: false,
      roleId: null,
    }
  },

  async mounted() {
    this.requestform_id = this.$route.params.id
    this.roleId = this.$auth.$state.user['role']
    this.fetchItem()
    await this.fetchrequestingofficial()
    await this.fetchpreferred()
  },
  methods: {
    async fetchItem() {
      const url = this.$config.api

      this.$axios
        .$get('/api/requestform/yield/' + this.requestform_id)
        .then((response) => {
          this.item = response.item
          this.payload.name = response.form.payee
          this.payload.control_number = response.form.control_number

          this.payload.typeofrequest = response.form.typeofrequest
          this.payload.description = response.form.description
          this.payload.requestamount = response.form.requestamount
          this.payload.requestdate = response.form.requestdate
          this.payload.citizen_name = response.form.citizen_name
          this.payload.remarks = response.form.remarks;
          this.payload.approveamount = response.form.approved_amount;
          this.payload.requestingofficial = response.form.signatories_id;
          this.payload.beneficiary = response.form.beneficiary
          this.payload.is_returned = response.form.is_returned
          this.notes = response.notes

          var data = []
          if (response.file) {
            for (const i in response.file) {
              data.push({
                path: url + '/' + response.file[i].file,
                id: response.file[i].id,
              })
            }
            this.old_images = data
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
    // old uploads

    async updateFormRequest() {
      this.$toast.success('Sending')
      const url = this.$config.api
      let payload = new FormData()
      payload.append('payee', this.payload.citizen_name)
      payload.append('account_number', this.payload.control_number)
      payload.append('typeofrequest', this.payload.typeofrequest)
      payload.append('description', this.payload.description)
      payload.append('requestamount', this.payload.requestamount)
      payload.append('requestdate', this.payload.requestdate)
      payload.append('citizen_name', this.payload.citizen_name)
      payload.append('remove_upload', this.remove_oldimages_list)
      payload.append('approveamount', this.payload.approveamount)
      payload.append('requestingofficial', this.payload.requestingofficial)
      payload.append('beneficiary', this.payload.beneficiary)

      for (const i in this.newFileList) {
        payload.append('files[' + i + ']', this.newFileList[i])
      }

      this.$axios
        .post('/api/requestform/update/' + this.requestform_id, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.remove_oldimages_list = []
          this.handleRemoveImage()
          var data = []
          res.data.file.forEach(function callback(value, index) {
            data.push({
              path: url + '/' + value.file,
              id: value.id,
            })
          })
          this.old_images = []
          this.old_images = data
          this.newFileList = []
          this.$toast.success('Done.')
        })
        .catch((error) => {
          console.log(error)
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    handleOldRemoveImage() {
      if (this.old_images) {
        var data = []
        this.old_images.map(function (value, key) {
          data.push(value['id'])
        })
      }

      this.remove_oldimages_list = data
      this.old_images = []
      return false
    },
    remove_oldimage(index) {
      this.remove_oldimages_list.push(this.old_images[index].id)
      this.old_images.splice(index, 1)
    },
    // new uploads
    handleRemoveImage() {
      this.$refs.file.value = null
      this.newFileList = []
      this.new_images = []
      return false
    },
    uploadFile() {
      this.filelist = [...this.$refs.file.files]
      this.files = this.filelist
      this.new_images = []
      this.newFileList = this.filelist
      var selectedFiles = this.filelist
      for (let i = 0; i < selectedFiles.length; i++) {
        this.new_images.push(URL.createObjectURL(selectedFiles[i]))
      }
    },
    remove_image(index) {
      this.newFileList.splice(index, 1)
      this.new_images.splice(index, 1)
    },

    // draggable methods
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
      // this.onChange() // Trigger the onChange event manually
      this.uploadFile()
      // Clean up
      event.currentTarget.classList.add('bg-gray-100')
      event.currentTarget.classList.remove('bg-green-300')
    },
    async downloadcafoa(id) {
      console.log(id)
      this.$toast.success('Processing')

      try {
        this.$axios
          .$post(`/api/pdf/initial_cafoa/${id}`)
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
    async downloadvoucher(id) {
      this.$toast.success('Processing')

      try {
        this.$axios
          .$post(`/api/pdf/initial_voucher/${id}`)
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
          console.log(response.data.data)
          console.log(response.data.data.signatories_id)
          if (response.data.data.signatories_id) {
            this.payload.requestingofficial = response.data.data.signatories_id
            this.payload.preferred = true
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

    toggleModal() {
      this.showModal = !this.showModal
    },

    goBack() {
      this.$router.go(-1)
    }
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
