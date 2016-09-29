<!-- src/components/App.vue -->

  <template>
  <!--
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><a v-link="'home'">Home</a></li>
          <li><a v-link="'login'">Login</a></li>
          <li><a v-link="'signup'">Sign Up</a></li>
          <li><a v-link="'secretquote'">Secret Quote</a></li>
          <li><a v-link="'login'">Logout</a></li>
        </ul>
      </div>    
    </nav>
    -->
 
    <div class="container">
      <!-- header 
        <header>
            <h1><a v-link="{ path: '/home' }">SCM</a></h1>
        </header>
        -->
        <div id="output"></div>
        <header class="header">
            <!--
               <div class="circle unselectable" id="logo"><h1>Super Computing Machine</h1></div>
             -->


               <div class="logo unselectable">
               <a v-link="{ path: '/home' }">
                    <div id="symbol">

                        <div id="leftcircle" class="halfCircleLeft"><h1>Super Computing Machine - Portfolio of Derek Little - Creative Developer</h1></div>
                        <div id="rightcircle" class="halfCircleRight"></div>
                    </div>
                </a>
               </div>
        </header> <!-- end header -->
      <router-view
            class="view"
            transition
            transition-mode="out-in">
        </router-view>
        <div id="WebGL-output"></div>
    </div>

  </template>

  <style lang="scss">





    footer{
        text-align: center;
        font-size: .8rem;
        border-top: 1px solid #eee;
        padding-top: 1.5rem;
    }

    .v-transition{
        transition: opacity 1s ease;
    }

    .v-enter, .v-leave{
        opacity: 0;
    }



    ul,
    ol{
        line-height: 2.1;
        padding: 5px 25px;
    }

    ul li{
       // padding: 50px 0;
        margin: 0;
        line-height: 2.1rem;
    }

    a{
        color: #08c;
        overflow-wrap: break-word;
        word-break: break-all;
        text-decoration: none;
        padding: 0 .3rem;

        &:hover, &:active {
            color: #e60900;
            text-decoration: underline;
        }
    }

    .publish-date{
        float: right;
        font-size: .8rem;
        line-height: 4;
        vertical-align: middle;
    }

</style>

<!-- import a file from the installed "normalize-css" npm package -->
<style src="normalize-css/normalize.css"></style>
<style lang="scss" src="./css/main.scss"></style>

<script>

/* global requestAnimationFrame */
//import THREE from 'three'
//import Object3D from '../components/Object3D'
//require('vue-scroll')
require('gsap');
var $ = require('jquery');
var inView = require('in-view');

//var jquery = require('jquery');
//var THREE = require('three');
//import THREE from 'three';
import threejs_scene from './js/threejs_scene.js';

/*
var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
*/
// http://threejs.org/examples/#webgl_geometry_dynamic
export default {

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      //scene: 'Hello Simon!'

    }
  },
  /*
  created () {
    this.animate = this.animate.bind(this)
    this.clock = new THREE.Clock()
    this.mesh = this.createOcean()
  },
  */
  ready () {
    //this.setupThreejs();
    threejs_scene.init();
    this.trackWindowScroll();


  },
  methods: {

      testCall(){
        alert('test call success');
      },
      trackWindowScroll: function (){
          var $output = $( "#output" ),
        isScrolling = false,
        scrolling = "<span id='scrolling'>Scrolling</span>",
        stopped = "<span id='stopped'>Stopped</span>",
        delta=1,
        lastScrollPosition = 0,
        dist = 0,
        scrollPos = 0;


  

        $( window ).scroll(function() {
            $output.html( scrolling );
            isScrolling =true;

            var newScrollPosition = window.scrollY;
            dist = newScrollPosition - lastScrollPosition;
 
            if (newScrollPosition < lastScrollPosition){
                //upward - code here
                delta = 1;
            }else{
                //downward - code here
                delta = -1;
            }
           // console.log("delta="+delta);
            lastScrollPosition = newScrollPosition;


          //  console.log($(document).scrollTop());
              var pos = -Math.floor($(document).scrollTop());
              scrollPos= pos;
            //  camera.position.x = Math.floor($(document).scrollTop());


            clearTimeout( $.data( this, "scrollCheck" ) );
            $.data( this, "scrollCheck", setTimeout(function() {
                $output.html( stopped );
                isScrolling =false;
               // resetPanel();


            }, 250) );

        });
      }
  },
  events: {
    'choose-fruit':function(fruit){
        console.log('this is '+ fruit);
        //handle the choosing of fruit

    }
  },

}