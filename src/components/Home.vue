<!-- src/components/Home.vue -->

  <template>
    <div>
    <!--
      <h1>Load dlittle42.github.io</h1>
      <button class="btn btn-primary" v-on:click="getQuote()">Get posts</button>
      -->
      <h1>Super Computing Machine</h1>
      <p>A program by Derek Little, </p>
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
var voices = window.speechSynthesis.getVoices();
        console.dir(voices);


  export default {
    data() {
      return {
        quote: ''
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
        var msg = new SpeechSynthesisUtterance();

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
          'Zuzana',
         // 'Google 普通话（中国大陆）',
          'Google 粤語（香港）',
          'Google 國語（臺灣）'




        ]
        
        // Set the text.
        msg.text = 'Super Computing Machine';
        
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

        msg.voice = voices.filter(function(voice) { return voice.name == randomVoice })[0];

        
        // Queue this utterance.
        window.speechSynthesis.speak(msg);
      }

    }
  }
  </script>