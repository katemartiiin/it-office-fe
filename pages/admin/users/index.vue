<template>
  <div>

    <!-- Modal -->
    <ModalDelete
      @toggleModal="toggleModal()"
      @deleteconfirm="deleteItemConfirm()"
      :showmodal="showModal"
      :cancel="true"
      type="delete"
      :action="true"
    >
      <span slot="title">Delete</span>
      <span slot="description">Are you sure you want to delete ?</span>
      <span slot="btn-cancel">close</span>
      <span slot="btn-delete">Confirm delete</span>
    </ModalDelete>

      <!-- Modal -->



      <div class="flex flex-wrap mt-4 dark:bg-slate-900">
        <div class="w-full">
          <NuxtLink
            to="/admin/users/create"
            class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Create User
          </NuxtLink>

          <button
            @click.prevent="download()"
            class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Download
          </button>

          <button
            @click.prevent="downloadpdf()"
            class="mx-2 float-right space-x-1 mb-5 bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
          >
            Download pdf
          </button>
        </div>

        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
        >
          <div class="rounded-t mb-0 px-4 py-3 border-0 bg-slate-600">
            <div class="flex flex-wrap items-center">
              <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-lg text-white">Users</h3>
              </div>
            </div>
          </div>
          <div class="block w-full overflow-x-auto">
            <vue-good-table
              mode="remote"
              @on-page-change="onPageChange"
              @on-per-page-change="onPerPageChange"
              @on-sort-change="onSortChange"
              :totalRows="totalRecords"
              :pagination-options="{
                enabled: true,
              }"
              :columns="columns"
              :rows="rows"
              :line-numbers="true"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'action'">
                  <!-- {{ props.row }} -->
                  <NuxtLink
                    aria-expanded="false"
                    :to="'/admin/users/' + props.row.id"
                    class="text-xs bg-blue-700 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                    ><i class="fas fa-eye"></i
                  ></NuxtLink>
                  <button
                    v-on:click="deleteModal(props.row.originalIndex)"
                    aria-expanded="false"
                    class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </span>
              </template>
            </vue-good-table>
          </div>

          <div>
            <div class="flex justify-center">
              <div class="mb-3 w-96">
                <label
                  for="formFile"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Default file input example</label
                >

                <div>
                  <!-- <input
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    type="file"
                    id="file"
                    ref="file"
                    v-on:change="handleFileUpload()"
                  /> -->
                </div>
                <div><img v-if="image_preview" :src="image_preview" /></div>
                <div>
                  <label
                    v-if="this.image_preview != '' || this.image != ''"
                    onclick="return false"
                    v-on:click="remove_image()"
                    class="red--text"
                    >Remove</label
                  >
                </div>
                <div>
                  <button class="ml-0" color="success" v-on:click="onSubmit()">
                    <label class="white-font">Submit</label>
                  </button>
                </div>

                <div class="flex justify-center">
                  <div class="mb-3 w-96">
                    <label
                      for="formFileMultiple"
                      class="form-label inline-block mb-2 text-gray-700"
                      >Multiple files input example</label
                    >
                    <!-- <input type="file" @change="uploadFile" multiple /> -->
                    <form @submit.prevent="handleSubmit">
                      <input
                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="file"
                        @change="uploadFile"
                        multiple
                      />
                      <div class="form-group">
                        <button class="btn btn-success btn-block btn-lg">
                          Upload
                        </button>
                        <!-- @click.prevent="handleSubmit" -->
                      </div>
                    </form>

                    <!-- v-on:change="handleFileUpload2($event.target.files)"  v-on:change="handleFileUpload2($event.target.files)" -->
                    <!-- <input
                      class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      type="file"
                      id="formFileMultiple"
                      v-on:change="fileSelected()"
                    /> -->
                    <!-- v-on:click="fileSelected()" -->
                    <!-- @change="fileSelected()" -->
                    <!-- multiple -->
                  </div>
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
import ModalDelete from '@/components/Modals/Modal.vue'
export default {
  components: {
    ModalDelete,
  },
  layout: 'dashboard_admin',
  data() {
    return {
      files: null,
      originalIndex: -1,
      delete_id: false,
      showModal: false,
      // modalDelete: false,
      currentIndex: -1,
      isActive: false,

      error: '',
      tabledata: [],

      isLoading: false,
      columns: [
        {
          label: 'Full Name',
          field: 'name',
        },
        {
          label: 'Username',
          field: 'username',
        },

        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Admin Account',
          field: 'is_admin',
        },
        {
          label: 'Date - Time',
          field: 'created_at',
        },
        {
          label: 'Action',
          field: 'action',
          sortable: false,
        },
      ],
      rows: [],
      totalRecords: 0,
      serverParams: {
        columnFilters: {},
        sort: [
          {
            field: '',
            type: '',
          },
        ],
        page: 1,
        perPage: 10,
      },

      image: '',
      image_preview: '',
      image_name: '',
      image: '',
      image_m: [],
    }
  },
  created() {
    // modal.show()
    this.requests = []
  },
  mounted() {
    this.loadItems()
  },
  methods: {
    async loadItems() {
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      this.$axios
        .$post('/admin/user/data-table', this.serverParams, {})
        .then((response) => {
          this.totalRecords = response.totalRecords
          var data = []
          var rowcount = 1

          for (const i in response.data) {
            data.push({
              no: rowcount,
              id: response.data[i].id,
              name: response.data[i].name,
              username: response.data[i].username,
              email: response.data[i].email,
              created_at: response.data[i].created,
              is_admin: response.data[i].is_admin == 1 ? 'Yes' : 'No',
            })
            rowcount++
          }

          this.rows = data
          console.log(this.rows)
        })
        .catch((error) => {})
        .finally(() => {})
    },

    updateParams(newProps) {
      // console.log('updateParams')
      // console.log(newProps)
      // this.isLoading = true
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      // console.log('onPageChange')
      // console.log(params)

      // this.isLoading = true
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      // console.log(params)
      // this.isLoading = true
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params[0].type,
            field: params[0].field,
          },
        ],
      })
      this.loadItems()
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    download() {
      const url = this.$config.api + '/users/export/'
      window.location.href = url
    },
    async downloadpdf() {
      this.$toast.success('Processing')
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      try {
        this.$axios
          .$post(`api/fill-data-pdfs`)
          .then((res) => {
            const url = this.$config.api + '/download/' + res.path
            // const url = 'http://be-it.api.testt/test/Juan%20Dela%20Cruz%2011652860632.pdf'
            window.location.href = url
          })
          .catch((error) => {})
          .finally(() => {})
        this.$toast.success('Done.')
      } catch (error) {
        this.$toast.error('Failed.')
      }

      // const url = this.$config.api + '/fill-data-pdfs'
      // window.location.href = url
    },
    toggleModal: function () {
      this.showModal = !this.showModal
    },
    deleteModal(index) {
      this.originalIndex = index
      console.log(this.rows[index].name)

      this.showModal = !this.showModal
    },
    async deleteItemConfirm() {
      this.$toast.success('Processing')
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})

      let table_id = this.rows[this.originalIndex].id

      try {
        this.$axios
          .$delete(`api/user/delete/${table_id}`)
          .then((res) => {
            this.rows.splice(this.originalIndex, 1)
          })
          .catch((error) => {})
          .finally(() => {})
        this.$toast.success('Done.')
      } catch (error) {
        this.$toast.error('Failed.')
      }

      // this.closeDelete()
      this.showModal = !this.showModal
    },

    handleFileUpload(e) {
      console.log(e)
      const file = this.$refs.file.files[0]
      this.image_preview = URL.createObjectURL(file)
      console.log(file)
      console.log(this.image_preview)
      try {
        this.image_name = this.$refs.file.files[0].name
        this.image = this.$refs.file.files[0]
      } catch (err) {
        console.log(err)
      }
    },
    remove_image() {
      this.$refs.file.value = null
      this.image_name = ''
      this.image = ''
      this.image_preview = ''

      return false
    },
    async onSubmit() {
      this.$axios.$get('/sanctum/csrf-cookie')
      this.$toast.success('Sending')
      let payload = new FormData()
      payload.append('image', this.image)
      payload.append('image_name', this.image_name)
      this.$axios
        .post('/api/userdetails/update_image', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.$toast.success('Done.')
        })
        .catch((error) => {
          this.$toast.success('Error.')
        })
        .finally(() => {})
    },
    filesChange(fieldName, fileList) {
      // handle file changes

      console.log(fieldName)
      const formData = new FormData()

      if (!fileList.length) return

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name)
      })

      // save it

      console.log(formData)
      // this.save(formData)
    },
    handleFileUpload2(e) {
      var photoes = e.target[0].files
      console.log(photoes)
      // let data = this.$refs.file.files
      // data.forEach((value, index) => {
      //   console.log(value)
      //   console.log(index)
      // })
      // console.log(e)
      // const file = this.$refs.file.files[0]
      // this.image_preview = URL.createObjectURL(file)
      // console.log(file)
      // const file2 = this.$refs.file.files[1]
      // this.image_preview = URL.createObjectURL(file2)
      // console.log(file2)
    },
    uploadFile(event) {
      this.files = event.target.files
      console.log(this.files)
    },
    handleSubmit() {
      this.$axios.$get('/sanctum/csrf-cookie')
      this.$toast.success('Sending')

      const formData = new FormData()

      for (const i of Object.keys(this.files)) {
        formData.append('files', this.files[i])
        // formData.append('files[' + i + ']', this.files[i])
      }

      //  formData.append('files', this.files)

      // let payload = new FormData()
      // payload.append('image', this.image)
      // payload.append('image_name', this.image_name)
      this.$axios
        .post('/api/fileupload/update_multiple', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.$toast.success('Done.')
        })
        .catch((error) => {
          this.$toast.success('Error.')
        })
        .finally(() => {})

      // axios
      //   .post('http://localhost:4000/api/file-upload', formData, {})
      //   .then((res) => {
      //     console.log(res)
      //   })
    },
  },
}
</script>
<style>
.bg-slate-600 {
  background-color: rgb(51 65 85);
}
</style>
