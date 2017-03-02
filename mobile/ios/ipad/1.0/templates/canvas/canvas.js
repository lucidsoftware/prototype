angular.module('lucidCanvas', [])
    .controller('canvasCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

        $scope.blocks = $rootScope.currentPage.blocks;
        $rootScope.selectedType = false;
        $scope.deselectBlock = function() {
            var deselect = JSON.parse(JSON.stringify($rootScope.selectedBlock));
            $rootScope.selectedBlock = deselect;
            //console.log('deselectBlock');
        };

        $scope.dropToCanvas = function(item, event) {
            //$rootScope.saveDocument();
            var index = $rootScope.currentPage.blocks.indexOf(item);

            if (index === -1 && item) {
                item = angular.copy(item);
                //if dragging shape with no metrics such as a star, etc.
                if (!item.metrics) {
                    item = {
                        "customcolor": false,
                        "swatch": {
                            "fill": "#ffffff",
                            "text": "#333333",
                            "border": "#666666"
                        },
                        "swatchnumber": 1,
                        "borderwidth": 3,
                        "borderstyle": "solid",
                        "text": {
                            "verticalalignment": "middle",
                            "horizontalalignment": "center",
                            "text": item.name,
                            "size": "12px"
                        },
                        "padding": 10,
                        "metrics": {
                            "z": 2,
                            "width": 120,
                            "height": 45
                        },
                        "shapepanel": false
                    };
                }
                //set the position based on where it dropped and the width of the block.
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;

                //console.log(event.pageX, event.pageY);
                item.metrics.x = event.x - canvasX - (item.metrics.width / 2);
                item.metrics.y = event.y - canvasY - (item.metrics.height / 2);
                item.svg = null;

                //console.log('shape', item, event.pageX, event.pageY, 'total: ', event);

                $rootScope.currentPage.blocks.push(item);
                $rootScope.selectedBlock = item;

            }

        };
        $scope.onDragSuccess = function(data, event, block) {
            //console.log(event);
            if (event.y < 470) {
                var canvasX = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().left;
                var canvasY = angular.element(document.querySelector('#lucid-canvas'))[0].getBoundingClientRect().top;
                //console.log('drag success', data, event);
                if (data) {
                    if (angular.element(event.event.srcElement).hasClass('lucid-block-comment')) {
                        //console.log('comment');
                        return;
                    }
                    data.metrics.x = event.x - canvasX - event.element.centerX;
                    data.metrics.y = event.y - canvasY - event.element.centerY;
                    data.shapepanel = false;
                }
            }
            $rootScope.selectedBlock = block;
        };
    }])
    .controller('shapeCtrl', ['$scope', function($scope) {
        $scope.onDrag = function(event) {
            //console.log('Reporting : drag');
            console.log('drag', event.gesture.center.pageX, event.gesture.center.pageY);

            $scope.draggedStyle = {
                'left': event.gesture.center.pageX + 'px',
                'top': event.gesture.center.pageY + 'px'
            };


        };
        $scope.onRelease = function(event, block) {
            //console.log(event.target);
            console.log('drop', event.gesture.center.pageX, event.gesture.center.pageY);

            $scope.doshadow = 0;
            //$scope.draggedStyle = {};
            block.metrics.x = event.gesture.center.pageX;
            block.metrics.y = event.gesture.center.pageY;
        };
    }]);