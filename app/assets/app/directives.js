'use strict';

angular.module('myApp.directives', []).
        directive('AppVersion', ['version', function (version) {
                return function (scope, elm, attrs) {
                    elm.text(version);
                };

            }]);