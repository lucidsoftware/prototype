angular.module('shapeManager', ['lucidComponents', 'ngDraggable', 'ngSortable', 'dndLists'])
    .controller('shapesManagerCtrl', function($scope, $rootScope, $filter, $window, $timeout, lucidShapesData) {
        $scope.$on('draggable:start', function(event, data) {
            $rootScope.draggingshape = true;
        });
        $scope.$on('draggable:move', function(event, data) {
            //console.log(event);
            var mouseX = window.event.clientX;
            if (mouseX < 250) {
                $rootScope.mouseInLeftPanel = true;
            } else {
                $rootScope.mouseInLeftPanel = false;
            }
            $rootScope.selectedBlock = data.data;
            $rootScope.$apply();
            //console.log(mouseX)
        });
        $scope.$on('draggable:end', function(event, data) {
            $rootScope.draggingshape = false;
            $rootScope.mouseInLeftPanel = false;
            $rootScope.saveDocument();
        });
        $scope.focusSearch = function(searchshapes) {
            console.log(searchshapes);
            if (searchshapes) {
                var elementID = 'search-shapes-input';
                $timeout(function() {
                    document.getElementById(elementID).focus();
                }, 10);
            }
        };
        $scope.lucidGroups = [{
            'groupname': 'Android Mockup',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/android.svg'
        },{
            'groupname': 'AWS Architecture',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/aws.svg'
        },{
            'groupname': 'Azure',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/azure.svg'
        },{
            'groupname': 'BPMN 2.0',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/bpmn.svg'
        },{
            'groupname': 'Circuit Diagram',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/circuit.svg'
        }, {
            'groupname': 'Cisco Network Diagram',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/cisco.svg'
        }, {
            'groupname': 'Data Flow Diagram',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/data-flow.svg'
        }, {
            'groupname': 'Default',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/default.svg'
        }, {
            'groupname': 'Enterprise Integration',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/enterprise-int.svg'
        },  {
            'groupname': 'Entity Relationship',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/erd.svg'
        }, {
            'groupname': 'Equation',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/equations.svg'
        },  {
            'groupname': 'Flowchart',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/flowchart.svg'
        }, {
            'groupname': 'Floor Plan',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/floorplans.svg'
        },  {
            'groupname': 'Geometric',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/geometric.svg'
        }, {
            'groupname': 'iOS Mockup',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/ios.svg'
        },{
            'groupname': 'Mind Map',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/mind-map.svg'
        },{
            'groupname': 'Network Infrastructure',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/network.svg'
        },{
            'groupname': 'Org Chart',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/org-chart.svg'
        }, {
            'groupname': 'Process Engineering',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/process-eng.svg'
        },{
            'groupname': 'Server Rack Diagram',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/server-rack.svg'
        }, {
            'groupname': 'Site Map',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/site-maps.svg'
        }, {
            'groupname': 'Table',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/tables.svg'
        },{
            'groupname': 'Timeline',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/timeline.svg'
        },{
            'groupname': 'Tech Clipart',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/tech-clipart.svg'
        },  {
            'groupname': 'UI Mockup',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/ui.svg'
        }, {
            'groupname': 'UML',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/uml.svg'
        },     {
            'groupname': 'Value Stream',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/value-stream.svg'
        }, {
            'groupname': 'Venn Diagram',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/venn-diagrams.svg'
        },{
            'groupname': 'Video',
            'image': 'https://d2slcw3kip6qmk.cloudfront.net/app/ng2/chart/shapemanager/video.svg'
        },];
        $scope.setGroup = function(newIndex, oldIndex) {
            console.log('old index', oldIndex, 'new index', newIndex);
            $scope.DrawerOpenSameRow = false;
            if (newIndex === $scope.showGroupIndex) { // is the tab already open?
                $scope.showGroupIndex = null; // then empty the var

            } else if ($scope.showGroupIndex == null) { // no tab is open
                $scope.showGroupIndex = newIndex;

            } else { //switching tabs
                //check if the two options are within the same row (only coded row 1 and 2)
                if ((newIndex < 4 && oldIndex < 4) || (newIndex > 3 && oldIndex > 3 && newIndex < 8 && oldIndex < 8)) {
                    console.log('same row');
                    $scope.DrawerOpenSameRow = true;
                    $timeout(function() {
                        $scope.DrawerOpenSameRow = false;
                    }, 100);
                }
                $scope.showGroupIndex = newIndex; // set the tab
            }
        };
        $scope.toggleGroupPin = function(lucidGroup) {
            //console.log(lucidGroup.groupname);
            //if pinned, unpin all
            if ($scope.lucidGroupPinned(lucidGroup)) {
                angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
                    if (lucidGroup.groupname == shapegroup.lucidgroup && shapegroup.pinned) {
                        $scope.unPinGroup(shapegroup);

                    }
                });
            }
            //else pin all
            else {
                angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
                    if (lucidGroup.groupname == shapegroup.lucidgroup && !shapegroup.pinned) {
                        $scope.pinGroup(shapegroup);

                    }
                });
                //show pinned message 
                $timeout(function() {
                    $scope.showPinMessage(lucidGroup);
                }, 1000);
            }

        };


        $scope.lucidGroupPinned = function(lucidGroup) {
            var pinnedCount = 0;
            var groupCount = 0;
            angular.forEach($scope.lucidShapeGroups, function(shapegroup) {

                if (lucidGroup.groupname == shapegroup.lucidgroup) {
                    //count number in this group
                    groupCount += 1;
                    if (shapegroup.pinned) {
                        //counted pinned
                        pinnedCount += 1;
                    }
                }
            });
            //console.log('pinnedCount', pinnedCount, 'length', groupCount)
            if (pinnedCount == groupCount && groupCount != 0) {
                return true;
            } else {
                return false;
            }
        };


        $scope.pinnedShapeGroups = lucidShapesData.pinnedShapeGroups();
        $scope.lucidShapeGroups = lucidShapesData.lucidShapeGroups();
        $scope.customShapeGroups = lucidShapesData.customShapeGroups();
        $scope.pinned = function(id) {
            if (lucidShapesData.pinned(id)) {
                //console.log(lucidShapesData.pinned(id))
                return true;
            } else {
                return false;
            }
        };
        $scope.showPinMessage = function(shapegroup) {
            //add message
            var overflow = document.getElementById('left-panel-shapes').offsetHeight - document.getElementById('left-panel-shapes-scroll').offsetHeight;

            //console.log('overflow: ', overflow);

            if (overflow < 125) {
                $scope.overflowMessage = true;
                $scope.overflowMessageTitle = shapegroup.groupname;
                $timeout(function() {
                    $scope.overflowMessage = false;
                }, 2000);
            }
        };
        $scope.pinGroup = function(shapegroup) {
            $rootScope.saveDocument();
            $scope.pinnedShapeGroups.push(shapegroup);
            $scope.showPinMessage(shapegroup);
            shapegroup.pinned = true;
            //console.log('pin');
        };
        angular.forEach($scope.customShapeGroups, function(shapegroup) {
            if (shapegroup.pinned) {
                $scope.pinGroup(shapegroup);
            }
        });
        angular.forEach($scope.lucidShapeGroups, function(shapegroup) {
            console.log("test" + $rootScope.diagram);
            if (shapegroup.lucidgroup == $rootScope.diagram) {
                $scope.pinGroup(shapegroup);
            }
        });
        $scope.unPinGroup = function(shapegroup) {
            $rootScope.saveDocument();
            //filter the array
            var findShapegroup = $scope.getObject(shapegroup.id, $scope.pinnedShapeGroups);
            //get the index
            var index = $scope.pinnedShapeGroups.indexOf(findShapegroup);
            //console.log('index', index);
            $scope.pinnedShapeGroups.splice(index, 1);
            shapegroup.pinned = false;
            //console.log('unpin');

            var unpingroup = $scope.getObject(shapegroup.id, $scope.lucidShapeGroups);
            if (!unpingroup) {
                unpingroup = $scope.getObject(shapegroup.id, $scope.customShapeGroups);
            }
            unpingroup.pinned = false;
        };


        $scope.getObject = function(objectID, array) {
            return $filter('filter')(array, {
                id: objectID
            }, true)[0];
        };
        $scope.togglePin = function(shapegroup) {
            if (shapegroup.pinned) {
                $scope.unPinGroup(shapegroup);
            } else {
                $scope.pinGroup(shapegroup);
            }
        };


        //start drag and reoder shape groups
        $scope.pinnedGroupsSort = {
            group: {
                name: 'pinned',
                put: ['custom', 'lucid'],
                pull: false
            },
            model: 'shapegroup',
            handle: '.shape-group-top',
            animation: 150,
            onAdd: function(evt) {
                var shapegroup = $scope.getObject(evt.model.id, $scope.lucidShapeGroups);
                if (!shapegroup) {
                    shapegroup = $scope.getObject(evt.model.id, $scope.customShapeGroups);
                }
                shapegroup.pinned = true;
                //console.log('add', evt.model);
                $rootScope.draggingShapeGroup = false;
                $rootScope.saveDocument();
            },
            onStart: function(evt) {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function(evt) {
                $rootScope.draggingShapeGroup = false;
                $rootScope.saveDocument();
            },
        };

        $scope.customGroupsSort = {
            group: {
                name: 'custom',
                pull: 'clone'
            },
            ghostClass: 'ng-sort-ghost',
            model: 'shapegroup',
            filter: '.shapegroup-pinned',
            handle: '.shape-group-top',
            animation: 150,
            onStart: function(evt) {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function(evt) {
                $rootScope.draggingShapeGroup = false;
            },
        };

        $scope.lucidGroupsSort = {
            sort: false,
            group: {
                name: 'lucid',
                pull: 'clone'
            },
            ghostClass: 'ng-sort-ghost',
            model: 'shapegroup',
            filter: '.shapegroup-pinned',
            handle: '.shape-group-top',
            animation: 150,
            onStart: function(evt) {
                $rootScope.draggingShapeGroup = true;
            },
            onEnd: function(evt) {
                $rootScope.draggingShapeGroup = false;
            },
        };
        //end drag and reorder shape groups


        $rootScope.manageshapes = false;
        $scope.lucidShapesLimit = 14;
        $rootScope.toggleShapesManager = function() {

            if (!$scope.searchshapes && !$scope.importToCanvas) {
                if (!$rootScope.manageshapes) {
                    //manage shapes
                    $rootScope.manageshapes = true;
                    $timeout(function() {
                        $scope.lucidShapesLimit = 50;
                    }, 1000); //wait until first slide open is done, then load groups
                    $timeout(function() {
                        $scope.loadingshapes = true;
                    }, 600);

                } else {
                    $rootScope.manageshapes = false;
                    $timeout(function() {
                        $scope.lucidShapesLimit = 10;
                        $scope.loadingshapes = false;
                    }, 1000); //wait until manager slide is closed.
                }

            } else {

                $scope.searchshapes = false;
                $scope.importToCanvas = false;
            }
        };

        $scope.copy = function(type) {
            if (type === 'custom') {
                return 'copyMove';
            } else {
                return 'copy';
            }
        };

        $scope.dropFromCanvas = function(data, event, shapegroup) {

            if (data && shapegroup.custom) {
                var index = shapegroup.shapes.indexOf(data);
                //console.log('shape', index);

                if (index === -1) {
                    //var index = $scope.shapegroups.shapegroup.indexOf(data);
                    //console.log(index);
                    var newblock = JSON.parse(JSON.stringify(data));

                    newblock.shapepanel = true;
                    newblock.customcolor = true;
                    newblock.comment = null;
                    if (!newblock.url) {
                        //this is here so that we can save any shape from the library for reuse.
                        newblock.svg = '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g transform="translate(1, 2)" stroke="' + data.swatch.border + '" fill="' + data.swatch.fill + '"><rect stroke-width="2" x="0" y="0" width="28" height="26" rx="2"></rect><text font-family="Baskerville" font-size="18" font-weight="526" fill="' + data.swatch.text + '"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>';
                    }
                    shapegroup.shapes.push(newblock);
                }
                //console.log('dropped in saved shapes', data, event, shapegroup);
            }

        };

        /////// START DRAGGING SHAPES STUFF

        $scope.dragoverCallback = function(event, index, external, type) {
            //$scope.logListEvent('dragged over', event, index, external, type);
            // Disallow dropping in the third row. Could also be done with dnd-disable-if.
            return index < 10;
        };

        $scope.dropCallback = function(event, index, item, external, type, allowedType, shapegroup) {
            //$scope.logListEvent('dropped at', event, index, external, type);
            if (external) {
                if (allowedType === 'itemType' && !item.label) {
                    return false;
                }
                if (allowedType === 'containerType' && !angular.isArray(item)) {
                    return false;
                }
            }
            return item;
        };

        // $scope.logEvent = function(message, event) {
        //     console.log(message, '(triggered by the following', event.type, 'event)');
        //     console.log(event);
        // };

        // $scope.logListEvent = function(action, event, index, external, type) {
        //     var message = external ? 'External ' : '';
        //     message += type + ' element is ' + action + ' position ' + index;
        //     $scope.logEvent(message, event);
        // };

        /////// END DRAGGIN SHAPES STUFF

        $scope.newCustomGroup = function() {
            var newGroup = {
                "id": new Date().getTime(),
                "groupname": "New Group",
                "custom": 'custom',
                "edit": true,
                "shapes": [],
            };
            $scope.customShapeGroups.splice(0, 0, newGroup);
            $rootScope.saveDocument();
        };
        $scope.editName = function(shapegroup, index) {
            $timeout(function() {
                //console.log('edit?', shapegroup.edit);
                shapegroup.edit = true;
                //console.log('edit?', shapegroup.edit);
            }, 100);
            $rootScope.saveDocument();


        };
        $scope.duplicateShapeGroup = function(shapegroup) {

            var newGroup = JSON.parse(JSON.stringify(shapegroup));
            newGroup.id = new Date().getTime();
            newGroup.groupname = shapegroup.groupname + ' Copy';
            //console.log(newGroup)
            $scope.customShapeGroups.splice(0, 0, newGroup);
            $scope.editName(newGroup, 0);
            $rootScope.saveDocument();
        };

        $scope.openWindow = function(url) {
            window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
        };
        //start search shape function
        $scope.searchgroups = {};
        $scope.searchgroups.searched = false;
        $scope.searchShapeGroups = function(searchInput) {

            $scope.searchShapeGroupsResults = $filter('filter')($scope.lucidShapeGroups, searchInput);
            $scope.filterShapes = searchInput;
            $scope.searchgroups.searched = true;
        };


    });