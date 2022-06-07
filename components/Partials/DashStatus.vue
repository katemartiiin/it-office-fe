<template>
  <!-- Header -->
  <div class="relative md:pt-10 pb-20 pt-10">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats if office is budget or accounting -->
        <div v-if="roleId != 1 && roleId != 2" class="flex flex-wrap">
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
              :statIconName="roleId == 6 ? 'fas fa-ticket' : 'fas fa-check'"
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
        <!-- Card stats if office is budget or accounting -->
        <div v-else-if="roleId == 2" class="flex flex-wrap">
          <div class="w-full lg:w-1/2 xl:w-1/2 px-4">
            <card-stats
              statSubtitle="PENDING REQUESTS"
              :statTitle="dswd_pending"
              statIconName="fas fa-clock"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-1/2 xl:w-1/2 px-4">
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
              statIconName="fas fa-ticket"
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
  props: [
    'roleId',
    'completed',
    'pending',
    'completedCafoa',
    'completedVoucher',
    'pendingRequest',
    'pendingCafoa',
    'pendingItem',
    'completedItem',
    'award_counts',
    'dswd_pending'
  ],
  components: {
    CardStats,
  },
}
</script>
