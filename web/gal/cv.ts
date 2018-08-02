import '../assets/img/avatar.jpg'

import '../assets/img/grid.svg'
import '../assets/img/arrow.svg'
import '../assets/img/marker-h.svg'

import '../assets/img/az_side_branding1.svg'
import '../assets/img/az_side_branding2.svg'
import '../assets/img/az_side_branding3.svg'
import '../assets/img/az_side_branding4.svg'
import '../assets/img/az_side_branding5.svg'
import '../assets/img/az_side_branding6.svg'

import '../assets/img/artem_zaborskiy_cv.pdf'


import '../assets/scss/resume.scss'

import * as angular from 'angular'
import * as $ from 'jquery'
import { calculateDurations, collectAllSkills } from '../assets/js/cv_tools';
import { artem_zaborskiy_cv } from '../assets/js/cv';


var zaborskiy = angular.module('zaborskiy', []);


zaborskiy.controller('mainCtrl', function ($scope) {
    $scope.cv = artem_zaborskiy_cv;
    $scope.items = artem_zaborskiy_cv.positions;


    $scope.skills = new Array();

    calculateDurations();
    var az_skills = collectAllSkills();


    for (let key in az_skills) {
        $scope.skills.push(az_skills[key]);
    }

    angular.element(document).ready(function () {
        $.cloudinary.responsive();
    });
});