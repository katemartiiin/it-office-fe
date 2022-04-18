<template>
  <div class="h-screen md:flex">
    <Header />
    <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
      <form class="bg-white">
        <h1
          class="text-gray-800 font-bold text-2xl mb-3"
        >
          Login
        </h1>
        <p class="mt-0 mb-3 break-words">We'll send a request to the admin for login approval.</p>
        <p v-if="error" class="text-sm text-red-400 mb-2">
          {{ error }}
        </p>
        <!-- Email -->
        <div
          class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4"
        >
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
            id="email"
            v-model="email"
            class="pl-2 outline-none border-none"
            type="text"
            name="email"
            placeholder="example@mail.com"
          />
        </div>
        <button
          id="requestBtn"
          class="
            block
            w-full
            bg-indigo-600
            mt-4
            py-2
            rounded-2xl
            text-white
            font-semibold
            mb-2
            text-center
          "
        >
          Send request
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Login3',
  components: {
    Header,
  },
  data() {
    return {
      error: '',
      email: '',
    }
  },
  mounted () {
    this.$echo.channel('admin-approval')
      .listen('ApproveLoginEvent', (e) => {
        console.log(e.message)
      })
  },
  methods: {
      
  },
}
</script>