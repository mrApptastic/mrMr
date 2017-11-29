angular.module('mrMr', [])	
	.directive("mrsort", function() {
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