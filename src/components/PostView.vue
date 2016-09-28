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
        <p> {{excerpt}} </p>
        <a href="{{media}}" >{{media}} </a>
        <article
            class="post-content"
            v-html="content"
            transition>
        </article>
            <a v-link="{ name: 'post', params: { name: prev.slug }}">Prev: {{prev.title}}</a>
        </div>
        <a v-link="{ name: 'post', params: { name: prev.slug }}">Prev: {{prev.title}}</a>
        <a v-link="{ name: 'post', params: { name: next.slug }}">next: {{next.title}}</a>
    
        <div class="dot"></div>
    </div>
  </template>

  <script>

    var inView = require('in-view');
    import setting from '../setting';
    import store from '../store';

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
        excerpt: '',
        title: '',
        media:'',
        prev: '',
        next: ''
      }
    },
    /*
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
*/

    route:{ 
        canReuse: function () {
          return false
        },
        data: function (transition) {
            return store.getPost(this.$route.params.name).then((obj) => {
                return { 
                  title: obj.title,
                  excerpt: obj.excerpt,
                  content: obj.content,
                  media: obj.media,
                  prev: obj.prev,
                  next: obj.next }
            })
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
      

    }
  }
  </script>