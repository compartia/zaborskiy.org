// import '../../web/assets/scss/zaborskiy.scss'
import '../../web/assets/scss/tutorial.scss'
import './japan.scss'

import * as angular from 'angular'
import * as $ from 'jquery'
// require("../assets/js/dist/jquery.min.js");
// import "../assets/js/dist/jquery.cloudinary.js"
// require('../assets/js/dist/jquery.cloudinary.js');

var zaborskiy = angular.module('zaborskiy', []);

zaborskiy.controller('mainCtrl', function ($scope) {

    angular.element(document).ready(function () {
        // $.cloudinary.responsive();
    });
});

(function (d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id))
        return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=340556079412727";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));



// $.cloudinary.responsive();

            