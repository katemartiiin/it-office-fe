<template>
  <div>
    <div>
      <!-- This example requires Tailwind CSS v2.0+ -->
      <div class="relative bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
          >
            <div class="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span class="sr-only">Workflow</span>
                <img
                  class="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </div>
            <div class="hidden md:flex items-left justify-end md:flex-1 lg:w-0">
              <a
                href="#"
                class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Admin
              </a>
            </div>
            <div class="flex justify-start lg:w-0 lg:flex-1"></div>
            <nav class="hidden md:flex space-x-10">
              <div class="relative">
                <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" -->
                <button
                  type="button"
                  class="invisible text-gray-500 group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-expanded="false"
                >
                  <span>Menu 1</span>

                  <svg
                    class="text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </nav>

            <div
              class="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
            >
              <a
                href="#"
                class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                @click.prevent="dashboard()"
              >
                Dashboard
              </a>

              <a
                href="#"
                v-if="
                  $auth.user && $auth.loggedIn && $auth.user['is_admin'] == '1'
                "
                @click.prevent="admin()"
                class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-indigo-700"
              >
                Admin
              </a>
              <a
                href="#"
                @click.prevent="logout()"
                class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </a>
            </div>
          </div>

          <div>Data Table</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  mounted() {
    console.log(this.$auth.$storage.getCookies()['XSRF-TOKEN'])
  },
  methods: {
    dashboard() {
      this.$router.push('/dashboard')
    },
    admin() {
      this.$router.push('/admin')
    },
    async logout() {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
