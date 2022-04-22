<template>
  <div>
    <vue-good-table
      :pagination-options="{
        enabled: true,
      }"
      :columns="columns"
      :rows="rows"
      :line-numbers="true"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'action'">
          <button
            :key="props.row.id"
            v-if="props.row.approval == 0"
            :class="props.row.classname"
            class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            aria-expanded="false"
            @click="approve(props.row)"
          >
            Approve
          </button>
          <button
            v-else
            :class="props.row.classname"
            class="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            aria-expanded="false"
          >
            Approve
          </button>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>
<script>
export default {
  mounted() {
    this.fetch()
  },
  data() {
    return {
      tabledata: [],
      columns: [
        {
          label: '#',
          field: 'no',
        },
        {
          label: 'Request No',
          field: 'id',
        },
        {
          label: 'Name',
          field: 'name',
        },

        {
          label: 'Email',
          field: 'email',
        },
        {
          label: 'Browser',
          field: 'browser',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: [
        { id: 1, name: 'John', age: 20, createdAt: '', score: 0.03343 },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
      ],
    }
  },
  methods: {
    async fetch() {
      await this.$axios
        .post('/api/fetch/requests')
        .then((response) => {
          this.requests = response.data.requests

          if (this.dataTable) {
            this.dataTable.destroy()
          }

          var data = []
          var rowcount = 1
          this.$nextTick(() => {
            for (const i in this.requests) {
              data.push({
                no: rowcount,
                id: this.requests[i].id,
                name: this.requests[i].user.fullname,
                email: this.requests[i].user.email,
                approval: this.requests[i].is_approved,
                browser: this.requests[i].browser,
                status:
                  this.requests[i].is_approved == 1 ? 'Approved' : 'Pending',
                classname:
                  this.requests[i].is_approved == 1
                    ? 'bg-gray-500'
                    : 'bg-blue-500',
              })
              rowcount++
            }

            this.rows = data
            console.log(this.rows)
          })
        })
        .catch((error) => {
          this.error = error
        })
    },
  },
}
</script>
