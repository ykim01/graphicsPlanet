/**
* Yon Su Kim
*/
let
    scene,
    camera,
    renderer,
    controls;

let particles,
    sun,
    moon;

// renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('black');
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// create a scene
scene = new THREE.Scene();

//colors for particles
const colors = [0xeee591, 0x967d7f, 0xb4d5f2];

// camera
var aspect = window.innerWidth / window.innerHeight;
scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(85, aspect, 1, 1000);
camera.lookAt(scene.position);
camera.position.z = 1000;

//draws particles
drawParticles();

//draww planet and models
var planet = drawPlanet();
planet.castShadow = false;
planet.receiveShadow = true;
//entire.add(planet);
var house = drawHouse();
house.castShadow = true;
house.receiveShadow = true;
planet.add(house);
house.position.set(0,15,0);

var tree1 = drawTrees();
tree1.rotateX(Math.PI/5);
tree1.castShadow = true;
tree1.receiveShadow = true;
scene.add(tree1);
planet.add(tree1);
tree1.position.set(0,-5,0);
tree1.castShadow = true;
tree1.receiveShadow = true;
var tree2 = drawTrees();
tree2.rotateX(Math.PI/4);
scene.add(tree2);
planet.add(tree2);
tree2.position.set(0,-12,0);
tree2.receiveShadow = true;
tree2.castShadow = true;

var tree3 = drawTrees2();
scene.add(tree3);
tree3.rotateX(1.5);
planet.add(tree3);
tree3.position.set(100* Math.cos(20),100,0);
tree3.receiveShadow = true;
tree3.castShadow = true;


snowman = drawSnowman();
planet.add(snowMan);

sun = drawSun();

moon = drawMoon();

// lights
pointLight = createLight();
scene.add(pointLight);
sun.position.set(300, 200, 0);

// controls
var gui = new dat.GUI();
var h = gui.addFolder("Pose Parameters");
h.open();
h.add(sun.rotation, "x", 0, 2*(Math.PI), 0.01).name("Sun");
h.add(moon.rotation, "z", 0.0, 2*(Math.PI), 0.01).name("Moon");

controls = new THREE.OrbitControls(camera, renderer.domElement);

// start off animation
animate();

// -----------------------------------------------------------------------------
function animate() {

    // put this function in queue for another frame after this one
    requestAnimationFrame(animate);

    // update
    pointLight.position.set(sun.position.x,sun.position.y,sun.position.z);
    controls.update();
    particles.rotation.x += 0.001;
    particles.rotation.y -= 0.004;
    planet.rotation.y += 0.01;
    renderer.render(scene, camera);

}


function createLight() {
          var ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
          scene.add(ambientLight);

          var intensity = .85;
					var pointLight = new THREE.PointLight( 0xFFFFE0, intensity, 10000 );
					pointLight.castShadow = true;
					pointLight.shadow.bias = - 0.005; // reduces self-shadowing on double-sided objects

					pointLight.add( sun );
          pointLight.position.set(sun.position.x,sun.position.y,sun.position.z);

					return pointLight;
}
// -----------------------------------------------------------------------------
function drawPlanet() {
  planet = new THREE.Group();
  planet.rotation.set(0.4, 0.3, 0);

  const planetGeometry = new THREE.IcosahedronGeometry(200, 2);

  const planetMaterial = new THREE.MeshPhongMaterial({
    color: 0xc5e7ec,
    shading: THREE.FlatShading
    });
  const planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);

  //planetMesh.castShadow = true;
  planetMesh.receiveShadow = true;
  planetMesh.position.set(0, 40, 0);
  planet.add(planetMesh);

  const ringGeometry = new THREE.TorusGeometry(250, 5, 3, 30);
  const ringMeterial = new THREE.MeshStandardMaterial({
    color: 0x6b8ba3,
    shading: THREE.FlatShading
  });

  const ring = new THREE.Mesh(ringGeometry, ringMeterial);
  ring.position.set(0, 50, 0)
  ring.rotateX(80);
  ring.castShadow = true;
  ring.receiveShadow = true;
  planet.add(ring);

  scene.add(planet);
  return planet;
}

function drawHouse(){
      var base = new THREE.Mesh(
          new THREE.BoxGeometry(55, 55, 55),
          new THREE.MeshStandardMaterial({
              color: 0xbfb2a4,
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25
          } )
        );
      var geometry = new THREE.CylinderGeometry( 0, 45, 45, 4 );
      var material = new THREE.MeshStandardMaterial( {
        color: 0xbfb2a4,
        shading: THREE.FlatShading,
        metalness: 0,
        roughness: 0.8,
        refractionRatio: 0.25
      });
      base.castShadow = true;
      base.receiveShadow = true;
      base.position.set(0, 248, 0);
      base.rotate

      var roof = new THREE.Mesh( geometry, material );
      roof.castShadow = true;
      roof.receiveShadow = true;
      roof.position.set(0, 295, 0);
      roof.rotateY(Math.PI/4);

      var chimney = new THREE.Mesh(
          new THREE.BoxGeometry(10, 20, 10),
          new THREE.MeshStandardMaterial({
              color: 0xbfb2a4,
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25
          } )
        );
      chimney.receiveShadow = true;
      chimney.castShadow = true;
      chimney.position.set(-17, 300, 0);

      var house = new THREE.Group();
      house.add(base);
      house.add(roof);
      house.add(chimney);

      scene.add(house);
      return house;
}

function drawTrees(){
  var trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 15, 10),
      new THREE.MeshStandardMaterial({
          color: 0x967d7f,
          shading: THREE.FlatShading ,
          metalness: 0,
          roughness: 0.8,
          refractionRatio: 0.25
      } )
    );
    trunk.position.set(0, 240, 0);

    var leaves1 = new THREE.Mesh(
        new THREE.ConeGeometry(10, 20, 4),
        new THREE.MeshStandardMaterial({
            color: 0xbfc5cc,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        } )
      );
      leaves1.position.set(0, 275, 0);

      var leaves2 = new THREE.Mesh(
          new THREE.ConeGeometry(15, 20, 4),
          new THREE.MeshStandardMaterial({
              color: 0xbfc5cc,
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25
          } )
        );
        leaves2.position.set(0, 265, 0);

        var leaves3 = new THREE.Mesh(
            new THREE.ConeGeometry(20, 20, 4),
            new THREE.MeshStandardMaterial({
                color: 0xbfc5cc,
                shading: THREE.FlatShading ,
                metalness: 0,
                roughness: 0.8,
                refractionRatio: 0.25
            } )
          );
          leaves3.position.set(0, 255, 0);
          leaves3.castShadow = true;
          leaves3.receiveShadow = true;

          var tree1 = new THREE.Group();
          tree1.add(leaves1);
          tree1.add(leaves2);
          tree1.add(leaves3);
          tree1.add(trunk);
          return tree1;
}

function drawTrees2(){
  var trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(5, 5, 15, 10),
      new THREE.MeshStandardMaterial({
          color: 0x967d7f,
          shading: THREE.FlatShading ,
          metalness: 0,
          roughness: 0.8,
          refractionRatio: 0.25
      } )
    );
    trunk.position.set(160, 0, 100);
    trunk.rotateZ(1.5);

    var leaves1 = new THREE.Mesh(
        new THREE.ConeGeometry(10, 20, 4),
        new THREE.MeshStandardMaterial({
            color: 0xbfc5cc,
            shading: THREE.FlatShading ,
            metalness: 0,
            roughness: 0.8,
            refractionRatio: 0.25
        } )
      );
      leaves1.position.set(198, 0, 100);
      leaves1.rotateZ(1.5);
      leaves1.rotateX(Math.PI);

      var leaves2 = new THREE.Mesh(
          new THREE.ConeGeometry(15, 20, 4),
          new THREE.MeshStandardMaterial({
              color: 0xbfc5cc,
              shading: THREE.FlatShading ,
              metalness: 0,
              roughness: 0.8,
              refractionRatio: 0.25
          } )
        );
        leaves2.position.set(188, 0, 100);
        leaves2.rotateZ(1.5);
        leaves2.rotateX(Math.PI);

        var leaves3 = new THREE.Mesh(
            new THREE.ConeGeometry(20, 20, 4),
            new THREE.MeshStandardMaterial({
                color: 0xbfc5cc,
                shading: THREE.FlatShading ,
                metalness: 0,
                roughness: 0.8,
                refractionRatio: 0.25
            } )
          );
          leaves3.position.set(178, 0, 100);
          leaves3.rotateZ(1.5);
          leaves3.rotateX(Math.PI);
          leaves3.castShadow = true;
          leaves3.receiveShadow = true;

          var tree1 = new THREE.Group();
          tree1.add(leaves1);
          tree1.add(leaves2);
          tree1.add(leaves3);
          tree1.add(trunk);
          return tree1;
}

function drawSnowman(){
  snowMan = new THREE.Group();

  const snowGeometry1 = new THREE.IcosahedronGeometry(10, 1);
  const snowMaterial = new THREE.MeshPhongMaterial({
    color: 0xd3f2f0,
    shading: THREE.FlatShading
    });
  const snowGeometry2 = new THREE.IcosahedronGeometry(6, 1);
  const snowGeometry3 = new THREE.IcosahedronGeometry(4, 1);
  const snowMesh1 = new THREE.Mesh(snowGeometry1, snowMaterial);
  const snowMesh2 = new THREE.Mesh(snowGeometry2, snowMaterial);
  const snowMesh3 = new THREE.Mesh(snowGeometry3, snowMaterial);

  snowMesh1.castShadow = true;
  snowMesh1.receiveShadow = true;
  snowMesh1.position.set(0, -100, 150);
  snowMesh1.rotateY(Math.PI/3);
  snowMan.add(snowMesh1);

  snowMesh2.castShadow = true;
  snowMesh2.receiveShadow = true;
  snowMesh2.position.set(0, -110, 160);
  snowMesh2.rotateY(Math.PI/3);
  snowMan.add(snowMesh2);

  snowMesh3.castShadow = true;
  snowMesh3.receiveShadow = true;
  snowMesh3.position.set(0, -117, 165);
  snowMesh3.rotateY(Math.PI/3);
  snowMan.add(snowMesh3);

  var geometry = new THREE.CylinderGeometry( 0, 2, 2, 3 );
  var material = new THREE.MeshStandardMaterial( {
    color: 0xf2740b,
    shading: THREE.FlatShading,
    metalness: 0,
    roughness: 0.8,
    refractionRatio: 0.25
  });

  var carrot = new THREE.Mesh( geometry, material );
  carrot.castShadow = true;
  carrot.receiveShadow = true;
  carrot.position.set(-4, -117, 165);
  carrot.rotateY(2);
  snowMan.add(carrot);
  scene.add(snowMan);


  return snowMan;
}

function drawSun(){
  sun = new THREE.Group();
  const sunGeometry = new THREE.IcosahedronGeometry(60, 1);
  const sunMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFE0,
    shading: THREE.FlatShading
    });
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  sunMesh.rotateX(Math.PI/2);

  sun.add(sunMesh);
  scene.add(sun);
  return sun;
}

function drawMoon(){
  moon = new THREE.Group();
  const moonGeometry = new THREE.IcosahedronGeometry(60, 1);
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x494949,
    shading: THREE.FlatShading
    });
  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

  moon.castShadow = true;
  moon.receiveShadow = true;
  moon.position.set(-500, -400, 0);
  moon.rotateX(-(Math.PI));

  moon.add(moonMesh);
  scene.add(moon);
  return moon;
}

function drawParticles() {
  particles = new THREE.Group();
  scene.add(particles);
  const geometry = new THREE.OctahedronGeometry(1, 0);

//make 500 objects to act as my particles
  for (let i = 0; i < 500; i ++) {
    const material = new THREE.MeshPhongMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      shading: THREE.FlatShading
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 1000,
                      (Math.random() - 0.5) * 1000,
                      (Math.random() - 0.5) * 1000);
    mesh.updateMatrix();
    mesh.matrixAutoUpdate = false;
    particles.add(mesh);
  }

}
