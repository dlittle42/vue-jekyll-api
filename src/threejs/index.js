export default threejs_scene;
console.log('threejs_scene')

var THREE = require('three');
//import THREE from 'three';

var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;


threejs_scene.init = () => {

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

 
}

threejs_scene.animate = () => {
        requestAnimationFrame( this.animate );

        this.render();
 }

threejs_scene.render = () => {

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
}

threejs_scene.onDocumentMouseMove = (event) => {


        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

threejs_scene.onWindowResize = () => {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

}