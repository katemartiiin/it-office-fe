<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/dashboard" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <div class="w-full px-3 pb-2 mb-6">
            <label>Profile I.D.</label>
            <input
              readonly
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :value="this.$route.params.id"
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label>Email </label>
            <input
              readonly
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :value="$auth.user['email']"
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label>Name </label>
            <input
              readonly
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :value="$auth.user['name']"
            />
          </div>

          <div class="w-full px-3 pb-2 mb-6">
            <label>Username :</label>
            <input
              readonly
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :value="$auth.user['username']"
            />
          </div>
          <div class="w-full px-3 pb-2 mb-6">
            <label>Role</label>
            <input
              readonly
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              :value="roles[$auth.user['role']].id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import roles_index from '~/mixins/data/roles_index.js'
export default {
  mixins: [roles_index],
  head() {
    return {
      title: 'Profile',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  middleware: 'auth',
  components: {},
  layout: 'dashboard',
  data() {
    return {
      payload: {
        name: '',
        control_number: '',
        file: '',
      },
      item: '',
      images: [],
    }
  },

  mounted() {},
  methods: {},
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
