<template>
  <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
    <form class="bg-white">
      <h1 class="text-gray-800 font-bold text-2xl mb-3">Login</h1>
      <p class="mt-0 mb-3 break-words">
        Kindly enter the code that we have sent to your email.
      </p>
      <p v-if="error" class="text-sm text-red-400 mb-2">
        {{ error }}
      </p>
      <!-- Code -->
      <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
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
          id="code"
          v-model="code"
          class="pl-2 outline-none border-none"
          type="text"
          name="code"
        />
      </div>
      <!-- href="/dashboard" -->
      <button
        class="block w-full bg-indigo-600 hover:bg-indigo-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 text-center"
        @click.prevent="verify"
      >
        Login with Code
      </button>
      <!-- <a
        class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 text-center"
      >
      </a> -->
    </form>
  </div>
</template>

<script>
import { landing } from '~/mixins/middleware/landing_pages.js'
export default {
  mixins: [landing],
  head() {
    return {
      title: 'Verify',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  layout: 'auth',
  name: 'Verify',
  data() {
    return {
      error: '',
      code: '',
      payload: {
        email: '',
        login: 2,
      },
    }
  },
  async created() {

  },
  methods: {
    async verify() {
      var email = window.localStorage.getItem('email')

      await this.$axios
        .post('/api/verify', {
          email: email,
          code: this.code,
        })
        .then((response) => {
          console.log(response)
          this.payload.email = email
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
          // window.location.href = '/dashboard';
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
