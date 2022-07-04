<template>
  <div class="flex flex-row">
    <div class="p-1">
      <button
        class="text-xs bg-red-700 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
        v-on:click.prevent="view_note(control_number)"
      >
        <span>
          View Note

          <svg
            class="w-full h-6 icon-svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </span>
      </button>
    </div>
    <div class="p-1">
      <button
        class="text-xs bg-green-700 hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
        @click="addNote(control_number)"
      >
        <span>
          Add Note
          <svg
            class="w-full h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ['control_number'],
  methods: {
    view_note(control_number) {
      this.$emit('view-note', control_number)
    },
    addNote(control_number) {
      this.$emit('add-note', control_number)
    },
  },
}
</script>
