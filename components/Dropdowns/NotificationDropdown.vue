<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="container mx-auto my-2 p-2">
        <div class="flex flex-row justify-right">
          <div
            class="m-2 p-4 border-orange-600 m-1 mr-2 w-12 h-12 relative flex justify-center items-center rounded-full text-xl text-white uppercase"
          >
            <!-- notification bell start -->
            <button class="inline-block relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"
              ></span>
            </button>
            <!-- notification bell end -->
          </div>
        </div>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <template v-if="notification_rows">
        <div class="h-0 my-2 border border-solid border-blueGray-100" />
        <div v-for="(itm, index) in notification_rows" :key="index">
          <div
            class="pointer-events-auto text-md py-2 px-7 font-normal block w-full whitespace-nowrap hover:bg-gray-100 bg-transparent text-blueGray-700"
          >
            <strong>{{ itm.control_number }}</strong> is
            <span class="text-red">{{ itm.overdue }} days overdue.</span>
          </div>

          <div class="h-0 my-2 border border-solid border-blueGray-100" />
        </div>
        <div
          class="pointer-events-auto text-md py-2 px-7 font-normal block w-full whitespace-nowrap hover:bg-gray-100 bg-transparent text-blueGray-700"
        >
          No more available notification.
        </div>
        <div class="h-0 my-2 border border-solid border-blueGray-100" />
      </template>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
export default {
  props: ['notification_rows'],
  data() {
    return {
      dropdownPopoverShow: false,
    }
  },
  async created() {},
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
  },
}
</script>
