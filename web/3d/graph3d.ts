
import "../assets/img/robot.jpg"
import "../assets/sprites/sprite1.png"
import "../assets/sprites/sprite2.png"

import "../assets/sprites/sprite3.png"
import "../assets/sprites/sprite4.png"


import "../assets/sprites/sprite5.png"
// import "../assets/sprites/sprite6.png"

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

    relaxer: Relaxer;
    private nodes: ObjWrapper[];
    private edges: EdgeWrapper[];

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

    private linkToGlasses: EdgeWrapper;

    public makeObjects() {


        this.nodes = [];
        this.edges = [];
        let linkNodes = (a, b) => {
            if (a != b) {

                let ew = new EdgeWrapper(a, b);

                this.edges.push(ew);
            }
        }

        let R = 6;


        let center = new ObjWrapper(this.pointLight);
        this.nodes.push(center)

        let addFace = (name1) => {
            let face = this.addSprie(name1, R);
            this.nodes.push(face);
            linkNodes(center, face);
        }


        for (let x = 0; x < 5; x++) {

            addFace('assets/img/sprite1.png');
            addFace('assets/img/sprite2.png');
            addFace('assets/img/sprite3.png');
            addFace('assets/img/sprite4.png');
            addFace('assets/img/sprite5.png');

            addFace('assets/img/sprite7.png');
            addFace('assets/img/sprite8.png');
            addFace('assets/img/sprite9.png');
            addFace('assets/img/sprite10.png');
        }


        {
            this.glasses = this.addSprie('assets/img/glasses3.png', R);
            this.nodes.push(this.glasses);



            this.linkToGlasses = new EdgeWrapper(this.nodes[1], this.glasses);

            this.edges.push(this.linkToGlasses);
        }



    }



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






    private counter = 0;
    private step = 0;

    private updateMesh() {

        this.counter++;

        if (this.counter == 200) {
            this.counter = 0;

            this.linkToGlasses.a = this.nodes[this.step % (this.nodes.length - 1)];
            this.step += 1;
        }

        this.controls.target.x = this.pointLight.position.x;
        this.controls.target.y = this.pointLight.position.y;
        this.controls.target.z = this.pointLight.position.z;

        for (let e of this.nodes) {
            e.obj.rotation.setFromRotationMatrix(this.camera.matrix);
        }


        this.controls.update();

    }









    public render(): void {

        this.relaxer.relax(this, this);
        this.updateMesh();

        this.renderer.render(this.scene, this.camera);

    }

}
