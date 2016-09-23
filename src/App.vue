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
    <div id="output"></div>
    <div class="container" v-scroll="onScroll">
      <!-- header 
        <header>
            <h1><a v-link="{ path: '/home' }">SCM</a></h1>
        </header>
        -->
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
        transition: opacity .2s ease;
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
        padding: 0;
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
require('vue-scroll')

//var jquery = require('jquery');
var THREE = require('three');
//import THREE from 'three';

var container, stats;
            var camera, scene, raycaster, renderer;

            var mouse = new THREE.Vector2(), INTERSECTED;
            var radius = 100, theta = 0;
// http://threejs.org/examples/#webgl_geometry_dynamic
export default {

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      //scene: 'Hello Simon!'
      position: {scrollTop: 0, scrollLeft: 0}
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
    this.setupThreejs();

  },
  methods: {
    onScroll:function(e, position){
      this.position = position;
      console.log("pos="+position)
    },
    setupThreejs:function() {
        console.log('App store here?');
        
        
 
        container = document.getElementById('WebGL-output');

        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );

        scene = new THREE.Scene();

        var light = new THREE.DirectionalLight( 0xffffff, 1 );
        light.position.set( 1, 1, 1 ).normalize();
        scene.add( light );

        var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

        for ( var i = 0; i < 2000; i ++ ) {

            var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;

            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;

            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;

            scene.add( object );

        }

        raycaster = new THREE.Raycaster();

        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor( 0xf0f0f0 );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.sortObjects = false;
        container.appendChild(renderer.domElement);

       // stats = new Stats();
       // container.appendChild( stats.dom );

        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );

        //

        window.addEventListener( 'resize', this.onWindowResize, false );

          this.animate();

 
      },
      animate(){
        requestAnimationFrame( this.animate );

        this.render();
      },
      render(){
        theta += 0.1;

        camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
        camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
        camera.lookAt( scene.position );

        camera.updateMatrixWorld();

        // find intersections

        raycaster.setFromCamera( mouse, camera );

        var intersects = raycaster.intersectObjects( scene.children );

        if ( intersects.length > 0 ) {

            if ( INTERSECTED != intersects[ 0 ].object ) {

                if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

                INTERSECTED = intersects[ 0 ].object;
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                INTERSECTED.material.emissive.setHex( 0xff0000 );

            }

        } else {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = null;

        }

        renderer.render( scene, camera );
      },
      onDocumentMouseMove(event) {

        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
      },
      onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

      },
      testCall(){
        alert('test call success');
      }
  },
  events: {
    'choose-fruit':function(fruit){
        console.log('this is '+ fruit);
        //handle the choosing of fruit

    }
  },

}