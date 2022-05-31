<template>
  <div class="flex md:w-1/2 justify-center md:py-10 lg:py-10 py-20 items-center bg-white">
    <div class="justify-center">
      <NuxtLink
        aria-expanded="false"
        to="/login1"
        class="block w-full bg-indigo-600 hover:bg-indigo-700 my-3 py-2 rounded-2xl text-white font-semibold mb-2 text-center px-10"
        >Login with email
      </NuxtLink>
      <NuxtLink
        aria-expanded="false"
        to="/login2"
        class="block w-full bg-indigo-600 hover:bg-indigo-700 my-3 py-2 rounded-2xl text-white font-semibold mb-2 text-center px-10"
        >Login with code
      </NuxtLink>
      <NuxtLink
        aria-expanded="false"
        to="/login3"
        class="block w-full bg-indigo-600 hover:bg-indigo-700 my-3 py-2 rounded-2xl text-white font-semibold mb-2 text-center px-10"
        >Login by approval
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { landing } from '~/mixins/middleware/landing_pages.js'
export default {
  head() {
    return {
      title: 'Landingpage',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  mixins: [landing],
  // mixins: [landing],
  layout: 'auth',
  name: 'IndexPage',
}
</script>
<style scoped>
.py-20 {
  padding-top: 5rem;
  padding-bottom: 5rem;
}
</style>
