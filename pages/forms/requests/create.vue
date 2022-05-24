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
          <h1 class="text-xl font-bold mb-5">Create Request</h1>
          <form class="w-full">
            <div class="flex flex-wrap -mx-3 mb-6">
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
                <input
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                  ref="file"
                  id="formFileMultiple"
                  multiple
                  @change="uploadFile"
                />
              </div>
              <div class="w-full px-3 mb-6">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Status
                </label>
                <!--
                aria-label="Default select example" -->
                <!-- appearance-none  -->
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
import { dswd } from '~/mixins/middleware/dswd_pages.js'
export default {
  // mixins: [dswd],
  layout: 'dashboard',
  data() {
    return {
      request: {
        name: '',
        image: '',
        image_preview: '',
        status: 1,
      },
      images: [],

      newFileList: false,
    }
  },

  mounted() {
    //
  },
  methods: {
    // handleRemoveImage() {

    async handleCreate() {
      // Handle image create and control number generation

      this.$axios.$get('/sanctum/csrf-cookie')
      this.$toast.success('Sending')

      let payload = new FormData()
      payload.append('payee', this.request.name)
      payload.append('status', this.request.status)
      // for (const i of Object.keys(this.files)) {
      //   payload.append('files[' + i + ']', this.files[i])
      // }

      for (const i in this.newFileList) {
        payload.append('files[' + i + ']', this.newFileList[i])
      }

      this.$axios
        .post('/api/requestform/create', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.$toast.success('Done.')
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
    uploadFile(e) {
      this.files = e.target.files
      this.newFileList = Array.from(this.files)
      // console.log(e.target.files)
      var selectedFiles = e.target.files
      this.images = []
      for (let i = 0; i < selectedFiles.length; i++) {
        this.images.push(URL.createObjectURL(selectedFiles[i]))
      }
    },

    handleRemoveImage() {
      // Remove upload
      this.$refs.file.value = null
      this.images = []
      return false
    },
    remove_image(index) {
      this.newFileList.splice(index, 1)
      this.images.splice(index, 1)
    },
  },
}
</script>
