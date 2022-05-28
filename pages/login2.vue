<template>
  <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
    <form class="bg-white">
      <h1 class="text-gray-800 font-bold text-2xl mb-3">Login</h1>
      <p class="mt-0 mb-3 break-words">
        A code will be sent to your email for login verification.
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
        id="codeBtn"
        type="button"
        class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 text-center"
        @click="sendCode"
      >
        Send code
      </button>
    </form>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Login',
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
  name: 'Login2',
  data() {
    return {
      error: '',
      email: '',
    }
  },
  async created() {
    // await this.$axios.$get('/sanctum/csrf-cookie')
  },
  methods: {
    async sendCode() {
      window.localStorage.setItem('email', this.email)
      // await this.$axios.$get('/sanctum/csrf-cookie')
      await this.$axios
        .post('/api/send-token', {
          email: this.email,
        })
        .then((response) => {
          console.log(response)
          // window.location.href = '/verify'
          this.$router.push('/verify')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
