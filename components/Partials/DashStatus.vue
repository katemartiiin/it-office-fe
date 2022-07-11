<template>
  <!-- Header -->
  <div>
    <div class="relative md:pt-10 pb-20 pt-10">
      <div class="px-4 md:px-10 mx-auto w-full">
        <div>
          <!-- Card stats if office is budget or accounting -->
          <div v-if="roleId != 1 && roleId != 2" class="flex flex-wrap">
            <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
              <card-stats
                :statSubtitle="
                  'PENDING ' + roleId == 4 ? 'CAFOA' : 'Pending Vouchers'
                "
                :statTitle="roleId == 4 ? pendingRequests : pendingVouchers"
                statIconName="fas fa-clock"
                statIconColor="bg-orange-500"
              />
            </div>
            <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
              <card-stats
                :statSubtitle="'COMPLETED ' + completedItem"
                :statTitle="roleId == 4 ? completedCafoa : completedVoucher"
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
    <!-- invisible  -->
    <div class="w-full flex flex-items">
      <div class="w-1/3 lg:w-1/3 md:w-full sm:w-full">
        <div class="py-2 px-2">
          <highchart
            :options="chartOptions"
            :modules="['exporting']"
            :update="watchers"
          />
        </div>
      </div>
      <div class="w-1/3 lg:w-1/3 md:w-full sm:w-full">
        <div class="py-2 px-2">
          <highchart
            :options="chartOptions"
            :modules="['exporting']"
            :update="watchers"
          />
        </div>
      </div>
      <div class="w-1/3 lg:w-1/3 md:w-full sm:w-full">
        <div class="py-2 px-2">
          <highchart
            :options="chartOptions_donut"
            :modules="['exporting']"
            :update="watchers"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from '@/components/Cards/CardStats.vue'

export default {
  data() {
    return {
      caption: 'Chart caption here',
      title: 'Basic Chart',
      subtitle: 'More details here',
      points: [10, 0, 8, 2, 6, 4, 5, 5],

      seriesColor: '',
      animationDuration: 1000,
      chartType: 'pie',
      chartType_donut: 'pie',
      // chartType: '',
      colorInputIsSupported: null,
      chartTypes: [],
      durations: [0, 500, 1000, 2000],
      seriesName: 'My Data',
      yAxis: 'My Values',
      watchers: ['options.title', 'options.series'],
      colors: [
        'Red',
        'Green',
        'Blue',
        'Pink',
        'Orange',
        'Brown',
        'Black',
        'Purple',
      ],
      lastPointClicked: {
        timestamp: '',
        x: '',
        y: '',
      },
      sexy: false,
    }
  },
  computed: {
    chartOptions_donut() {
      const ctx = this
      return {
        title: {
          text: 'Chart Datas',
        },
        credits: {
          enabled: false,
        },
        caption: {
          text: this.caption,
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        chart: {
          height: 200,
          backgroundColor: this.sexy
            ? {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, this.seriesColor],
                  [0.5, '#ffffff'],
                  [1, this.seriesColor],
                ],
              }
            : '#ffffff',
          className: 'my-chart',
          type: this.chartType.toLowerCase(),
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click() {
                  ctx.$emit('pointClicked', this)
                },
              },
            },
          },
        },
        yAxis: [
          {
            title: {
              text: this.yAxis,
              style: {
                color: '#000000',
              },
            },
          },
        ],
        title: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text:
            `${this.title} ` +
            (this.lastPointClicked.timestamp !== ''
              ? `(Point clicked: ${this.lastPointClicked.timestamp})`
              : ''),
        },
        subtitle: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text: `${this.subtitle}`,
        },
        legend: {
          itemStyle: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        series: [
          {
            name: this.seriesName,
            data: this.points,
            color: this.seriesColor,
          },
        ],
      }
    },
    chartOptions() {
      const ctx = this
      return {
        title: {
          text: 'Chart Datas',
        },
        credits: {
          enabled: false,
        },
        caption: {
          text: this.caption,
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        chart: {
          height: 200,
          backgroundColor: this.sexy
            ? {
                linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
                stops: [
                  [0, this.seriesColor],
                  [0.5, '#ffffff'],
                  [1, this.seriesColor],
                ],
              }
            : '#ffffff',
          className: 'my-chart',
          type: this.chartType.toLowerCase(),
        },
        plotOptions: {
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click() {
                  ctx.$emit('pointClicked', this)
                },
              },
            },
          },
        },
        yAxis: [
          {
            title: {
              text: this.yAxis,
              style: {
                color: '#000000',
              },
            },
          },
        ],
        title: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text:
            `${this.title} ` +
            (this.lastPointClicked.timestamp !== ''
              ? `(Point clicked: ${this.lastPointClicked.timestamp})`
              : ''),
        },
        subtitle: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text: `${this.subtitle}`,
        },
        legend: {
          itemStyle: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        series: [
          {
            name: this.seriesName,
            data: this.points,
            color: this.seriesColor,
          },
        ],
      }
    },
  },
  components: {
    CardStats,
  },
  props: [
    'roleId',
    'completed',
    'pending',
    'completedCafoa',
    'completedVoucher',
    'pendingRequest',
    'pendingCafoa',
    'pendingVouchers',
    'pendingItem',
    'completedItem',
    'award_counts',
    'dswd_pending',
  ],
}
</script>
