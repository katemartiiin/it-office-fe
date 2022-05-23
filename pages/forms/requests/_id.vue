<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/requests" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <p class="text-xs mt-5">Request No. {{ this.$route.params.id }}</p>
          <h1 class="text-xl font-bold mb-5">
            Financial Assistance Letter to Local Chief Executive
          </h1>
          <div class="w-full px-3 pb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Control Number
            </label>
            <input
              v-model="payload.control_number"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="text"
              placeholder="Control Number"
            />
          </div>
          <div class="w-full px-3 pb-2">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-payee"
            >
              Payee
            </label>
            <input
              v-model="payload.name"
              class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-payee"
              type="text"
              placeholder="Name of Payee"
            />
          </div>
          <div
            class="border-dashed border-2 border-sky-500 bg-gray-300 p-4 w-full content-center"
          >
            <div class="w-full flex pt-5">
              <div
                v-for="(image, key) in this.images"
                :key="key"
                class="flex-auto"
              >
                <div class="p-1">
                  <img :ref="'image'" :src="image.path" width="400" />
                  <a :href="image.path" target="_blank">[ View ]</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
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

  mounted() {
    this.requestform_id = this.$route.params.id
    this.fetchItem()
  },
  methods: {
    async fetchItem() {
      const url = this.$config.api
      await this.$axios.$get('/sanctum/csrf-cookie').then((response) => {})
      console.log('hello')
      this.$axios
        .$get('/api/requestform/yield/' + this.requestform_id)
        .then((response) => {
          console.log('return')
          this.item = response.item
          this.payload.name = response.form.payee
          this.payload.control_number = response.form.control_number

          var data = []
          if (response.file) {
            for (const i in response.file) {
              data.push({
                path: url + '/' + response.file[i].file,
              })

              console.log(response.file[i].file)
            }
            this.images = data
          }
        })
        .catch((error) => {})
        .finally(() => {})
    },
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
