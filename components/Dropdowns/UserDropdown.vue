<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="container mx-auto my-2 p-2">
        <div class="flex flex-row justify-center">
          <div
            class="m-2 p-4 border-orange-600 m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full bg-blue-600 text-xl text-white uppercase"
          >
            {{ $auth.user['email'].substring(0, 3).toUpperCase() }}
          </div>
        </div>
      </div>
      <!-- <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        > -->
      <!-- <div class="w-10 h-10 rounded-full" >A</div> -->
      <!-- <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          /> -->
      <!-- </span>
      </div> -->
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <NuxtLink
        :to="'/users/' + $auth.user['id']"
        class="pointer-events-auto text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Profile
      </NuxtLink>
      <!-- <NuxtLink
        to="/dashboard"
        class="pointer-events-auto text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Settings
      </NuxtLink> -->
      <!-- <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Something else here
      </a> -->
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a
        href="javascript:void(0);"
        @click.prevent="logout()"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Log out
      </a>
      <!--  -->
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

import image from '@/assets/images/team-1-800x800.jpg'

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: image,
    }
  },
  async created() {
    // await this.$axios.$get('/sanctum/csrf-cookie')
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault()
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false
      } else {
        this.dropdownPopoverShow = true
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: 'bottom-start',
        })
      }
    },
    async logout() {
      try {
        await this.$auth.logout()
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
