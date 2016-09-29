

console.log('threejs_scene')

var THREE = require('three');
//import THREE from 'three';

var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var objects = [];
var particleMaterial;
var activePanel;
var viewWidth = window.innerWidth;
var viewHeight = window.innerHeight;
var vector, scaledVector;

var controls;

var materialOne;
var materialArr = [];
var imgArrIdx = 0;
var textureLoader;

var imgArr = [
	"contwix.png",
	"dvisa-holiday.png",
	"truenorth.png",
	"glamour.png",
	"portfoliobuilder.png",
	"santa.png",
	"werewolf.png",
	"nemo.png",
	"xd.png",
	"tru.png",
	"killbill.png"
]
var threejs_scene = new Object();

export default threejs_scene;


threejs_scene.init = () => {

        container = document.getElementById('WebGL-output');
				

		scene = new THREE.Scene();
	//	scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

		//renderer = new THREE.WebGLRenderer();
		renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		//renderer.setClearColor( scene.fog.color );
		renderer.setClearColor( 0xF2F2EF );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		container.appendChild(renderer.domElement);

		//camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.z = 40;
		camera.position.y = 0;

		var light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 0, 1, 0 );
		scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( 0, -1, 0 );
		scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 1, 0, 0 );
		scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( 0, 0, 1 );
		scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 1 );
		light.position.set( 0, 0, -1 );
		scene.add( light );

		var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
		light.position.set( -1, 0, 0 );
		scene.add( light );

		//load textures 

			
		var manager = new THREE.LoadingManager();
		manager.onProgress = function ( item, loaded, total ) {
		 // progressBar.style.width = (loaded / total * 100) + '%';
		 	console.log(item, loaded, total);
		};

		manager.onLoad = function (){
			console.log('all items loaded');
			if (imgArrIdx < imgArr.length) {
				threejs_scene.loadImages();
			}else{
				threejs_scene.createGridWall();
			}
		}

		manager.onError = function (){
			console.log('loading error');
		}


	//	new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.DoubleSide } );

		// create a loader to get an image from a URL
		textureLoader = new THREE.TextureLoader(manager);
		// we've gotta set this to use cross-origin images
		textureLoader.crossOrigin = true;

		// load in the image
		
		threejs_scene.loadImages();

		raycaster = new THREE.Raycaster();

       // stats = new Stats();
       // container.appendChild( stats.dom );

        document.addEventListener( 'mousemove', threejs_scene.onDocumentMouseMove, false );
		document.addEventListener( 'mousedown', threejs_scene.onDocumentMouseDown, false );
		document.addEventListener( 'mouseup', threejs_scene.onDocumentMouseUp, false );
//

        window.addEventListener( 'resize', threejs_scene.onWindowResize, false );

      threejs_scene.animate();

 
}

threejs_scene.loadImages = () => {
				
		textureLoader.load("/static/images/portfolio620/"+imgArr[imgArrIdx], function(texture) {
		  // this code makes the texture repeat
		//  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
		//  texture.repeat.set( 10, 10 );
		  // set the texture as the map for the material
		//  materialOne = texture;//new THREE.MeshLambertMaterial( {map: texture, side:THREE.DoubleSide } );
		  materialArr.push(texture);
		  console.log("materialArr="+materialArr);
		  imgArrIdx++;
		})
}

threejs_scene.createGridWall = () => {
	//var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
		//var geometry = new THREE.PlaneBufferGeometry( 10, 10, 5 );
		var geometry = new THREE.PlaneGeometry( 10, 10, 5 );

		var objWidth = 10;
		var maxRow = 2;
		var maxCol = 100;
		var hspacing = 12.5;
		var vspacing = 12.5;
		var xoffset = 0;//((objWidth + hspacing)* maxRow)/2;

		for (var i = 0; i < maxRow; i++) {
		     for (var j = 0; j < maxCol; j++) {
		      	//var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
		      	var object = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( {map: materialArr[(i+j)%imgArr.length], side:THREE.DoubleSide } ));

		      	object.doubleSided = true;
		      	object.geometry.computeBoundingSphere(); // this isn't calculated automatically
				object.geometry.boundingSphere.center;

				var xpos = ((hspacing * j) - hspacing/2) - xoffset;
				var ypos = (vspacing  * i)  - ((vspacing/2)*maxRow);
				var zpos = Math.random() * 400 - 200;

				object.position.x = xpos;
				object.position.y = ypos;
				object.position.z = 0;
				object.origin = [xpos, ypos];
				scene.add( object );
				objects.push( object );
		     }
		 }


		 particleMaterial = new THREE.SpriteMaterial( { color: 0x0f0f0f, fog: true } );
}

threejs_scene.animate = () => {
        requestAnimationFrame( threejs_scene.animate );

        threejs_scene.render();
 }

threejs_scene.render = () => {

       // theta += 0.1;

        //camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
       // camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
       // camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
        camera.lookAt( scene.position );

       // camera.updateMatrixWorld();

        // find intersections
/*
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
*/
        renderer.render( scene, camera );
}

threejs_scene.onDocumentMouseMove = (event) => {


        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

threejs_scene.onDocumentMouseDown = (event) => {

	event.preventDefault();

//	console.log(THREE.Vector3( 0, 0, -1 ).applyQuaternion( camera.quaternion ).add( camera.position ));

	mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	vector = new THREE.Vector3( 0, 0, -1 );
	vector.applyQuaternion( camera.quaternion ).add( camera.position );

	console.log(vector);

	scaledVector=vector.clone().multiplyScalar(0.95);

	console.log("scaled:"+scaledVector.y);

	var intersects = raycaster.intersectObjects( objects );

	if ( intersects.length > 0 ) {

		if (activePanel == intersects[ 0 ].object){
			activePanel = null;
			TweenMax.to(intersects[0].object.position, 1, {
				x:intersects[0].object.origin[0],
				y:intersects[0].object.origin[1],
				z:0,
				delay: 0,
				//ease:"Power3.easeOut",
				ease: Back.easeInOut.config(.5),
				onUpdate:function(){
              //  console.log('tweened');

            	}
			});

			TweenMax.to(intersects[0].object.rotation, 1, {
				x:0,
				y:0,
				z:0,
				delay: 0,
				//ease:"Power3.easeOut",
				ease: Back.easeInOut.config(.5),
				onUpdate:function(){
              //  console.log('tweened');
            	}
			});

		}else{
			activePanel = intersects[ 0 ].object;
		}

		intersects[ 0 ].object.material.color.setHex( 0xe02323 );

		var newSphereGeom= new THREE.SphereGeometry(.5,.5,.5);
		var sphere= new THREE.Mesh(newSphereGeom, new THREE.MeshBasicMaterial({ color: 0x2266dd }));

		sphere.position.copy( intersects[ 0 ].point );
		sphere.scale.x = sphere.scale.y = 1;
		scene.add( sphere );

		threejs_scene.drawRayLine( raycaster );
		/*
		TweenMax.to(intersects[0].object.position, 1, {
			x:camera.position.x,
			y:camera.position.y,
			z:camera.position.z -50,
			delay: .5,
			//ease:"Power3.easeOut",
			ease: Back.easeInOut.config(.5),
			onUpdate:function(){
          //  console.log('tweened');
        	}
		});
		TweenMax.to(intersects[0].object.rotation, 1, {
			x:camera.rotation.x,
			y:camera.rotation.y,
			z:camera.rotation.z,
			delay: 1,
			//ease:"Power3.easeOut",
			ease: Back.easeInOut.config(.5),
			onUpdate:function(){
          //  console.log('tweened');
        	}
		});
		*/

	}

	/*
	// Parse all the faces
	for ( var i in intersects ) {

		intersects[ i ].face.material[ 0 ].color.setHex( Math.random() * 0xffffff | 0x80000000 );

	}
	*/
}

threejs_scene.onDocumentMouseUp = (event) => {

	event.preventDefault();
	if (activePanel){
		TweenMax.to(activePanel.position, 1, {
			x:scaledVector.x,
			y:scaledVector.y,
			z:scaledVector.z,
			delay: 0,
			ease:"Power3.easeOut",
			//ease: Back.easeInOut.config(.5),
			onComplete:function(){
          //  console.log('tweened');
          		console.log("x:"+activePanel.position.x+", y:"+ activePanel.position.y+ ", z:"+ activePanel.position.z);
          		

        	}
		});
		
		//activePanel.translateOnAxis(activePanel.worldToLocal(new THREE.Vector3(0,0,5)),50);
		TweenMax.to(activePanel.rotation, 1, {
			x:camera.rotation.x,
			y:camera.rotation.y,
			z:camera.rotation.z,
			delay: 0,
			//ease:"Power3.easeOut",
			ease: Back.easeInOut.config(.5),
			onUpdate:function(){
          //  console.log('tweened');
        	}
		});
		//activePanel = null;

	}

}

threejs_scene.onWindowResize = () => {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

}

threejs_scene.getFactorPos = ( val, factor, step ) => {
    return step / factor * val;                
}

threejs_scene.addNewParticle = (pos, scale) => {
			
    if( !scale )
    {
        scale = 16;
    }
    var particle = new THREE.Sprite( particleMaterial );
    particle.position = pos;
    particle.scale.x = particle.scale.y = scale;
    scene.add( particle );
}

threejs_scene.drawParticleLine = (pointA,pointB) => {

    var factor = 50;
    for( var i = 0; i < factor; i++ )
    {
        var x = threejs_scene.getFactorPos( pointB.x - pointA.x, factor, i );
        var y = threejs_scene.getFactorPos( pointB.y - pointA.y, factor, i );
        var z = threejs_scene.getFactorPos( pointB.z - pointA.z, factor, i );
        threejs_scene.addNewParticle( new THREE.Vector3( pointA.x+x,pointA.y+y,pointA.z+z ), Math.max(2, viewWidth / 500 ) );
    }
}
 
threejs_scene.drawRayLine = (rayCaster) => {

    var scale = viewWidth*2;
    var rayDir = new THREE.Vector3(rayCaster.ray.direction.x*scale,rayCaster.ray.direction.y*scale,rayCaster.ray.direction.z*scale);
    var rayVector = new THREE.Vector3(camera.position.x + rayDir.x, camera.position.y + rayDir.y, camera.position.z + rayDir.z);
    threejs_scene.drawParticleLine(camera.position, rayVector);
}    

threejs_scene.setCamera = (xpos) => {
	camera.position.x = xpos;
}