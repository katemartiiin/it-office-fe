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
              <div class="w-full px-3 pb-2">
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
                  id="file"
                  ref="file"
                  v-on:change="handleFileUpload($event.target.files)"
                />
              </div>
            </div>
            <div class="w-full flex flex-wrap justify-end my-5">
              <button
                type="button"
                class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                v-on:click="handleCreate()"
              >
                Create
              </button>
            </div>
          </form>
          <div
            v-if="this.request.image_preview != '' || this.request.image != ''"
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
                  <label
                    v-if="
                      this.request.image_preview != '' ||
                      this.request.image != ''
                    "
                    onclick="return false"
                    >Remove</label
                  >
                </button>
              </div>
            </div>

            <div class="grid place-items-center pt-4">
              <img v-if="request.image_preview" :src="request.image_preview" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dswd } from '~/mixins/dswd_pages.js'
export default {
  mixins: [dswd],
  layout: 'dashboard',
  data() {
    return {
      request: {
        name: '',
        image: '',
        image_preview: '',
      },
    }
  },

  mounted() {
    //
  },
  methods: {
    handleFileUpload(files) {
      try {
        this.request.image_preview = URL.createObjectURL(files[0])
        this.request.image = files[0]
      } catch (err) {
        console.log(err)
      }
    },
    handleRemoveImage() {
      // Remove upload
      this.$refs.file.value = null
      this.request.image = ''
      this.request.image_preview = ''
      return false
    },
    async handleCreate() {
      // Handle image create and control number generation
      this.$axios.$get('/sanctum/csrf-cookie')
      this.$toast.success('Sending')
      let payload = new FormData()
      payload.append('image', this.request.image)
      payload.append('payee', this.request.name)
      this.$axios
        .post('/api/requestform/create', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {})
        .catch((error) => {
          this.$toast.success('Error.')
        })
        .finally(() => {
          this.$toast.success('Done.')
        })
    },
  },
}
</script>
