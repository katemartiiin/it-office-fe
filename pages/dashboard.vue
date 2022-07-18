<template>
  <div>
    <div class="bg-slate-200">
      <AdminNavbar :notification_rows="notification_rows" title="Dashboard" />
      <DashStatus
        :roleId="roleId"
        :pendingRequests="dashPendingReqs"
        :pendingCafoa="dashPendingCafoa"
        :pendingVouchers="dashPendingVouchers"
        :completedRequests="dashCompletedReqs"
        :completedCafoa="dashCompletedCafoa"
        :completedVouchers="dashCompletedVouchers"
        :awardedChecks="dashAwardedChecks"
        :chart1_data="chart1_data"
        :chart3_data="chart3_data"
        :cards2_data="cards2_data"
        :chart2_data="chart2_data"
        :chart4_data="chart4_data"
        @filter-chart="generateChartData(...arguments)"
      />
    </div>
    <div class="px-10">
      <Footer />
    </div>
  </div>
</template>
<script>
import AdminNavbar from '@/components/Navbars/AdminNavbar.vue'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import Footer from '@/components/Partials/Footer.vue'
import DashStatus from '~/components/Partials/DashStatus.vue'

export default {
  components: {
    AdminNavbar,
    Sidebar,
    Footer,
    DashStatus,
  },
  async created() {},
  head() {
    return {
      title: 'Dashboard',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  data: () => ({
    notification_rows: [],
    // dash status start
    dashPendingReqs: 0,
    dashPendingCafoa: 0,
    dashPendingVouchers: 0,
    dashCompletedReqs: 0,
    dashCompletedCafoa: 0,
    dashCompletedVouchers: 0,
    dashAwardedChecks: 0,
    // dash status end
    chart1_data: [],
    chart3_data: [],
    cards2_data: [],
    chart2_data: [],
    chart4_data: [],
  }),
  middleware: 'auth',
  layout: 'dash_panel',
  async mounted() {
    await this.load_notifications()
    await this.generateChartData(1)
  },
  methods: {
    async load_notifications() {
      this.$axios
        .$post('/api/trails/department', {})
        .then((response) => {
          var data = []
          for (const i in response.data) {
            if (response.data[i].date_filter >= 3) {
              data.push({
                id: response.data[i].id,
                control_number: response.data[i].control_number,
                request_date: response.data[i].id,
                overdue: response.data[i].date_filter,
              })
            }
          }

          this.notification_rows = data
        })
        .catch((error) => {})
        .finally(() => {})
    },
    async generateChartData(filterBy) {
      this.$axios
        .$post('/api/dashboard/charts', {
          filterBy: filterBy
        }, {})
        .then((response) => {
          this.chart1_data = response.chart1_data
          this.chart3_data = response.chart3_data
          this.cards2_data = response.cards2_data
          this.chart2_data = response.chart2_data
          this.chart4_data = response.chart4_data
          this.dashPendingReqs = response.pendingRequests
          this.dashPendingCafoa = response.pendingCafoa
          this.dashPendingVouchers = response.pendingVouchers
          this.dashCompletedReqs = response.completedRequests
          this.dashCompletedCafoa = response.completedCafoa
          this.dashCompletedVouchers = response.completedVouchers
          this.dashAwardedChecks = response.awardedChecks
        })
        .catch((error) => {
          this.$toast.error('Error.')
        })
        .finally(() => {})
    },
  },
}
</script>
