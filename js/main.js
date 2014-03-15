$(document).ready(function(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });

  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
      //renderer.setClearColorHex(0xffffff, 1.0);
      renderer.clear();
      var fov = 45; // camera field-of-view in degrees
      var aspect = width / height; // view aspect ratio
      var near = 1; // near clip plane
      var far = 10000; // far clip plane
      var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
      camera.position.z = 300;
      var scene = new THREE.Scene();

      var clock = new THREE.Clock();


      var backgroundTexture = THREE.ImageUtils.loadTexture('img/bg.jpg');

      var bg = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2, 0),
        new THREE.MeshBasicMaterial({map: backgroundTexture})
        );
      bg.material.depthTest = false;
      bg.material.depthWrite = false;
      var bgScene = new THREE.Scene();
      var bgCam = new THREE.Camera();
      bgScene.add(bgCam);
      bgScene.add(bg);

      var light = new THREE.SpotLight();
      light.position.set( 170, 3300, -160 );
      light.castShadow = true;
      light.shadowMapWidth = 1024;
      light.shadowMapHeight = 1024;

      light.shadowCameraNear = 500;
      light.shadowCameraFar = 4000;
      light.shadowCameraFov = 30;
      scene.add(light);

      var geometry = new THREE.RetractorGeometry();
      geometry.init();

      console.log(geometry);

      var litCube = new THREE.Mesh(
        new THREE.CubeGeometry(50, 50, 50),
        //geometry,
        new THREE.MeshLambertMaterial({color: 0xffffff}));
      litCube.position.y = 50;
      //scene.add(litCube);

      // texture

      var manager = new THREE.LoadingManager();
      manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

      };

      var texture = new THREE.Texture();

      var loader = new THREE.ImageLoader( manager );
      loader.load( 'js/textures/psionic_receptor_by_sonikvisual-d54ybix.jpg', function ( image ) {

        texture.image = image;
        texture.needsUpdate = true;

      } );


      // model


      var loader = new THREE.OBJLoader( manager );
      loader.load( 'js/obj/renderabs01.obj', function ( object ) {

        object.traverse( function ( child ) {

          if ( child instanceof THREE.Mesh ) {

            child.material.map = texture;

          }

        } );

        object.position.x =  120;
        object.position.y =  100;
        object.position.z =  300;
        object.rotation.y =  30;
        object.rotation.z =  0;
        scene.add( object );

      } );


      var particles = new THREE.Geometry;

      for(var p = 0; p < 2000; p++){
        var particle = new THREE.Vector3(Math.random()*width*4-width*1.4, Math.random() * height*3, Math.random() * width*4-width*2);
        particle.color = new THREE.Color().setHSL(30,120,230);
        particles.vertices.push(particle);
      }

      var particleMaterial = new THREE.ParticleBasicMaterial({color: 0xeeeeee, size:2});

      var particleSystem = new THREE.ParticleSystem(particles, particleMaterial);
      scene.add(particleSystem);


      renderer.render(scene, camera);
      var paused = false;
      var last = new Date().getTime();

      function animate(t) {
        if (!paused) {
          last = t;
          camera.position.set(
            Math.sin(t/1000)*30, 3000, Math.atan(t/1000)*300);

          var delta = clock.getDelta();
          particleSystem.rotation.y += delta/5;
          particleSystem.rotation.x += delta/5;




          renderer.autoClear = false;
          renderer.clear();
          renderer.render(bgScene, bgCam);
          camera.lookAt(scene.position);
          renderer.render(scene, camera);
        }
        window.requestAnimationFrame(animate, renderer.domElement);
      };

      animate(new Date().getTime());
      onmessage = function(ev) {
        paused = (ev.data == 'pause');
      };
    });