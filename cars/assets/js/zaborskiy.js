var zaborskiy = angular.module('zaborskiy', []);

zaborskiy.controller('mainCtrl', function($scope) {
	angular.element(document).ready(function() {
		$.cloudinary.responsive();
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

						template : '<div class="img-div"><img class="cld-responsive" style="width: 100%" data-src="http://res.cloudinary.com/zaborskiy/image/upload/w_auto,dpr_auto/w_80,g_south_east,x_5,y_5,l_watermark/v1441311652/{{img}}"/><div ng-show="{{title}}" class="img-title">{{title}}</div></div>'
					}
				});