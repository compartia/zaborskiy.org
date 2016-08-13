var zaborskiy = angular.module('zaborskiy', []);

zaborskiy.controller('mainCtrl', function($scope) {

	$scope.textsStyle="grid-box col-md-4 col-xs-12 col-sm-6 col-lg-4";

	angular.element(document).ready(function() {
        if($.cloudinary){
            $.cloudinary.responsive();    
        }		
	});
})

zaborskiy
		.directive(

				'rImage',
				function() {
					return {
						scope : {
							img : '@',
							title : '@'
						},
						restrict : 'AE',

						template : '<div class="img-div"><img class="cld-responsive" style="width: 100%" data-src="http://res.cloudinary.com/zaborskiy/image/upload/w_auto,dpr_auto/w_60,g_south_east,x_5,y_5,l_watermark/v1441311652/{{img}}"/><div ng-show="{{title}}" class="img-title">{{title}}</div></div>'
					}
				});

zaborskiy.directive(

'gridBox', function() {
	return {
		transclude : true,
		scope : {
			link : '@',
			title : '@'
		},
		restrict : 'AC',
		template : '<h3>{{title}}</h3><small><ng-transclude></ng-transclude></small>'
	}
});

zaborskiy.directive(

'gridPanel', function() {
	return {
		transclude : true,
		scope : {
			bg : '@',
			bgClass : '@',
			title : '@',
			description : '@'
		},
		restrict : 'C',
		template :
		// '<a target="{{il.target}}" href="{{il.link}}">'+
		'<div class="gallery-item gallery-item-tall" style="background-image: url(\'{{bg}}\')">'
				+ '<div class="desciption-wrap bg2t">' + '<h3>{{title}}</h3>'
				+ '<small ng-show="description">{{description}}</small>' + '<small><ng-transclude></ng-transclude> '
				+ '</small></div>' + '</div>'
	// '</a>'
	}
});
