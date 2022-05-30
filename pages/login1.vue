<template>
  <div class="flex md:w-1/2">
    <div class="w-full grid grid-rows-6">
      <div class="row-span-3 col-span-1 flex justify-center mt-20 pt-20">
        <div class="py-10 items-center bg-white">
          <form class="bg-white">
            <h1
              class="pt-1 text-gray-800 font-bold text-2xl"
              :class="!error ? 'mb-7' : ''"
            >
              Login
            </h1>

            <p v-if="error" class="text-sm text-red-400 mb-2">
              {{ error }}
            </p>

            <div class="flex items-center border-2 py-2 px-2 rounded-2xl mb-4">
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
                v-model="payload.email"
                class="px-20 pl-2 outline-none border-none"
                type="text"
                name="email"
                placeholder="example@mail.com"
              />
            </div>

            <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                style="width: 100%"
                id="password"
                v-model="payload.password"
                class="px-20 pl-2 outline-none border-none"
                type="password"
                name="password"
                placeholder="Password"
              />
            </div>
            <button
              id="loginBtn"
              type="button"
              class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 text-center"
              @click="login"
            >
              Login
            </button>
            <p class="text-sm ml-2 cursor-pointer mt-3">
              <NuxtLink
                to="/"
                class="text-md font-medium tracking-wide text-blue-800"
              >Login using other methods
              </NuxtLink>
            </p>
            <p class="text-sm ml-2 cursor-pointer mt-3">
              Don't have an account?
              <a href="#" class="hover:text-blue-500">Sign up</a>
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
  name: 'Login1',
  data() {
    return {
      error: '',
      payload: {
        email: '',
        password: '',
        login: 1,
      },
    }
  },
  async created() {
    // await this.$axios.$get('/sanctum/csrf-cookie')
  },
  methods: {
    async login() {
      try {
        this.$auth
          .loginWith('laravelSanctum', {
            data: this.payload,
          })
          .then((response) => {
            console.log('Response is' + response)
            console.log(response)
            this.$router.push('/dashboard')
          })
          .catch((error) => {
            console.log(error)
            this.error = error.response.data.data
            console.log('err onRejected')
          })
      } catch (error) {
        console.log(error.response.data)
        if (error.response.status === 422) {
          console.log(error.response.data)
          this.error = error.response.data
        }
      }
    },
  },
}
</script>
