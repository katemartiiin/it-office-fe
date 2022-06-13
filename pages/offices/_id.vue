<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/offices" class="mb-5 hover:text-black text-gray-500 text-xs"
        >&lt; Back
      </NuxtLink>

      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded mt-3"
      >
        <div class="px-10 py-5">
          <form class="w-full">
            <h1 class="text-2xl font-bold mb-10">Edit Office</h1>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-name"
                >
                  Head
                </label>
                <input
                  v-model="payload.head"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.head[0] ? 'border-red-500' : ''
                  "
                  id="grid-name"
                  type="text"
                  placeholder="Name"
                />
                <p
                  v-if="errors.length && errors.head[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.head[0] }}
                </p>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                >
                  Office
                </label>
                <input
                  v-model="payload.name"
                  class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  :class="
                    errors.length && errors.name[0] ? 'border-red-500' : ''
                  "
                  type="text"
                  placeholder="Designation"
                />
                <p
                  v-if="errors.length && errors.name[0]"
                  class="text-red-500 text-xs italic"
                >
                  {{ errors.name[0] }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap -mx-3 mb-6 float-right">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <button
                  @click="update"
                  type="button"
                  class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: '',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  layout: 'dashboard',
  data() {
    return {
      payload: {
        name: null,
        department: null,
      },
      signatoriesId: '',
      roles: [],
      errors: [],
    }
  },
  mounted() {
    this.Id = this.$route.params.id
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      const url = this.$config.api
      this.$axios
        .$post('api/offices/show/' + this.Id)
        .then((response) => {
          this.payload.name = response.data.name
          this.payload.head = response.data.head
        })
        .catch((err) => {
          this.errors = error.response.data.errors
        })
    },
    update() {
      let payload = new FormData()
      payload.append('name', this.payload.name)
      payload.append('head', this.payload.head)

      this.$axios
        .$post('api/offices/update/' + this.Id, payload)
        .then((res) => {
          this.$toast.success('Done.')
        })
        .catch((error) => {
          this.errors = error.response.data.errors
        })
    },
  },
}
</script>
<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: rgb(51 65 85);
}
</style>
