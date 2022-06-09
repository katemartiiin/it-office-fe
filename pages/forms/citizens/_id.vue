<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/citizens" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>

      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
          <p class="text-xs mt-5">Update Record</p>
          <h1 class="text-xl font-bold mb-5">
            CITIZEN'S INFORMATION
          </h1>
          <form ref="citizenForm" class="w-full">
            <div class="flex flex-wrap mb-5">
                <div class="w-full md:w-1/3 py-2 md:pr-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    First Name
                    </label>
                    <input
                    v-model="item.first_name"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="First Name"
                    />
                </div>
                <div class="w-full md:w-1/3 py-2 md:px-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Middle Name (optional)
                    </label>
                    <input
                    v-model="item.maternal_name"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Middle Name (optional)"
                    />
                </div>
                <div class="w-full md:w-1/3 py-2 md:pl-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Last Name
                    </label>
                    <input
                    v-model="item.last_name"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Last Name"
                    />
                </div>
              </div>
              <div class="flex flex-wrap mb-5">
                <div class="w-full md:w-1/3 py-2 md:pr-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Sex
                    </label>
                     <select
                      v-model="item.sex"
                      class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="" disabled selected>Select</option>
                      <!-- :key="office.id" -->
                      <option
                        v-for="(gender, index) in genders"
                        :key="index"
                        :value="gender"
                      >
                        {{ gender }}
                      </option>
                    </select>
                </div>
                <div class="w-full md:w-1/3 py-2 md:px-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Civil Status
                    </label>
                    <select
                      v-model="item.civil_status"
                      class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="" disabled selected>Select</option>
                      <!-- :key="office.id" -->
                      <option
                        v-for="(status, index) in civil_statuses"
                        :key="index"
                        :value="status"
                      >
                        {{ status }}
                      </option>
                    </select>
                </div>
                <div class="w-full md:w-1/3 py-2 md:pl-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Spouse Name
                    </label>
                    <input
                    v-model="item.spouse_name"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Spouse Name"
                    />
                </div>
              </div>
              <div class="flex flex-wrap mb-5">
                <div class="w-full md:w-1/2 py-2 md:pr-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Date of Birth
                    </label>
                    <input
                    v-model="item.birthdate"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="date"
                    />
                </div>
                <div class="w-full md:w-1/2 py-2 md:pl-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Age
                    </label>
                    <input
                    v-model="item.age"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Age"
                    />
                </div>
              </div>
              <div class="flex flex-wrap mb-5">
                <div class="w-full py-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Street Address
                    </label>
                    <input
                    v-model="item.res_street"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Street Address"
                    />
                </div>
              </div>
              <div class="flex flex-wrap mb-5">
                <div class="w-full md:w-1/2 py-2 md:pr-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Precinct
                    </label>
                    <input
                    v-model="item.res_precinct"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Precinct"
                    />
                </div>
                <div class="w-full md:w-1/2 py-2 md:pl-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Precinct Code
                    </label>
                    <input
                    v-model="item.res_precinct_code"
                    class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-control"
                    type="text"
                    placeholder="Precinct Code"
                    />
                </div>
              </div>
              <div class="flex flex-wrap mb-5">
                <div class="w-full md:w-1/3 py-2 md:pr-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Province
                    </label>
                    <select
                        v-model="item.res_province"
                        class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="" disabled selected>Select Province</option>
                        <!-- :key="office.id" -->
                        <option value="14">Bulacan</option>
                    </select>
                </div>
                <div class="w-full md:w-1/3 py-2 md:px-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    City
                    </label>
                    <select
                      v-model="selectedCity"
                      class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option v-for="city in municipalities" :key="city.id" :value="city.id">{{ city.value }}</option>
                    </select>
                </div>
                <div class="w-full md:w-1/3 py-2 md:pl-2">
                    <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-request"
                    >
                    Barangay
                    </label>
                    <select
                      v-model="item.res_barangay"
                      class="form-select block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option v-for="brgy in barangays" :key="brgy.id" :value="brgy.id">{{ brgy.value }}</option>
                    </select>
                </div>
              </div>
              <div class="flex flex-wrap justify-end mt-10 pt-5 mb-5">
                <button
                  @click="saveRecord"
                  type="button"
                  class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3"
                >
                  Save
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSuccess from '@/components/Modals/Modal.vue'
export default {
  head() {
    return {
      title: 'Update Citizen Record',
      meta: [
        {
          hid: '',
          name: '',
          content: '',
        },
      ],
    }
  },
  components: {
    ModalSuccess,
  },
  layout: 'dashboard',
  data() {
    return {
      userId: null,
      genders: ['M', 'F'],
      civil_statuses: ['S', 'M', 'W'],
      item: {},
      errors: [],
      brgys: [],
      barangays: [], // filtered
      municipalities: [],
      selectedCity: '',
    }
  },

  mounted() {
    this.userId = this.$route.params.id;
    this.fetch();
  },
  watch: {
    selectedCity(value) {
      this.barangays = [];
      if (value) {
        this.brgys.filter((brgy) => {
          if (value == brgy.parent) {
            this.barangays.push(brgy);
          }
        });
      }
    },
  },
  methods: {
    async fetch() {
      this.$axios
        .$get('api/citizens/show/' + this.userId)
        .then((res) => {
          this.item = res.item;
          this.selectedCity = this.item.res_city;
          this.brgys = res.barangays;
          this.municipalities = res.municipalities;

          this.brgys.filter((brgy) => {
            let id = brgy.id;
            if (brgy.id < 10) {
              brgy.id = '00' + id;
            } else if (brgy.id >= 10 && brgy.id <= 99){
              brgy.id = '0' + id;
            } else {
              brgy.id = id;
            }
          });

          console.log(this.brgys);
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          this.$toast.error(error.response.data.message)
        });
    },

    async saveRecord() {
      this.item.res_city = this.selectedCity;
      this.$toast.success('Sending')

      this.$axios
        .$post('api/citizens/update/' + this.userId, this.item)
        .then((res) => {
          this.$toast.success(res.message);
        })
        .catch((error) => {
          this.errors = error.response.data.errors
          this.$toast.error(error.response.data.message)
        })
    },
  },
}
</script>
<style scoped>
.border-1 {
  border-width: 0.5px;
}
</style>
