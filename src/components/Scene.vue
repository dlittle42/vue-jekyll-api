<template>
  {{{ scene }}}
</template>

<script>
/* global requestAnimationFrame */
import THREE from 'three'
//import Object3D from '../components/Object3D'

//var jquery = require('jquery');
//var THREE = require('three');
//import THREE from 'three';

var container, stats;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// http://threejs.org/examples/#webgl_geometry_dynamic
export default {
  name: 'Scene',
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      scene: 'Hello Simon!'
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
    this.animate()
  },
  methods: {
    setupThreejs() {
        console.log('store here?');
        
        
 
         container = document.getElementById('WebGL-output');

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 100000, 0, 3200 );

        scene = new THREE.Scene();

        var colors = [ 0x000000, 0xff0080, 0x8000ff, 0xffffff ];
        var geometry = new THREE.Geometry();

        for ( var i = 0; i < 2000; i ++ ) {

          var vertex = new THREE.Vector3();
          vertex.x = Math.random() * 4000 - 2000;
          vertex.y = Math.random() * 4000 - 2000;
          vertex.z = Math.random() * 4000 - 2000;
          geometry.vertices.push( vertex );

          geometry.colors.push( new THREE.Color( colors[ Math.floor( Math.random() * colors.length ) ] ) );

        }

        var material = new THREE.PointsMaterial( { size: 1, vertexColors: THREE. VertexColors, depthTest: false, opacity: 0.5, sizeAttenuation: false, transparent: true } );

        var mesh = new THREE.Points( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.sortObjects = false;
        renderer.autoClearColor = false;
        //container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
          this.animate();

          return scene = renderer.domElement;
      },
      animate(){
        requestAnimationFrame( this.animate );

        this.render();
      },
      render(){
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;

        camera.lookAt( scene.position );

        renderer.render( scene, camera );
      },
      onDocumentMouseMove(event) {

        mouseX = ( event.clientX - windowHalfX ) * 10;
        mouseY = ( event.clientY - windowHalfY ) * 10;

      }
  }
}
var jquery = require('jquery');
var THREE = require('three');
//import THREE from 'three';

var container, stats;

      var camera, scene, renderer;

      var mouseX = 0, mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;


  export default {
    data() {
      return {
        quote: ''
      }
    },
    ready: function () {
      this.getQuote();
      this.setupThreejs();
    },

    methods: {
      getQuote() {
        this.$http
          .get('https://dlittle42.github.io/data/site.json', (data) => {
            this.quote = data;//JSON.stringify(data);
          })
          .error((err) => console.log(err))
      },
      setupThreejs() {
        console.log('store here?');
        
        
 
         container = document.getElementById('WebGL-output');

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 100000, 0, 3200 );

        scene = new THREE.Scene();

        var colors = [ 0x000000, 0xff0080, 0x8000ff, 0xffffff ];
        var geometry = new THREE.Geometry();

        for ( var i = 0; i < 2000; i ++ ) {

          var vertex = new THREE.Vector3();
          vertex.x = Math.random() * 4000 - 2000;
          vertex.y = Math.random() * 4000 - 2000;
          vertex.z = Math.random() * 4000 - 2000;
          geometry.vertices.push( vertex );

          geometry.colors.push( new THREE.Color( colors[ Math.floor( Math.random() * colors.length ) ] ) );

        }

        var material = new THREE.PointsMaterial( { size: 1, vertexColors: THREE. VertexColors, depthTest: false, opacity: 0.5, sizeAttenuation: false, transparent: true } );

        var mesh = new THREE.Points( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.sortObjects = false;
        renderer.autoClearColor = false;
        container.appendChild( renderer.domElement );
        document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
          this.animate();
      },
      animate(){
        requestAnimationFrame( this.animate );

        this.render();
      },
      render(){
        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;

        camera.lookAt( scene.position );

        renderer.render( scene, camera );
      },
      onDocumentMouseMove(event) {

        mouseX = ( event.clientX - windowHalfX ) * 10;
        mouseY = ( event.clientY - windowHalfY ) * 10;

      }

    }
  }
</script>