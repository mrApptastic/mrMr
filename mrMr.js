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
		template : "<?xml version='1.0' encoding='UTF-8'?> <svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' width='{{s}}' height='{{s}}'> <g> <line id='line' x1='15' y1='{{s/2}}' x2='65' y2='{{s/2}}' stroke='{{c}}' stroke-width='30' style='stroke-linecap:round'/> <use xlink:href='#line' transform='rotate(30,160,160)' style='opacity:.0833'/> <use xlink:href='#line' transform='rotate(60,160,160)' style='opacity:.166'/> <use xlink:href='#line' transform='rotate(90,160,160)' style='opacity:.25'/> <use xlink:href='#line' transform='rotate(120,160,160)' style='opacity:.3333'/> <use xlink:href='#line' transform='rotate(150,160,160)' style='opacity:.4166'/> <use xlink:href='#line' transform='rotate(180,160,160)' style='opacity:.5'/> <use xlink:href='#line' transform='rotate(210,160,160)' style='opacity:.5833'/> <use xlink:href='#line' transform='rotate(240,160,160)' style='opacity:.6666'/> <use xlink:href='#line' transform='rotate(270,160,160)' style='opacity:.75'/> <use xlink:href='#line' transform='rotate(300,160,160)' style='opacity:.8333'/> <use xlink:href='#line' transform='rotate(330,160,160)' style='opacity:.9166'/> <animateTransform attributeName='transform' attributeType='XML' type='rotate' begin='0s' dur='1s' repeatCount='indefinite' calcMode='discrete' keyTimes='0;.0833;.166;.25;.3333;.4166;.5;.5833;.6666;.75;.8333;.9166;1' values='0,160,160;30,160,160;60,160,160;90,160,160;120,160,160;150,160,160;180,160,160;210,160,160;240,160,160;270,160,160;300,160,160;330,160,160;360,160,160'/> </g> </svg>",
			scope : {
				c: "@",
				s: "@"
			},			
        }
    });		