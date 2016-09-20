<!-- src/components/PostView.vue -->

  <template>
    <div>
    <!--
      <h1>Load dlittle42.github.io</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">Get posts</button>
      -->
      <div class="post-area" v-if="post">
        <h1>{{ title }}</h1>
          {{{ content }}}

        </div>
        <a v-link="{ name: 'post', params: { name: 'kill-bill' }}">next</a>
    </div>
  </template>

  <script>
  export default {
    
    data() {
      return {

        post: '',
        content: '',
        title: ''
      }
    },
    ready: function () {
      this.getPost();
    },

    methods: {
      getPost() {
        this.$http
          .get('https://dlittle42.github.io/data/site.json', (data) => {
            console.log(this.$route.params.name);
            var postkey = this.$route.params.name
            var js = data;

            //console.log(this.getObjects(js,'slug','finding-nemo'));
            this.post = this.getObjects(js,'slug',postkey);
            this.content = decodeURI(this.post.content);
            this.title = this.post.content.title;
          })
          .error((err) => console.log(err))
      },
      getObjects(obj, key, val) {
        
        var objects = [];
        for (var i in obj) {
            console.log(obj[i].slug);
            if (obj[i].slug == val){
                objects.push(obj[i]);
                return obj[i];
            }
            
        }
       // console.log(objects);
       // return objects;
      }

    }
  }
  </script>