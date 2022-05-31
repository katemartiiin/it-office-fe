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
          <form class="w-full">
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

              <div class="w-full px-3 pb-2 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-payee"
                >
                  Payee
                </label>
                <input
                  v-model="request.name"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-payee"
                  type="text"
                  placeholder="Name of Payee"
                />
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
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
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
              <div class="w-full px-3 mb-6">
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
              </div>
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
import ModalSuccess from '@/components/Modals/Modal.vue'
import { requestform } from '~/mixins/middleware/requestform_pages.js'
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
  },
  mixins: [requestform],
  layout: 'dashboard',
  data() {
    return {
      filelist: [],
      errors: {
        value: false,
        message: '',
      },
      request: {
        name: '',
        image: '',
        image_preview: '',
        status: 1,
      },
      response: {
        message: '',
      },
      images: [],

      newFileList: false,
      showModal: false,
    }
  },

  methods: {
    async handleCreate() {
      // Handle image create and control number generation

      this.$toast.success('Sending')

      let payload = new FormData()
      payload.append('payee', this.request.name)
      payload.append('status', this.request.status)

      for (const i in this.newFileList) {
        payload.append('files[' + i + ']', this.newFileList[i])
      }
      // console.log(payload)
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
        })
        .catch((error) => {
          this.$toast.error('Error:')
          this.errors.value = true
          this.errors.message = error.response.data.errors
          if (error.response) {
            for (var key in error.response.data.errors) {
              if (error.response.data.errors.hasOwnProperty(key)) {
                this.$toast.error(error.response.data.errors[key])
                // console.log(key + ' -> ' + error.response.data.errors[key])
              }
            }
          }

          // this.$toast.error(error.response.data.message)
        })
        .finally(() => {})
    },
    uploadFile() {
      this.filelist = [...this.$refs.file.files]
      this.images = []
      this.newFileList = this.filelist
      var selectedFiles = this.filelist
      for (let i = 0; i < selectedFiles.length; i++) {
        // console.log(selectedFiles[i].name)
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
      // this.filelist.splice(index, 1)
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
      // console.log(this.filelist)
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
  },
}
</script>
