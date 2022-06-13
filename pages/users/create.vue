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
      <a href="/users" class="mb-5 hover:text-black text-gray-500 text-xs">
        &lt; Back</a
      >
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded mt-5"
      >
        <div class="px-10 py-5">
          <form class="w-full">
            <h1 class="text-2xl font-bold mb-10">Create User</h1>
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
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
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
                  for="grid-name"
                >
                  Email
                </label>
                <input
                  v-model="payload.email"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.email[0] ? 'border-red-500' : ''
                  "
                  id="grid-name"
                  type="email"
                  placeholder="Email"
                />
                <p
                  v-if="errors.length && errors.email[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.email[0] }}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Username
                </label>
                <input
                  v-model="payload.username"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.username[0] ? 'border-red-500' : ''
                  "
                  id="grid-username"
                  type="text"
                  placeholder="Username"
                />
                <p
                  v-if="errors.length && errors.username[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.username[0] }}
                </p>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-request"
                >
                  Roles
                </label>
                <select
                  v-model="payload.role"
                  class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  aria-label="Default select example"
                >
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.value }}
                  </option>
                </select>
                <small v-if="errors.role" class="text-xs text-red-500">{{
                  errors.role[0]
                }}</small>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Password
                </label>
                <input
                  v-model="payload.password"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.password[0] ? 'border-red-500' : ''
                  "
                  id="grid-username"
                  type="password"
                  placeholder="Password"
                />
                <p
                  v-if="errors.length && errors.password[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.password[0] }}
                </p>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-confirm-password"
                >
                  Confirm Password
                </label>
                <input
                  v-model="payload.password_confirmation"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-confirm-password"
                  type="password"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6 float-right">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <button
                  @click="create"
                  type="button"
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSuccess from '@/components/Modals/Modal.vue'
export default {
  components: {
    ModalSuccess,
  },

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
      showModal: false,
      response: {
        message: '',
      },
      payload: {
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: null,
      },
      errors: [],
      roles: [
        { id: 1, value: 'Admin' },
        { id: 2, value: 'DSWD' },
        { id: 3, value: 'MayorsOffice' },
        { id: 4, value: 'Budget' },
        { id: 5, value: 'Treasury' },
        { id: 6, value: 'Accounting' },
        { id: 7, value: 'Manager' },
        { id: 8, value: 'Mayors Office Bank Cheque Awarding' },
      ],
    }
  },
  methods: {
    create() {
      this.$toast.success('Processing')
      this.$axios
        .$post('api/user/create', this.payload)
        .then((res) => {
          this.response.message = res.message
          this.showModal = true
          this.$toast.success('Done.')

          this.payload.name = "";
          this.payload.username = "";
          this.payload.email = "";
          this.payload.password = "";
          this.payload.password_confirmation = "";
          this.payload.role = null;
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          this.$toast.fail(this.errors)
        })
    },
    toggleModal() {
      this.showModal = !this.showModal
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
