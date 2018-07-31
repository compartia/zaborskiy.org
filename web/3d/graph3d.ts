
import "../assets/img/robot.jpg"
import "../assets/sprites/sprite1.png"
import "../assets/sprites/sprite2.png"

import "../assets/sprites/sprite3.png"
import "../assets/sprites/sprite4.png"


import "../assets/sprites/sprite5.png"
import "../assets/sprites/sprite6.png"

import "../assets/sprites/sprite7.png"
import "../assets/sprites/sprite8.png"

import "../assets/sprites/sprite9.png"
import "../assets/sprites/sprite10.png"


import "../assets/sprites/glasses.png"
import "../assets/sprites/glasses2.png"
import "../assets/sprites/glasses3.png"

import * as THREE from 'three'
import { SimpleScene } from './scene3d';

import { Relaxer, EdgesCollection, NodesCollection, Point, Edge } from './relaxer';
import { Vector3 } from 'three';

export class Lib {
    public static lineColors = [
        1, 0.2, 0.2,
        0, 0, 0.5
    ];


    public static materialStandard = new THREE.MeshStandardMaterial({
        color: 0xffcccc,
        metalness: 0.5,
        roughness: 0.8,
        side: THREE.FrontSide
    });

    public static lineMat = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, fog: true, linewidth: 3 });


    public static shiny = new THREE.MeshPhongMaterial({
        color: 0xcc00cc, specular: 0xffffff, shininess: 250,
        // wireframe: true,
        side: THREE.FrontSide, vertexColors: THREE.VertexColors
    });

    public static trans = new THREE.MeshPhongMaterial({
        color: 0x6666ff, specular: 0x6666ff, shininess: 100,
        // wireframe: true,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide, vertexColors: THREE.VertexColors
    });


}

export class ObjWrapper implements Point {
    obj: THREE.Object3D;
    vel: Vector3
    constructor(obj: THREE.Object3D) {
        this.obj = obj;
        this.vel = new Vector3();
    }
    get pos() {
        return this.obj.position;
    }

    set pos(p: Vector3) {
        this.obj.position.x = p.x;
        this.obj.position.y = p.y;
        this.obj.position.z = p.z;
    }
}


class EdgeWrapper implements Edge {
    a: ObjWrapper;
    b: ObjWrapper;
    line: THREE.Line;
    constructor(a: ObjWrapper, b: ObjWrapper) {
        this.a = a;
        this.b = b;
    }

}

export class P3dScene extends SimpleScene implements EdgesCollection, NodesCollection {
    //   a:  THREE.FogExp2;
    relaxer: Relaxer;
    private nodes: ObjWrapper[];
    private edges: EdgeWrapper[];
    private names2mesh: { [nodeName: string]: ObjWrapper } = {};

    glasses: ObjWrapper;

    constructor(container: HTMLElement) {
        super(container);
        this.relaxer = new Relaxer();
    }


    get listNodes() {
        return this.nodes;
    }

    get listEdges() {
        return this.edges;
    }

    public makeObjects() {

        // this.scene.add(new THREE.AxesHelper(20));

        //nothing to add.. a plane .. might be?

        this.nodes = [];
        this.edges = [];
        let linkNodes = (a, b) => {
            if (a != b) {
                let line = this.makeConnector(a, b);
                // this.scene.add(line);
                let ew = new EdgeWrapper(a, b);
                ew.line = line;
                this.edges.push(ew);
            }
        }

        // this.nodes.push(this.addSprie('assets/img/robot.jpg'));
        // this.nodes.push(this.addSprie('assets/img/robot.jpg'));
        let R = 6;
        let k = 1.1;

        let center = new ObjWrapper(this.pointLight);
        this.nodes.push(center)

        let addFace = (name1, name2) => {
            let face = this.addSprie(name1, R);
            // let g = this.addSprie(name2, R * k);
            this.nodes.push(face);
            // this.nodes.push(g);
            // linkNodes(face, g);
            // if (Math.random() < 0.5) {
            linkNodes(center, face);
            // } else {
            //     linkNodes(center, g);
            // }

        }




        for (let x = 0; x < 5; x++) {
            let sprite2name = 'assets/img/glasses3.png';
            addFace('assets/img/sprite1.png', sprite2name);
            addFace('assets/img/sprite2.png', sprite2name);
            addFace('assets/img/sprite3.png', sprite2name);
            addFace('assets/img/sprite4.png', sprite2name);
            addFace('assets/img/sprite5.png', sprite2name);

            // addFace('assets/img/sprite6.png', sprite2name);
            addFace('assets/img/sprite7.png', sprite2name);
            addFace('assets/img/sprite8.png', sprite2name);
            addFace('assets/img/sprite9.png', sprite2name);
            addFace('assets/img/sprite10.png', sprite2name);
            // this.nodes.push(this.addSprie('assets/img/sprite1.png', R));
            // this.nodes.push(this.addSprie('assets/img/sprite2.png', R));
            // this.nodes.push(this.addSprie('assets/img/sprite5.png', R));
            // this.nodes.push(this.addSprie('assets/img/sprite6.png', R));
            // this.nodes.push(this.addSprie('assets/img/sprite7.png', R));
            // this.nodes.push(this.addSprie('assets/img/sprite8.png', R));

            // this.nodes.push(this.addSprie('assets/img/glasses.png', R * k));
            // this.nodes.push(this.addSprie('assets/img/glasses2.png', R * k));
            // this.nodes.push(this.addSprie('assets/img/glasses.png', R * k));
            // this.nodes.push(this.addSprie('assets/img/glasses2.png', R * k));


        }







        {
            this.glasses = this.addSprie('assets/img/glasses3.png', R);
            this.nodes.push(this.glasses);

            let line = this.makeConnector(this.nodes[0], this.glasses);
            // this.scene.add(line);
            this.linkToGlasses   = new EdgeWrapper(this.nodes[1], this.glasses);
            this.linkToGlasses.line = line;
            this.edges.push(this.linkToGlasses);
        }



    }

    linkToGlasses:EdgeWrapper; 

    private addSprie(name: string, len: number): ObjWrapper {
        const R = len;
        const R2 = R / 2;
        const spriteMap = new THREE.TextureLoader().load(name);
        // const spriteMaterial = new THREE.MeshLambertMaterial({ color:"0xff0000", transparent: true });
        const spriteMaterial = new THREE.MeshLambertMaterial({ map: spriteMap, transparent: true });
        let pos = new THREE.Vector3(Math.random() * R - R2, Math.random() * R - R2, Math.random() * R - R2);
        pos.setLength(R2);



        var planeGeometry = new THREE.PlaneGeometry(2, 2, 1, 3);
        let plane = new THREE.Mesh(planeGeometry, spriteMaterial);
        plane.rotation.x = -Math.PI / 2;
        plane.position.set(pos.x, pos.y, pos.z);

        this.scene.add(plane);
        return new ObjWrapper(plane);
    }






    counter = 0;
step=0;
    private updateMesh() {

        this.counter++;

        if (this.counter == 200) {
            this.counter = 0;

            this.linkToGlasses.a=this.nodes[this.step % (this.nodes.length-1)  ];
            this.step+=1;
        }
        // if (this.listNodes.length == 0) return;
        // if (this.listEdges.length == 0) return;

        // let min = this.listNodes[0].pos.clone();
        // let max = this.listNodes[0].pos.clone();
        this.controls.target.x = this.pointLight.position.x;
        this.controls.target.y = this.pointLight.position.y;
        this.controls.target.z = this.pointLight.position.z;
        //, this.pointLight.pos.y, this.pointLight.pos.z);
        for (let e of this.nodes) {
            e.obj.rotation.setFromRotationMatrix(this.camera.matrix);
        }
        // for (let e of this.edges) {
        //     let position: THREE.BufferAttribute = (e.line.geometry as THREE.BufferGeometry).attributes['position'] as THREE.BufferAttribute;

        //     position.setXYZ(0, e.a.pos.x, e.a.pos.y, e.a.pos.z);
        //     position.setXYZ(1, e.b.pos.x, e.b.pos.y, e.b.pos.z);
        //     position.needsUpdate = true;
        // }


        // let mid = min.clone().add(max).divideScalar(2);
        // let size = max.clone().sub(min);

        // {
        //     let controls: THREE.OrbitControls = this.controls;

        //     controls.target.x = mid.x;
        //     controls.target.y = mid.y;
        //     controls.target.y = mid.z;
        //     controls.maxDistance = size.length() * 1.2;

        //     let fov = (<THREE.PerspectiveCamera>this.camera).getEffectiveFOV();
        //     (this.scene.fog as any).far = fov * 0.8;//size.length();

        this.controls.update();
        // }



    }




    private makeConnector(a: ObjWrapper, b: ObjWrapper): THREE.Line {

        if (a == b) return;
        let geometry = new THREE.BufferGeometry();

        let positions = [];

        positions.push(a.pos.x, a.pos.y, a.pos.z);
        positions.push(b.pos.x, b.pos.y, b.pos.z);

        geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.Float32BufferAttribute(Lib.lineColors, 3));

        geometry.computeBoundingSphere();

        var curveObject = new THREE.Line(geometry, Lib.lineMat);

        return curveObject;
    }





    public render(): void {

        this.relaxer.relax(this, this);
        this.updateMesh();

        this.renderer.render(this.scene, this.camera);

    }

}