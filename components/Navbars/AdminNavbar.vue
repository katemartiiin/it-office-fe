<template>
  <nav
    class="top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
      class="w-full mx-auto justify-between items-center flex md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <div class="flex flex-row">
        <h1 v-if="title" class="text-3xl font-bold text-slate-600 mt-5">
          Dashboard
        </h1>
      </div>
      <div class="justify-items-end">
        <div><span></span></div>
      </div>
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <template v-if="$nuxt.$route.path == '/dashboard'">
          <notification-dropdown :notification_rows="notification_rows" />
        </template>
        <span class="font-semibold text-slate-600 py-2 px-4">
          Hi,
          <span class="font-bold text-red-800">{{ $auth.user['email'] }}</span>
        </span>
        <user-dropdown />
      </ul>
    </div>
  </nav>
</template>

<script>
import UserDropdown from '@/components/Dropdowns/UserDropdown.vue'
import NotificationDropdown from '@/components/Dropdowns/NotificationDropdown.vue'

export default {
  props: ['notification_rows', 'title'],
  components: {
    UserDropdown,
    NotificationDropdown,
  },
}
</script>
