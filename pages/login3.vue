<template>
  <div class="flex md:w-1/2">
    <div class="w-full grid grid-rows-6 mt-10">
      <div class="row-span-3 col-span-1 flex justify-center mt-20 pt-20">
        <div class="justify-center py-10 items-center bg-white">
          <form class="bg-white">
            <h1 class="text-gray-800 font-bold text-2xl mb-3">Login</h1>
            <p v-if="message" class="text-sm text-green-400 mb-2">
              {{ message }}
            </p>
            <p class="mt-0 mb-3 break-words">
              We'll send a request to the admin for login approval.
            </p>
            <p v-if="error" class="text-sm text-red-400 mb-2">
              {{ error }}
            </p>
            <!-- Email -->
            <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                style="width: 100%"
                id="email"
                v-model="email"
                class="px-10 pl-2 outline-none border-none"
                type="text"
                name="email"
                placeholder="example@mail.com"
              />
            </div>
            <button
              id="requestBtn"
              type="button"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 text-center"
              @click="sendRequest"
            >
              Send request
            </button>
            <p class="text-sm ml-2 cursor-pointer mt-3">
              <NuxtLink
                to="/"
                class="text-md font-medium tracking-wide text-blue-800"
              >Login using other methods
              </NuxtLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { landing } from '~/mixins/middleware/landing_pages.js'
export default {
  mixins: [landing],
  head() {
    return {
      title: 'Login',
      meta: [
        {
          hid: 'B',
          name: '',
          content: '',
        },
      ],
    }
  },
  layout: 'auth',
  name: 'Login3',
  data() {
    return {
      error: '',
      email: '',
      message: '',
      userId: '',
      payload: {
        email: '',
        login: 2,
      },
    }
  },
  async created() {
    // await this.$axios.$get('/sanctum/csrf-cookie')
  },
  mounted() {
    this.$echo.channel('admin-approval').listen('ApproveLoginEvent', (e) => {
      console.log(e)
      if (e.userId == this.userId) {
        this.verifyLogin()
        // this.$router.push(e.redirect)
      }
    })
  },
  methods: {
    async verifyLogin() {
      // await this.$axios.$get('/sanctum/csrf-cookie')
      this.payload.email = this.email
      this.$auth
        .loginWith('laravelSanctum', {
          data: this.payload,
        })
        .then((response) => {
          console.log('Response is' + response)
          console.log(response)
          console.dir(response)

          this.$router.push('/dashboard')
        })
        .catch((error) => {
          console.log(error)
          this.error = error.response.data.data
          console.log('err onRejected')
        })
    },
    async sendRequest() {
      await this.$axios.$get('/sanctum/csrf-cookie')
      await this.$axios
        .post('/api/send-request', {
          email: this.email,
          browser: this.$browser.parsedResult.browser,
        })
        .then((response) => {
          console.log(response)
          this.message = response.data.message
          this.userId = response.data.userId
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
