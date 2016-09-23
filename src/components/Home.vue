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
        quote: '',
        salutation: '',
        comment: ''
      }
    },
    route: {

      data: function (transition) {
         
          console.log('The current view is ' + this.$route.params.name);

         // this.setupThreejs();


         
        }
    },
    ready: function () {
      this.getQuote();
      
      this.speak();

      this.introBlurb();
      
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


       

        

        var voiceList = [
          'Alice',
          'Alva',
          'Bruce',
          'Damayanti',
          'Diego',
          'Ellen',
          'Fred',
          'Ioana',
          'Joana',
          'Junior',
          'Kanya',
          'Kyoko',
          'Lekha',
          'Melina',
          'Milena',
          'Moira',
          'Monica',
          'Nora',
          'Satu',
          'Tarik',
          'Thomas',
          'Ting-Ting',
          'Yuna',
          'Zosia',
          'Zuzana'
         // 'Google 普通话（中国大陆）',
         // 'Google 粤語（香港）',
         // 'Google 國語（臺灣）'




        ]
        
        
        
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
        var column1_JSON = {"phrases": [
          { 
            "salutation": "Hooray!",
            "comment": "You made it."
          },
          { 
            "salutation": "Blimey!",
            "comment": "You startled me."
          },
          { 
            "salutation": "OK,",
            "comment": "Let's get to it!"
          },
          { 
            "salutation": "Hey!",
            "comment": "I thought you might show up."
          },
          { 
            "salutation": "Hola.",
            "comment": "You've come to the right place."
          },
          { 
            "salutation": "Hello.",
            "comment": "It's a fine day for parcheesi."
          },
         /* { 
            "salutation": "Face front, true believer!",
            "comment": "Let us begin our journey."
          },*/

          { 
            "salutation": "By the Hoary Hosts of Hoggarth!",
            "comment": "Let's get this show on the road."
          },
          { 
            "salutation": "Greg Oden's Raven!",
            "comment": "We've much to do..."
          },
          { 
            "salutation": "Hey!",
            "comment": "Look at you."
          },
          { 
            "salutation": "HTML, CSS, JS. ",
            "comment": "And many more acronyms..."
          }
          /*,
          {   
              "salutation": "Jiminy Cricket,",
              "comment": "Is winter over yet?"
          }
          */

          


          ]

          
        };
          var rand = Math.floor(Math.random()*column1_JSON.phrases.length);
          this.salutation = column1_JSON.phrases[rand].salutation;
          this.comment = column1_JSON.phrases[rand].comment;
      }

    }
  }
  </script>