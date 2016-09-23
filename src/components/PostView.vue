<!-- src/components/PostView.vue -->

  <template>
    <div>
    <!--
      <h1>Load dlittle42.github.io</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">Get posts</button>
      -->
    
      <div class="post-view">

        <h1 id="title">
            {{ title }}
            <span class="publish-date">{{ title }}</span>
        </h1>

        <article
            class="post-content"
            v-html="content"
            transition>
        </article>

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
    route: {
        data: function (transition) {
          console.log('hook-example data!')
          console.log('The current ID is ' + this.$route.params.name);
          this.getPost();
        }
      },
      /*
    route:{ 
        data: function (transition) {
            return PersonRepository.get(this, this.$route.params.slug).then((name) => {
                return { name: name }
            })
        }
    },
    */
    ready: function () {
     // this.getPost();
     this.$dispatch('choose-fruit', 'strawberry');
    },

    methods: {
      getPost() {
        this.$http
          .get('https://dlittle42.github.io/data/site.json', (data) => {
            console.log("getpost="+this.$route.params.name);
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
            //console.log(obj[i].slug);
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