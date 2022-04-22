<template>
  <section>
    <div>{{ this.$browser.getBrowser() }}</div>
    <div>{{ this.$browser._ua }}</div>
    <div>---------------</div>
    <div>{{ this.$browser }}</div>
        <div>---------------</div>
    <div>{{ this.$browser.parsedResult.browser }}</div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      devtools: null,
    }
  },

  created() {
    // console.log(this.$browser.getBrowser())
    // console.log(this.$browser.getUA())
  },
  layout: 'default',
  name: 'IndexPage',
}
</script>
