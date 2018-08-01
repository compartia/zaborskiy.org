import * as angular from 'angular'
import * as $ from 'jquery'

import '../img/zeitsinn.jpg'
import '../img/hellcolor.jpg'
import '../img/hellcolor.jpg'

export const zaborskiy = angular.module('zaborskiy', []);


zaborskiy.controller('mainCtrl', function ($scope) {

	$scope.textsStyle = "grid-box col-md-4 col-xs-12 col-sm-6 col-lg-4";

	angular.element(document).ready(function () {
		if ($.cloudinary) {
			$.cloudinary.responsive();
		}
	});
})

zaborskiy
	.directive(

		'rImage',
		function () {
			return {
				scope: {
					img: '@',
					title: '@'
				},
				restrict: 'AE',

				template: '<div class="img-div"><img class="cld-responsive" style="width: 100%" data-src="http://res.cloudinary.com/zaborskiy/image/upload/w_auto,dpr_auto/w_60,g_south_east,x_5,y_5,l_watermark/v1441311652/{{img}}"/><div ng-show="{{title}}" class="img-title">{{title}}</div></div>'
			}
		});

zaborskiy.directive(

	'gridBox', function () {
		return {
			transclude: true,
			scope: {
				link: '@',
				title: '@'
			},
			restrict: 'AC',
			template: '<h3>{{title}}</h3><small><ng-transclude></ng-transclude></small>'
		}
	});

zaborskiy.directive(

	'gridPanel', function () {
		return {
			transclude: true,
			scope: {
				bg: '@',
				bgClass: '@',
				title: '@',
				description: '@'
			},
			restrict: 'C',
			template:
				// '<a target="{{il.target}}" href="{{il.link}}">'+
				'<div class="gallery-item gallery-item-tall" style="background-image: url(\'{{bg}}\')">'
				+ '<div class="description-wrap bg2t">' + '<h3>{{title}}</h3>'
				+ '<small ng-show="description">{{description}}</small>' + '<small><ng-transclude></ng-transclude> '
				+ '</small></div>' + '</div>',
			link: function (scope, element, attributes) {
				element.addClass('col-md-4 col-lg-3 col-sm-6 col-xs-12');
			}
		}
	});

zaborskiy.directive(
	'widget', function () {
		return {
			transclude: true,
			scope: {
				bg: '@',
				bgClass: '@',
				title: '@',
				description: '@',
				size: '@'
			},
			restrict: 'C',
			template:
				'<div class="gallery-item" style="background-image: url(\'{{bg}}\')">'
				+ '<div class="description-wrap">' + '<h3>{{title}}</h3>'
				+ '<small>{{description}}<ng-transclude></ng-transclude></small></div>' + '</div>',

			link: function (scope, element, attributes) {
				if (2 == attributes.size) {
					element.addClass('col-xl-6 col-md-8 col-lg-8 col-sm-6 col-xs-12');
					//element.addClass('col-xs col-lg-6');
				} else {
					element.addClass('col-xl-3 col-md-4 col-lg-4 col-sm-6 col-xs-12');
					//element.addClass('col-xs col-lg-3');
				}
			}
		}
	});




zaborskiy.controller('navController', function ($scope) {
	$scope.topMenuStyle = "col-md-2 col-xs-4 col-sm-4 col-lg-2";
});

zaborskiy.controller('galleryCtrl', function ($scope) {
	$scope.illustrationsUrl = "http://res.cloudinary.com/zaborskiy/image/upload/t_dimmed_thumb400/dpr_auto/";
});

zaborskiy.controller('appsCtrl', function ($scope) {
	$scope.apps = [
		{
			name: 'Color Collection',
			url: 'https://play.google.com/store/apps/details?id=org.az.clr.x',
			bgUrl: 'http://res.cloudinary.com/zaborskiy/image/upload/t_app_thumb/color.jpg',
			iconUrl: 'http://res.cloudinary.com/zaborskiy/image/upload/t_icon64/color_collection_icon.png',
			text: "Simple and powerful Colour Palette Designer. Useful to compose custom vivid colour schemes for web and UI",
			type: "http://schema.org/BusinessApplication"
		},

		{
			name: 'Minesweeper, Redesigned',
			url: 'https://play.google.com/store/apps/details?id=org.az.minesweeper',
			bgUrl: 'http://res.cloudinary.com/zaborskiy/image/upload/t_app_thumb/msw.jpg',
			iconUrl: 'http://res.cloudinary.com/zaborskiy/image/upload/t_icon64/msw_icon.png',
			text: "The multiplayer redesign of the classic Minesweeper game.",
			type: "http://schema.org/GameApplication"
		}

	];

});


$(function () {
	$('a[href*=#]:not([href=#])').click(function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 1000);
				return false;
			}
		}
	});
});


console.error("soneee")