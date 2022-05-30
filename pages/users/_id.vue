<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <a href="/users" class="mb-5 hover:text-black text-gray-500 text-xs"
        >< Back</a
      >
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded mt-3 bg-gray-100"
      >
        <div class="px-10 py-5">
          <form class="w-full">
            <h1 class="text-2xl font-bold mb-10">Edit User</h1>
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
                  for="grid-email"
                >
                  Email
                </label>
                <input
                  v-model="payload.email"
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.email[0] ? 'border-red-500' : ''
                  "
                  id="grid-email"
                  type="text"
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
                  class="form-select block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  aria-label="Default select example"
                >
                  <option
                    v-for="role in roles"
                    :key="role.id"
                    :value="role.id"
                  >
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
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Password
                    </label>
                    <input
                        v-model="payload.password"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        :class="errors.length && errors.password[0] ? 'border-red-500' : ''"
                        id="grid-username"
                        type="password"
                        placeholder="Password"
                    />
                    <p v-if="errors.length && errors.password[0]" class="text-red-500 text-xs italic">{{ errors.password[0] }}</p>
                </div>
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
                        Confirm Password
                    </label>
                    <input v-model="payload.password_confirmation" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-confirm-password" type="password" placeholder="Confirm Password">
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
        username: null,
        email: null,
        password: null,
        password_confirmation: null,
        role: null,
      },
      userId: '',
      roles: [],
      errors: [],
    }
  },
  mounted() {
    this.userId = this.$route.params.id
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.$axios
        .$post('api/user/show/' + this.userId)
        .then((response) => {
          this.payload = response.user;
          this.roles = response.roles;
        })
        .catch((err) => {
          //
        })
    },
    update() {
      this.$axios
        .$post('api/user/update/' + this.userId, this.payload)
        .then((res) => {
          this.$toast.success('User updated!');
        })
        .catch((error) => {
          this.errors = error.response.data.errors
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
