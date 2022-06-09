<template>
  <div>
    <div class="content-heading">
      <h3>Test datatable</h3>
      <small></small>
      <br />
      <br />
    </div>
    <div class="content">
      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <vue-good-table
              mode="remote"
              :columns="columns"
              :rows="rows"
              :globalSearch="true"
              :search-options="{
                enabled: true,
                skipDiacritics: true,
              }"
              @on-search="onSearch"
              styleClass="table table-hover table-bordered table-responsive"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'S.No'">
                  {{
                    users.per_page * (users.current_page - 1) +
                    (props.index + 1)
                  }}
                </span>
                <span v-else>
                  {{ props.formattedRow[props.column.field] }}
                </span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: ['endpoint'],
  data() {
    return {
      users: {
        searchTerm: '',
        total: 0,
        per_page: 5,
        from: 1,
        to: 0,
        current_page: 1,
      },
      offset: 4,
      columns: [
        {
          label: 'S.No',
          field: 'S.No',
        },
        {
          label: 'User Name',
          field: 'name',
          filterable: true,
        },
        {
          label: 'Email Address',
          field: 'email',
          filterable: true,
        },
        {
          label: 'Created At',
          field: 'created_at',
          filterable: true,
        },
      ],
      rows: [],
    }
  },
  mounted() {
    // this.getRecords()
  },
  methods: {
    getRecords() {
      return axios
        .get(`${this.endpoint}?searchTerm=${this.users.searchTerm}`)
        .then((response) => {
          this.rows = response.data.users.data
          this.users = response.data.users
        })
    },
    updateParams(newProps) {
      this.users = Object.assign({}, this.users, newProps)
    },
    onSearch: _.debounce(function (params) {
      this.updateParams(params)
      this.getRecords()
      return false
    }, 500),
  },
}
</script>
