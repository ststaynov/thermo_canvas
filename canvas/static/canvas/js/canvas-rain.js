/**
 * WeatherSim.js
 * Simulates percipitation in three.js
 * @author Thomas Kearney
 */

var renderer,
    scene,
    camera,
    cameraRadius = 50.0,
    cameraTarget,
    cameraX = 50,
    cameraY = 0,
    cameraZ = cameraRadius - 20,
    particleSystemRain,
    particleSystemHeightRain = 100.0,
    clock,
    controls,
    parameters,
    onParametersUpdate,
    textureRain;

function handleKeyPress(event) {
    var ch = getChar(event);
    if (cameraControl(camera, ch)) return;
}


function start() {

    renderer = new THREE.WebGLRenderer({alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor( new THREE.Color( 0x000000 ));

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    cameraTarget = new THREE.Vector3(0, 0, 0);

    textureRain = THREE.ImageUtils.loadTexture('../static/canvas/images/rain/rain_optimised.png');

    // FLOOR
    //var floorTexture = new THREE.ImageUtils.loadTexture( 'http://stemkoski.github.io/Three.js/images/checkerboard.jpg' );
    //floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    //floorTexture.repeat.set( 10, 10 );
    //var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    //var floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
    //var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    //floor.position.y = -0.5;
    //floor.rotation.x = Math.PI / 2;
    //scene.add(floor);

    // create particle variables
    var particleCountRain = 1000,
        widthRain = 100,
        heightRain = particleSystemHeightRain,
        depthRain = 100,
        parametersRain = {
            color: 0xFFFFFF,
            height: particleSystemHeightRain,
            radiusX: 2.5,
            radiusZ: 2.5,
            size: 100,
            scale: 2.0,
            opacity: 0.4,
            speedH: 1.5,
            speedV: 1.5

        },
        geometryRain = new THREE.Geometry(),
        pMaterialRain = new THREE.ShaderMaterial({
            uniforms: {
                color: {type: 'c', value: new THREE.Color(parametersRain.color)},
                height: {type: 'f', value: parametersRain.height},
                elapsedTime: {type: 'f', value: 0},
                radiusX: {type: 'f', value: parametersRain.radiusX},
                radiusZ: {type: 'f', value: parametersRain.radiusZ},
                size: {type: 'f', value: parametersRain.size},
                scale: {type: 'f', value: parametersRain.scale},
                opacity: {type: 'f', value: parametersRain.opacity},
                texture: {type: 't', value: textureRain},
                speedH: {type: 'f', value: parametersRain.speedH},
                speedV: {type: 'f', value: parametersRain.speedV}

            },
            vertexShader: document.getElementById('WeatherSim_vs').textContent,
            fragmentShader: document.getElementById('WeatherSim_fs').textContent,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthTest: false
        });

    // create individual geometryRain
    for (p = 0; p < particleCountRain; p++) {

        var particle = new THREE.Vector3(
            rand(widthRain),
            Math.random() * heightRain,
            rand(depthRain)
        );

        // add to geometryRain
        geometryRain.vertices.push(particle);
    }

    // create system
    particleSystemRain = new THREE.PointCloud(geometryRain, pMaterialRain);
    particleSystemRain.position.y = -heightRain / 2;

    // add to scene
    scene.add(particleSystemRain);

    clock = new THREE.Clock();

    document.body.appendChild(renderer.domElement);

    function rand(v) {
        return (v * (Math.random() - 0.5));
    }

    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }


    var render = function () {

        requestAnimationFrame(render);

        var delta = clock.getDelta();
        var elapsedTime = clock.getElapsedTime();

        particleSystemRain.material.uniforms.elapsedTime.value = elapsedTime * 10;
        camera.position.set(cameraX, cameraY, cameraZ);
        camera.lookAt(cameraTarget);

        renderer.clear();
        // draw!
        renderer.render(scene, camera);
    };

    render();
}