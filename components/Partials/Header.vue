<template>
    <div
        class="relative overflow-hidden md:flex md:w-1/2 p-5 md:p-0 text-center md:text-left bg-gradient-to-tr from-blue-800 to-red-700 i justify-around items-center bg-image py-20">
        <div class="bg-red-fade px-10 py-9">
            <h1 class="text-white font-bold text-4xl font-sans">City Government of Malolos</h1>
            <p class="text-white mt-1">Government Aid Services</p>
        </div>
    </div>
</template>
<script>

export default({
    
})
</script>

<style scoped>
.bg-image {
    background:linear-gradient(0deg, rgba(51, 65, 85, 0.874), rgba(51, 65, 85, 0.534)), url('assets/images/login.jpg');
    /* background: linear-gradient(0deg,rgba(158, 0, 0, 0.532), rgba(104, 0, 0, 0.701)),url('assets/images/login.jpg'); */
    background-size: cover;
    background-position-x: center;
    background-position-y: center;
}
.py-20 {
    padding-top: 5rem;
    padding-bottom: 5rem;
}
.bg-red-fade {
    background-color: rgba(147, 27, 27, 0.6);
}
</style>