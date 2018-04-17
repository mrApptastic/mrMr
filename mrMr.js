var mrMr = angular.module('mrMr', []);

	mrMr.directive("mrsort", function() {
		return {
			restrict : "E",
			template : "<span ng-mouseover='getCursor($event)' ng-click='sort()'><i ng-class='getIcon()' aria-hidden='true'></i>&nbsp;{{label}}</span>",
			scope : {
				t: "@",
				b: "@",
				i: "@",
				o: "@",
				d: "@"
			},
			link: function(scope) {
				var sort = scope.o ? scope.o.toString() : "sortOrder";
				var dir = scope.d ? scope.d.toString() : "sortDirection";

				scope.label = scope.t;			
				scope.sort = function () {
					if (scope.$parent[sort] == scope.b) {
						scope.$parent[dir] = !scope.$parent[dir];
					}
					scope.$parent[sort] = scope.b;
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
						if (scope.$parent[sort] == scope.b) {
							if (scope.$parent[dir] == true) {
								return "fa fa-sort-desc";
							}
							else {
								return "fa fa-sort-asc";
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

    mrMr.directive("mrSelect", function () {
        return {
            restrict: "E",
            template: '<span style="position: relative;" ng-mouseenter="theKingIsHere = true" ng-mouseleave="theKingIsHere = false">' +
            '<input type="text" class="apSelect" style="width:{{width}}; height:{{height}}px; border:{{borderStyle}}; border-radius: 4px; border-color: rgb(169, 169, 169); background-color: white; cursor: default; border-width: 1px; align-items: center; white-space: pre; padding: 0 0 0 4px; margin: 0 0 0 0; padding-left: {{textPadding}}px;" placeholder="{{text}}" ng-click="setFocus()" ng-change="textChanged()" ng-model="searchText" ng-model-options="{ debounce: 500 }" / >' +
            '<span class="apSelectClick" ng-click="showSelect = !showSelect" style="height:{{height - 1}}px;margin-top: {{tabOffset}}px; position: absolute; right: 1px; top: -2px; background: lightgrey; z-index: 1; padding: 0px 5px 0px 0px; border-radius: 0 4px 4px 0; font-weight: bold; cursor: pointer;padding-right: {{tabWidth}}px;">' +
            '&nbsp<i style="' +
            'font-size: 16px;position:absolute;left: calc(50% - {{load ? \'10\' : \'4.5\'}}px); top: calc(50% - 8px); position: absolute;"' +
            ' class="text-muted fa" ng-class="load ? \'fa-spinner fa-pulse fa-3x fa-fw\' : (showSelect ? \'fa-caret-up\' : \'fa-caret-down\') "' +
            ' aria-hidden="true"></i>' +
            '</span>' +
            '<ul class="apSelectItems" ng-show="showSelect" style="width:{{width}}; position: absolute; z-index: 99; left: 0; margin-left: 0px;overflow-x: hidden; overflow-y: scroll; max-height: 500px;">' +
            '' +
            '<li ng-mouseenter="tipIn($event)" ng-mouseleave="tipOut($event)" ng-repeat="n in data | orderBy : [p] : false" style="width:{{width}}; border: {{borderStyle}}; {{$index == data.length -1 ? \'\' : \'border-bottom: none;\'}}; list-style: none; margin-left: -40px; padding: 0; left: 0; top: 0; background: white; padding-left: 6px; z-index: 150; cursor: pointer;" ng-click="selected(n)">{{n[p]}}</li>' +
            '</ul>' +
            '</span>',
            scope: {
                p: "@",		/* Key: Object key for select box. */
                m: "@",		/* ng-model in parent scope. */
                u: "@",		/* Update function in parent scope. */
                b: "@",     /* Broadcast param to update data from parent. E.g. $scope.$broadcast('{BROADCAST PARAM}', $scope.data); */
                e: "@",     /* Broadcast param to send message that an update error occured in parent. */
                d: "@",     /* Call function in parent scope when ng-model changes (Optional) */
                t: "@",		/* Placeholder text (Optional). */
                w: "@",		/* Width: Width of select box (Optional). */
                h: "@",		/* Height: Height in pixels of select box (Optional). */
                s: "@",     /* Tab Width: Width of tab (Optional). */
                l: "@",     /* Text Left Offset: Left padding for text and placeholder in pixels (Optional). */
                z: "@"      /* Border Style: CSS Input for borders (Optional). */
            },
            link: function (scope) {
                /* Data for this select box. Refreshed on broadcast from parent scope */
                scope.data = [];
                /* Search text for select box. Initialised as empty */
                scope.searchText = "";
                /* Width. Defaults to 150px */
                scope.width = scope.w != null && scope.w.length > 0 ? scope.w : '150px';
                /* Height. Defaults to 22px */
                scope.height = scope.h != null && scope.h.length > 0 ? scope.h : '22';
                /* Placeholder text. Defaults to empty string */
                scope.text = scope.t != null && scope.t.length > 0 ? scope.t : "";
                /* Boolean to handle spinner when loading */
                scope.load = false;
                /* Calculate Offset for tab depending on height */
                scope.tabOffset = -(0.5 * parseInt(scope.height)) + 11;
                /* Width of tab */
                scope.tabWidth = scope.s != null && scope.s.length > 0 ? scope.s : '20';
                /* Text Padding Left */
                scope.textPadding = scope.l != null && scope.l.length > 0 ? scope.l : '12';
                /* Border Style */
                scope.borderStyle = scope.z != null && scope.z.length > 0 ? scope.z : '1px solid #ccc';
                /* Unset selected object and open select and launch request in parent scope for new data when search text is changed */
                scope.textChanged = function () {
                    scope.load = true;
                    scope.$parent[scope.m] = null;
                    scope.showSelect = true;
                    scope.$parent[scope.u](scope.searchText.toLowerCase());
                };
                /* Select unset focus depending on whether select box is open or not */
                scope.setFocus = function () {
                    if (scope.showSelect) {
                        angular.element(document.activeElement).blur();
                        scope.load = false;
                    }
                    scope.showSelect = !scope.showSelect;
                };
                /* When selected object is chosen the text is updated and the box is collaped */
                scope.selected = function (model) {
                    scope.searchText = model[scope.p];
                    scope.$parent[scope.m] = model;
                    if (scope.d) {
                        scope.$parent[scope.d](model);
                    }
                    scope.showSelect = false;
                };
                scope.tipIn = function ($event) {
                    $event.target.style.color = "snow";
                    $event.target.style.background = "dodgerblue";
                };
                scope.tipOut = function ($event) {
                    $event.target.style.color = "initial";
                    $event.target.style.background = "white";
                };
                /* Listen to parent scope for broadcast */
                scope.$on(scope.b.toString(), function (event, data) {
                    /* Refresh data from parent */
                    scope.data = data;
                    scope.load = false;
                    /* If data has only one object, then this must be right one and is set as the selected one and box is collapsed */
                    if (scope.data.length == 1) {
                        scope.searchText = scope.data[0][scope.p];
                        scope.$parent[scope.m] = scope.data[0];
                        if (scope.d) {
                            scope.$parent[scope.d](scope.data[0]);
                        }
                        scope.showSelect = false;
                    }
                });
                if (scope.e) {
                    scope.$on(scope.e.toString(), function (event, data, message) {
                        /* An error has occured in update from parent scope */
                        scope.load = false;
                        console.log("An error occured when attempting to update data from parent scope" + (message ? (": " + message + ".") : "."));
                        if (scope.data) {
                            scope.data = data;
                            scope.$parent[scope.m] = scope.data[0];
                            scope.showSelect = false;
                        }
                    });
                }
				window.onclick = function () {
                if (!scope.theKingIsHere) {
                    scope.showSelect = false;
                }
                scope.$apply();
            };
            }
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

    mrMr.filter('mrHappy', ['$sce', function ($sce) {
        return function (text, cls) {
            var colours = cls ? cls : ["Red", "Blue", "Orange", "Purple", "Green"];
            var returnText = "";
            var colourIndex = 0;
            for (let i = 0; i < text.length; i++) {
                returnText += "<span style='color:" + colours[colourIndex] + ";'>" + text.charAt(i) + "</span>";
                colourIndex++;
                if (colourIndex == colours.length) {
                    colourIndex = 0;
                }
            }
            return $sce.trustAsHtml(returnText);
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
	
	mrMr.filter('mrName', [function () {
        return function (text, last) {
			var ib = text.indexOf(" ") != -1 ? text.split(' ') : [text];
			for (let i = 0; i < ib.length; i++) {
				if (i != 0) {
					if (i != ib.length -1) {
						ib[i] = ib[i].substring(0,1) + ".";
					}
					else {
						if (last != true) {							
							ib[i] = ib[i].substring(0,1) + ".";
						}
					}
				}
			}
			return ib.join(" ");
        };
    }]);