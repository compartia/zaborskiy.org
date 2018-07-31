import * as THREE from 'three-full'


export abstract class SimpleScene {
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;

    container: HTMLElement;
    private light1: THREE.Light;
    pointLight: THREE.Light;

    controls: THREE.OrbitControls;
    postprocessing: any;

    constructor(container: HTMLElement) {
        this.container = container;
        this.scene = new THREE.Scene()

        let fogColor = new THREE.Color(0x000000);

        this.scene.background = fogColor;
        this.scene.fog = new THREE.Fog(fogColor.getHex(), 0.05, 15);

        let renderer = new THREE.WebGLRenderer()
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        this.renderer = renderer;

        // set size
        this.renderer.setSize(container.clientWidth , container.clientHeight);

        // add canvas to dom
        container.appendChild(this.renderer.domElement);


        this.resetScene();
    }

    public resetScene() {

        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        this.makeLights();
        this.makeCamera();
        this.makeObjects();


    }


    private initControls() {
        let controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        // controls.screenSpacePanning = false;
        controls.minDistance = 1;
        controls.maxDistance = 50

        controls.enableZoom = true;
        controls.enablePan = true;

        controls.autoRotate = true;
        controls.autoRotateSpeed=0.2;

        this.controls = controls;

    }



    public abstract makeObjects();


    private makeLights() {
        // add lights
        {
            let light0 = new THREE.PointLight(0xffffff, 1.6)
            light0.position.set(0, 0, 0)
            this.scene.add(light0);
            this.pointLight=light0;

        }
        this.light1 = new THREE.DirectionalLight(0x0000ff, 0.9)
        this.light1.position.set(100, 100, 100)
        this.scene.add(this.light1);

        // let light2 = new THREE.DirectionalLight(0xffffff, 0.9)
        // light2.position.set(-100, 100, -100)
        // this.scene.add(light2)
    }

    private makeCamera() {
        // create the camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.camera.position.x = 3
        this.camera.position.y = 4
        this.camera.position.z = 3

        this.camera.lookAt(this.scene.position);

        this.initControls();
        this.controls.update();
    }


    public abstract render(): void;



}
