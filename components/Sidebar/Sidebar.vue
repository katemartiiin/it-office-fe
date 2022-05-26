<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-slate-600 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->

      <button
        class="cursor-pointer opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent text-white"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <NuxtLink
        to="/dashboard"
        name="linkdash"
        @click.prevent="dash()"
        class="md:block text-center md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold px-0"
      >
        <img
          class="mx-auto"
          src="~/assets/images/logo.png"
          width="120"
          height="120"
        />
      </NuxtLink>

      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <notification-dropdown />
        </li>
        <li class="inline-block relative">
          <user-dropdown />
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-full flex justify-end">
              <button
                type="button"
                class="cursor-pointer opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                @click="toggleCollapseShow('hidden')"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="mb-3 pt-0">
            <input
              type="text"
              placeholder="Search"
              class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
            />
          </div>
        </form>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full" />
        <!-- Heading -->

        <ul class="relative">
          <li class="relative" id="sidenavEx1">
            <NuxtLink
              to="/dashboard"
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
            >
              <i class="mr-2 text-sm fas fa-chart-simple"></i>
              <span>Dashboard</span>
            </NuxtLink>
          </li>
          <li class="relative" id="sidenavEx1">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx1"
              aria-expanded="true"
              aria-controls="collapseSidenavEx1"
            >
              <i class="mr-2 text-sm fas fa-user"></i>
              <span>User Management</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                ></path>
              </svg>
            </a>
            <ul
              class="relative accordion-collapse collapse"
              id="collapseSidenavEx1"
              aria-labelledby="sidenavEx1"
              data-bs-parent="#sidenavExample"
            >
              <li
                class="relative"
                v-for="(link, key) in sidebar_list"
                :key="key"
              >
                <NuxtLink
                  :to="link.link"
                  class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  >{{ link.label }}</NuxtLink
                >
              </li>
            </ul>
          </li>
          <li class="relative" id="sidenavEx1">
            <a
              class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx1"
              aria-expanded="true"
              aria-controls="collapseSidenavEx1"
            >
              <i class="mr-2 text-sm fas fa-file"></i>
              <span>Form Management</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                class="w-3 h-3 ml-auto"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                ></path>
              </svg>
            </a>
            <ul
              class="relative accordion-collapse collapse"
              id="collapseSidenavEx1"
              aria-labelledby="sidenavEx1"
              data-bs-parent="#sidenavExample"
            >
              <template
                v-if="
                  $auth.user['role'] == roles.ADMIN ||
                  $auth.user['role'] == roles.MANAGER
                "
              >
                <li class="relative">
                  <NuxtLink
                    to="/forms/requests"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >Form Request</NuxtLink
                  >
                </li>
                <li class="relative">
                  <NuxtLink
                    to="/forms/cafoa"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >CAFOA</NuxtLink
                  >
                </li>
                <li class="relative">
                  <NuxtLink
                    to="/forms/disbursement"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >Disbursement Voucher</NuxtLink
                  >
                </li>
              </template>
              <template
                v-else-if="
                  $auth.user['role'] == roles.DSWD ||
                  $auth.user['role'] == roles.MAYORSOFFICE
                "
              >
                <li class="relative">
                  <NuxtLink
                    to="/forms/requests"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >Form Request</NuxtLink
                  >
                </li>
              </template>
              <!-- Budget -->
              <template v-else-if="$auth.user['role'] == roles.BUDGET">
                <li class="relative">
                  <NuxtLink
                    to="/forms/cafoa"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >CAFOA</NuxtLink
                  >
                </li>
              </template>
              <!-- Treasury -->
              <template v-else-if="$auth.user['role'] == roles.TREASURY">
                <li class="relative">
                  <NuxtLink
                    to="/forms/cafoa"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >CAFOA</NuxtLink
                  >
                </li>
              </template>

              <template v-else-if="$auth.user['role'] == roles.ACCOUNTING">
                <li class="relative">
                  <NuxtLink
                    to="/forms/cafoa"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >CAFOA</NuxtLink
                  >
                </li>
                <li class="relative">
                  <NuxtLink
                    to="/forms/disbursement"
                    class="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 md:text-white lg:text-white text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    >Disbursement Voucher</NuxtLink
                  >
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NotificationDropdown from '@/components/Dropdowns/NotificationDropdown.vue'
import UserDropdown from '@/components/Dropdowns/UserDropdown.vue'
import roles from '/mixins/data/roles.js'
export default {
  mixins: [roles],
  components: {
    NotificationDropdown,
    UserDropdown,
  },
  data: () => ({
    sidebar_list: [
      { label: 'Users', icon: 'fas fa-user', link: '/users' },
      {
        label: 'Login Requests',
        icon: 'fas fa-fingerprint',
        link: '/users/logins',
      },
      {
        label: 'Logs',
        icon: 'fas fa-history',
        link: '/users/logs',
      },
      {
        label: 'Paper Trail',
        icon: 'fas fa-history',
        link: '/control-number',
      },
    ],
    form_list: [
      {
        label: 'Form Request',
        icon: 'fas fa-file',
        link: '/forms/requests',
      },
      {
        label: 'CAFOA',
        icon: 'fas fa-fingerprint',
        link: '/forms/cafoa',
      },
      {
        label: 'Disbursement Voucher',
        icon: 'fas fa-history',
        link: '/forms/disbursement',
      },
    ],
    //
    collapseShow: 'hidden',
  }),
  // data() {
  //   return {}
  // },

  methods: {
    toggleCollapseShow(classes) {
      this.collapseShow = classes
    },
    dash() {
      this.$router.push('/dashboard')
    },
  },
}
</script>
<style scoped>
.bg-slate-600 {
  background: linear-gradient(
      0deg,
      rgba(51, 65, 85, 0.874),
      rgba(51, 65, 85, 0.912)
    ),
    url('assets/images/login.jpg');
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
}
</style>
