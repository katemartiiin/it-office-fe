<template>
  <div>
    <!-- Modal -->
    <div
      v-if="showmodal"
      class="modal overflow-x-hidden overflow-y-auto fixed px-5 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div class="relative my-6 cstm_width">
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
          <div class="w-full relative px-1 py-1 flex-auto">
            <div class="flex justify-center">
              <div class="mb-3">
                <p class="font-semibold">
                  Control Number : {{ control_number }}
                </p>
                <br />
                <label
                  v-if="status == 'action'"
                  for="exampleFormControlTextarea1"
                  class="form-label inline-block mb-2 text-gray-700 font-semibold"
                >
                  <slot name="title_textarea"></slot>
                </label>

                <template>
                  <!-- {{ notes }} -->
                  <!-- class="w-full bg-transparent hover:bg-slate-300 hover:text-slate-800 hover:font-semibold border border-solid hover:blue-white uppercase text-sm px-1 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" -->
                  <div>
                    <div>
                      <table>
                        <tr>
                          <th>Control Number</th>
                          <th>Name</th>
                          <th>Date</th>
                          <th>Beneficiary</th>
                        </tr>
                        <tr v-for="(item, key) in notes" :key="key">
                          <td>
                            <NuxtLink
                              aria-expanded="false"
                              :to="'/control-number/' + item.control_number"
                              class="underline"
                              >{{ item.control_number }}
                            </NuxtLink>
                          </td>
                          <td>{{ item.payee }}</td>

                          <td>{{ formatDate(item.requestdate) }}</td>
                          <td>{{ item.beneficiary }}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                  <div
                    v-if="!notes.length"
                    class="bg-transparent border border-solid hover:blue-white font-bold uppercase text-xs px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    No notes added.
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div
            class="flex items-center justify-end px-6 py-2 border-t border-solid border-slate-200 rounded-b"
          >
            <button
              class="bg-transparent hover:bg-green-500 hover:text-white border border-solid hover:blue-white font-bold uppercase text-xs px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              v-on:click="toggleModal()"
            >
              OK
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
  props: ['showmodal', 'status', 'notes', 'control_number'],
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
    formatDate(date) {
      var d = new Date(date),
        // month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()
      const month = d.toLocaleString('default', { month: 'long' })
      // if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return month + ' ' + day + ',' + year
    },
  },
}
</script>

<style scoped>
.modal .cstm_width1 {
  width: 100%;
}
.modal td {
  margin: 2px;
}
.modal table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.modal td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.modal tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
