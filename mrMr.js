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
	
	mrMr.filter('mrStrip', [function () {
        return function (text) {
			var strippedText = text.replace(/<(?:.|\n)*?>/gm, '');
            return strippedText;
        };
    }]);
	
	mrMr.filter('mrBin', [function () {
        return function (text) {
			var binary = ""
			for (let i = 0; i < text.length; i++) {
				let ib = "";
				ib = text[i].charCodeAt(0).toString(2);
				while (ib.length < 8) {
					ib = "0" + ib;
				}
				binary += ib;
			}
            return binary;
        };
    }]);
	
	mrMr.filter('mrOct', [function () {
        return function (text) {
			var binary = ""
			for (let i = 0; i < text.length; i++) {
				binary += text[i].charCodeAt(0).toString(8);
			}
            return binary;
        };
    }]);
	
	mrMr.filter('mrHex', [function () {
        return function (text) {
			var binary = ""
			for (let i = 0; i < text.length; i++) {
				binary += text[i].charCodeAt(0).toString(16);
			}
            return binary;
        };
    }]);
	
	mrMr.filter('mrKr', [function () {
        return function (text) {
			var kr = !isNaN(text) ? parseFloat(text) : 0;
            return kr.toFixed(2).toString().replace(".",",") + " kr.";
        };
    }]);
	
	mrMr.filter('mrParse', [function () {
        return function (text, start, end) {
			return text.slice((text.indexOf(start) + start.length), text.indexOf(end));
        };
    }]);
	
	mrMr.filter('mrTruncate', [function () {
        return function (text, maxLength) {
			return (text.length > maxLength) ? text.substring(0, maxLength) : text;
        };
    }]);
	
	mrMr.filter('mrUpper', [function () {
        return function (text) {
			return (text.length > 1) ? (text.charAt(0).toString().toUpperCase() + text.substring(1)) : text;
        };
    }]);