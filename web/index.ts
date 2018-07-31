import '../web/assets/scss/zaborskiy.scss'
import '../web/assets/js/index'

import './3d/graph3d'
import { P3dScene } from './3d/graph3d';




document.addEventListener("DOMContentLoaded", function (event) {
    let container = document.getElementById('container-three');
    const scene = new P3dScene(container);


    let step =  (timestamp)=> {
        scene.render();       
        window.requestAnimationFrame((t) => step(t));
    }

    window.requestAnimationFrame(step);

});


