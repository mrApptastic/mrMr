var mrMr = angular.module('mrMr', []);

	mrMr.directive("mrsort", function() {
		return {
			restrict : "E",
			template : "<span ng-mouseover='getCursor($event)' ng-click='sort()'><i ng-class='getIcon()' aria-hidden='true'></i>&nbsp;{{label}}</span>",
			scope : {
				t: "@",
				b: "@",
				i: "@"
			},
			link: function(scope) {
				scope.label = scope.t;			
				scope.sort = function () {
					if (scope.$parent.sortOrder == scope.b) {
					scope.$parent.sortDirection = !scope.$parent.sortDirection;
					}
					scope.$parent.sortOrder = scope.b;
				};
				scope.getCursor = function ($event) {
					$event.target.style.cursor = "pointer";
				};
				scope.getIcon = function () {
					var icon = true;
					if (scope.i) {
						icon = false;
					}
					if (icon) {
						if (scope.$parent.sortOrder == scope.b) {
							if (scope.$parent.sortDirection == true) {
								return "fa fa-sort-asc";
							}
							else {
								return "fa fa-sort-desc";
							}					
						}
						else {
							return "fa fa-sort";
						}
					}
					else {
						return "";
					}
				};
			}
        }
    });
	
	mrMr.directive("mrspin", function() {
		return {	
			restrict : "E",
			template : "<i style='font-size:{{s}}px; color: {{c}}' class='fa fa-spinner fa-pulse fa-3x fa-fw'></i>",
			scope : {
				c: "@",
				s: "@"
			},			
        }
    });		
	
    mrMr.filter('mrHtml', ['$sce', function ($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }]);