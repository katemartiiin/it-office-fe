<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <NuxtLink to="/forms/assessments" class="text-sm font-medium tracking-wide">
        &lt; Back
      </NuxtLink>
      <div
        class="mt-5 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      >
        <div class="px-10 py-5">
            <h1 class="text-xl font-bold mb-5">Create Assessment</h1>
            <form class="w-full">
                <div class="flex flex-wrap mb-6 grid md:grid-cols-4 grid-cols-2 gap-2">
                    <div class="form-check px-5" v-for="(checkbox, key) in checkboxes" :key="key">
                        <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" :value="checkbox" id="flexCheckDefault">
                        <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">
                            {{ checkbox }}
                        </label>
                    </div>
                    <input class="ml-5 appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded px-3 py-1 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-others" type="text" placeholder="Others"> 
                </div>
                <div class="flex flex-wrap mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-request">
                        I. Pangunahing Impormasyon:
                    </label>

                    <div class="w-full py-2">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Pangalan</label>
                        <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="ex. Juan dela Cruz"> 
                    </div>
                    <div class="w-full py-2 flex flex-wrap">
                        <div class="w-full md:w-1/2 md:pr-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Edad</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. 18"> 
                        </div>
                        <div class="w-full md:w-1/2 md:pl-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Kasarian</label>
                            <select class="form-select appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" aria-label="Kasarian">
                                <option disabled selected>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                    </div>
                    <div class="w-full py-2 flex flex-wrap">
                        <div class="w-full md:w-1/2 md:pr-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Kapanganakan</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="date"> 
                        </div>
                        <div class="w-full md:w-1/2 md:pl-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Lugar ng Kapanganakan</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. Malolos, Bulacan"> 
                        </div>
                    </div>
                    <div class="w-full py-2 flex flex-wrap">
                        <div class="w-full md:w-1/2 md:pr-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Kalagayang Sibil</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. Single, Married"> 
                        </div>
                        <div class="w-full md:w-1/2 md:pl-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Natapos sa Pag-aaral</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. Bachelor's Degree"> 
                        </div>
                    </div>
                    <div class="w-full py-2 flex flex-wrap">
                        <div class="w-full md:w-1/2 md:pr-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Hanapbuhay</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. Teacher, Employee"> 
                        </div>
                        <div class="w-full md:w-1/2 md:pl-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Relihiyon</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. Catholic, Muslim"> 
                        </div>
                    </div>
                    <div class="w-full py-2 flex flex-wrap">
                        <div class="w-full md:w-1/2 md:pr-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Tirahan</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. 123 Street, Malolos, Bulacan"> 
                        </div>
                        <div class="w-full md:w-1/2 md:pl-2 py-2">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-request">Cellphone No.</label>
                            <input class="appearance-none block w-full bg-gray-100 text-gray-700 leading-tight border border-gray-200 rounded py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" id="grid-age" type="text" placeholder="ex. 09123456789"> 
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-request">
                        II. Miyembro ng Pamilya:
                    </label>
                </div>
                <div class="flex flex-wrap mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-request">
                        III. Inilahad na Suliranin:
                    </label>
                    <textarea
                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-gray-100 bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="grid-function"
                            rows="3"
                            placeholder="Inilahad na Suliranin"
                    ></textarea>
                </div>
                <div class="flex flex-wrap mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-request">
                        IV. Pagtaya sa Kasalukuyang Kalagayan:
                    </label>
                    <textarea
                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-gray-100 bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="grid-function"
                            rows="3"
                            placeholder="Pagtaya sa Kasalukuyang Kalagayan"
                    ></textarea>
                </div>
                <div class="flex flex-wrap mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" for="grid-request">
                        V. Rekomendasyon:
                    </label>
                    <textarea
                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-gray-100 bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="grid-function"
                            rows="3"
                            placeholder="Rekomendasyon"
                    ></textarea>
                </div>
                <div class="w-full flex flex-wrap justify-end my-5">
                    <button type="button" class="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded w-full md:w-1/3">Create</button>
                </div>
            </form>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  layout: 'dashboard',
  data() {
    return {
      checkboxes: ["4Ps", "Solo Parent", "PWD", "PYA", "Indigent", "IS", "SEA", "Senior Citizen", "Women", "FSCAP"],
    }
  },
  
  mounted() {
    //
  },
  methods: {
    //
  },
}
</script>
