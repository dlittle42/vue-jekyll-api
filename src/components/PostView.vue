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
            <span class="publish-date">{{ media | onlyPublishDate }}</span>
        </h1>

        <article
            class="post-content"
            v-html="content"
            transition>
        </article>

        </div>
        <a v-link="{ name: 'post', params: { name: 'kill-bill' }}">next</a>
    
        <div class="dot"></div>
    </div>
  </template>

  <script>

    var inView = require('in-view');

    import { onlyTitle, onlyPublishDate } from '../filters';

  export default {

    filters: {
            onlyTitle,
            onlyPublishDate
        },
    
    data() {
      return {

        post: '',
        content: '',
        title: '',
        media:''
      }
    },
    route: {
        data: function (transition) {
          console.log('hook-example data!')
          console.log('The current ID is ' + this.$route.params.name);
          this.getPost();
         // return {
                //title: 'test0',
                //content: this.getPost().then(content => content)
          //  }
        }
      },
       /*
    route: {
        data ({ to }) {
            const title = to.params.title;
            document.title = `${onlyTitle(title)} - ${setting.blogTitle}`;
            this.content = 'Loading...🐶🔫';

            return {
                title,
                content: store.getPost(title).then(content => content)
            }
        }
      },
     
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
     console.log('ready!');
     this.$dispatch('choose-fruit', 'strawberry');


     inView.offset(100);
     inView('.dot')
      .on('enter', el => {
         // console.log("ENTERED!!!!!!");
          $(el).addClass('in-view');
      }).on('exit', el => {
         // console.log("EXIT!!!!!!");
          $(el).removeClass('in-view');
      });
    },
    watch: {
            'content'() {
                // Load the external link into new tab
                console.log('watch! content now');
                /*
                let linksArray = Array.from(document.querySelectorAll('a'));
                const currentHost = window.location.host;
                linksArray.forEach(el => {
                    if (el.href && el.host !== currentHost)
                        el.target = '_blank'
                });
                */
            }
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
            this.title = this.post.title;
            this.media = to.params.title;
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