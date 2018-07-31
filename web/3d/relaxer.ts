import * as THREE from 'three'
 
export interface Point {
    pos: THREE.Vector3;
    vel: THREE.Vector3;
}

export interface Edge {
    a: Point;
    b: Point;
}

export interface EdgesCollection {
    listEdges: Edge[];
}

export interface NodesCollection {
    listNodes: Point[];
}

export class Relaxer {
    public relax(edges: EdgesCollection, nodes: NodesCollection) {

        let max_len=3*(edges.listEdges.length+1) / (1+nodes.listNodes.length);

        let speed = 5 / Math.log(nodes.listNodes.length);
        // repulsion
        for (let n1 of nodes.listNodes) {
            for (let n2 of nodes.listNodes) {
                this.repulse(n1, n2, speed / 30, max_len);
            }
        }

        // attraction
        for (let e of edges.listEdges) {
            this.e2eInteract(e.a, e.b, -speed * 1, max_len*0.8);
        }

        for (let n of nodes.listNodes) {

            if (n.vel.length() > 1) n.vel.setLength(1);

            let newPos = n.pos.clone().add(n.vel);
            n.pos = newPos;

            n.vel.multiplyScalar(0.9);
        }

    }


    public repulse(e: Point, n: Point, k: number, max_len) {
       
        const MAX_LEN_SQ = max_len * max_len;
        const eps = MAX_LEN_SQ / 15;

        if (e === n) return;

        let rSquared = e.pos.distanceToSquared(n.pos);
        if (isNaN(rSquared)) return;
        if (rSquared > MAX_LEN_SQ) return;
        if (rSquared < 0.0001) return;

        let attractionMagnitude = k / rSquared;

        if (isNaN(attractionMagnitude)) {
            attractionMagnitude = 0.0001;
        }

        if (attractionMagnitude < 0.0001) {
            attractionMagnitude = 0.0001;
        }

        if (attractionMagnitude > 1) {
            attractionMagnitude = 1;
        }

        let f = e.pos.clone().sub(n.pos);
        f = f.normalize().multiplyScalar(attractionMagnitude);

        // let force1 = f.clone();//.divideScalar(e.mass);
        // let force2 = f.clone();//.divideScalar(n.mass);


        e.vel.add(f);
        n.vel.sub(f);

    }

    public e2eInteract(e: Point, n: Point, k: number, max_len) {
        
        const MAX_LEN_SQ = max_len * max_len;
        const eps = MAX_LEN_SQ / 10;

        if (e === n) return;

        let rSquared = e.pos.distanceTo(n.pos) - max_len;
        if (isNaN(rSquared)) return;
        if (rSquared < 0.0001) {
            return;
        }


        let attractionMagnitude = 0.02 * k * rSquared;

        let f = e.pos.clone().sub(n.pos);
        f = f.normalize().multiplyScalar(attractionMagnitude);

        // let force1 = f.clone();//.divideScalar(e.mass);
        // let force2 = f.clone();//.divideScalar(n.mass);


        e.vel.add(f);
        n.vel.sub(f);


    }

}
