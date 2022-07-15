<template>
  <!-- Header -->
  <div>
    <div class="relative md:pt-10 pb-20 pt-10">
      <div class="px-4 md:px-10 mx-auto w-full">
        <div class="w-full flex flex-wrap">
          <div class="p-4 w-full md:w-1/6 lg:w-1/6 xl:w-1/6 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-request"
            >
              Filter
            </label>
            <select
              v-model="filterBy"
              @change="filterCharts"
              class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option
                v-for="(filter, index) in filters"
                :key="index"
                :value="filter.id"
              >
                {{ filter.name }}
              </option>
            </select>
          </div>
        </div>
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
        <div class="mt-10 px-2">
          <!-- invisible  -->

          <div class="w-full flex flex-wrap">
            <div class="md:w-2/3 w-full py-2">
              <div class="py-2 px-2">
                <highchart
                  :options="chartOptions1"
                  :modules="['exporting']"
                  :update="watchers"
                />
              </div>
            </div>
            <div class="md:w-1/3 w-full py-2">
              <div class="py-2 px-2">
                <highchart
                  :options="chartOptions3"
                  :modules="['exporting']"
                  :update="watchers"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10">
          <div class="w-full flex flex-wrap">
            <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
              <card-stats
                statSubtitle="Average Completion Time"
                :statTitle="cards2_data['average']"
                statIconName="fas fa-clock"
                statIconColor="bg-green-500"
              />
            </div>
            <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
              <card-stats
                statSubtitle="Slowest Completion Time"
                :statTitle="cards2_data['slowest']"
                statIconName="fa-solid fa-gauge-simple"
                statIconColor="bg-red-500"
              />
            </div>
            <div class="w-full lg:w-1/3 xl:w-1/3 px-4">
              <card-stats
                statSubtitle="Fastest Completion Time"
                :statTitle="cards2_data['fastest']"
                statIconName="fa-solid fa-gauge-simple-high"
                statIconColor="bg-green-500"
              />
            </div>
          </div>
          <div class="my-10 w-full flex flex-wrap">
            <div class="md:w-1/3 w-full py-2">
              <div class="py-2 px-2">
                <highchart
                  :options="chartOptions4"
                  :modules="['exporting']"
                  :update="watchers"
                />
              </div>
            </div>
            <div class="md:w-2/3 w-full py-2">
              <div class="py-2 px-2">
                <highchart
                  :options="chartOptions2"
                  :modules="['exporting']"
                  :update="watchers"
                />
              </div>
            </div>
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
    'chart1_data',
    'cards2_data',
    'chart2_data',
    'chart3_data',
    'chart4_data'
  ],
  data() {
    return {
      caption: '',
      title: 'Basic Chart',
      chart1: {
        title: 'Number of Request/s Created',
        type: 'area',
        caption: ' ',
        dates: ['2022-07-06'],
      },
      chart2: {
        title: 'Most # of Requests',
        type: 'column',
        caption: ' ',
      },
      chart3: {
        title: 'Pending vs Completed',
        type: 'pie',
        caption: '',
        pending: 40,
        completed: 60,
      },
      chart4: {
        medical: 0,
        financial: 0,
        burial: 0,
      },
      chart1_title: 'Number of Request/s Created',
      chart2_title: 'Bar Chart',
      chart3_title: 'Request Status',
      chart1_Type: 'pie',
      chart2_Type: 'pie',
      chart3_Type: 'pie',
      subtitle: 'Today',
      chart2_subtitle: 'per barangay',
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
      watchers: [
        'options.caption',
        'options.series',
        'options.subtitle',
        'options.title',
        'options.yAxis',
        'options.xAxis',
      ],
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
      completedrequest: 50.4,
      pendingrequest: 49.5,
      chart3_data: [
        {
          name: 'Completed',
          y: 40,
          sliced: true,
          selected: true,
        },
        {
          name: 'Pending',
          y: 60,
        },
      ],
      filters: [
        { id: 1, name: 'Today' },
        { id: 2, name: 'This week' },
        { id: 3, name: 'This month' },
        { id: 4, name: 'All' }
      ],
      filterBy: 1
    }
  },
  computed: {
    chartOptions1() {
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
          height: 300,
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
          type: this.chart1.type.toLowerCase(),
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
        xAxis: [
          {
            categories: this.chart1_data.labels,
          },
        ],
        title: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text:
            `${this.chart1_title} ` +
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
            name: 'Requests created',
            data: this.chart1_data.count,
            color: '#1f931b',
          },
        ],
      }
    },
    chartOptions2() {
      const ctx = this
      return {
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
          height: 300,
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
          type: this.chart2.type.toLowerCase(),
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
        xAxis: [
          {
          categories: this.chart2_data['labels']
          }
        ],
        title: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text:
            `${this.chart2.title} ` +
            (this.lastPointClicked.timestamp !== ''
              ? `(Point clicked: ${this.lastPointClicked.timestamp})`
              : ''),
        },
        subtitle: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text: `${this.chart2_subtitle}`,
        },
        legend: {
          itemStyle: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        series: [
          {
            name: 'Requests created',
            data: this.chart2_data['count'],
            color: '#931B1B',
          },
        ],
      }
    },
    chartOptions3() {
      const ctx = this
      return {
        credits: {
          enabled: false, // remove highchart watermark
        },
        caption: {
          text: this.chart3.caption,
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
        },
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',
          height: 300,
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
          // type: this.chartType.toLowerCase(),
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        title: {
          style: {
            color: this.sexy ? this.invertedColor(0) : '#black',
          },
          text:
            `${this.chart3.title} ` +
            (this.lastPointClicked.timestamp !== ''
              ? `(Point clicked: ${this.lastPointClicked.timestamp})`
              : ''),
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
          },
        },
        series: [
          {
            name: 'Request',
            colorByPoint: true,
            data: [
              {
                name: 'Completed',
                y: this.chart3.completed,
                sliced: true,
              },
              {
                name: 'Pending',
                y: this.chart3.pending,
              },
            ],
          },
        ],
      }
    },
    chartOptions4() {
      const ctx = this
      return {
         chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: 300,
        },
        title: {
            text: 'Type of<br>Requests<br>Created',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Requests',
            innerSize: '50%',
            data: [
                ['Medical', this.chart4.medical],
                ['Burial', this.chart4.burial],
                ['Financial', this.chart4.financial],
            ]
        }]
      }
    },
  },
  watch: {
    chart3_data(value) {
      if (value['completed'] == 0) {
        this.chart3.pending = 100
        this.chart3.completed = 0
      } else if (value['pending'] == null) {
        this.chart3.pending = 0
        this.chart3.completed = 0
      } else {
        this.chart3.pending = (value['pending'] / value['total']) * 100
        this.chart3.completed = (value['completed'] / value['total']) * 100
      }
    },
    chart4_data(value) {
      if (value['total'] == 0) {
        this.chart4.medical = 100
        this.chart4.financial = 0
        this.chart4.burial = 0
      } else {
        this.chart4.medical = (value['medical'] / value['total']) * 100
        this.chart4.financial = (value['financial'] / value['total']) * 100
        this.chart4.burial = (value['burial'] / value['total']) * 100      }
    },
  },
  methods: {
    filterCharts() {
      switch (this.filterBy) {
        case 1:
          this.subtitle = 'Today'
          break;
        case 2:
          this.subtitle = 'This week'
          break;
        case 3:
          this.subtitle = 'This month'
          break;
        default:
          this.subtitle = 'Today'
          break;
      }

      this.$emit('filter-chart', this.filterBy)
    }
  },
}
</script>
