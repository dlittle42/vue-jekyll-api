<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'GOODbye!'
    }
  },
  methods: {
    getQuote () {
      this.$http.get('http://dlittle42.github.io/feed.xml', (data) => {
        this.quote = data
      })
      .error((err) => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>

