<template>
  <ul
    class="flex flex-wrap text-sm font-medium text-center text-gray-100 border-b border-gray-200 dark:border-gray-100 dark:text-gray-400"
  >
    <li class="mr-2">
      <NuxtLink
        aria-expanded="false"
        :to="'/forms/cafoa'"
        :class="
          tab == 'index'
            ? 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
            : 'inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
        "
        >List</NuxtLink
      >
    </li>

    <li class="mr-2">
      <NuxtLink
        aria-expanded="false"
        :to="'/forms/cafoa/transmitted'"
        :class="
          tab == 'transmitted'
            ? 'inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500'
            : 'inline-block p-4 text-slate-500 rounded-t-lg hover:text-blue-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
        "
        >Transmitted </NuxtLink
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: ['tab'],
}
</script>
