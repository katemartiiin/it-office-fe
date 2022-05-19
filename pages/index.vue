<template>
  <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
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
export default {
  layout: 'auth',
  name: 'IndexPage',
}
</script>
