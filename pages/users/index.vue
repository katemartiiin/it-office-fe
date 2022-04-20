<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <card-table title="Users" :headers="headers" />
    </div>
  </div> 
</template>
<script>
import CardTable from "@/components/Cards/CardTable.vue";

export default {
  layout: 'admin',
  components: {
    CardTable,
  },
  data() {
    return {
      headers: [
        { name: 'ID' },
        { name: 'Name' },
        { name: 'Status' }
      ],
    }
  },
}
</script>