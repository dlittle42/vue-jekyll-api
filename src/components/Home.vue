<!-- src/components/Home.vue -->

  <template>
    <div>
    <!--
      <h1>Load dlittle42.github.io</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">Get posts</button>
      -->
      <h1 class="pagetitle">Super Computing Machine</h1>
      <p>A program by Derek Little, </p>

      <div id="hello">
        <h2 class="salutation" transition="expand">{{ salutation }}</h2>
        <p class="salutation-comment">{{ comment }}</p>
      </div>
      <div>{{content}}</div>

      <div class="quote-area" v-if="quote">
          <ul>


          <li class="animated square"
         enter-stagger="500"
         leave-stagger="0"
         transition="expand"
         v-for="entry in quote"
         v-el:$index>
           
            <a v-link="{ name: 'post', params: { name: entry.slug }}">{{ entry.title }}</a>

         </li>  

<!--

            <li v-for="entry in quote">
           
              <a v-link="{ name: 'post', params: { name: entry.slug }}">{{ entry.title }}</a>
            </li>
            -->
          </ul>
        
      </div>
      
    </div>
  </template>

  <script>

import setting from '../setting';
import store from '../store';

  export default {
    data() {
      return {
        quote: '',
        salutation: '',
        comment: '',
        content:''
      }
    },
    route: {

      data: function (transition) {
         
          console.log('The current view is ' + this.$route.params.name);

         // this.setupThreejs();
         return {
               // title,
                //content: store.getList().then(content => content)
            }

         
        }
    },
    ready: function () {
      this.getQuote();
      
      this.speak();

      this.introBlurb();

      
      
    },
    watch: {
            'content'(data) {
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

    events: {
    'fade-done': function () {
      console.log('fade-done!!!!!');
     // this.squaresToFadeOut--
     // this.reload();
    }
  },

    methods: {
      getQuote() {
        this.$http
          .get('https://dlittle42.github.io/data/site.json', (data) => {
            this.quote = data;//JSON.stringify(data);
          })
          .error((err) => console.log(err))
      },
      // Create a new utterance for the specified text and add it to
      // the queue.
      speak:function (text) {
        // Create a new instance of SpeechSynthesisUtterance.

        
        // Set the attributes.
        /*
        msg.volume = parseFloat(volumeInput.value);
        msg.rate = parseFloat(rateInput.value);
        msg.pitch = parseFloat(pitchInput.value);
        */
        
        // If a voice has been selected, find the voice and set the
        // utterance instance's voice attribute.
        /*
        if (voiceSelect.value) {
          msg.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == voiceSelect.value; })[0];
        }
        */
        var voiceList = setting.voices;
        var randomVoice = voiceList[Math.floor(Math.random()*voiceList.length)];
        console.log(randomVoice)

        

        
        // Queue this utterance.
        
// make sure voices are loaded before playing. ?? get it to work on repeat???
         window.speechSynthesis.onvoiceschanged = function () {
          var msg = new SpeechSynthesisUtterance();
          console.log("!!"+msg);
          msg.text = 'Super Computing Machine';
          msg.onboundary = function(event) {
              console.log('The msg boundary is to be spoken.')
          };
          var voices = window.speechSynthesis.getVoices();


          

          console.dir(voices);
          msg.voice = voices.filter(function(voice) { return voice.name == randomVoice })[0];
          window.speechSynthesis.speak(msg);
        };
       
        //if (msg)

        //window.speechSynthesis.speak(msg);

      },
      introBlurb: function(){
        
   
          var rand = Math.floor(Math.random()* setting.phrases.length);
          this.salutation = setting.phrases[rand].salutation;
          this.comment = setting.phrases[rand].comment;
      }

    }
  }

  
  </script>