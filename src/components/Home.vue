<!-- src/components/Home.vue -->

  <template>
    <div>
    <!--
      <h1>Load dlittle42.github.io</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">Get posts</button>
      -->
      <div class="quote-area" v-if="quote">
          <ul>
            <li v-for="entry in quote">
             <!-- <a v-bind:href="entry.url">{{ entry.title }}</a> -->
              <a v-link="{ name: 'post', params: { name: entry.slug }}">{{ entry.title }}</a>
            </li>
          </ul>
        
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        quote: ''
      }
    },
    ready: function () {
      this.getQuote();
    },

    methods: {
      getQuote() {
        this.$http
          .get('https://dlittle42.github.io/data/site.json', (data) => {
            this.quote = data;//JSON.stringify(data);
          })
          .error((err) => console.log(err))
      }
    }
  }
  </script>