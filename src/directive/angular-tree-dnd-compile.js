angular.module('ntt.TreeDnD')
    .directive('compile', [
        '$compile',
        function ($compile) {
            return {
                restrict: 'A',
                link:     function (scope, element, attrs) {
                    // Store the deregistration function to prevent memory leaks
                    var unwatchCompile = scope.$watch(
                        attrs.compile, function (new_val) {
                            if (new_val) {
                                if (angular.isFunction(element.empty)) {
                                    element.empty();
                                } else {
                                    element.html('');
                                }

                                element.append($compile(new_val)(scope));
                            }
                        }
                    );

                    // Clean up watch on scope destroy
                    scope.$on('$destroy', function () {
                        if (unwatchCompile) {
                            unwatchCompile();
                            unwatchCompile = null;
                        }
                    });
                }
            };
        }]
    )
    .directive('compileReplace', [
        '$compile',
        function ($compile) {
            return {
                restrict: 'A',
                link:     function (scope, element, attrs) {
                    // Store the deregistration function to prevent memory leaks
                    var unwatchCompileReplace = scope.$watch(
                        attrs.compileReplace, function (new_val) {
                            if (new_val) {
                                element.replaceWith($compile(new_val)(scope));
                            }
                        }
                    );

                    // Clean up watch on scope destroy
                    scope.$on('$destroy', function () {
                        if (unwatchCompileReplace) {
                            unwatchCompileReplace();
                            unwatchCompileReplace = null;
                        }
                    });
                }
            };
        }]
    );
