<template>
  <!-- Header -->
  <div class="relative md:pt-10 pb-20 pt-10">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats if office is budget or accounting -->
        <div v-if="roleId != 1" class="flex flex-wrap">
          <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
            <card-stats
              :statSubtitle="'PENDING ' + pendingItem"
              :statTitle="pending"
              statIconName="fas fa-clock"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
            <card-stats
              :statSubtitle="'COMPLETED ' + completedItem"
              :statTitle="completed"
              statIconName="fas fa-check"
              statIconColor="bg-green-500"
            />
          </div>

          <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
            <card-stats
              statSubtitle="Awarded Checks"
              :statTitle="award_counts"
              statIconName="fas  fa-solid fa-award"
              statIconColor="bg-green-500"
            />
          </div>
        </div>
        <div v-else class="flex flex-wrap">
          <div class="w-full lg:w-1/5 xl:w-1/5 px-2">
            <card-stats
              statSubtitle="PENDING REQUESTS"
              :statTitle="pendingRequest"
              statIconName="fas fa-clock"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-1/5 xl:w-1/5 px-2">
            <card-stats
              statSubtitle="PENDING CAFOA"
              :statTitle="pendingCafoa"
              statIconName="fas fa-clock"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-1/5 xl:w-1/5 px-2">
            <card-stats
              statSubtitle="COMPLETED CAFOA"
              :statTitle="completedCafoa"
              statIconName="fas fa-check"
              statIconColor="bg-green-500"
            />
          </div>
          <div class="w-full lg:w-1/5 xl:w-1/5 px-2">
            <card-stats
              statSubtitle="COMPLETED VOUCHERS"
              :statTitle="completedVoucher"
              statIconName="fas fa-check"
              statIconColor="bg-green-500"
            />
          </div>

          <div class="w-full lg:w-1/5 xl:w-1/5 px-2">
            <card-stats
              statSubtitle="Awarded Checks"
              :statTitle="award_counts"
              statIconName="fas  fa-solid fa-award"
              statIconColor="bg-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from '@/components/Cards/CardStats.vue'

export default {
  components: {
    CardStats,
  },
  data() {
    return {
      roleId: null,
      completed: 0,
      pending: 0,
      completedCafoa: 0,
      completedVoucher: 0,
      pendingRequest: 0,
      pendingCafoa: 0,
      pendingItem: 'Request',
      completedItem: 'CAFOA',
      award_counts: 0,
    }
  },
  mounted() {
    this.fetchDashboard()
  },
  methods: {
    async fetchDashboard() {
      this.roleId = this.$auth.$state.user['role']

      this.pendingItem = this.roleId == 4 ? 'REQUESTS' : 'CAFOA'
      this.completedItem = this.roleId == 4 ? 'CAFOA' : 'VOUCHERS'
      this.$axios
        .$post('/api/dashboard/fetch', {
          roleId: this.roleId,
        })
        .then((response) => {
          this.award_counts = response.awardedChecks
          // this.completed = response.completed
          // this.pending = response.pending
          this.completedCafoa = response.completedCafoa
          this.completedVoucher = response.completedVoucher
          this.pendingRequest = response.pendingRequests
          this.pendingCafoa = response.pendingCafoa
        })
        .catch((error) => {})
        .finally(() => {})
    },
  },
}
</script>
