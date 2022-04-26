<template>
    <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
            <a href="/users" class="mb-5 hover:text-black text-gray-500 text-xs">< Back</a>
            <div
                class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-emerald-900"
            >
                <div class="px-10 py-5">
                    <form class="w-full">
                        <h1 class="text-2xl font-bold mb-10">Edit User</h1>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                                    Name
                                </label>
                                <input 
                                    v-model="payload.name"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                    :class="errors.length && errors.name[0] ? 'border-red-500' : ''"
                                    id="grid-name" 
                                    type="text" 
                                    placeholder="Name"
                                />
                                <p v-if="errors.length && errors.name[0]" class="text-red-500 text-xs italic">{{ errors.name[0] }}</p>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                                    Email
                                </label>
                                <input 
                                    v-model="payload.email"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                    :class="errors.length && errors.email[0] ? 'border-red-500' : ''"
                                    id="grid-email" 
                                    type="text" 
                                    placeholder="Email"
                                />
                                <p v-if="errors.length && errors.email[0]" class="text-red-500 text-xs italic">{{ errors.email[0] }}</p>
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-username">
                                    Username
                                </label>
                                <input 
                                    v-model="payload.username"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                    :class="errors.length && errors.username[0] ? 'border-red-500' : ''"
                                    id="grid-username" 
                                    type="text" 
                                    placeholder="Username"
                                />
                                <p v-if="errors.length && errors.username[0]" class="text-red-500 text-xs italic">{{ errors.username[0] }}</p>
                            </div>
                        </div>
                        <!-- <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Password
                                </label>
                                <input 
                                    v-model="payload.password"
                                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                    :class="errors.length && errors.password[0] ? 'border-red-500' : ''"
                                    id="grid-username" 
                                    type="password" 
                                    placeholder="Password"
                                />
                                <p v-if="errors.length && errors.password[0]" class="text-red-500 text-xs italic">{{ errors.password[0] }}</p>
                            </div>
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-confirm-password">
                                    Confirm Password
                                </label>
                                <input v-model="payload.password_confirmation" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-confirm-password" type="password" placeholder="Confirm Password">
                            </div>
                        </div> -->
                        <div class="flex flex-wrap -mx-3">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                               <!-- Toggle A -->
                                <div class="w-full mb-12">
                                    <label 
                                        for="toogleA"
                                        class="flex items-center cursor-pointer"
                                    >
                                        <!-- toggle -->
                                        <div class="relative">
                                            <input v-model="payload.is_admin" id="toogleA" type="checkbox" class="sr-only" />
                                            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                                            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
                                        </div>
                                        <div class="ml-3 text-gray-700 font-medium">
                                            Admin
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-wrap -mx-3 mb-6 float-right">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <button @click="update" type="button" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                    Update
                                </button>
                            </div>
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
            payload: {
                name: '',
                username: '',
                email: '',
                // password: '',
                // password_confirmation: '',
                is_admin: false,
            },
            userId: '',
            errors: [],
        };
    },
    mounted() {
        this.userId = this.$route.params.id;
        this.fetchUser();
    },
    methods: {
        fetchUser() {
            this.$axios
            .$post('api/user/show/' + this.userId)
            .then((response) => {
                this.payload.name = response.user.name;
                this.payload.email = response.user.email;
                this.payload.username = response.user.username;
                this.payload.is_admin = response.user.is_admin;
            }).catch((err) => {
                //
            });
        },
        update() {
            this.$axios
            .$post('api/user/update/' + this.userId, this.payload)
            .then((res) => {
                //
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
            })
        }
    }
}
</script>
<style scoped>
input:checked ~ .dot {
  transform: translateX(100%);
  background-color: rgb(51 65 85);
}
</style>