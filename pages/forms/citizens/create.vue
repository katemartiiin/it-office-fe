<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/cafoa" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <p class="text-xs mt-5">New Record</p>
          <h1 class="text-xl font-bold mb-5">
            CITIZEN'S INFORMATION
          </h1>
          <form class="w-full">
            <div class="flex flex-wrap mb-6">
                <div class="w-full md:w-1/3 py-2 md:pr-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    First Name
                    </label>
                    <input
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="First Name"
                    />
                </div>
                <div class="w-full md:w-1/3 py-2 md:px-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Middle Name (optional)
                    </label>
                    <input
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Middle Name (optional)"
                    />
                </div>
                <div class="w-full md:w-1/3 py-2 md:pl-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Last Name
                    </label>
                    <input
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Last Name"
                    />
                </div>
              </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSuccess from '@/components/Modals/Modal.vue'
export default {
  head() {
    return {
      title: 'Create Citizen Record',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  components: {
    ModalSuccess,
  },
  layout: 'dashboard',
  data() {
    return {
      //
    }
  },

  mounted() {
    //
  },
  methods: {
    //
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
