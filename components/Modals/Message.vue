<template>
  <div>
    <!-- Modal -->
    <div
      v-if="showmodal"
      class="overflow-x-hidden overflow-y-auto fixed px-5 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative my-6">
        <div
          class="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none"
        >
          <div
            class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t rounded-t mb-0 px-4 py-3 border-0 bg-slate-600"
          >
            <h3 class="text-xl font-semibold text-white">
              <slot name="title"></slot>
            </h3>
            <button class="" v-on:click="toggleModal()">
              <span class="text-white"> x </span>
            </button>
          </div>
          <div class="relative px-10 py-6 flex-auto">
            <div class="flex justify-center">
              <div class="mb-3 xl:w-96">
                <label
                  v-if="status == 'action'"
                  for="exampleFormControlTextarea1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  <slot name="title_textarea"></slot>
                </label>
                <textarea
                  v-if="status == 'action'"
                  v-model="message"
                  class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="Your message"
                ></textarea>

                <label for="" v-if="status == 'done'"
                  >Note has been submitted.</label
                >
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b"
          >
            <button
              v-if="status == 'done'"
              class="bg-transparent border border-solid hover:blue-white font-bold uppercase text-xs px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleModal()"
            >
              OK
            </button>
            <button
              v-if="status == 'action'"
              class="bg-transparent border border-solid hover:blue-white font-bold uppercase text-xs px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="submitNote()"
            >
              <slot name="btn-action"></slot>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showmodal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    <!-- Modal -->
  </div>
</template>

<script>
export default {
  props: ['showmodal', 'status'],
  data: () => ({
    message: '',
  }),
  methods: {
    submitNote() {
      this.$emit('submit-note', this.message)
      this.message = ''
    },
    toggleModal() {
      this.$emit('toggleModal')
    },
  },
}
</script>

<style scoped></style>
