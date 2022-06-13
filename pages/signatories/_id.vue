<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink
        to="/signatories"
        class="mb-5 hover:text-black text-gray-500 text-xs"
        >&lt; Back
      </NuxtLink>

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded mt-3"
      >
        <div class="px-10 py-5">
          <form class="w-full">
            <h1 class="text-2xl font-bold mb-10">Edit Signatory</h1>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Name
                </label>
                <input
                  v-model="payload.name"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.name[0] ? 'border-red-500' : ''
                  "
                  id="grid-name"
                  type="text"
                  placeholder="Name"
                />
                <p
                  v-if="errors.length && errors.name[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.name[0] }}
                </p>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Designation
                </label>
                <input
                  v-model="payload.department"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.department[0]
                      ? 'border-red-500'
                      : ''
                  "
                  type="text"
                  placeholder="Designation"
                />
                <p
                  v-if="errors.length && errors.department[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.department[0] }}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Office
                </label>
                <select
                  v-model="payload.office"
                  class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                >
                  <option
                    v-for="(office, index) in offices"
                    :key="index"
                    :value="office.id"
                  >
                    {{ office.name }}
                  </option>
                </select>
                <p
                  v-if="errors.length && errors.office[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.office[0] }}
                </p>
              </div>
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
                  </li>
                </ul>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6 float-right">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <button
                  @click="update"
                  type="button"
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>

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
</template>
<script>
export default {
  head() {
    return {
      title: '',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  layout: 'dashboard',
  data() {
    return {
      payload: {
        name: null,
        department: null,
        office: null,
      },
      signatoriesId: '',
      roles: [],
      errors: [],
      filelist: [],
      newFileList: [],
      old_images: [],
      new_images: [],
      remove_oldimages_list: [],
      offices: [],
    }
  },
  async mounted() {
    this.signatoriesId = this.$route.params.id
    await this.fetchUser()
    await this.fetchoffices()
  },
  methods: {
    fetchUser() {
      const url = this.$config.api
      this.$axios
        .$post('api/signatories/show/' + this.signatoriesId)
        .then((response) => {
          this.payload.name = response.signatory.name
          this.payload.department = response.signatory.department
          this.payload.office = response.signatory.office_id

          var data = []

          data.push({
            path: url + '/' + response.signatory.path,
            id: response.signatory.id,
          })

          this.old_images = data
        })
        .catch((err) => {
          this.errors = error.response.data.errors
        })
    },

    update() {
      let payload = new FormData()
      payload.append('name', this.payload.name)
      payload.append('department', this.payload.department)
      payload.append('office', this.payload.office)

      console.log(this.newFileList)
      for (const i in this.newFileList) {
        console.log('inside loop ')
        payload.append('files[' + i + ']', this.newFileList[i])
      }
      this.$axios
        .$post('api/signatories/update/' + this.signatoriesId, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.remove_oldimages_list = []
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
          this.errors = error.response.data.errors
        })
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
    uploadFile() {
      this.filelist = [...this.$refs.file.files]
      this.files = this.filelist
      this.new_images = []
      this.newFileList = this.filelist
      var selectedFiles = this.filelist
      for (let i = 0; i < selectedFiles.length; i++) {
        this.new_images.push(URL.createObjectURL(selectedFiles[i]))
      }
      this.handleOldRemoveImage()
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
    handleRemoveImage() {
      this.$refs.file.value = null
      this.newFileList = []
      this.new_images = []
      return false
    },
    remove_oldimage(index) {
      this.remove_oldimages_list.push(this.old_images[index].id)
      this.old_images.splice(index, 1)
    },
    async fetchoffices() {
      this.$axios
        .get('/api/offices/name')
        .then((response) => {
          this.offices = response.data.data
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
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: rgb(51 65 85);
}
</style>
