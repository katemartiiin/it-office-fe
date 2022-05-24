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
          <form class="w-full">
            <div class="w-full px-3 pb-2">
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
              />
            </div>
            <div class="w-full px-3 pb-2">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-payee"
              >
                Payee
              </label>
              <input
                v-model="payload.name"
                class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-payee"
                type="text"
                placeholder="Name of Payee"
              />
            </div>
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-request"
              >
                Upload request letter
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
            <div class="w-full flex flex-wrap justify-end my-5">
              <button
                type="button"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                v-on:click="handleUpdate()"
              >
                Update
              </button>
            </div>
          </form>
          <div
            class="border-dashed border-2 border-sky-500 bg-gray-300 p-4 w-full content-center"
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
                    >Remove</label
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
                <template v-if="image_edit == false">
                  <div class="p-1">
                    <img :ref="'image'" :src="image.path" width="400" />
                    <a :href="image.path" target="_blank">[ View ]</a>
                  </div>
                </template>
                <template v-else>
                  <div class="p-1">
                    <img :ref="'image'" :src="image" width="400" />
                    <a :href="image" target="_blank">[ View ]</a>
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
export default {
  mixins: [requestform],
  layout: 'dashboard',
  data() {
    return {
      payload: {
        name: '',
        control_number: '',
        file: '',
      },
      item: '',
      images: [],
      image_edit: false,
    }
  },

  mounted() {
    this.requestform_id = this.$route.params.id
    this.fetchItem()
  },
  methods: {
    async fetchItem() {
      const url = this.$config.api
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      console.log('hello')
      this.$axios
        .$get('/api/requestform/yield/' + this.requestform_id)
        .then((response) => {
          console.log('return')
          this.item = response.item
          this.payload.name = response.form.payee
          this.payload.control_number = response.form.control_number
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

    handleRemoveImage() {
      // Remove upload
      this.$refs.file.value = null
      this.images = []
      return false
    },
    handleFileUpload(files) {
      try {
        this.request.image_preview = URL.createObjectURL(files[0])
        this.request.image = files[0]
      } catch (err) {
        console.log(err)
      }
    },
    uploadFile(e) {
      this.image_edit = true
      this.files = e.target.files
      var selectedFiles = e.target.files
      for (let i = 0; i < selectedFiles.length; i++) {
        this.images.push(URL.createObjectURL(selectedFiles[i]))
      }
      console.log(this.images)
    },
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
