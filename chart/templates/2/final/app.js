/*global angular, console*/

//include Components js
// @codekit-prepend "components/shape-manager/shape-manager.js"
// @codekit-prepend "components/pages/pages.js"
// @codekit-prepend "components/pages/pages-data.js"
// @codekit-prepend "components/right-dock/right-dock.js"
// @codekit-prepend "components/optionbar/optionbar.js"
// @codekit-prepend "components/loading-tips/loading-tips.js"
// @codekit-prepend "components/canvas/canvas.js"
// @codekit-prepend "components/shape-manager/shapes-data.js"

angular.module('particleApp', 
    [
        // loaded from particle.golucid.co
        'lucidComponents',
        'ngDraggable', 
        'ngSortable', 
        'dndLists',

        // Codekit prepend
        'canvas',
        'loadingTips',
        'optionbar',
        'pages',
        'pagesData', 
        'rightDock',
        'shapeManager',
        'lucidShapesData'
    ])
    .config(['$sceDelegateProvider', function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://particle.golucid.co/**',
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**'
        ]);
    }])
    ////////////////
    ////START MAIN CTRL
    ////////////////
    .controller('mainCtrl', function($scope, $timeout, $rootScope) {
        $scope.savetext = 'Saved';
        $timeout(function() {
            //pause for a moment to load editor 
            $scope.showBody = true;
            console.log('show-body');
        }, 100);
        $rootScope.saveDocument = function() {
            $scope.savetext = 'Saving...';
            $timeout(function() {
                $scope.savetext = 'Saved';
            }, 1000);

        };
        $rootScope.selectedBlock = {
            text: {
                size: 12
            }
        };
        $scope.canvasmode = 0;
        $scope.canvasMode = function() {
            if ($scope.canvasmode === 0) {
                $scope.hideLeftPanel = true;
                $scope.hideRightPanel = true;
                $scope.hideFooter = true;

                $scope.canvasmode = 1;
                console.log('Mode 1');
                return;
            }
            if ($scope.canvasmode === 1) {
                $scope.hideToolbar = true;
                $scope.hideHeader = true;
                $scope.canvasmode = 2;
                console.log('Mode 2');
                return;
            }
            if ($scope.canvasmode === 2) {
                $scope.hideLeftPanel = false;
                $scope.hideRightPanel = false;
                $scope.hideFooter = false;
                $scope.hideToolbar = false;
                $scope.hideHeader = false;
                $scope.canvasmode = 0;
                console.log('Standard Canvas');
                return;
            }

        };
        //Start function for showing and hiding panels
        var timer; // js-lint fix
        $scope.enterOptionBar = function() {
            if (!$scope.hideHeader) {
                $scope.hideHeader = true;
                $scope.hideToolbar = true;
            } else {
                timer = $timeout(function() {
                    $scope.hideHeader = false;
                    $scope.hideToolbar = false;
                    console.log('enter optionbar');
                }, 400);
            }
        };
        $scope.enterRightPanel = function() {
            if (!$scope.hideRightPanel) {
                //hide instantly
                $scope.hideRightPanel = true;
                //else wait to show
            } else {
                timer = $timeout(function() {
                    $scope.hideRightPanel = false;
                    console.log('enter right panel');
                }, 400);
            }
        };
        $scope.enterLeftPanel = function() {
            if (!$scope.hideLeftPanel) {
                //hide instantly
                $scope.hideLeftPanel = true;
                //else wait to show
            } else {
                timer = $timeout(function() {
                    $scope.hideLeftPanel = false;
                    console.log('enter left panel');
                }, 400);
            }
        };
        $scope.cancelHover = function() {
            $timeout.cancel(timer);
        };

        ////TEMPLATE MANAGER STUFF///

        $rootScope.selectTab = function() {
                    $rootScope.tabs[0].selected = true;
                };


         $scope.toggleClass = function(string, template) {
                $scope.showButton = true;
                $scope.example1 = false;
                $scope.example2 = false;
                $scope.example3 = false;
                $scope.example4 = false;
                $scope.example5 = false;

            if(string == 'example1'){
                $scope.example1 = true;
                $scope.currentExample = template.example1;

            }else if(string == 'example2'){
                $scope.example2 = true;
                $scope.currentExample = template.example2;
                
            }else if(string == 'example3'){
                $scope.example3 = true;
                $scope.currentExample = template.example3;
            }else if(string == 'example4'){
                $scope.example4 = true;
                $scope.currentExample = template.example4;
            }else if(string == 'example5'){
                $scope.example5 = true;
                $scope.currentExample = template.example4;
            }
        };
             $scope.templates = [
                    {name:'Android Mockup', category: 'recent', preview:'images/shapeLibrary/android-44px.png', recommended: 'design', example1: 'images/examples/android1.png', example2: 'images/examples/android2.png', example3:'images/examples/android3.png', example4:'images/examples/android4.png', details:'With custom-built Android shapes and elements, you can create mockups and wireframes with less pixelation. We offer the 4 most common Android devices and 60+ GUI elements.'},
                    {name:'AWS Architecture', preview:'images/shapeLibrary/aws-44px.png', recommended: 'it', example1:'images/examples/aws1.png', example2:'images/examples/aws2.png', example3:'images/examples/aws3.png', example4:'images/examples/aws4.png', details: 'Accurately diagram AWS architecture with the official AWS Simple Icons. You can chart with network shapes, database symbols, and a variety of other Amazon Web Services elements.'},
                    {name:'Azure', preview:'images/shapeLibrary/azure-44px.png', recommended: 'it', example1:'images/examples/azure1.png', example2:'images/examples/azure2.png', example3:'images/examples/azure3.png', example4:'images/examples/azure1.png', details:'Diagram your network infrastructure using official Microsoft Azure icons. You can accurately depict your architecture setup with the wide range of shapes, including those for cloud, enterprise, VMs, and more.'},
                    {name:'BPMN 2.0', preview:'images/shapeLibrary/bpmn-44px.png', recommended: 'business', example1:'images/examples/bpmn1.png', example2:'images/examples/bpmn2.png', example3:'images/examples/bpmn3.png',example4:'images/examples/bpmn4.png', details: 'BPMN 2.0 is the most up-to-date version of business process modeling notation. Model common business activities like tasks, transactions, and end events.'},
                    {name:'Circuit Diagram', preview:'images/shapeLibrary/circuit-44px.png', recommended: 'it', example1:'images/examples/circuit1.png', example2:'images/examples/circuit2.png', example3:'images/examples/circuit3.png',example4:'images/examples/circuit4.png', details:'Create circuit diagrams to help you model processes for electrical engineering tasks. Our library is outfitted with custom options that increase ease of use and diagramming speed.'},
                    {name:'Cisco Network Diagram', preview:'images/shapeLibrary/cisco-44px.png', recommended: 'it', example1:'images/examples/cisco1.png', example2:'images/examples/cisco2.png', example3:'images/examples/cisco3.png',example4:'images/examples/cisco4.png', details:'Cisco network icons are globally recognized symbols for diagramming network architecture. Use our standard shape set to model nodes and connections in a computer network.'},
                    {name:'Data Flow Diagram', preview:'images/shapeLibrary/data-flow-44px.png', recommended: 'business', example1:'images/examples/data1.png', example2:'images/examples/data2.png', example3:'images/examples/data3.png',example4:'images/examples/data4.png', details:'Data flow diagrams will help you document the logical flow of information through a step-by-step process. Model the path of data from home to destination.'},
                    {name:'Enterprise Integration', preview:'images/shapeLibrary/enterprise-int-44px.png', recommended: 'business',example1:'images/examples/enterprise1.png', example2:'images/examples/enterprise2.png', example3:'images/examples/enterprise3.png',example4:'images/examples/enterprise4.png', details:'Use these standard shapes to add more detail to your diagram. Text blocks with either a transparent background, solid background, or as note. Plus a hotspot shape for creating interactive diagrams.' },
                    {name:'Entity Relationship',category: 'popular', preview:'images/shapeLibrary/erd-44px.png', recommended: 'it', example1:'images/examples/entity1.png', example2:'images/examples/entity2.png', example3:'images/examples/entity3.png',example4:'images/examples/entity4.png', details:'Model databases in an easy-to-read format with entity relationship diagrams. You can get started with our shapes, which include contstraints, entities, relationships, and attributes.'},
                    {name:'Equation', preview:'images/shapeLibrary/equations-44px.png', recommended: 'it', example1:'images/examples/equations1.png', example2:'images/examples/equations2.png', example3:'images/examples/equations3.png',example4:'images/examples/equations4.png', details:'Create a mathematical expression using LaTeX markup language and insert it directly into your diagram. You can easily edit the expression by double-clicking it.'},
                    {name:'Flowchart', category: 'popular', preview:'images/shapeLibrary/flowchart-44px.png', recommended: 'education', example1:'images/examples/flowchart1.png', example2:'images/examples/flowchart2.png', example3:'images/examples/flowchart3.png',example4:'images/examples/flowchart4.png', details:'Build and optimize any process, whether simple or complex, with a variety of flowchart shapes and containers. Try demoing a path for surveys, software flow, and business activities.'},
                    {name:'Floor Plan', preview:'images/shapeLibrary/floorplans-44px.png', recommended: 'design', example1:'images/examples/floorplan1.png', example2:'images/examples/floorplan2.png', example3:'images/examples/floorplan3.png',example4:'images/examples/floorplan4.png', details:'Lay out floor plans for homes, offices, and buildings. Create and manage your space with standard shapes and specialized ones like office chairs and bathroom vanities.'},
                    {name:'Geometric', preview:'images/shapeLibrary/geometric-44px.png', recommended: 'design', example1:'images/examples/mind.png', example2:'images/examples/flowchart1.png', example3:'images/examples/flowchart3.png',example4:'images/examples/flowchart2.png', details:'Lay out floor plans for homes, offices, and buildings. Create and manage your space with standard shapes and specialized ones like office chairs and bathroom vanities.'},
                    {name:'iOS Mockup', preview: 'images/shapeLibrary/ios-44px.png', recommended: 'design', example1:'images/examples/ios.png', example2:'images/examples/ios.png', example3:'images/examples/ios.png',example4:'images/examples/ios.png', details:'Create iPad and iPhone mockups with iOS shapes based on Apples UIKit and Human Interface Guidelines.'},
                    {name:'Mind Map', preview:'images/shapeLibrary/mind-map-44px.png', recommended: 'education', example1:'images/examples/mind.png', example2:'images/examples/mind2.png', example3:'images/examples/mind3.png',example4:'images/examples/mind2.png', details:'Mind mapping is perfect for jotting down your thoughts. Navigate quickly with keyboard shortcuts to add new ideas and build on old ones.'},
                    {name:'Network Infrastructure', category: 'popular', preview:'images/shapeLibrary/network-44px.png', recommended: 'it', example1:'images/examples/network.png', example2:'images/examples/network.png', example3:'images/examples/network.png',example4:'images/examples/network.png', details:'Create fast, accurate network diagrams with this library. Unlike our Cisco and AWS shapes, these are vendor-neutral and allow for great flexibility.'},
                    {name:'Org Chart', preview:'images/shapeLibrary/org-chart-44px.png', recommended: 'business', example1:'images/examples/org.png', example2:'images/examples/org.png', example3:'images/examples/org.png',example4:'images/examples/org.png', details:'Create org charts in minutes with .csv import and premade layouts. You can personalize your chart by uploading pictures and customizing role, name, and contact information.'},
                    {name:'Process Engineering', preview:'images/shapeLibrary/process-eng-44px.png', recommended: 'it', example1:'images/examples/process.png', example2:'images/examples/process.png', example3:'images/examples/process.png',example4:'images/examples/process.png', details:'Create efficient process flow diagrams for any factory or plant, with shapes like pumps, valves, heat exchangers, vessels, and more.'},
                    {name:'Server Rack Diagram', preview:'images/shapeLibrary/server-rack-44px.png', recommended: 'it', example1:'images/examples/server.png', example2:'images/examples/server.png', example3:'images/examples/server.png',example4:'images/examples/server.png', details:'Create rack diagrams to efficiently lay out servers, server racks, and power supply. Our shapes aren"t vendor-specific, so you can use them in various scenarios.'},
                    {name:'Site Map', preview:'images/shapeLibrary/site-maps-44px.png', recommended: 'it', example1:'images/examples/site.png', example2:'images/examples/site.png', example3:'images/examples/site.png',example4:'images/examples/site.png', details:'Visualize your new or existing website with custom site map shapes. Add urls to each page and press "Enter" or "Tab" to quickly create more pages.'},
                    {name:'Table', preview: 'images/shapeLibrary/tables-44px.png', recommended: 'education', example1:'images/examples/table.png', example2:'images/examples/table.png', example3:'images/examples/table.png',example4:'images/examples/table.png', details:'Organize your data with tables. Use advanced features to copy and paste data from Excel and Google Spreadsheets.'},
                    {name:'Timeline', preview:'images/shapeLibrary/timeline-44px.png', recommended: 'education', example1:'images/examples/timeline.png', example2:'images/examples/timeline.png', example3:'images/examples/timeline.png',example4:'images/examples/timeline.png', details:'Organize your data with timelines. Use advanced features to copy and paste data from Excel and Google Spreadsheets.'},
                    {name:'Tech Clipart', preview:'images/shapeLibrary/tech-clipart-44px.png', recommended: 'it', example1:'images/examples/tech.png', example2:'images/examples/tech.png', example3:'images/examples/tech.png',example4:'images/examples/tech.png', details:'Our tech clipart library will enhance network diagrams with a host of electronics shapes, like servers, printers, and monitors. Tech clipart can be added to any diagram type, including floor plans and BPMN diagrams.'},
                    {name:'UI Mockup', preview:'images/shapeLibrary/ui-44px.png', recommended: 'design', example1:'images/examples/ui.png', example2:'images/examples/ui.png', example3:'images/examples/ui.png',example4:'images/examples/ui.png', details:'Plan the ideal user interaction flow with UI mockups. Our tool gives you a variety of widgets, containers, and UI elements, to which you can easily add interactivity.'},
                    {name:'UML',category: 'popular', preview:'images/shapeLibrary/uml-44px.png', recommended: 'it', example1:'images/examples/uml.png', example2:'images/examples/uml.png', example3:'images/examples/uml.png',example4:'images/examples/uml.png', details:'UML is a standard language for modeling object-based software. Use our Unified Modeling Language shapes and connectors to draw state diagrams, activity diagrams, use case diagrams, and more.'},
                    {name:'Value Stream', preview: 'images/shapeLibrary/value-stream-44px.png', recommended: 'business', example1:'images/examples/value.png', example2:'images/examples/value.png', example3:'images/examples/value.png',example4:'images/examples/value.png', details:'Use our value stream maps to identify waste in any process--especially manufacturing--then quickly eliminate it. We offer shapes like materials, shipments, information, kanban, and more.'},
                    {name:'Venn Diagram', category: 'recent', preview:'images/shapeLibrary/venn-diagrams.png', recommended: 'education', example1:'images/examples/venn.png', example2:'images/examples/venn.png', example3:'images/examples/venn.png',example4:'images/examples/venn.png', details:'Venn diagrams are perfect for students and teachers, especially when solving logic, probability, and comparison problems. We offer premade templates and easy design options.'},
                    {name:'Video', preview:'images/shapeLibrary/videos-44px.png', recommended: 'education', example1:'images/examples/video.png', example2:'images/examples/video.png', example3:'images/examples/video.png',example4:'images/examples/video.png', details:'The video shape library allows you to upload any Youtube video to your diagram. If you publish the video, everyone--even non-Lucidchart users--can see it.'},        
                ];


$scope.lucidGroups = [{
            "id": 2,
            "groupname": "Standard",
            "lucidgroup": "Default",
            "shapes": [{
                "name": "text",
                "tags": "Standard",
                "url": "assets/icon-shapes-text.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-fill-text" sketch:type="MSArtboardGroup" font-size="29" font-family="Baskerville" fill="#828282" font-weight="526"><text id="T" sketch:type="MSTextLayer"><tspan x="5" y="25">T</tspan></text></g></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatchtype": "text",
                "swatch": {
                    "fill": "transparent",
                    "text": "#8D8D8D",
                    "border": "transparent"
                },
                "swatchnumber": 2,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "INSERT TEXT",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                },
            }, {
                "name": "block",
                "tags": "Standard",
                "url": "assets/icon-shapes-block.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Rectangle-32-+-T-Copy-2" sketch:type="MSLayerGroup" transform="translate(1.000000, 2.000000)"class="lucid-shapes-fill-stroke"  stroke="#979797" fill="#FFFFFF"><rect stroke-width="2" sketch:type="MSShapeGroup" x="0" y="0" width="28" height="26" rx="2"></rect><text id="T-Copy" sketch:type="MSTextLayer" font-family="Baskerville" font-size="18" font-weight="526" fill="#828282"><tspan x="7" y="19" stroke-width="0">T</tspan></text></g></svg>',
                "shapepanel": true,
                "customcolor": false,
                "swatch": {
                    "fill": "#ffffff",
                    "text": "#A1A1A1",
                    "border": "#A1A1A1"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Text",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "note",
                "tags": "Standard",
                "url": "assets/icon-shapes-note.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Group-Copy-3" sketch:type="MSLayerGroup" transform="translate(2.000000, 1.6)"><path d="M0,0.399535424 L18,0.399535424 L26,8.39953542 L26,26.3995354 L0,26.3995354 L0,0.399535424 Z" id="Rectangle-32-Copy-2" fill="#FFCF54" sketch:type="MSShapeGroup"></path><path d="M2,2.39953542 C2,2.39953542 19.0546875,2.417638 19,2.39953542 L24,8.51064654 L24,24.3995354 L2,24.3995354 L2,2.39953542 Z" id="Rectangle-40" fill="#FFDD87" sketch:type="MSShapeGroup"></path><rect id="Rectangle-398-Copy-9" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="7.39953542" width="8" height="2"></rect><rect id="Rectangle-398-Copy-7" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="12.3995354" width="14" height="2"></rect><rect id="Rectangle-398-Copy-8" fill="#C5992B" sketch:type="MSShapeGroup" x="6" y="17.3995354" width="10" height="2"></rect><path d="M18,0.399535424 L18,8.39953542 L26,8.39953542 L18,0.399535424 Z" id="Path-748" fill="#F8C136" sketch:type="MSShapeGroup"></path></g></svg>',

                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "#FFE192",
                    "text": "#CCA330",
                    "border": "#FFD55E"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "Note",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 45
                }
            }, {
                "name": "hotspot",
                "tags": "Standard",
                "url": "assets/icon-shapes-hotspot.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Artboard-4" sketch:type="MSArtboardGroup" fill="#019281"><rect id="Rectangle-32" fill-opacity="0.400000006" sketch:type="MSShapeGroup" x="2" y="2" width="26" height="26" rx="4"></rect><path d="M14.406079,7 L19.3938968,7 L15.0462468,13.8583375 L20.5,13.8583373 L12.4175106,24.3948897 L15.4176795,16.9625774 L9.5,16.9625774 L14.406079,7 Z" id="Path-696-Copy" sketch:type="MSShapeGroup"></path></g></svg>',
                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "rgba(78, 202, 186, 0.5)",
                    "text": "transparent",
                    "border": "transparent"
                },
                "swatchnumber": 1,
                "borderwidth": 3,
                "borderstyle": "solid",
                "text": {
                    "verticalalignment": "middle",
                    "horizontalalignment": "center",
                    "text": "",
                    "size": 12,
                },

                "padding": 5,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 120,
                    "height": 75
                }
            }, {
                "name": "line",
                "tags": "Standard",
                "url": "assets/icon-shapes-hotspot.svg",
                "svg": '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M5,12.4548437 L15.2802734,22.99" id="Line" stroke="#777" stroke-width="2" stroke-linecap="square" sketch:type="MSShapeGroup" transform="translate(10.140137, 17.722422) scale(1, -1) translate(-10.140137, -17.722422) "></path><path d="M17.9302734,12.08 L19.5502734,12.08 L19.5502734,9.32 L22.1902734,9.32 L22.1902734,7.76 L19.5502734,7.76 L19.5502734,5 L17.9302734,5 L17.9302734,7.76 L15.2902734,7.76 L15.2902734,9.32 L17.9302734,9.32 L17.9302734,12.08 Z" id="plus" fill="#777" sketch:type="MSShapeGroup" transform="translate(18.740273, 8.540000) scale(1, -1) translate(-18.740273, -8.540000) "></path></svg>',
                "shapepanel": true,
                "customcolor": true,
                "swatch": {
                    "fill": "#333",
                    "text": "transparent",
                    "border": "transparent"
                },
                "swatchnumber": 1,
                "borderwidth": 1,
                "borderstyle": "solid",

                "padding": 0,
                "metrics": {
                    "z": 2,
                    "x": 390,
                    "y": 139,
                    "width": 0,
                    "height": 75
                }
            }],
            "pinned": false

        }, {
            "id": 3,
            "lucidgroup": "Flowchart",
            "groupname": "Flowchart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 5l12 9-12 9-12-9z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M21.2 8c2.65 0 4.8 2.686 4.8 6s-2.15 6-4.8 6H6.8C4.15 20 2 17.314 2 14s2.15-6 4.8-6z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 5v18M23.6 5v18" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18c-4-3-6.5-3-8-3-2.4 0-5.6 3-8 3-1.5 0-4 0-8-3z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h21.6v15.3c-3.6-2.55-5.85-2.55-7.2-2.55-2.16 0-5.04 2.55-7.2 2.55-1.35 0-3.6 0-7.2-2.55z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.2 6.35h21.6v15.3c-3.6-2.55-5.85-2.55-7.2-2.55-2.16 0-5.04 2.55-7.2 2.55-1.35 0-3.6 0-7.2-2.55z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 7.7H26V23c-3.6-2.55-5.85-2.55-7.2-2.55-2.16 0-5.04 2.55-7.2 2.55-1.35 0-3.6 0-7.2-2.55z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8l24-3v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 23.6c0 1.325-5.373 2.4-12 2.4S2 24.925 2 23.6V4.4C2 3.075 7.373 2 14 2s12 1.075 12 2.4z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M26 4.4c0 1.325-5.373 2.4-12 2.4S2 5.725 2 4.4" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 14h24M14 2v24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 5l12 9-12 9-12-9z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M21.2 8c2.65 0 4.8 2.686 4.8 6s-2.15 6-4.8 6H6.8C4.15 20 2 17.314 2 14s2.15-6 4.8-6z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 5v18M23.6 5v18" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18c-4-3-6.5-3-8-3-2.4 0-5.6 3-8 3-1.5 0-4 0-8-3z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h21.6v15.3c-3.6-2.55-5.85-2.55-7.2-2.55-2.16 0-5.04 2.55-7.2 2.55-1.35 0-3.6 0-7.2-2.55z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.2 6.35h21.6v15.3c-3.6-2.55-5.85-2.55-7.2-2.55-2.16 0-5.04 2.55-7.2 2.55-1.35 0-3.6 0-7.2-2.55z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 7.7H26V23c-3.6-2.55-5.85-2.55-7.2-2.55-2.16 0-5.04 2.55-7.2 2.55-1.35 0-3.6 0-7.2-2.55z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8l24-3v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 23.6c0 1.325-5.373 2.4-12 2.4S2 24.925 2 23.6V4.4C2 3.075 7.373 2 14 2s12 1.075 12 2.4z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M26 4.4c0 1.325-5.373 2.4-12 2.4S2 5.725 2 4.4" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 14h24M14 2v24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }],
            "pinned": false,

        }, {
            "id": 4,
            "lucidgroup": "Flowchart",
            "groupname": "Containers",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M9.317 2h9.366v4.8H9.317z" fill="#fff"></path><path d="M9.317 4.4h9.366v2.4H9.317z" fill="#fff"></path><path d="M9.317 26V2h9.366v24zM9.317 6.8h9.366" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 18.683V9.317h4.8v9.366z" fill="#fff"></path><path d="M4.4 18.683V9.317h2.4v9.366z" fill="#fff"></path><path d="M26 18.683H2V9.317h24zM6.8 18.683V9.317" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 5l12 9-12 9-12-9z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M21.5 5A4.5 4.5 0 0 1 26 9.5v9a4.5 4.5 0 0 1-4.5 4.5h-15A4.5 4.5 0 0 1 2 18.5v-9A4.5 4.5 0 0 1 6.5 5z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }],
            "pinned": true,

        }, {
            "id": 5,
            "lucidgroup": "Geometric",
            "groupname": "Shapes",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Shapes",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Shapes",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Shapes",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,

        }, {
            "id": 6,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Devices",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_0a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/tablet_tall_bar_bottom.png" preserveAspectRatio="none"></image><pattern id="ltb_0c" patternUnits="userSpaceOnUse" width="22.047" height="26"><use xlink:href="#ltb_0a" transform="matrix(24 0 0 24 2 2)"></use></pattern><image width="1" height="1" id="ltb_0b" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/tablet_tall_bar_top.png" preserveAspectRatio="none"></image><pattern id="ltb_0d" patternUnits="userSpaceOnUse" width="22.047" height="26"><use xlink:href="#ltb_0b" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M5.953 2h16.094v24H5.953z" fill="none"></path><path d="M22.03 3.416a1.37 1.37 0 0 0-1.383-1.392H7.353c-.773 0-1.384.6-1.384 1.392v21.168a1.37 1.37 0 0 0 1.383 1.392h13.294c.773 0 1.384-.6 1.384-1.392V3.416zm-1.4 0v21.168H7.386V3.416H20.63z"></path><path d="M5.385 1.416H22.63v25.168H5.386z" fill="#111"></path><path d="M5.385 25.55H22.63v1.034H5.386z" fill="url(#ltb_0c)"></path><path d="M5.385 1.416H22.63v.54H5.386z" fill="url(#ltb_0d)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_2a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/phone_tall_bar_bottom.png" preserveAspectRatio="none"></image><pattern id="ltb_2c" patternUnits="userSpaceOnUse" width="20.093" height="26"><use xlink:href="#ltb_2a" transform="matrix(24 0 0 24 2 2)"></use></pattern><image width="1" height="1" id="ltb_2b" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/phone_tall_bar_top.png" preserveAspectRatio="none"></image><pattern id="ltb_2d" patternUnits="userSpaceOnUse" width="20.093" height="26"><use xlink:href="#ltb_2b" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M7.907 2h12.186v24H7.907z" fill="none"></path><path d="M8.053 8.888c-.085 0-.146.048-.146.144v4.2c0 .072.06.144.146.144V8.888zM19.947 7.064c.085 0 .146.072.146.144v1.608c0 .096-.06.144-.146.144V7.064z"></path><path d="M11.587 2.024c-2.827 0-3.534.936-3.534 2.088v19.776c0 1.152 1.133 2.088 4.96 2.088h1.974c3.827 0 4.96-.936 4.96-2.088V4.112c0-1.152-.707-2.088-3.534-2.088h-4.826zM8.93 5.096h10.26V23.36H8.93V5.096z"></path><path d="M6.93 3.096h14.26V25.36H6.93z" fill="#111"></path><path d="M6.93 23.46h14.26v1.9H6.93z" fill="url(#ltb_2c)"></path><path d="M6.93 3.096h14.26v.99H6.93z" fill="url(#ltb_2d)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_6a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/phone_tall_bar_bottom.png" preserveAspectRatio="none"></image><pattern id="ltb_6c" patternUnits="userSpaceOnUse" width="20.093" height="26"><use xlink:href="#ltb_6a" transform="matrix(24 0 0 24 2 2)"></use></pattern><image width="1" height="1" id="ltb_6b" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/phone_tall_bar_top.png" preserveAspectRatio="none"></image><pattern id="ltb_6d" patternUnits="userSpaceOnUse" width="20.093" height="26"><use xlink:href="#ltb_6b" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M7.907 2h12.186v24H7.907z" fill="none"></path><path d="M8.053 8.888c-.085 0-.146.048-.146.144v4.2c0 .072.06.144.146.144V8.888zM19.947 7.064c.085 0 .146.072.146.144v1.608c0 .096-.06.144-.146.144V7.064z"></path><path d="M11.587 2.024c-2.827 0-3.534.936-3.534 2.088v19.776c0 1.152 1.133 2.088 4.96 2.088h1.974c3.827 0 4.96-.936 4.96-2.088V4.112c0-1.152-.707-2.088-3.534-2.088h-4.826zM8.93 5.096h10.26V23.36H8.93V5.096z"></path><path d="M6.93 3.096h14.26V25.36H6.93z" fill="#fff"></path><path d="M6.93 23.46h14.26v1.9H6.93z" fill="url(#ltb_6c)"></path><path d="M6.93 3.096h14.26v.99H6.93z" fill="url(#ltb_6d)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_4a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/tablet_tall_bar_bottom.png" preserveAspectRatio="none"></image><pattern id="ltb_4c" patternUnits="userSpaceOnUse" width="22.047" height="26"><use xlink:href="#ltb_4a" transform="matrix(24 0 0 24 2 2)"></use></pattern><image width="1" height="1" id="ltb_4b" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/android/tablet_tall_bar_top.png" preserveAspectRatio="none"></image><pattern id="ltb_4d" patternUnits="userSpaceOnUse" width="22.047" height="26"><use xlink:href="#ltb_4b" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M5.953 2h16.094v24H5.953z" fill="none"></path><path d="M22.03 3.416a1.37 1.37 0 0 0-1.383-1.392H7.353c-.773 0-1.384.6-1.384 1.392v21.168a1.37 1.37 0 0 0 1.383 1.392h13.294c.773 0 1.384-.6 1.384-1.392V3.416zm-1.4 0v21.168H7.386V3.416H20.63z"></path><path d="M5.385 1.416H22.63v25.168H5.386z" fill="#fff"></path><path d="M5.385 25.55H22.63v1.034H5.386z" fill="url(#ltb_4c)"></path><path d="M5.385 1.416H22.63v.54H5.386z" fill="url(#ltb_4d)"></path></svg>'
            }]
        }, {
            "id": 61,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Dialogs",
            "shapes": [{
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#282828"></path><path d="M2 7h24" stroke="#33b5e5" stroke-width=".2" fill="none"></path><path d="M2 22h24M14 22v4" stroke="#353535" fill="none"></path><path d="M5.6 13h3.6m3 0h3.6m3 0h3.6M5.6 16h3.6m3 0h3.6m3 0h3.6" stroke="#33b5e5" stroke-width="2" fill="none"></path><path d="M7.4 8.875l-.5.5h1zm6.6 0l-.5.5h1zm6.6 0l-.5.5h1zM7.4 20.125l-.5-.5h1zm6.6 0l-.5-.5h1zm6.6 0l-.5-.5h1z" fill="#7e7e7e"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16H2z" fill="#282828"></path><path d="M2 11h24" stroke="#33b5e5" stroke-width=".2" fill="none"></path><path d="M2 18h24M14 18v4" stroke="#353535" fill="none"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#fff"></path><path d="M2 7h24" stroke="#33b5e5" stroke-width=".2" fill="none"></path><path d="M2 22h24M14 22v4" stroke="#e2e2e2" fill="none"></path><path d="M5.6 13h3.6m3 0h3.6m3 0h3.6M5.6 16h3.6m3 0h3.6m3 0h3.6" stroke="#33b5e5" stroke-width="2" fill="none"></path><path d="M7.4 8.875l-.5.5h1zm6.6 0l-.5.5h1zm6.6 0l-.5.5h1zM7.4 20.125l-.5-.5h1zm6.6 0l-.5-.5h1zm6.6 0l-.5-.5h1z" fill="#939393"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16H2z" fill="#fff"></path><path d="M2 11h24" stroke="#33b5e5" stroke-width=".2" fill="none"></path><path d="M2 18h24M14 18v4" stroke="#e2e2e2" fill="none"></path></svg>'
            }]
        }, {
            "id": 62,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Blocks",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M0 5h30v15H0z" fill="#333"></path><path d="M15 8v9" stroke="#484848" fill="none"></path><path d="M15.3 18h14.4" stroke="#33b5e5" stroke-width="4" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M-82 .91h192V24.18H-82z" fill="none"></path><path d="M-82 6.727h96v11.637h-96z" fill="#33b5e5"></path><path d="M14 6.727h96v11.637H14z" fill="#474747"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" stroke="#7e7e7e" stroke-width="2" fill="#111"></path><path d="M2 2l24 24m0-24L2 26" stroke="#7e7e7e" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 11.727h24v4.546H2z" stroke="#fff" stroke-width="2" fill="#111"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M0 5h30v15H0z" fill="#ddd"></path><path d="M15 8v9" stroke="#ccc" fill="none"></path><path d="M15.3 18h14.4" stroke="#33b5e5" stroke-width="4" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" stroke="#939393" stroke-width="2" fill="#fff"></path><path d="M2 2l24 24m0-24L2 26" stroke="#939393" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M0 5h30v15H0z" fill="#002e3e"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 11.727h24v4.546H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
        }, {
            "id": 63,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Inputs",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#111"></path><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12" stroke="#272727" fill="#33b5e5" fill-opacity=".267"></path><path d="M22.4 14a8.4 8.4 0 1 1-16.8 0 8.4 8.4 0 0 1 16.8 0" stroke="#33b5e5" stroke-opacity=".267" fill="#33b5e5"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" stroke="#272727" fill="#111"></path><path d="M4.4 14l9.6 9.6L33.2 4.4 28.4-.4 14 14 9.2 9.2z" stroke="#33b5e5" stroke-opacity=".267" fill="#33b5e5"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 10h24v8H2z" fill="#111"></path><path d="M2 10h24v6.8H2z" fill="#474747"></path><path d="M26 10v6.8H13.52L11.6 10z" fill="#33b5e5"></path><path d="M13.76 17.6H26" stroke="#272727" stroke-width=".8" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M-82 .91h192V24.18H-82z" fill="none"></path><path d="M-82 11.382h96v2.327h-96z" fill="#33b5e5"></path><path d="M14 12.08h96v.93H14z" fill="#474747"></path><path d="M16.327 12.545a2.327 2.327 0 1 1-4.654 0 2.327 2.327 0 0 1 4.654 0" fill="#33b5e5"></path><path d="M23.31 12.545a9.31 9.31 0 1 1-18.62 0 9.31 9.31 0 0 1 18.62 0" fill="#33b5e5" fill-opacity=".467"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M0 5h30v15H0z" fill="#dfe0df"></path><path d="M0 20h30" stroke="#c6c5c6" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M0 5h192v13.636H0z" fill="#fff"></path><path d="M2 13.227v3.41h188v-3.41" stroke="#a9a9a9" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#fff"></path><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12" stroke="#5c5c5c" fill="none"></path><path d="M22.4 14a8.4 8.4 0 1 1-16.8 0 8.4 8.4 0 0 1 16.8 0" stroke="#999" fill="#33b5e5"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 10h24v8H2z" fill="#fff"></path><path d="M2 10h24v6.8H2z" fill="#bbb"></path><path d="M26 10v6.8H13.52L11.6 10z" fill="#33b5e5"></path><path d="M13.76 17.6H26" stroke="#dadada" stroke-width=".8" fill="none"></path></svg>'
            }],
        }, {
            "id": 64,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Icons",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M22.808 8.6l-1.032-1.032-10.68 10.776-4.872-4.848-1.032 1.032 5.904 5.904 1.056-1.032-.024-.024L22.808 8.6z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M13.496 21.944l1.392-1.368-5.592-5.592h13.128v-1.968H9.296l5.592-5.592-1.392-1.368L5.576 14l7.92 7.944z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M20.72 8.312L19.688 7.28 14 12.968 8.312 7.28 7.28 8.312 12.968 14 7.28 19.688l1.032 1.032L14 15.032l5.688 5.688 1.032-1.032L15.032 14l5.688-5.688z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M7.832 17.936L14 12.632l6.168 5.304 1.272-1.464L14 10.064l-7.44 6.408 1.272 1.464z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M20.168 10.064L14 15.368l-6.168-5.304-1.272 1.464L14 17.936l7.44-6.408-1.272-1.464z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M16.688 21.776c-.816.24-1.632.384-2.472.384-1.32 0-2.664-.36-3.864-1.008l-1.824 1.944-.48-5.376 5.688-.192-2.04 2.184a6.23 6.23 0 0 0 4.416.264 6.278 6.278 0 0 0 4.368-6.408l1.896-.12a8.122 8.122 0 0 1-5.688 8.328m.048-13.536A6.037 6.037 0 0 0 12.344 8a6.224 6.224 0 0 0-4.392 6.384l-1.896.12c-.24-3.768 2.112-7.176 5.712-8.328a8.108 8.108 0 0 1 6.336.624l1.8-1.944.48 5.376-5.688.192 2.04-2.184z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M14.624 10.016c-.096-.048-.192-.096-.288-.12A1.416 1.416 0 0 0 14 9.848c-.12 0-.24.024-.336.048-.096.024-.192.072-.288.12a.862.862 0 0 0-.168.24.84.84 0 0 0-.072.384.8.8 0 0 0 .072.36c.048.096.096.192.168.24a.81.81 0 0 0 .288.144c.096.024.216.024.336.024.12 0 .24 0 .336-.024a.81.81 0 0 0 .288-.144c.072-.048.12-.144.168-.24a.8.8 0 0 0 .072-.36.84.84 0 0 0-.072-.384.862.862 0 0 0-.168-.24M13.208 17.984h1.584v-5.832h-1.584v5.832z" fill="#403f3f"></path><path d="M14 20.696A6.7 6.7 0 0 1 7.304 14 6.7 6.7 0 0 1 14 7.304 6.7 6.7 0 0 1 20.696 14 6.7 6.7 0 0 1 14 20.696m0-14.52A7.825 7.825 0 0 0 6.176 14 7.825 7.825 0 0 0 14 21.824 7.825 7.825 0 0 0 21.824 14 7.825 7.825 0 0 0 14 6.176" fill="#403f3f"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M11.696 20.048c0-.336.024-.6.12-.816.096-.24.24-.408.408-.552.144-.144.36-.24.576-.288.216-.072.456-.096.72-.096.24 0 .456.024.672.096.24.048.408.144.576.288.168.144.312.312.408.552.096.216.144.48.144.816 0 .312-.048.576-.144.792-.096.216-.24.408-.408.552-.168.144-.336.24-.576.312a2.07 2.07 0 0 1-.672.096c-.264 0-.504-.024-.72-.096-.216-.072-.432-.168-.576-.312a1.578 1.578 0 0 1-.408-.552c-.096-.216-.12-.48-.12-.792m.336-3.528v-.768c0-.36.024-.672.096-.96.072-.288.192-.552.336-.816.144-.264.336-.504.576-.768.24-.24.528-.48.84-.744.288-.24.552-.432.744-.624.192-.168.36-.336.48-.528.12-.168.216-.36.264-.552.072-.192.096-.408.096-.672 0-.384-.144-.72-.408-.96-.264-.264-.672-.384-1.2-.384-.48 0-1.008.096-1.536.288a20.44 20.44 0 0 0-1.704.744L9.56 7.496c.288-.192.624-.336.96-.504.36-.144.72-.288 1.08-.408.384-.12.768-.216 1.152-.288A6.14 6.14 0 0 1 13.88 6.2c.72 0 1.344.072 1.896.24a4.084 4.084 0 0 1 1.44.744c.408.336.696.72.912 1.176.216.456.312.984.312 1.584 0 .432-.048.816-.144 1.176-.096.336-.24.648-.432.936a5.493 5.493 0 0 1-.696.864c-.288.264-.624.552-1.008.864a6.818 6.818 0 0 0-.696.576 2.5 2.5 0 0 0-.432.48c-.12.168-.192.312-.216.48a2.1 2.1 0 0 0-.072.576v.624h-2.712z" fill="#403f3f"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M20.168 8.816c-1.32 0-2.376-.072-3.072-.264-1.176-.504-2.688-.792-3.768-.936-2.088-.312-2.952-.192-3.6-.024-.36.12-.6.36-.72.768-.096.384-.048.648.192.792l-.192.024c-.576.096-.96.36-1.032 1.032-.048.456.096.768.408.888-.552 0-.984.264-1.056.96-.096.648.288 1.08.84 1.104-.48.072-.84.384-.84 1.008 0 .696.456 1.128 1.128 1.176.792.096 2.112.144 2.88.192.168.552.12.744-.096 1.224-.744.816-1.128 1.608-1.008 2.712.024.408.408 1.056.696 1.104.48.072.624-.336.984-.912.36-.624.552-.768.984-1.512.432-.744.48-.912 2.04-2.016 1.416-.984 1.224-1.368 2.88-1.68.288-.048 1.152-.192 2.352-.192.288 0 .528-.648.528-2.736 0-2.064-.24-2.712-.528-2.712" fill="#403f3f"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M19.832 14.84c.48-.072.84-.384.84-1.008 0-.696-.456-1.128-1.128-1.176-.792-.12-2.112-.144-2.88-.192-.168-.552-.12-.744.096-1.224.744-.816 1.128-1.608 1.008-2.712-.024-.408-.408-1.056-.696-1.104-.48-.072-.624.336-.984.912-.36.624-.552.768-.984 1.512-.432.744-.48.912-2.04 2.016-1.416.984-1.224 1.344-2.88 1.656-.288.072-1.152.216-2.352.216-.288 0-.528.648-.528 2.736 0 2.064.24 2.712.528 2.712 1.32 0 2.376.048 3.072.264 1.176.504 2.688.792 3.768.936 2.088.312 2.952.192 3.6.024v-.024c.36-.096.6-.336.72-.744.096-.384.048-.648-.192-.792l.192-.024c.576-.096.96-.384 1.032-1.032.048-.456-.096-.768-.408-.888.552 0 .984-.264 1.056-.984.096-.624-.312-1.056-.84-1.08" fill="#403f3f"></path></svg>'
            }],
        }, {
            "id": 7,
            "lucidgroup": "Entity Relationship",
            "groupname": "Entity Relationship",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8h24v14.4H2z" fill="#fff"></path><path d="M2 6.8h24v14.4H2zM2 10.8h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8h24v14.4H2z" fill="#fff"></path><path d="M2 6.8h24v14.4H2zM2 10.8h24M8 10.8v10.4" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8h24v14.4H2z" fill="#fff"></path><path d="M2 6.8h24v14.4H2zM2 10.8h24M14 10.8v10.4" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8h24v14.4H2z" fill="#fff"></path><path d="M2 6.8h24v14.4H2zM2 10.8h24M7 10.8v10.4M16 10.8v10.4" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }],
            "pinned": false

        }, {
            "id": 8,
            "lucidgroup": "iOS Mockup",
            "groupname": "iOS Devices",
            "shapes": [{
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="56"><defs><image width="1" height="1" id="ltb_1429a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v1/thumb-iphone-se.png" preserveAspectRatio="none"></image><pattern id="ltb_1429b" patternUnits="userSpaceOnUse" width="40.35" height="54"><use xlink:href="#ltb_1429a" transform="matrix(52 0 0 52 2 2)"></use></pattern></defs><path d="M0 0h56v56H0z" fill="url(#ltb_1429b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="56"><defs><image width="1" height="1" id="ltb_1430a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v1/thumb-iphone-6s.png" preserveAspectRatio="none"></image><pattern id="ltb_1430b" patternUnits="userSpaceOnUse" width="40.897" height="54"><use xlink:href="#ltb_1430a" transform="matrix(52 0 0 52 2 2)"></use></pattern></defs><path d="M0 0h56v56H0z" fill="url(#ltb_1430b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="56"><defs><image width="1" height="1" id="ltb_1431a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v1/thumb-iphone-6splus.png" preserveAspectRatio="none"></image><pattern id="ltb_1431b" patternUnits="userSpaceOnUse" width="40.946" height="54"><use xlink:href="#ltb_1431a" transform="matrix(52 0 0 52 2 2)"></use></pattern></defs><path d="M0 0h56v56H0z" fill="url(#ltb_1431b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="56"><defs><image width="1" height="1" id="ltb_1432a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v1/thumb-ipad-air-portrait.png" preserveAspectRatio="none"></image><pattern id="ltb_1432b" patternUnits="userSpaceOnUse" width="45.267" height="54"><use xlink:href="#ltb_1432a" transform="matrix(52 0 0 52 2 2)"></use></pattern></defs><path d="M0 0h56v56H0z" fill="url(#ltb_1432b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="56"><defs><image width="1" height="1" id="ltb_1433a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v1/thumb-ipad-air-landscape.png" preserveAspectRatio="none"></image><pattern id="ltb_1433b" patternUnits="userSpaceOnUse" width="54" height="45.267"><use xlink:href="#ltb_1433a" transform="matrix(52 0 0 52 2 2)"></use></pattern></defs><path d="M0 0h56v56H0z" fill="url(#ltb_1433b)"></path></svg>'
            }]
        }, {
            "id": 81,
            "lucidgroup": "iOS Mockup",
            "groupname": "UI Components",
            "shapes": [{
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<img src="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v2/ios_thumb_segmented_control.png" width="56" height="56">'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<img src="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v2/ios_thumb_stepper.png" width="56" height="56">'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<img src="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v2/ios_thumb_switch.png" width="56" height="56">'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<img src="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/ios/v2/ios_thumb_page_control.png" width="56" height="56">'
            }]
        }, {
            "id": 9,
            "lucidgroup": "Site Map",
            "groupname": "Site Map",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M24 13.224c.408 0 .6-.576.312-.84L12.504.528.672 12.408c-.288.264-.096.816.312.816h2.064V24h6.288v-8.976h5.4V24h6.312V13.224H24zM5.736 1.56H2.16v6.312l3.576-3.576V1.56z"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12 19.44c-.744 0-1.344.6-1.344 1.344A1.332 1.332 0 1 0 12 19.44m4.44 0c-.744 0-1.344.6-1.344 1.344 0 .72.6 1.32 1.344 1.32.744 0 1.32-.6 1.32-1.32 0-.744-.576-1.344-1.32-1.344m-8.904 0a1.332 1.332 0 1 0 1.344 1.344c0-.744-.6-1.344-1.344-1.344m-1.32-1.68H17.76c1.488 0 2.688-1.176 2.688-2.664V3.552c0-1.488-1.2-2.664-2.688-2.664H6.216a2.658 2.658 0 0 0-2.664 2.664v11.544c0 1.488 1.2 2.664 2.664 2.664m4.32-11.448l2.64 3.792 1.68-1.416 2.904 3.744H6.216l4.32-6.12z"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M7.464.888H.912v1.584a.8.8 0 0 0 .792.792h2.904l2.4 11.4c.24 1.08 1.2 1.872 2.304 1.872h10.56c.864 0 1.416-.864 1.584-1.728l1.632-8.976H8.28L7.464.888zm13.2 19.848a2.366 2.366 0 0 0-2.376-2.376 2.38 2.38 0 0 0-2.376 2.376 2.38 2.38 0 0 0 2.376 2.376 2.366 2.366 0 0 0 2.376-2.376m-7.896 0a2.38 2.38 0 0 0-2.376-2.376 2.366 2.366 0 0 0-2.376 2.376 2.366 2.366 0 0 0 2.376 2.376 2.38 2.38 0 0 0 2.376-2.376"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M5.64.888H1.728l2.856 4.32 2.712-1.8L5.64.888zM18.528 6.6l-2.736-1.824L12 10.512 8.208 4.776 5.496 6.6l4.536 6.864-3.744 5.64-5.4-1.944v5.952l6.72-.024L12 16.44l4.416 6.648 6.696.024V17.16l-5.424 1.944-3.72-5.64 4.56-6.864zM22.296.888h-3.912l-1.68 2.52 2.736 1.8 2.856-4.32z"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M22.896 4.992L18.672 8.52V6.744c0-1.464-1.2-2.664-2.664-2.664H2.664A2.673 2.673 0 0 0 0 6.744V17.4c0 1.488 1.2 2.688 2.664 2.688h13.344c1.464 0 2.664-1.2 2.664-2.688v-1.776l4.224 3.552A.675.675 0 0 0 24 18.648V5.496c0-.552-.648-.864-1.104-.504m-9.768 7.488l-5.256 4.68c-.312.288-.768.048-.768-.36l.024-9.432c.024-.432.456-.648.792-.36l5.208 4.752a.48.48 0 0 1 0 .72"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14.952 19.104l.024.024c.384.336.984.264 1.296-.168a11.073 11.073 0 0 0 2.184-6.624c0-2.4-.768-4.728-2.184-6.624-.312-.432-.912-.504-1.296-.144h-.024c-.336.288-.384.816-.12 1.176a9.36 9.36 0 0 1 1.848 5.592 9.43 9.43 0 0 1-1.848 5.616.853.853 0 0 0 .12 1.152m-3.6-2.664c.384.384 1.032.36 1.344-.072a6.706 6.706 0 0 0 1.32-4.032c0-1.464-.456-2.88-1.32-4.032-.312-.432-.96-.456-1.344-.072a.877.877 0 0 0-.072 1.152c.624.84.96 1.872.96 2.952 0 1.08-.336 2.112-.96 2.952-.264.36-.24.84.072 1.152m7.824-13.584c-.36.312-.432.84-.168 1.2a13.88 13.88 0 0 1 2.76 8.328c0 2.976-.936 5.88-2.712 8.256-.264.36-.168.888.168 1.176h.024c.384.312.96.264 1.248-.12a15.78 15.78 0 0 0 3.048-9.312 15.81 15.81 0 0 0-3.12-9.408c-.288-.384-.888-.432-1.248-.12M1.272 16.08h2.736l4.224 3.432c.432.36 1.104-.024 1.104-.6V5.76c0-.576-.672-.792-1.104-.432L4.008 8.952H1.272c-.456 0-.816.216-.816.672v5.424c0 .48.36 1.032.816 1.032"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M9.48 2.52c3.84 0 6.96 3.12 6.96 6.96s-3.12 6.96-6.96 6.96-6.96-3.12-6.96-6.96 3.12-6.96 6.96-6.96m0-1.656C4.728.864.864 4.728.864 9.48s3.864 8.592 8.616 8.592a8.583 8.583 0 0 0 8.592-8.592c0-4.752-3.84-8.616-8.592-8.616m10.824 21.792l-6.264-6.288 2.328-2.328 6.288 6.264a1.712 1.712 0 0 1 0 2.352 1.712 1.712 0 0 1-2.352 0M11.112 6.768a1.823 1.823 0 0 1-3.648 0 1.823 1.823 0 0 1 3.648 0m-1.8 2.544c-1.752 0-3.168 1.464-3.336 3.336-.024.24.072.48.288.6.888.552 1.92.864 3.048.864a5.802 5.802 0 0 0 3.072-.864c.192-.12.288-.36.264-.6-.144-1.872-1.584-3.336-3.336-3.336"></path></svg>'
            }],
            "pinned": false
        }, {
            "id": 10,
            "lucidgroup": "UI Mockup",
            "groupname": "UI Containers",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 5h24v4.5H2z" stroke="#000" stroke-width="2" fill="#bfbfbf"></path><path d="M16.4 6.8h8.7v1.8h-8.7z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.8 6.8l-.9.9.9.9m-.9-.9h1.8M7.4 6.8l.9.9-.9.9m-.9-.9h1.8M11.9 7.7c-.105-.467-.21-.61-.37-.728a.9.9 0 1 0 .198 1.257" stroke="#000" fill="none"></path><path d="M12.134 6.8v.9h-.9z" stroke="#000" stroke-width=".25"></path><path d="M13.7 7.7l.9-.9.9.9h-.18v.9h-.45v-.9h-.54v.9h-.45v-.9z" stroke="#000"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5h24v4.5H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M23.5 7h.5v.5h-.5zM24.4 7.9l-1.3-1.3m0 1.3l1.3-1.3M21 7h.5v.5H21z" stroke="#000" fill="none"></path><path d="M21.9 7.9h-1.3V6.6h1.3zM18.5 7h.5v.5h-.5zM18.1 6.6h1.3" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2zM26 9.5H2" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M23.5 7h.5v.5h-.5zM24.4 7.9l-1.3-1.3m0 1.3l1.3-1.3" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M5 2h18v24H5z" stroke="#000" fill="#bfbfbf"></path><path d="M5 2h18v16H5z" stroke="#000" fill="#fff"></path><path d="M5 6h18M5 22h18" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M15 8V5h5l2 3" stroke="#000" fill="#bfbfbf"></path><path d="M9 8V5h5l2 3" stroke="#000" fill="#bfbfbf"></path><path d="M2 8h1V5h5l2 3h16v15H2z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M8 10H2v4h6M8 14H2v4h6" stroke="#000" fill="#bfbfbf"></path><path d="M8 5v1H2v4h6v13h18V5z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 11v6h24v-6z" stroke="#000" fill="#fff"></path><path d="M4 13v2h2v-2z" stroke="#000" fill="none"></path><path d="M5.4 13.4v1.2l-.8-.6z" stroke="#000"></path><path d="M8 13h8v2H8zM10 15v-2m2 2v-2m2 2v-2M24 13v2h-2v-2z" stroke="#000" fill="none"></path><path d="M22.6 13.4v1.2l.8-.6z" stroke="#000"></path></svg>'
            }]
        }, {
            "id": 101,
            "lucidgroup": "UI Mockup",
            "groupname": "UI Widgets",
            "shapes": [{
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 5l24 18m0-18L2 23" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v14.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 19.4h24V23H2z" stroke="#000" stroke-width="2" fill="#ababab"></path><path d="M6.05 20.75h15.9a.45.45 0 0 1 0 .9H6.05a.45.45 0 0 1 0-.9z"></path><path d="M11.606 9.5l4.788 2.7-4.788 2.7z" stroke="#000" stroke-width="2" fill="#ababab"></path><path d="M2.9 20.3l1.8.9-1.8.9zM25.1 20.3l-1.8.9 1.8.9z"></path><path d="M23.3 20.75h.9v.9h-.9z"></path><path d="M11 21.2a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M6.8 23l4.8-18M2 15.8l24-9M2 19.4h4.8c4.8 0 12-3.6 14.4-4.5L26 14M14 5l1.2 1.8c1.2 1.8 6 3.6 6 8.1" stroke="#000" stroke-width="2" fill="none"></path><path d="M6.5 9.5c1.35.54 1.35.54 2.7 0 1.35.54 1.35.54 2.7 0 1.35 1.35 1.35 5.4-2.7 6.75-4.05-1.35-4.05-5.4-2.7-6.75z" stroke="#000" fill="#08f"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h24v17.14H2z" fill="#fff"></path><path d="M5.43 10.43v12.14m3.427-12.14v12.14m3.43-12.14v12.14m3.427-12.14v12.14m3.43-12.14v12.14m3.427-12.14v12.14" stroke="gray" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 10.43h24" stroke="#000" fill="none"></path><path d="M3.5 7.93l1.5-1v2zm21 0l-1.5-1v2z"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 14h12c0 6.627-5.373 12-12 12-1.325 0-2.448-.178-3.708-.587z" stroke="#000" fill="#aaa"></path><path d="M14 14l-3.708 11.413c-3.782-1.23-6.476-3.923-7.705-7.705z" stroke="#000" fill="#555"></path><path d="M14 14L2.587 17.708C.54 11.405 3.99 4.635 10.292 2.588c6.303-2.05 13.073 1.4 15.12 7.704.41 1.26.588 2.383.588 3.708z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5v18h24V5z" fill="none"></path><path d="M2 8.6h14.4v2.7H2zm0 7.2h21.6v2.7H2z" stroke="#000" fill="#fff"></path><path d="M2 11.3h10.8V14H2zm0 7.2h18v2.7H2z" stroke="#000" fill="gray"></path><path d="M2 5v18h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            },{
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 5l24 18m0-18L2 23" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v14.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 19.4h24V23H2z" stroke="#000" stroke-width="2" fill="#ababab"></path><path d="M6.05 20.75h15.9a.45.45 0 0 1 0 .9H6.05a.45.45 0 0 1 0-.9z"></path><path d="M11.606 9.5l4.788 2.7-4.788 2.7z" stroke="#000" stroke-width="2" fill="#ababab"></path><path d="M2.9 20.3l1.8.9-1.8.9zM25.1 20.3l-1.8.9 1.8.9z"></path><path d="M23.3 20.75h.9v.9h-.9z"></path><path d="M11 21.2a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M6.8 23l4.8-18M2 15.8l24-9M2 19.4h4.8c4.8 0 12-3.6 14.4-4.5L26 14M14 5l1.2 1.8c1.2 1.8 6 3.6 6 8.1" stroke="#000" stroke-width="2" fill="none"></path><path d="M6.5 9.5c1.35.54 1.35.54 2.7 0 1.35.54 1.35.54 2.7 0 1.35 1.35 1.35 5.4-2.7 6.75-4.05-1.35-4.05-5.4-2.7-6.75z" stroke="#000" fill="#08f"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h24v17.14H2z" fill="#fff"></path><path d="M5.43 10.43v12.14m3.427-12.14v12.14m3.43-12.14v12.14m3.427-12.14v12.14m3.43-12.14v12.14m3.427-12.14v12.14" stroke="gray" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 10.43h24" stroke="#000" fill="none"></path><path d="M3.5 7.93l1.5-1v2zm21 0l-1.5-1v2z"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 14h12c0 6.627-5.373 12-12 12-1.325 0-2.448-.178-3.708-.587z" stroke="#000" fill="#aaa"></path><path d="M14 14l-3.708 11.413c-3.782-1.23-6.476-3.923-7.705-7.705z" stroke="#000" fill="#555"></path><path d="M14 14L2.587 17.708C.54 11.405 3.99 4.635 10.292 2.588c6.303-2.05 13.073 1.4 15.12 7.704.41 1.26.588 2.383.588 3.708z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5v18h24V5z" fill="none"></path><path d="M2 8.6h14.4v2.7H2zm0 7.2h21.6v2.7H2z" stroke="#000" fill="#fff"></path><path d="M2 11.3h10.8V14H2zm0 7.2h18v2.7H2z" stroke="#000" fill="gray"></path><path d="M2 5v18h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            },{
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 5l24 18m0-18L2 23" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v14.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 19.4h24V23H2z" stroke="#000" stroke-width="2" fill="#ababab"></path><path d="M6.05 20.75h15.9a.45.45 0 0 1 0 .9H6.05a.45.45 0 0 1 0-.9z"></path><path d="M11.606 9.5l4.788 2.7-4.788 2.7z" stroke="#000" stroke-width="2" fill="#ababab"></path><path d="M2.9 20.3l1.8.9-1.8.9zM25.1 20.3l-1.8.9 1.8.9z"></path><path d="M23.3 20.75h.9v.9h-.9z"></path><path d="M11 21.2a.9.9 0 1 1-1.8 0 .9.9 0 0 1 1.8 0z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M6.8 23l4.8-18M2 15.8l24-9M2 19.4h4.8c4.8 0 12-3.6 14.4-4.5L26 14M14 5l1.2 1.8c1.2 1.8 6 3.6 6 8.1" stroke="#000" stroke-width="2" fill="none"></path><path d="M6.5 9.5c1.35.54 1.35.54 2.7 0 1.35.54 1.35.54 2.7 0 1.35 1.35 1.35 5.4-2.7 6.75-4.05-1.35-4.05-5.4-2.7-6.75z" stroke="#000" fill="#08f"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h24v17.14H2z" fill="#fff"></path><path d="M5.43 10.43v12.14m3.427-12.14v12.14m3.43-12.14v12.14m3.427-12.14v12.14m3.43-12.14v12.14m3.427-12.14v12.14" stroke="gray" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 10.43h24" stroke="#000" fill="none"></path><path d="M3.5 7.93l1.5-1v2zm21 0l-1.5-1v2z"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 14h12c0 6.627-5.373 12-12 12-1.325 0-2.448-.178-3.708-.587z" stroke="#000" fill="#aaa"></path><path d="M14 14l-3.708 11.413c-3.782-1.23-6.476-3.923-7.705-7.705z" stroke="#000" fill="#555"></path><path d="M14 14L2.587 17.708C.54 11.405 3.99 4.635 10.292 2.588c6.303-2.05 13.073 1.4 15.12 7.704.41 1.26.588 2.383.588 3.708z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5v18h24V5z" fill="none"></path><path d="M2 8.6h14.4v2.7H2zm0 7.2h21.6v2.7H2z" stroke="#000" fill="#fff"></path><path d="M2 11.3h10.8V14H2zm0 7.2h18v2.7H2z" stroke="#000" fill="gray"></path><path d="M2 5v18h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }]
        }, {
            "id": 102,
            "lucidgroup": "UI Mockup",
            "groupname": "UI Input",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M8 8h12v12H8z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M10.4 12.8l2.4 3.6 4.8-4.8" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M17 14a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M8 8h12v12H8z" stroke="#000" stroke-width="2" fill="#aff"></path><path d="M14 15.2h6V20h-6z"></path><path d="M15.2 16.4h3.6L17 18.8z" fill="#aff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M13 2v24h2V2z" stroke="#000" fill="#fff"></path><path d="M20 7.04H8v7.2h12z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" stroke="#000" fill="#fff"></path><path d="M6.8 12.8l4.8 4.8" stroke="#000" stroke-width="2" fill="none"></path><path d="M9.2 12.8a2.4 2.4 0 1 1-4.8 0 2.4 2.4 0 0 1 4.8 0z" stroke="#000" fill="#fff"></path></svg>'
            }]
        }, {
            "id": 103,
          
            "groupname": "UI Menus",
            "shapes": [{
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }]
        }, {
            "id": 104,
           
            "groupname": "UI Misc",
            "shapes": [{
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UI Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 11,
            "lucidgroup": "UML",
            "groupname": "UML Class Dgm",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 9h24M2 16h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 5v18M23.6 5v18" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 13h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M5.6 5H26v14.4H5.6z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 8.6h20.4V23H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }],
            "pinned": false

        }, {
            "id": 110,
            "lucidgroup": "UML",
            "groupname": "UML Use Case",
            "shapes": [{
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M16.667 4.667a2.667 2.667 0 1 1-5.334 0 2.667 2.667 0 0 1 5.334 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M14 7.333V16.4l5.333 9.6M14 16.4L8.667 26m0-16h10.666" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 4.97-5.373 9-12 9S2 18.97 2 14s5.373-9 12-9 12 4.03 12 9z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 5.302-5.373 9.6-12 9.6S2 19.302 2 14s5.373-9.6 12-9.6S26 8.698 26 14zM2 14h24" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 11h24v6H2z" fill="#fff"></path></svg>'
            }],
            "pinned": false

        }, {
            "id": 111,
            "lucidgroup": "UML",
            "groupname": "UML State/Activity",
            "shapes": [{
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h15.77v2.113l-2 2H2z" fill="#fff"></path><path d="M2 5.43h24v17.14H2z" stroke="#000" stroke-width="2" fill="none"></path><path d="M17.77 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M5.6 8A3.6 3.6 0 0 0 2 11.6v4.8A3.6 3.6 0 0 0 5.6 20h16.8a3.6 3.6 0 0 0 3.6-3.6v-4.8A3.6 3.6 0 0 0 22.4 8z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 6.8l7.2 7.2-7.2 7.2L6.8 14z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 12.5h24v3H2z" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.757 9.757l8.486 8.486m0-8.486l-8.486 8.486" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.4 5v21h19.2V5" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 2h19.2v6H4.4z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h15.77v2.113l-2 2H2z" fill="#fff"></path><path d="M2 5.43h24v17.14H2z" stroke="#000" stroke-width="2" fill="none"></path><path d="M17.77 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M5.6 8A3.6 3.6 0 0 0 2 11.6v4.8A3.6 3.6 0 0 0 5.6 20h16.8a3.6 3.6 0 0 0 3.6-3.6v-4.8A3.6 3.6 0 0 0 22.4 8z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 6.8l7.2 7.2-7.2 7.2L6.8 14z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 12.5h24v3H2z" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M20 14a6 6 0 1 1-12 0 6 6 0 0 1 12 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.757 9.757l8.486 8.486m0-8.486l-8.486 8.486" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.4 5v21h19.2V5" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4.4 2h19.2v6H4.4z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
            "pinned": false

        }, {
            "id": 112,
            "lucidgroup": "UML",
            "groupname": "UML Sequence",
            "shapes": [{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h13.714v2.113l-2 2H2z" fill="#fff"></path><path d="M15.714 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 14h2m2 0h2m2 0h2m2 0h2m2 0h2m2 0h2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 24C8.477 24 4 19.075 4 13S8.477 2 14 2s10 4.925 10 11-4.477 11-10 11z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 24h20" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg></div>'
            },{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h13.714v2.113l-2 2H2z" fill="#fff"></path><path d="M15.714 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 14h2m2 0h2m2 0h2m2 0h2m2 0h2m2 0h2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 24C8.477 24 4 19.075 4 13S8.477 2 14 2s10 4.925 10 11-4.477 11-10 11z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 24h20" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg></div>'
            },{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h13.714v2.113l-2 2H2z" fill="#fff"></path><path d="M15.714 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 14h2m2 0h2m2 0h2m2 0h2m2 0h2m2 0h2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 24C8.477 24 4 19.075 4 13S8.477 2 14 2s10 4.925 10 11-4.477 11-10 11z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 24h20" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg></div>'
            },{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h13.714v2.113l-2 2H2z" fill="#fff"></path><path d="M15.714 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 14h2m2 0h2m2 0h2m2 0h2m2 0h2m2 0h2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 24C8.477 24 4 19.075 4 13S8.477 2 14 2s10 4.925 10 11-4.477 11-10 11z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 24h20" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg></div>'
            },{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h13.714v2.113l-2 2H2z" fill="#fff"></path><path d="M15.714 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 14h2m2 0h2m2 0h2m2 0h2m2 0h2m2 0h2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 24C8.477 24 4 19.075 4 13S8.477 2 14 2s10 4.925 10 11-4.477 11-10 11z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 24h20" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg></div>'
            },{
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.43h13.714v2.113l-2 2H2z" fill="#fff"></path><path d="M15.714 5.43v2.113l-2 2H2" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 5.43h24v17.14H2zM2 14h2m2 0h2m2 0h2m2 0h2m2 0h2m2 0h2" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14 24C8.477 24 4 19.075 4 13S8.477 2 14 2s10 4.925 10 11-4.477 11-10 11z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 24h20" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 2a4.8 4.8 0 0 0-4.8 4.8v2.4A4.8 4.8 0 0 1 2 14a4.8 4.8 0 0 1 4.8 4.8v2.4a4.8 4.8 0 0 0 4.8 4.8m4.8 0a4.8 4.8 0 0 0 4.8-4.8v-2.4A4.8 4.8 0 0 1 26 14a4.8 4.8 0 0 1-4.8-4.8V6.8A4.8 4.8 0 0 0 16.4 2" stroke="#000" stroke-width="2" fill="none"></path></svg></div>'
            }],
            "pinned": false

        }, {
            "id": 113,
        
            "groupname": "UML Component",
            "shapes": [{
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 114,
         
            "groupname": "UML Deployment",
            "shapes": [{
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 116,
         
            "groupname": "UML Entity Relationship",
            "shapes": [{
                "name": "Triangle",
                "tags": "UML",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "UML",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "UML",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "UML",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "UML",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false

        }, {
            "id": 12,
            "lucidgroup": "BPMN 2.0",
            "groupname": "BPMN 2.0",

            "shapes": [{
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2zm2.4 2.4h19.2v13.2H4.4zm0 0h19.2v13.2H4.4z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" fill="#fff"></path><path d="M7 5h2m4 0h2m4 0h2m4 0h1v1m0 4v2m0 4v2m0 4v1h-1m-4 0h-2m-4 0h-2m-4 0H7m-4 0H2v-1m0-4v-2m0-4v-2m0-4V5h1" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2z" stroke="#000" stroke-width="3" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" fill="#fff"></path><path d="M23 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" stroke-width="5" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5.6h24v16.8H2z" fill="#fff"></path><path d="M2-7.6h24v30H2z" fill="#bfbfbf"></path><path d="M2 5.6h24v16.8H2zM2 9.6h24M2 18.4h24" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M15.92 2l7.68 7.2V26H4.4V2z" stroke="#000" fill="#fff"></path><path d="M15.92 2v7.2h7.68z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 7.25C26 6.007 20.627 5 14 5S2 6.007 2 7.25V21.2c0 .793 5.373 1.8 12 1.8s12-1.007 12-2.25z" stroke="#000" fill="#fff"></path><path d="M26 7.25c0 1.243-5.373 2.25-12 2.25S2 8.493 2 7.25m24 1.71c0 .793-5.373 1.8-12 1.8S2 9.753 2 8.51m24 1.71c0 .793-5.373 1.8-12 1.8S2 11.013 2 9.77" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M3.03 2h21.94v4.8H3.03z" fill="#fff"></path><path d="M3.03 26V2h21.94v24zm0-19.2h21.94M14 6.8V26" stroke="#000" fill="none"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 13,
            "groupname": "Data Flow",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Data Flow",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 14,
            "groupname": "Org Chart",
            "lucidgroup": "Org Chart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<img src="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/layouts/leaf.png" width="56" height="56">'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1609a" x1="54" y1="18.25" x2="2" y2="18.25"><stop offset="0%" stop-color="#b2b2b2" stop-opacity=".6"></stop><stop offset="100%" stop-color="#fff" stop-opacity=".6"></stop></linearGradient></defs><path d="M8.5 18.25h39v14.625h-39z" stroke="#000" stroke-width="1.5" fill="url(#ltb_1609a)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<img src="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/layouts/simple.png" width="56" height="56">'
            }],
            "pinned": false,
        }, {
            "id": 15,
            "groupname": "Table",
            "lucidgroup": "Table",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8zM2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8zM2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" fill="#fff"></path><path d="M2 8h24v12H2z" stroke="#000" fill="none"></path><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8zM2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8zM2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8z" fill="#9cf"></path><path d="M2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8z" fill="#fff"></path><path d="M2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" fill="#9cf"></path><path d="M2 8h24v12H2z" stroke="#000" fill="none"></path><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8zM2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8zM2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h8v4H2z" fill="#9cf"></path><path d="M10 8h8v4h-8z" fill="#fff"></path><path d="M18 8h8v4h-8zM2 12h8v4H2z" fill="#9cf"></path><path d="M10 12h8v4h-8z" fill="#fff"></path><path d="M18 12h8v4h-8zM2 16h8v4H2z" fill="#9cf"></path><path d="M10 16h8v4h-8z" fill="#fff"></path><path d="M18 16h8v4h-8z" fill="#9cf"></path><path d="M2 8h24v12H2z" stroke="#000" fill="none"></path><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8zM2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8zM2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" stroke="#000" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8z" fill="#9cf"></path><path d="M2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8zM2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" fill="#fff"></path><path d="M2 8h24v12H2z" stroke="#000" fill="none"></path><path d="M2 8h8v4H2zM10 8h8v4h-8zM18 8h8v4h-8zM2 12h8v4H2zM10 12h8v4h-8zM18 12h8v4h-8zM2 16h8v4H2zM10 16h8v4h-8zM18 16h8v4h-8z" stroke="#000" fill="none"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 16,
            "groupname": "Value Stream",
            "lucidgroup": "Value Stream",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 10.4L9.92 5v5.4L17.84 5v5.4L26 5v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2zM2 8.6h24" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M5.744 20.786c.048.756-.504 1.386-1.224 1.404-.696 0-1.296-.594-1.32-1.35v-.036" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.656 20.984c-.024-.414.312-.774.768-.792.456-.018.864.306.888.738.048.414-.312.774-.768.792-.456.018-.864-.306-.888-.738z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16h-7.2v-9.6H9.2V22H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 20l2.184 1.992L6.368 26h15.264l2.184-4.008L26 18.8H15.08V2L2 16.4h10.92v2.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2z" fill="none"></path><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2H2m6.96 1.888l4.272 4.416H4.184V9.776H8.96M2 7.888z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.88 19.92c0 1.152-.96 2.064-2.16 2.064-1.2 0-2.184-.912-2.184-2.064 0-1.136.984-2.064 2.184-2.064 1.2 0 2.16.928 2.16 2.064zM15.776 19.968c0 1.152-.984 2.08-2.184 2.08-1.2 0-2.184-.928-2.184-2.08 0-1.136.984-2.064 2.184-2.064 1.2 0 2.184.928 2.184 2.064z" stroke="#000" stroke-width="2"></path><path d="M13.688 6l4.728 14.416h1.392L15.44 6zM17.432 11.04l1.992 6.928 6.624-.624-.648-1.264-5.304.624-1.992-5.664z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M3.44 11.136H2L2.72 14 2 16.864h1.44L4.496 15.6h7.176L8.816 22h2.856l5.736-6.4h5.736L26 14l-2.856-1.6h-5.736L11.672 6H8.816l2.856 6.4H4.496L3.44 11.136z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.352 10.057l.456-3.874 2.04 1.886 2.064-2.333 1.896 2.777L12.44 5.67l1.944 2.4 2.064-2.64 1.968 3.05 1.608-2.71 1.464 3.036 2.544-.995-.216 3.224 2.16.377-1.848 3.5 1.32 3.17-2.832.566-.816 3-2.352-2.486-1.752 3.017-1.728-2.52-1.728 2.332-2.04-2.4-2.352 2.964-1.416-3.12-2.088 1.87-1.224-3.635-2.4.29.984-3.943L2 11.137z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8.96v10.08L8.96 26h10.08L26 19.04V8.96L19.04 2H8.96z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#fff"></path><path d="M14 2h12v24H14" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M14 2h12M14 10h12M14 18h12" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 10.4L9.92 5v5.4L17.84 5v5.4L26 5v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2zM2 8.6h24" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M5.744 20.786c.048.756-.504 1.386-1.224 1.404-.696 0-1.296-.594-1.32-1.35v-.036" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.656 20.984c-.024-.414.312-.774.768-.792.456-.018.864.306.888.738.048.414-.312.774-.768.792-.456.018-.864-.306-.888-.738z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16h-7.2v-9.6H9.2V22H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 20l2.184 1.992L6.368 26h15.264l2.184-4.008L26 18.8H15.08V2L2 16.4h10.92v2.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2z" fill="none"></path><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2H2m6.96 1.888l4.272 4.416H4.184V9.776H8.96M2 7.888z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.88 19.92c0 1.152-.96 2.064-2.16 2.064-1.2 0-2.184-.912-2.184-2.064 0-1.136.984-2.064 2.184-2.064 1.2 0 2.16.928 2.16 2.064zM15.776 19.968c0 1.152-.984 2.08-2.184 2.08-1.2 0-2.184-.928-2.184-2.08 0-1.136.984-2.064 2.184-2.064 1.2 0 2.184.928 2.184 2.064z" stroke="#000" stroke-width="2"></path><path d="M13.688 6l4.728 14.416h1.392L15.44 6zM17.432 11.04l1.992 6.928 6.624-.624-.648-1.264-5.304.624-1.992-5.664z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M3.44 11.136H2L2.72 14 2 16.864h1.44L4.496 15.6h7.176L8.816 22h2.856l5.736-6.4h5.736L26 14l-2.856-1.6h-5.736L11.672 6H8.816l2.856 6.4H4.496L3.44 11.136z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.352 10.057l.456-3.874 2.04 1.886 2.064-2.333 1.896 2.777L12.44 5.67l1.944 2.4 2.064-2.64 1.968 3.05 1.608-2.71 1.464 3.036 2.544-.995-.216 3.224 2.16.377-1.848 3.5 1.32 3.17-2.832.566-.816 3-2.352-2.486-1.752 3.017-1.728-2.52-1.728 2.332-2.04-2.4-2.352 2.964-1.416-3.12-2.088 1.87-1.224-3.635-2.4.29.984-3.943L2 11.137z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8.96v10.08L8.96 26h10.08L26 19.04V8.96L19.04 2H8.96z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#fff"></path><path d="M14 2h12v24H14" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M14 2h12M14 10h12M14 18h12" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 10.4L9.92 5v5.4L17.84 5v5.4L26 5v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2zM2 8.6h24" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M5.744 20.786c.048.756-.504 1.386-1.224 1.404-.696 0-1.296-.594-1.32-1.35v-.036" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.656 20.984c-.024-.414.312-.774.768-.792.456-.018.864.306.888.738.048.414-.312.774-.768.792-.456.018-.864-.306-.888-.738z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16h-7.2v-9.6H9.2V22H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 20l2.184 1.992L6.368 26h15.264l2.184-4.008L26 18.8H15.08V2L2 16.4h10.92v2.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2z" fill="none"></path><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2H2m6.96 1.888l4.272 4.416H4.184V9.776H8.96M2 7.888z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.88 19.92c0 1.152-.96 2.064-2.16 2.064-1.2 0-2.184-.912-2.184-2.064 0-1.136.984-2.064 2.184-2.064 1.2 0 2.16.928 2.16 2.064zM15.776 19.968c0 1.152-.984 2.08-2.184 2.08-1.2 0-2.184-.928-2.184-2.08 0-1.136.984-2.064 2.184-2.064 1.2 0 2.184.928 2.184 2.064z" stroke="#000" stroke-width="2"></path><path d="M13.688 6l4.728 14.416h1.392L15.44 6zM17.432 11.04l1.992 6.928 6.624-.624-.648-1.264-5.304.624-1.992-5.664z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M3.44 11.136H2L2.72 14 2 16.864h1.44L4.496 15.6h7.176L8.816 22h2.856l5.736-6.4h5.736L26 14l-2.856-1.6h-5.736L11.672 6H8.816l2.856 6.4H4.496L3.44 11.136z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.352 10.057l.456-3.874 2.04 1.886 2.064-2.333 1.896 2.777L12.44 5.67l1.944 2.4 2.064-2.64 1.968 3.05 1.608-2.71 1.464 3.036 2.544-.995-.216 3.224 2.16.377-1.848 3.5 1.32 3.17-2.832.566-.816 3-2.352-2.486-1.752 3.017-1.728-2.52-1.728 2.332-2.04-2.4-2.352 2.964-1.416-3.12-2.088 1.87-1.224-3.635-2.4.29.984-3.943L2 11.137z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8.96v10.08L8.96 26h10.08L26 19.04V8.96L19.04 2H8.96z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#fff"></path><path d="M14 2h12v24H14" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M14 2h12M14 10h12M14 18h12" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 10.4L9.92 5v5.4L17.84 5v5.4L26 5v18H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 5h24v18H2zM2 8.6h24" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M5.744 20.786c.048.756-.504 1.386-1.224 1.404-.696 0-1.296-.594-1.32-1.35v-.036" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.656 20.984c-.024-.414.312-.774.768-.792.456-.018.864.306.888.738.048.414-.312.774-.768.792-.456.018-.864-.306-.888-.738z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6h24v16h-7.2v-9.6H9.2V22H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 20l2.184 1.992L6.368 26h15.264l2.184-4.008L26 18.8H15.08V2L2 16.4h10.92v2.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2z" fill="none"></path><path d="M2 7.888v12.608h16.104L16.4 15.088l-6.72-7.2H2m6.96 1.888l4.272 4.416H4.184V9.776H8.96M2 7.888z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.88 19.92c0 1.152-.96 2.064-2.16 2.064-1.2 0-2.184-.912-2.184-2.064 0-1.136.984-2.064 2.184-2.064 1.2 0 2.16.928 2.16 2.064zM15.776 19.968c0 1.152-.984 2.08-2.184 2.08-1.2 0-2.184-.928-2.184-2.08 0-1.136.984-2.064 2.184-2.064 1.2 0 2.184.928 2.184 2.064z" stroke="#000" stroke-width="2"></path><path d="M13.688 6l4.728 14.416h1.392L15.44 6zM17.432 11.04l1.992 6.928 6.624-.624-.648-1.264-5.304.624-1.992-5.664z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M3.44 11.136H2L2.72 14 2 16.864h1.44L4.496 15.6h7.176L8.816 22h2.856l5.736-6.4h5.736L26 14l-2.856-1.6h-5.736L11.672 6H8.816l2.856 6.4H4.496L3.44 11.136z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.352 10.057l.456-3.874 2.04 1.886 2.064-2.333 1.896 2.777L12.44 5.67l1.944 2.4 2.064-2.64 1.968 3.05 1.608-2.71 1.464 3.036 2.544-.995-.216 3.224 2.16.377-1.848 3.5 1.32 3.17-2.832.566-.816 3-2.352-2.486-1.752 3.017-1.728-2.52-1.728 2.332-2.04-2.4-2.352 2.964-1.416-3.12-2.088 1.87-1.224-3.635-2.4.29.984-3.943L2 11.137z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8.96v10.08L8.96 26h10.08L26 19.04V8.96L19.04 2H8.96z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="#fff"></path><path d="M14 2h12v24H14" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M14 2h12M14 10h12M14 18h12" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 17,
            "groupname": "Compute",
            "lucidgroup": "AWS Architecture",
            "shapes": [{
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M28.048 22.664v1.248c0 1.104-.96 1.992-2.16 1.992v-1.248c1.2 0 2.16-.888 2.16-1.992z" fill="#9e5622"></path><path d="M28.048 22.664v1.248c0 1.104-.96 1.992-2.16 1.992v-1.248c1.2 0 2.16-.888 2.16-1.992z" fill="#9e5622"></path><path d="M28.048 22.664v1.248c0 .096 0 .192-.024.288v-1.248c.024-.096.024-.192.024-.288" fill="#9e5622"></path><path d="M28.024 22.952V24.2a.74.74 0 0 1-.072.312v-1.248a.74.74 0 0 0 .072-.312M27.952 23.264v1.248c-.048.12-.096.24-.168.36v-1.248c.072-.12.12-.24.168-.36M27.784 23.624v1.248c-.36.6-1.056 1.032-1.896 1.032v-1.248c.84 0 1.536-.432 1.896-1.032M6.16 24.656v1.248c-1.2 0-2.16-.888-2.16-1.992v-1.248c0 1.104.96 1.992 2.16 1.992z" fill="#9e5622"></path><path d="M6.16 24.656v1.248c-1.2 0-2.16-.888-2.16-1.992v-1.248c0 1.104.96 1.992 2.16 1.992z" fill="#9e5622"></path><path d="M6.16 24.656v1.248c-1.2 0-2.16-.888-2.16-1.992v-1.248c0 1.104.96 1.992 2.16 1.992" fill="#9e5622"></path><path d="M26.392 24.344l-.504 1.56H6.16l-.456-1.44 20.688-.12z" fill="#9e5622"></path><path d="M25.888 2c1.2 0 2.16.888 2.16 1.992v18.672c0 1.104-.96 1.992-2.16 1.992H6.16c-1.2 0-2.16-.888-2.16-1.992V3.992C4 2.888 4.96 2 6.16 2h19.728z" fill="#f58535"></path><path d="M8.392 5.816h15.24v6.696H8.392V5.816z" fill="#fff"></path><path d="M9.568 6.92h3.6v4.488h-3.6V6.92zM14.2 6.92h3.624v4.488H14.2V6.92zM18.856 6.92h3.624v4.488h-3.624V6.92z" fill="#f58535"></path><path d="M8.392 14.768h15.24v6.672H8.392v-6.672z" fill="#fff"></path><path d="M9.568 15.872h3.6v4.464h-3.6v-4.464zM14.2 15.872h3.624v4.464H14.2v-4.464zM18.856 15.872h3.624v4.464h-3.624v-4.464z" fill="#f58535"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.984 7.112h1.824v1.08h-1.824v-1.08zM18.952 7.112H20.8v1.08h-1.848v-1.08zM18.952 10.544v1.08l-2.472 2.64v-1.08l2.472-2.64zM15.4 13.184v1.08l-2.592-2.736v-1.08l2.592 2.736zM23.608 15.68h4.248v1.056h-4.248V15.68zM4 15.68h4.248v1.056H4V15.68zM23.608 18.224v1.08L18.64 14.24v-1.08l4.968 5.064z" fill="#9e5622"></path><path d="M8.248 8.144l4.968 5.064-4.968 5.016V15.68H4v-4.968h4.248V8.144z" fill="#f58535"></path><path d="M13.216 13.208v1.08l-4.968 5.016v-1.08l4.968-5.016z" fill="#9e5622"></path><path d="M23.608 8.144v2.568h4.248v4.968h-4.248v2.544L18.64 13.16l4.968-5.016z" fill="#f58535"></path><path d="M20.8 19.616v1.08l-4.944 5.112-.24-1.32 5.184-4.872z" fill="#9e5622"></path><path d="M15.856 24.728v1.08l-4.872-5.112v-1.08l4.872 5.112z" fill="#9e5622"></path><path d="M15.904 2L20.8 7.112h-1.848v3.432l-2.472 2.64 2.472 2.712v3.72H20.8l-4.944 5.112-4.872-5.112h1.824v-3.672l2.592-2.76-2.592-2.736V7.112h-1.824L15.904 2z" fill="#f58535"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M27.928 3.68v1.104M27.784 13.064c-1.68-.528-3.552-.6-5.112-.6-2.304 0-5.208.504-5.784 1.224l-.024-1.008c.216-.888 2.928-1.632 5.328-1.632.792 0 4.44.36 5.616.912" fill="#9e5622"></path><path d="M16.984 12.512v1.104a.183.183 0 0 0-.048.12v-1.104c0-.048.024-.072.048-.12M16.936 12.632v1.104c-.024 0-.024.024-.024.048V12.68c0-.024 0-.024.024-.048" fill="#9e5622"></path><path d="M23.032 13.472c.984 0 1.824.072 2.52.168 1.512.24 2.304.624 2.304.864 0 .264-.792.648-2.304.864-.696.12-1.536.192-2.52.192-3.12 0-4.824-.696-4.824-1.056 0-.336 1.704-1.032 4.824-1.032z" fill="#f58535"></path><path d="M27.856 14.504v1.2c0 .24-.792.624-2.304.864a18.39 18.39 0 0 1-2.52.168c-3.12 0-4.824-.696-4.824-1.032v-1.2c0 .36 1.704 1.056 4.824 1.056.984 0 1.824-.072 2.52-.192 1.512-.216 2.304-.6 2.304-.864zM27.856 14.504v1.2-1.176-.024" fill="#9e5622"></path><path d="M27.856 14.528v1.176c0 .024-.024.024-.024.024v-1.176s.024 0 .024-.024M27.832 14.552v1.224V14.6v-.048M27.832 14.6v1.176c-.144.24-.936.576-2.28.792a18.39 18.39 0 0 1-2.52.168c-3.12 0-4.824-.696-4.824-1.032v-1.2c0 .36 1.704 1.056 4.824 1.056.984 0 1.824-.072 2.52-.192 1.344-.192 2.136-.528 2.28-.768M18.208 23.096c.048.216 1.272.408 1.872.672l-.792 1.728c-.768-.216-.984-.384-1.08-.504" fill="#9e5622"></path><path d="M27.928 23.744v1.2c0 .36-1.344 1.032-4.584 1.032-1.776 0-3.12-.192-4.08-.48V24.32c.96.288 2.304.48 4.08.48 3.24 0 4.584-.672 4.584-1.056zM27.928 23.744v1.224-1.176-.048M27.928 23.792v1.2-1.176-.024" fill="#9e5622"></path><path d="M27.928 23.816v1.176l-.048.048v-1.176c.024-.024.024-.048.048-.048M27.88 23.84v1.2c-.216.36-1.584.912-4.536.912-1.776 0-3.216-.192-4.08-.432l-.312-1.584c.864.24 2.616.84 4.392.84 2.952 0 4.32-.552 4.536-.936M5.896 24.296V25.4c-1.008 0-1.824-.768-1.872-1.704v-1.08c.048.936.864 1.68 1.872 1.68z" fill="#9e5622"></path><path d="M17.608 24.296v1.08L5.8 25.4v-1.104h11.808z" fill="#9e5622"></path><path d="M27.808 12.104c-1.728-.576-4.56-.576-5.376-.576-2.352.024-5.04.552-5.496 1.2l-.024.12V23.72c0 .192.432.384.624.576H5.824c-1.008 0-1.824-.744-1.824-1.68V3.68C4 2.744 4.816 2 5.824 2h20.232c1.008 0 1.824.744 1.824 1.68z" fill="#f58535"></path><path d="M27.928 16.568v7.176c0 .384-1.344 1.056-4.584 1.056-1.776 0-3.12-.192-3.984-.432-.648-.192-1.104-.408-1.152-.576v-7.176c.936.552 2.88.84 4.824.84h.12c.192-.024.384-.024.6-.024h.072c.168 0 .336-.024.504-.024.072 0 .144-.024.24-.024.12 0 .24-.024.384-.024.072-.024.12-.024.192-.024.144-.024.264-.048.408-.048 1.056-.168 1.872-.432 2.376-.72z" fill="#f58535"></path></svg>'
            }],
            "pinned": false,
        },
{
            "id": 31,
            "groupname": "Security Identity",
            "lucidgroup": "AWS Architecture",
            "shapes": [{
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M27.823 16.112L15.975 17.6v-7.2l11.848 1.488v4.224z" fill="#7e985a"></path><path d="M4.126 16.112l11.85 1.488v-7.2l-11.85 1.488v4.224z" fill="#485e29"></path><path d="M6.496 2h18.98v4.824H6.497V2z" fill="#648339"></path><path d="M23.108 8.048H8.866l-2.37-1.224h18.98L23.11 8.048z" fill="#405425"></path><path d="M6.496 21.176h18.98V26H6.497v-4.824z" fill="#648339"></path><path d="M23.108 19.952H8.866l-2.37 1.224h18.98l-2.368-1.224z" fill="#9baf7f"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.49 20.552l-2.435.48V6.968L6.49 5.936l3.65 4.512-3.65 10.104z" fill="#4b6428"></path><path d="M9.592 10.376l-3.102-.312V5.936l3.102.672v3.768z" fill="#759c3e"></path><path d="M22.362 9.752l5.012.624-1.886-4.44-3.126.672v3.144zM10.93 20.672L15.99 26l3.22-17.04L15.99 2l-5.06 2.088v16.584z" fill="#4b6428"></path><path d="M4.055 21.032L15.99 26l3.89-9.552-3.89-9.552L4.054 9.824v11.208z" fill="#4b6428"></path><path d="M18.185 10.448l9.19 2.712-1.887 8.904-4.368-.936-2.935-10.68z" fill="#4b6428"></path><path d="M21.12 23.888L15.99 26V2l5.13 2.112v19.776zM25.488 22.064l2.435-1.032V6.968l-2.435-1.032v16.128z" fill="#759c3e"></path><path d="M27.923 14H15.99V6.896l11.933 2.928V14z" fill="#759c3e"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.1 10.424l-1.092-.144L8 10.496l1.068.12 1.032-.192zM8.936 12.176l5.076.336 5.064-.336-5.064-.528-5.076.528zM17.432 10.424l1.236.216 1.356-.144-1.212-.264-1.38.192z" fill="#34451c"></path><path d="M12.344 20.048l2.904-.72 2.796.672-2.904.912-2.796-.864z" fill="#a7bf83"></path><path d="M12.668 10.16l-1.512-.288V5.6l1.512.504v4.056z" fill="#769b3f"></path><path d="M8.936 6.536V4.664L14.012 2v2.4l-2.856 1.2v4.224l2.856-.6v16.872l-1.524-.792v-2.256l-1.332-.552v-10.56l-2.22.24V10.28L8 10.496V6.92l.936-.384z" fill="#4c6429"></path><path d="M16.64 3.368l1.068.576 1.368.72v1.872l.948.384v3.576l-.948-.216v1.896l-1.188-.144-1.032-.096v2.112h2.22v1.92l-1.032.096v1.968l-2.52.504v2.256l2.52-.768v1.968l-2.52 1.056v2.256l-1.512.792V9.224l1.344.288V6.104L14.012 5.6V2l2.628 1.368z" fill="#769b3f"></path><path d="M15.524 5.048L14.012 4.4l-2.856 1.2 1.512.504 2.856-1.056z" fill="#34451c"></path><path d="M15.356 6.104l1.5-.504v4.224l-1.5-.312V6.104z" fill="#4c6429"></path><path d="M11.156 5.6l2.856-1.2.6.264.912.384 1.332.552-1.5.504-1.344-.504-1.344.504-1.512-.504z" fill="#34451c"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M9.098 9.512l-2.646-.336V5.984l3.55.816L9.1 9.512z" fill="#759c3e"></path><path d="M9.264 9.92l-5.196.384V6.992l2.384-1.008L9.264 9.92zM22.875 9.512l2.646-.336V5.984l-3.55.816.905 2.712z" fill="#4b6428"></path><path d="M22.708 9.92l5.197.384V6.992L25.52 5.984 22.71 9.92z" fill="#759c3e"></path><path d="M10.957 4.088l-2.74 4.68-4.15 1.008v2.976l4.816 8.592L15.986 26l4.935-5.16V6.464L15.987 2l-5.03 2.088z" fill="#4b6428"></path><path d="M27.905 12.752V9.776l-4.148-1.008-2.74-4.68L15.986 2v24l7.103-4.656 4.815-8.592z" fill="#759c3e"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M23.192 3.556H4.808C3.272 3.556 2 4.76 2 6.22v11.837c0 1.46 1.272 2.663 2.808 2.663h18.384c1.536 0 2.808-1.204 2.808-2.663V6.22c0-1.46-1.272-2.664-2.808-2.664z" fill="#7d7c7c"></path><path d="M23.192 2.48H4.808C3.272 2.48 2 3.684 2 5.143V16.98c0 1.46 1.272 2.664 2.808 2.664h18.384c1.536 0 2.808-1.204 2.808-2.663V5.144c0-1.46-1.272-2.663-2.808-2.663z" fill="#fff"></path><path d="M19.976 3.848c2.376 0 4.296 1.842 4.296 4.104 0 2.244-1.92 4.086-4.296 4.086-2.376 0-4.296-1.842-4.296-4.086 0-2.262 1.92-4.104 4.296-4.104z" fill="#759c3e"></path><path d="M21.872 6.876c.624 0 1.128.474 1.128 1.076 0 .584-.504 1.058-1.128 1.058-.624 0-1.128-.474-1.128-1.058 0-.602.504-1.076 1.128-1.076z" fill="#fff"></path><path d="M18.536 9.703h-4.992l-.456-.766-1.68.164-.672-.637-.576-.128-1.56.894-1.896-1.424L7.76 6.22h10.776v3.483z" fill="#759c3e"></path><path d="M8.024 10.177c2.376 0 4.296 1.824 4.296 4.086 0 2.262-1.92 4.086-4.296 4.086-2.376 0-4.296-1.825-4.296-4.087 0-2.262 1.92-4.086 4.296-4.086z" fill="#7d7c7c"></path><path d="M6.128 13.187c.624 0 1.128.492 1.128 1.076 0 .602-.504 1.076-1.128 1.076-.624 0-1.128-.475-1.128-1.077 0-.584.504-1.076 1.128-1.076z" fill="#fff"></path><path d="M9.464 12.512h4.992l.456.766 1.68-.164.672.638.576.128 1.56-.912 1.896 1.423-1.056 1.606H9.464v-3.484z" fill="#7d7c7c"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M24.848 22H3.104C2.528 22 2 21.54 2 20.92V4.5c0-.56.48-1.06 1.104-1.06h21.792C25.472 3.44 26 3.9 26 4.5v16.46A1.136 1.136 0 0 1 24.848 22z" fill="#4b6428"></path><path d="M24.848 20.56H3.104C2.528 20.56 2 20.1 2 19.5V3.08C2 2.5 2.48 2 3.104 2h21.792C25.472 2 26 2.46 26 3.08v16.46c-.048.56-.528 1.02-1.152 1.02z" fill="#759c3e"></path><path d="M6.728 3.46H24.68v1.58H6.728V3.46zM4.328 3c.696 0 1.296.56 1.296 1.26 0 .68-.6 1.24-1.296 1.24-.72 0-1.296-.56-1.296-1.24 0-.7.576-1.26 1.296-1.26zM3.296 6.58H24.68v12.56H3.296V6.58z" fill="#fff"></path><path d="M16.016 14.2l-.072.22-.192.5-.48-.22-.216-.1-.12.18-.336.42-.408-.32-.168-.14-.144.14-.456.32-.288-.42-.12-.18-.216.1-.48.22-.192-.5-.072-.22-.36.08h-.288v3.92l2.568-2.1 2.592 2.1v-3.92h-.264l-.288-.08z" fill="#759c3e"></path><path d="M17.336 10.88l.432-.48-.552-.34.312-.58-.624-.22.144-.6-.672-.08-.024-.6-.672.1-.192-.58-.576.26-.384-.5-.504.4-.48-.4-.384.5-.576-.26-.216.58-.624-.1-.048.6-.672.08.12.6-.6.22.264.58-.504.34.408.48-.408.46.504.36-.264.56.6.22-.192.62.528.06h.096l.12.62.672-.12.216.62.576-.3.384.54.48-.42.504.42.384-.54.576.3.192-.62.672.12.072-.62h.024l.6-.06-.144-.62.624-.22-.312-.56.552-.36-.432-.46z" fill="#759c3e"></path><path d="M13.4 11.24l-.936-.98-1.032 1 1.92 1.86 3.24-3.14-.72-.76-2.472 2.02z" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M27.03 26H4.693V2h15.59l6.745 6.048z" fill="#c5c6c7"></path><path d="M20.663 15.728v-3c-.268-1.992-2.3-3.528-4.757-3.528-2.48 0-4.534 1.536-4.78 3.528v3H8.67V22.4h14.383v-6.672h-2.39zm-2.323 0h-4.913l.022-3s0-1.848 2.456-1.848c2.345 0 2.434 1.848 2.434 1.848v3z" fill="#3a3a3a"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 32,
            "groupname": "Database",
            "lucidgroup": "AWS Architecture",
            "shapes": [{
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4 14.984h11.208v9.96H4v-9.96z" fill="#2e73b7"></path><path d="M4 24.944h11.208v.984H4v-.984z" fill="#1e4a76"></path><path d="M17.128 2h10.776v10.608H17.128V2z" fill="#2e73b7"></path><path d="M17.128 12.608h10.776v.984H17.128v-.984z" fill="#1e4a76"></path><path d="M15.208 12.608H4V2h11.208v10.608z" fill="#2e73b7"></path><path d="M4 12.608h11.208v.984H4v-.984z" fill="#1e4a76"></path><path d="M17.128 14.984h10.776v9.96H17.128v-9.96z" fill="#2e73b7"></path><path d="M17.128 24.944h10.776v.984H17.128v-.984z" fill="#1e4a76"></path><path d="M9.664 3.368c2.04 0 3.696 1.584 3.696 3.552s-1.656 3.552-3.696 3.552c-2.064 0-3.72-1.584-3.72-3.552S7.6 3.368 9.664 3.368z" fill="#f6f7f7"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M17.985 25.832l4.244-2.376V4.352L17.965 2l.02 23.832z" fill="#518ac3"></path><path d="M11.918 25.832l-4.262-2.376V4.352L11.918 2v23.832z" fill="#215283"></path><path d="M11.918 2h6.048v23.832h-6.048V2zM22.23 19.832v3.624l2.226-2.904v-2.496l-2.208 1.776h-.02zM22.248 8l2.208 1.776v-2.52L22.23 4.352V8h.018zM22.23 18.296h.018l2.208-1.32v-2.52l-2.227.216v3.624zM22.248 9.536h-.02v3.6l2.228.24v-2.52l-2.208-1.32z" fill="#2e73b7"></path><path d="M24.456 13.376l-2.227-.24-4.264-.168h-6.048l-4.262.168v-3.6l4.262-1.104h6.048l4.263 1.104 1.573.912v-.576l.653-.096L22.23 8l-4.264-1.488h-6.048L7.656 8V4.352L5.43 7.256V9.8l.018-.024.633.096v.6l-.65.384v2.52h.018l.633.024v1.056H5.43v2.52l.65.384v.624l-.632.072-.02-.024v2.52l2.228 2.904v-3.624l4.262 1.464h6.048l4.282-1.464 2.208-1.776-.653-.072v-.6l-1.555.912-4.282 1.104h-6.048l-4.28-1.104h.018v-3.624l4.262.192h6.048l4.263-.192 2.226-.216h-.653V13.4l.653-.024z" fill="#1e4a76"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M29.9 21.656v1.128c0 .168 0 .312-.027.456v-1.104c.027-.168.027-.312.027-.48" fill="#1e4a76"></path><path d="M29.873 22.136v1.104c-.055.192-.082.36-.164.528V22.64c.08-.168.108-.336.163-.504" fill="#1e4a76"></path><path d="M29.71 22.64v1.128a1.594 1.594 0 0 1-.3.552v-1.104c.136-.192.245-.384.3-.576" fill="#1e4a76"></path><path d="M29.9 21.656v1.128C29.9 24.56 28.156 26 26.002 26v-1.128c2.154 0 3.898-1.44 3.898-3.216z" fill="#1e4a76"></path><path d="M26.575 24.536L26.002 26H6.542v-1.128zM6.54 24.872V26c-2.153 0-3.897-1.44-3.897-3.216v-1.128c0 1.776 1.744 3.216 3.898 3.216z" fill="#1e4a76"></path><path d="M26.002 2C28.156 2 29.9 3.44 29.9 5.216v16.44c0 1.776-1.744 3.216-3.898 3.216H6.542c-2.155 0-3.9-1.44-3.9-3.216V5.216C2.643 3.44 4.388 2 6.543 2H26z" fill="#2e73b7"></path><path d="M26.084 9.728V8.024h-2.562v-2.16H21.45v2.16h-1.035v-2.16h-2.072v2.16h-1.036v-2.16h-2.07v2.16H14.2v-2.16h-2.072v2.16h-1.035v-2.16H9.02v2.16H6.46v1.704h2.56v.864H6.46v1.704h2.56v.864H6.46v1.728h2.56v.84H6.46v1.728h2.56v.84H6.46v1.728h2.56v2.136h2.073v-2.136h1.035v2.136H14.2v-2.136h1.036v2.136h2.07v-2.136h1.037v2.136h2.072v-2.136h1.035v2.136h2.072v-2.136h2.562v-1.728h-2.562v-.84h2.562v-1.728h-2.562v-.84h2.562V13.16h-2.562v-.864h2.562v-1.704h-2.562v-.864z" fill="#fff"></path><path d="M11.692 10.496h2.617l1.99 4.824h.026l1.908-4.824h2.617v7.008h-1.744v-4.968h-.027l-2.1 4.968h-1.445l-2.07-4.92h-.028v4.92h-1.745v-7.008z" fill="#2e73b7"></path></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M29.9 21.656v1.128c0 .168 0 .312-.027.456v-1.104c.027-.168.027-.312.027-.48" fill="#1e4a76"></path><path d="M29.873 22.136v1.104c-.055.192-.082.36-.164.528V22.64c.08-.168.108-.336.163-.504" fill="#1e4a76"></path><path d="M29.71 22.64v1.128a1.594 1.594 0 0 1-.3.552v-1.104c.136-.192.245-.384.3-.576" fill="#1e4a76"></path><path d="M29.9 21.656v1.128C29.9 24.56 28.156 26 26.002 26v-1.128c2.154 0 3.898-1.44 3.898-3.216z" fill="#1e4a76"></path><path d="M26.575 24.536L26.002 26H6.542v-1.128zM6.54 24.872V26c-2.153 0-3.897-1.44-3.897-3.216v-1.128c0 1.776 1.744 3.216 3.898 3.216z" fill="#1e4a76"></path><path d="M26.002 2C28.156 2 29.9 3.44 29.9 5.216v16.44c0 1.776-1.744 3.216-3.898 3.216H6.542c-2.155 0-3.9-1.44-3.9-3.216V5.216C2.643 3.44 4.388 2 6.543 2H26z" fill="#2e73b7"></path><path d="M25.893 9.824V8.12H23.33V5.984h-2.07V8.12h-1.036V5.984h-2.072V8.12h-1.036V5.984h-2.07V8.12h-1.037V5.984h-2.072V8.12h-1.036V5.984H8.83V8.12H6.24v1.704h2.59v.864H6.24v1.704h2.59v.864H6.24v1.728h2.59v.84H6.24v1.728h2.59v.864H6.24v1.704h2.59v2.136h2.072V20.12h1.036v2.136h2.07V20.12h1.037v2.136h2.07V20.12h1.037v2.136h2.072V20.12h1.035v2.136h2.07V20.12h2.563v-1.704H23.33v-.864h2.563v-1.728H23.33v-.84h2.563v-1.728H23.33v-.864h2.563v-1.704H23.33v-.864z" fill="#fff"></path><path d="M12.32 10.208h4.96c1.635 0 2.67.96 2.67 2.088 0 .888-.435 1.56-1.443 1.896v.024c.98.216 1.28 1.008 1.335 1.776.027.48.027 1.368.382 1.8h-2.017c-.246-.48-.218-1.224-.327-1.824-.137-.792-.518-1.152-1.527-1.152h-2.017v2.976H12.32v-7.584zm2.016 3.432h2.208c.9 0 1.39-.312 1.39-1.08 0-.72-.49-1.056-1.39-1.056h-2.208v2.136z" fill="#2e73b7"></path></svg>'
            }],
            "pinned": false,
        },
         {
            "id": 18,
            "groupname": "Azure Cloud",
            "lucidgroup": "Azure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26.192 16.448L14.12 2 2 16.4l12.072 9.84 12.12-9.792zM12.56 21.44v-6.12c-1.128-.6-1.872-1.8-1.872-3.24 0-1.968 1.512-3.6 3.384-3.6 1.848 0 3.36 1.632 3.36 3.6 0 1.368-.792 2.64-1.872 3.168v1.2l-.048.072-1.152 1.2 1.2 1.248v.072l-1.08 1.2 1.032 1.128L14 22.952l-1.44-1.512z" fill="#0078d7"></path><path d="M15.32 11.12c0-.6-.72-1.08-1.248-1.08-.6 0-1.2.408-1.2 1.008 0 .6.6 1.272 1.2 1.272.528.048 1.248-.552 1.248-1.2z" fill="#0078d7"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M23.76 2H4.24c-.584 0-1.037.456-1.037 1.032V18.8c0 .6.453 1.056 1.037 1.056h5.03c.39 1.272 1.62 2.136 3.067 2.136 1.728 0 3.175-1.44 3.175-3.192 0-1.728-1.447-3.168-3.175-3.168-1.447 0-2.656.864-3.066 2.136H5.277V6.512h17.426v11.256H19.42c-.453-3.48-3.52-6.192-7.104-6.192-1.21 0-2.42.36-3.477.864l.992 1.848c.69-.408 1.62-.624 2.42-.624 2.785 0 5.138 2.304 5.138 5.136a5.147 5.147 0 0 1-5.14 5.136c-.863 0-1.662-.24-2.418-.648l-.993 1.848a7.296 7.296 0 0 0 3.476.864c3.584 0 6.65-2.712 7.104-6.168h4.34c.562 0 1.037-.48 1.037-1.056V3.032c0-.504-.453-1.032-1.037-1.032z" fill="#3276bc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M23.312 12.647c.048-.354.048-.832.048-1.186 0-4.224-3.48-7.866-7.704-7.866h-.072c-3.024 0-5.76 1.936-7.008 4.683-.36-.063-.696 0-1.056 0-3.072 0-5.52 2.54-5.52 5.577 0 3.04 2.496 5.536 5.568 5.536h2.856c.096.396.336.73.648 1.04.984 1 2.64 1 3.624 0 1.008-.998 1.008-2.6 0-3.58-.984-.998-2.592-.998-3.624 0-.264.25-.456.438-.552.792l-2.88-.104c-2.16 0-3.84-1.603-3.888-3.725 0-2.144 1.728-3.85 3.888-3.85.384 0 .84.104 1.224.25l.816.31.24-.81c.792-2.477 3.144-4.12 5.736-4.12 3.312 0 6.024 2.684 6.024 6.014 0 .562-.072 1.103-.216 1.602l-.336 1.185 1.248-.145h.192c.936 0 1.728.81 1.728 1.748a1.74 1.74 0 0 1-1.536 1.748s-4.128.042-4.368.042c-.216-1.145-.768-2.248-1.608-3.08-1.032-1.103-2.496-1.686-4.032-1.686-1.032 0-2.04.29-2.928.79l.888 1.437a3.83 3.83 0 0 1 2.088-.605c1.056 0 2.088.396 2.856 1.207a3.924 3.924 0 0 1 1.176 2.83c0 1.04-.384 2.082-1.176 2.83-.768.75-1.752 1.187-2.856 1.187-.744 0-1.488-.188-2.088-.583l-.888 1.436c.888.54 1.944.853 2.976.853 1.56 0 2.952-.604 4.032-1.707a5.59 5.59 0 0 0 1.608-3.227c.192 0 4.368-.062 4.368-.062h.048c1.8-.145 3.144-1.643 3.144-3.433.048-1.623-1.104-3.018-2.688-3.33z" fill="#0078d7"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.508 20.888h5.11v1.632h-5.11v-1.632zM16.57 24.272h-5.062L13.09 26h1.913l1.567-1.728zM11.743 10.232c-.407 0-.83.36-.83.816 0 .432.36.84.83.84h.847v-.84c-.094-.456-.423-.816-.847-.816zM16.116 10.232c-.424 0-.847.36-.847.816v.84h.846a.86.86 0 0 0 .83-.84.823.823 0 0 0-.83-.816z" fill="#0078d7"></path><path d="M21.82 9.008v-.12c0-3.72-3.15-6.744-7.052-6.84-.094-.12-2.32.048-2.32.048C8.924 2.528 6.18 5.432 6.18 8.84c0 .096-.36 2.784 2.367 5.04C9.8 15.008 11.1 17.96 11.29 18.8l.14.288h5.11l.124-.288c.188-.864 1.536-3.84 2.742-4.92 2.743-2.232 2.414-4.776 2.414-4.872zm-5.657 3.816h-.847v6.072h-.924v-6.072h-.878v6.024h-.924v-6.024h-.847c-.924 0-1.755-.84-1.755-1.776 0-.912.784-1.752 1.755-1.752.972 0 1.77.84 1.77 1.752v.84h.832v-.84c0-.912.846-1.752 1.77-1.752.925 0 1.77.84 1.77 1.752.033.984-.798 1.776-1.722 1.776z" fill="#0078d7"></path></svg>'
            }],
            "pinned": false,
        },,
         {
            "id": 33,
            "groupname": "Azure Enterprise",
            "lucidgroup": "Azure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M13.187 23.432H6.64v-.984h6.605v-1.992H6.64v-1.008h6.49l-2.21-2.328 3.43-3.6h1.82v-.984h-2.364c-.56 0-1.045-.288-1.278-.648-.29-.456-.232-1.008.058-1.488l3.544-6.48a1.294 1.294 0 0 0-1.22-.888H5.654c-.717 0-1.317.624-1.317 1.32V26H16.13v-2.592h-2.943v.024zM6.64 6.008h7.205v1.008H6.64V6.008z" fill="#00188f"></path><path d="M14.794 14.6l-2.556 2.592 2.556 2.592h1.588l-1.937-1.944h5.984v-1.32h-5.985l1.937-1.944-1.588.024zM19.984 21.128h-5.79v1.32h5.79l-1.937 1.944h1.666L22.21 21.8l-2.497-2.592h-1.666l1.937 1.92zM18.88 2.288c-.213-.384-.542-.384-.775 0l-4.705 8.64c-.233.384-.058.648.387.648h9.41c.447 0 .62-.264.388-.648l-4.705-8.64zm-.387 2.28c.503 0 .948.432.948.936 0 .48-.444.936-.947.936-.485 0-.95-.456-.95-.936 0-.552.465-.936.95-.936zm1.936 3.984c-.214.048-.388.096-.485.216l-1.162-2.136c.155-.072.33-.12.445-.288l1.2 2.208zm-2.75-2.16c.096.12.27.24.445.288l-1.162 2.16c-.116-.12-.29-.24-.504-.24l1.22-2.208zm-1.395 4.272c-.503 0-.95-.456-.95-.96 0-.48.447-.936.95-.936.484 0 .93.456.93.936-.06.576-.446.96-.93.96zm3.215-.672h-2.053c.058-.12.058-.168.058-.288 0-.12 0-.168-.058-.288H19.5c-.06.096-.06.168-.06.288 0 .12 0 .24.06.288zm1.16.672c-.483 0-.947-.456-.947-.96 0-.48.464-.936.948-.936.485 0 .95.456.95.936-.058.576-.465.96-.95.96z" fill="#00188f"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M23.47 25.064L16.805 14c-.29-.48-.77-.48-1.057 0L9.082 25.064c-.288.456-.057.816.52.816h13.35c.576.048.806-.36.518-.816zm-3.265-.24h-2.94v-1.752h1.192v-1.176h-4.112v1.176h1.172v1.752h-2.92v-1.752h1.17V21.32h2.326v-1.176h-1.172v-1.752h2.94v1.752h-1.173v1.176h2.324v1.752h1.17v1.752h.02zM14.94 2H5.568c-.634 0-1.172.528-1.172 1.176V26H7.66c0-.24.078-.528.23-.768l.943-1.584h-2.69v-1.176h3.4l.692-1.152H6.143v-1.176h4.803l4.15-6.912c.23-.408.575-.648.998-.696V3.104c0-.576-.52-1.104-1.153-1.104zm-.594 4.68H6.163V5.504h8.183V6.68z" fill="#2a3282"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.883 15.656a.525.525 0 0 1-.526.528c-.308 0-.527-.288-.527-.528v-2.712a.52.52 0 0 1 .527-.528c.322 0 .526.264.526.528v2.712zM18.185 15.656c0 .264-.22.528-.542.528-.307 0-.526-.288-.526-.528v-2.712a.52.52 0 0 1 .526-.528c.322 0 .542.264.542.528v2.712zM11.396 12.416V16.4c0 .48.32.792.746.792h.322v1.392c0 .264.205.528.483.528.263 0 .482-.264.482-.528v-1.392h1.067v1.392c0 .264.205.528.483.528.264 0 .483-.264.483-.528v-1.392h.483c.424 0 .585-.36.585-.792v-3.984h-5.134zM15.566 9.608l.424-.744c.058-.048 0-.144-.044-.216-.06-.048-.16 0-.16.072l-.425.792c-.38-.216-.863-.312-1.33-.312-.484 0-.952.096-1.332.312l-.425-.792c-.058-.072-.102-.096-.16-.072-.06.072-.103.12-.06.216l.44.744c-.746.48-1.288 1.224-1.288 2.136v.096h5.634v-.096c.013-.912-.47-1.704-1.274-2.136zm-2.868 1.176c-.16 0-.264-.096-.264-.264s.103-.288.264-.288c.175 0 .278.12.278.288 0 .168-.117.264-.278.264zm2.62 0c-.162 0-.28-.096-.28-.264s.103-.288.28-.288c.145 0 .262.12.262.288 0 .168-.117.264-.263.264z" fill="#00188f"></path><path d="M20.628 2H7.386c-.38 0-.702.264-.702.648v22.608c0 .384.322.744.702.744h13.242c.366 0 .702-.36.702-.744V2.696c-.058-.36-.38-.696-.702-.696zm-8.09.96h3.145v.528h-3.146V2.96zm1.49 22.56c-.584 0-1.067-.48-1.067-1.08a1.07 1.07 0 0 1 1.07-1.056c.585 0 1.067.48 1.067 1.056 0 .6-.482 1.08-1.068 1.08zm5.693-2.592H8.236V4.664h11.5v18.264h-.014z" fill="#00188f"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M3.804 19.544c-.798 0-1.55.768-1.55 1.512V26h23.492v-4.944c0-.768-.8-1.512-1.55-1.512H3.804zm19.945 2.76c-.447 0-.8-.36-.8-.768 0-.408.353-.744.8-.744.446 0 .798.336.798.744s-.352.768-.8.768zM9.255 9.848L14 14.552l4.745-4.704V6.944l-3.5 3.504V2h-2.49v8.448l-3.5-3.504v2.904z" fill="#2a3282"></path><path d="M14.705 15.248l-.705.696-.705-.696L12.003 14h-5.24l-3.31 4.488h21.142L21.26 14h-5.263l-1.292 1.248z" fill="#2a3282"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 19,
            "groupname": "Basic Cisco",
            "lucidgroup":"Cisco Network Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_677a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/androgenous_person.png" preserveAspectRatio="none"></image><pattern id="ltb_677b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_677a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_677b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_678a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/atm_switch.png" preserveAspectRatio="none"></image><pattern id="ltb_678b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_678a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_678b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_679a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/cloud.png" preserveAspectRatio="none"></image><pattern id="ltb_679b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_679a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_679b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_680a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/fileserver.png" preserveAspectRatio="none"></image><pattern id="ltb_680b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_680a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_680b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_682a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/generic_building.png" preserveAspectRatio="none"></image><pattern id="ltb_682b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_682a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_682b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_683a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/laptop.png" preserveAspectRatio="none"></image><pattern id="ltb_683b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_683a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_683b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_684a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/lock.png" preserveAspectRatio="none"></image><pattern id="ltb_684b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_684a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_684b)"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_677a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/androgenous_person.png" preserveAspectRatio="none"></image><pattern id="ltb_677b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_677a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_677b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_678a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/atm_switch.png" preserveAspectRatio="none"></image><pattern id="ltb_678b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_678a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_678b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_679a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/cloud.png" preserveAspectRatio="none"></image><pattern id="ltb_679b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_679a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_679b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_680a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/fileserver.png" preserveAspectRatio="none"></image><pattern id="ltb_680b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_680a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_680b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_682a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/generic_building.png" preserveAspectRatio="none"></image><pattern id="ltb_682b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_682a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_682b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_683a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/laptop.png" preserveAspectRatio="none"></image><pattern id="ltb_683b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_683a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_683b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_684a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/lock.png" preserveAspectRatio="none"></image><pattern id="ltb_684b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_684a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_684b)"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_677a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/androgenous_person.png" preserveAspectRatio="none"></image><pattern id="ltb_677b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_677a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_677b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_678a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/atm_switch.png" preserveAspectRatio="none"></image><pattern id="ltb_678b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_678a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_678b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_679a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/cloud.png" preserveAspectRatio="none"></image><pattern id="ltb_679b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_679a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_679b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_680a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/fileserver.png" preserveAspectRatio="none"></image><pattern id="ltb_680b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_680a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_680b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_682a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/generic_building.png" preserveAspectRatio="none"></image><pattern id="ltb_682b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_682a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_682b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_683a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/laptop.png" preserveAspectRatio="none"></image><pattern id="ltb_683b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_683a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_683b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_684a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/cisco/thumb/lock.png" preserveAspectRatio="none"></image><pattern id="ltb_684b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_684a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_684b)"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 20,
            "groupname": "Computers and Monitors",
            "lucidgroup": "Network Infrastructure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.24 20.624h1.896v1.656H11.24v-1.656zM18.464 2H26v21.648h-7.536V2z" fill="#29aae1"></path><path d="M2.12 5.648h19.944v15H2.12v-15z" fill="#29aae1"></path><path d="M3.032 6.56h18.192v13.416H3.032V6.56z" fill="#fff"></path><path d="M3.464 6.872h17.28v12.672H3.464V6.872z" fill="#fff"></path><path d="M2.912 22.4H21.08l-.888 3.576H2l.912-3.576z" fill="#29aae1"></path><path d="M2.792 22.28h18.6l1.56 3.72h-18.6l-1.56-3.72z" fill="#29aae1"></path><path d="M9.104 25.04h6.624v.744H9.104v-.744zM5.456 22.856h.504v.48h-.504v-.48zM6.32 22.88h.504v.48H6.32v-.48zM7.448 23.744h.48v.48h-.48v-.48zM7.256 22.832h.504v.48h-.504v-.48zM8.096 22.856H8.6v.48h-.504v-.48zM8.936 22.832h.48v.48h-.48v-.48zM14.048 22.904h.504v.48h-.504v-.48zM14.816 22.904h.48v.48h-.48v-.48zM15.512 22.904h.504v.48h-.504v-.48zM16.352 22.904h.504v.48h-.504v-.48zM17.144 22.904h.48v.48h-.48v-.48zM16.208 23.696h.504v.48h-.504v-.48zM18.032 22.904h.504v.48h-.504v-.48zM8.36 23.72h.504v.48H8.36v-.48zM9.32 23.72h.48v.48h-.48v-.48zM15.44 23.672h.432v.48h-.432v-.48zM14.6 23.672h.48v.48h-.48v-.48zM9.848 22.856h.48v.48h-.48v-.48zM10.76 22.88h.504v.48h-.504v-.48zM11.624 22.856h.504v.48h-.504v-.48zM12.584 22.856h.48v.48h-.48v-.48zM13.352 22.88h.504v.48h-.504v-.48zM10.16 23.696h.48v.48h-.48v-.48zM11.072 23.696h.504v.48h-.504v-.48zM11.96 23.72h.48v.48h-.48v-.48zM12.8 23.72h.504v.48H12.8v-.48zM13.688 23.672h.48v.48h-.48v-.48z" fill="#fff"></path><path d="M2.024 25.976l20.928-.072-1.488-3.624-18.528.024-.912 3.672z" fill="none"></path><path d="M23.792 3.128h1.344c.144 0 .144 0 .144.168s0 .168-.144.168h-1.344c-.144 0-.144 0-.144-.168s0-.168.144-.168zM23.792 3.92h1.368c.12 0 .12 0 .12.144s0 .144-.12.144h-1.368c-.144 0-.144 0-.144-.144s0-.144.144-.144zM18.488 5.408h3.624V5.6h-3.624v-.192zM22.112 5.408h.168v15.288h-.168V5.408z" fill="#fff"></path><path d="M18.464 20.672h3.792v.216h-3.792v-.216zM18.488 21.896h2.904c.144 0 .144 0 .144.168 0 .192 0 .192-.144.192h-2.904c-.144 0-.144 0-.144-.192 0-.168 0-.168.144-.168z" fill="#fff"></path><path d="M21.512 21.944l.816 1.656-.24.168-.792-1.68.216-.144zM11.144 20.624h2.04v.24h-2.04v-.24zM11.216 22.016h1.944v.264h-1.944v-.264z" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.584 19.664h2.16v1.968h-2.16v-1.968zM2.144 2h22.848v17.664H2.144V2z" fill="#29aae1"></path><path d="M3.176 3.08h20.856v15.792H3.176V3.08z" fill="#fff"></path><path d="M3.68 3.44h19.776v14.928H3.68V3.44z" fill="#fff"></path><path d="M3.032 21.752h20.832l-1.032 4.224H2l1.032-4.224z" fill="#29aae1"></path><path d="M2.912 21.608h21.312L26 25.976H4.688l-1.776-4.368z" fill="#29aae1"></path><path d="M10.136 24.848h7.584v.888h-7.584v-.888zM5.96 22.304h.552v.552H5.96v-.552zM6.944 22.328h.576v.552h-.576v-.552zM8.216 23.336h.576v.552h-.576v-.552zM8.024 22.256h.552v.576h-.552v-.576zM8.984 22.304h.576v.552h-.576v-.552zM9.92 22.256h.576v.576H9.92v-.576zM15.8 22.352h.576v.576H15.8v-.576zM16.664 22.352h.576v.576h-.576v-.576zM17.48 22.352h.576v.576h-.576v-.576zM18.464 22.352h.552v.576h-.552v-.576zM19.352 22.352h.552v.576h-.552v-.576zM18.296 23.288h.552v.552h-.552v-.552zM20.36 22.352h.576v.576h-.576v-.576zM9.296 23.312h.552v.552h-.552v-.552zM10.376 23.312h.552v.552h-.552v-.552zM17.408 23.264h.48v.552h-.48v-.552zM16.424 23.264H17v.552h-.576v-.552zM10.976 22.28h.576v.576h-.576v-.576zM12.056 22.304h.552v.576h-.552v-.576zM13.04 22.28h.552v.576h-.552v-.576zM14.12 22.28h.552v.576h-.552v-.576zM15.008 22.304h.552v.576h-.552v-.576zM11.336 23.288h.576v.552h-.576v-.552zM12.416 23.288h.552v.552h-.552v-.552zM13.4 23.312h.576v.552H13.4v-.552zM14.384 23.312h.552v.552h-.552v-.552zM15.392 23.264h.552v.552h-.552v-.552z" fill="#fff"></path><path d="M2.024 25.976L26 25.88l-1.704-4.272-21.24.048-1.032 4.32z" fill="none"></path><path d="M12.464 19.664h2.352v.264h-2.352v-.264zM12.56 21.296h2.232v.312H12.56v-.312z" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.208 4.14h19.488c.264 0 .264 0 .264.38V23.6c0 .38 0 .38-.264.38H4.208c-.264 0-.264 0-.264-.38V4.52c0-.38 0-.38.264-.38z" fill="#999"></path><path d="M2.432 4.16h1.08v19.8h-1.08V4.16z" fill="#29aae1"></path><path d="M2.864 14.04c0 5.46-.192 9.86-.432 9.86S2 19.5 2 14.04c0-5.46.192-9.86.432-9.86s.432 4.4.432 9.86zM24.224 4.02h1.272v19.86h-1.272V4.02z" fill="#29aae1"></path><path d="M26 13.94c0 5.5-.216 9.94-.504 9.94-.288 0-.528-4.44-.528-9.94 0-5.48.24-9.94.528-9.94.288 0 .504 4.46.504 9.94z" fill="#29aae1"></path><path d="M25.304 5.8c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.304 6.98c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.376 8.16c0 .2-.144.34-.288.34-.168 0-.288-.14-.288-.34 0-.18.12-.34.288-.34.144 0 .288.16.288.34zM6.464 5.96h7.2v4.4h-7.2v-4.4zM14.528 5.96h7.2v4.4h-7.2v-4.4zM14.552 11.44h7.2v4.4h-7.2v-4.4zM14.528 17.08h7.2v4.4h-7.2v-4.4zM6.416 17.08h7.2v4.4h-7.2v-4.4zM6.752 11.48H9.32c.288 0 .288 0 .288.4v3.58c0 .4 0 .4-.288.4H6.752c-.264 0-.264 0-.264-.4v-3.58c0-.4 0-.4.264-.4zM10.76 11.42h2.544c.288 0 .288 0 .288.4v3.66c0 .38 0 .38-.288.38H10.76c-.288 0-.288 0-.288-.38v-3.66c0-.4 0-.4.288-.4z" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h23.976v17.535H2V3.5z" fill="#29aae1"></path><path d="M20.24 22.42c0 1.135-2.784 2.08-6.216 2.08-3.432 0-6.216-.945-6.216-2.08 0-1.154 2.784-2.078 6.216-2.078 3.432 0 6.216.924 6.216 2.08z" fill="#29aae1"></path><path d="M9.224 21.014H18.8v.126H9.224v-.126zM12.536 4.844h3.144c8.352 0 8.352 0 8.352 1.113v10.815c0 1.113 0 1.113-8.352 1.113h-3.144c-8.352 0-8.352 0-8.352-1.113V5.957c0-1.113 0-1.113 8.352-1.113z" fill="#fff"></path><path d="M12.848 5.075h2.544c8.352 0 8.352 0 8.352 1.113v10.29c0 1.113 0 1.113-8.352 1.113h-2.544c-8.352 0-8.352 0-8.352-1.112V6.188c0-1.113 0-1.113 8.352-1.113z" fill="gray"></path><path d="M23.552 18.116c0 .336-.264.588-.624.588-.336 0-.624-.252-.624-.588 0-.315.288-.588.624-.588.36 0 .624.273.624.588zM21.944 18.2c0 .147-.144.273-.312.273-.192 0-.336-.126-.336-.273 0-.147.144-.252.336-.252.168 0 .312.105.312.252z" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h24v17.094H2V3.5z" fill="#29aae1"></path><path d="M12.104 20.468h4.2v2.982h-4.2v-2.982z" fill="#29aae1"></path><path d="M2.792 4.13h22.296v15.456H2.792V4.13z" fill="#fff"></path><path d="M3.104 4.508H24.68v14.7H3.104v-14.7z" fill="#999"></path><path d="M12.104 20.594h4.224v.147h-4.224v-.146z" fill="#fff"></path><path d="M14.168 22.127h.024c3.744 0 3.744 0 3.744 1.197s0 1.197-3.744 1.197h-.024c-3.744 0-3.744 0-3.744-1.196 0-1.197 0-1.197 3.744-1.197z" fill="#29aae1"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 37,
            "groupname": "Basic Network Shapes",
            "lucidgroup": "Network Infrastructure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.956 9.944l2.016-.048 3.468 16.08h-8.1l2.616-16.032z" fill="#29aae1"></path><path d="M13.424 7.304h1.08v2.448h-1.08V7.304z" fill="#2188b4"></path><path d="M15.008 6.368c0 .72-.48 1.32-1.056 1.32-.576 0-1.044-.6-1.044-1.32 0-.72.468-1.32 1.044-1.32.576 0 1.056.6 1.056 1.32z" fill="#2188b4"></path><path d="M16.1 4.784c.324.36.504 1.056.48 1.776-.024.72-.396 1.416-.396 1.416s-.276.336-.048-.216c.24-.552.288-.768.324-.96.024-.192.048-.144.036-.552-.012-.408-.156-.84-.204-.888-.048-.048-.252-.456-.252-.456l.06-.12zM11.84 4.736c-.3.384-.468 1.08-.444 1.8.024.72.372 1.416.372 1.416s.264.312.036-.24c-.216-.528-.264-.768-.288-.96-.036-.192-.048-.144-.048-.552.012-.384.156-.816.192-.864.048-.072.24-.48.24-.48l-.06-.12zM17.36 3.512c.708.648 1.104 1.896 1.056 3.168-.06 1.272-.888 2.496-.888 2.496s-.6.576-.084-.384c.504-.96.624-1.368.696-1.704.072-.336.108-.264.084-.984-.024-.696-.336-1.464-.444-1.56-.108-.096-.564-.816-.564-.816l.144-.216zM10.76 3.248c-.732.696-1.128 2.016-1.068 3.36.06 1.344.9 2.64.9 2.64s.6.6.084-.408c-.516-1.032-.648-1.464-.708-1.824-.072-.36-.12-.264-.096-1.032.036-.744.348-1.536.456-1.656.108-.096.564-.84.564-.84l-.132-.24z" fill="#7fcced"></path><path d="M18.356 2.192c1.068.912 1.656 2.64 1.572 4.416-.084 1.752-1.32 3.456-1.32 3.456s-.888.816-.12-.528c.756-1.344.936-1.92 1.044-2.376.096-.48.156-.36.12-1.368-.036-.984-.504-2.016-.66-2.184-.156-.144-.84-1.128-.84-1.128l.204-.288zM9.728 2C8.612 2.936 8 4.688 8.084 6.512c.084 1.8 1.38 3.552 1.38 3.552s.924.816.132-.552c-.792-1.392-.984-1.968-1.092-2.448-.108-.48-.168-.36-.132-1.368.036-1.032.528-2.088.696-2.232.168-.144.876-1.152.876-1.152L9.728 2z" fill="#7fcced"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M19.256 13.904a5.23 5.23 0 0 1-5.232 5.232 5.23 5.23 0 0 1-5.232-5.232 5.244 5.244 0 0 1 5.232-5.232 5.244 5.244 0 0 1 5.232 5.232z" fill="#29aae1"></path><path d="M18.632 13.88c0 2.544-2.064 4.608-4.584 4.608-2.544 0-4.584-2.064-4.584-4.608 0-2.52 2.04-4.584 4.584-4.584a4.6 4.6 0 0 1 4.584 4.584z" fill="#fff"></path><path d="M15.056 3.056c0 .576-.48 1.032-1.056 1.032a1.024 1.024 0 0 1-1.032-1.032C12.968 2.48 13.424 2 14 2c.576 0 1.056.48 1.056 1.056zM14.96 24.968c0 .576-.456 1.032-1.032 1.032-.576 0-1.056-.456-1.056-1.032 0-.6.48-1.056 1.056-1.056.576 0 1.032.456 1.032 1.056zM4.088 14.096c0 .6-.456 1.056-1.032 1.056-.6 0-1.056-.456-1.056-1.056 0-.576.456-1.032 1.056-1.032.576 0 1.032.456 1.032 1.032zM26 14.312c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.056 1.056-1.056.576 0 1.032.48 1.032 1.056zM6.488 5.696c0 .576-.48 1.056-1.056 1.056-.576 0-1.032-.48-1.032-1.056 0-.576.456-1.056 1.032-1.056.576 0 1.056.48 1.056 1.056zM23.504 22.856c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.032 1.056-1.032.576 0 1.032.456 1.032 1.032zM23.72 5.72c0 .6-.48 1.056-1.056 1.056-.576 0-1.032-.456-1.032-1.056 0-.576.456-1.032 1.032-1.032.576 0 1.056.456 1.056 1.032zM7.064 22.904c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.056 1.056-1.056.576 0 1.032.48 1.032 1.056z" fill="#29aae1"></path><path d="M13.664 4.232h.768v4.176h-.768V4.232zM13.568 19.448h.768v4.176h-.768v-4.176zM19.448 14.672l.024-.768 4.176.048-.024.768-4.176-.048zM4.4 14.528v-.768h4.176v.768H4.4zM21.248 6.584l.72.528-3.192 3.6-.72-.552 3.192-3.576zM9.944 17.936l.72.528-3.192 3.6-.72-.552 3.192-3.576zM10.232 9.68l-.576.696-3.384-3.408.576-.696 3.384 3.408zM21.704 21.488l-.576.696-3.384-3.408.576-.696 3.384 3.408z" fill="#7fcced"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 14.888h23.976V24.2H2v-9.312z" fill="#29aae1"></path><path d="M3.152 25.256h21.672v.72H3.152v-.72z" fill="#2188b4"></path><path d="M3.128 18.44H5.36v1.176H3.128V18.44z" fill="#fff"></path><path d="M4.208 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM6.56 18.44h2.232v1.176H6.56V18.44z" fill="#fff"></path><path d="M7.64 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM10.184 18.44h2.232v1.176h-2.232V18.44z" fill="#fff"></path><path d="M11.264 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM13.712 18.44h2.232v1.176h-2.232V18.44z" fill="#fff"></path><path d="M14.792 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672z" fill="#fff"></path><path d="M23.576 8.792c.912.216.912.216.744 1.32l-.864 5.496c-.168 1.128-.168 1.128-1.08.912-.888-.216-.888-.216-.72-1.32l.84-5.52c.192-1.104.192-1.104 1.08-.888z" fill="#29aae1"></path><path d="M24.536 2.696c.552.144.552.144.456.816l-.912 5.736c-.096.672-.096.672-.648.552-.576-.144-.576-.144-.456-.816l.888-5.736c.096-.672.096-.672.672-.552z" fill="#29aae1"></path><path d="M18.728 15.608h6.432v7.584h-6.432v-7.584z" fill="#fff"></path><path d="M18.944 15.872h5.976v7.032h-5.976v-7.032z" fill="#7fcced"></path><path d="M21.824 16.208l-.72.936h.384l.024 1.296h.744l-.072-1.296h.384l-.744-.936zM21.944 22.352l.72-.888-.36-.024-.024-1.296-.744-.024.072 1.296H21.2l.744.936zM22.208 19.352l.72.936.024-.456h1.032l.048-.912-1.056.048v-.336l.024-.144-.792.864zM21.584 19.352l-.72-.912-.024.456-1.032-.024-.048.912 1.056-.048v.36l-.024.144.792-.888z" fill="#fff"></path><path d="M4.352 8.312c.888-.216.888-.216 1.056.888l.864 5.496c.192 1.128.192 1.128-.72 1.344-.912.216-.912.216-1.08-.912l-.864-5.496c-.168-1.104-.168-1.104.744-1.32z" fill="#29aae1"></path><path d="M3.392 2.216c.552-.144.552-.144.672.552l.888 5.736c.096.672.096.672-.456.816-.552.12-.552.12-.648-.552l-.912-5.736c-.096-.696-.096-.696.456-.816z" fill="#29aae1"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.24 20.624h1.896v1.656H11.24v-1.656zM18.464 2H26v21.648h-7.536V2z" fill="#29aae1"></path><path d="M2.12 5.648h19.944v15H2.12v-15z" fill="#29aae1"></path><path d="M3.032 6.56h18.192v13.416H3.032V6.56z" fill="#fff"></path><path d="M3.464 6.872h17.28v12.672H3.464V6.872z" fill="#fff"></path><path d="M2.912 22.4H21.08l-.888 3.576H2l.912-3.576z" fill="#29aae1"></path><path d="M2.792 22.28h18.6l1.56 3.72h-18.6l-1.56-3.72z" fill="#29aae1"></path><path d="M9.104 25.04h6.624v.744H9.104v-.744zM5.456 22.856h.504v.48h-.504v-.48zM6.32 22.88h.504v.48H6.32v-.48zM7.448 23.744h.48v.48h-.48v-.48zM7.256 22.832h.504v.48h-.504v-.48zM8.096 22.856H8.6v.48h-.504v-.48zM8.936 22.832h.48v.48h-.48v-.48zM14.048 22.904h.504v.48h-.504v-.48zM14.816 22.904h.48v.48h-.48v-.48zM15.512 22.904h.504v.48h-.504v-.48zM16.352 22.904h.504v.48h-.504v-.48zM17.144 22.904h.48v.48h-.48v-.48zM16.208 23.696h.504v.48h-.504v-.48zM18.032 22.904h.504v.48h-.504v-.48zM8.36 23.72h.504v.48H8.36v-.48zM9.32 23.72h.48v.48h-.48v-.48zM15.44 23.672h.432v.48h-.432v-.48zM14.6 23.672h.48v.48h-.48v-.48zM9.848 22.856h.48v.48h-.48v-.48zM10.76 22.88h.504v.48h-.504v-.48zM11.624 22.856h.504v.48h-.504v-.48zM12.584 22.856h.48v.48h-.48v-.48zM13.352 22.88h.504v.48h-.504v-.48zM10.16 23.696h.48v.48h-.48v-.48zM11.072 23.696h.504v.48h-.504v-.48zM11.96 23.72h.48v.48h-.48v-.48zM12.8 23.72h.504v.48H12.8v-.48zM13.688 23.672h.48v.48h-.48v-.48z" fill="#fff"></path><path d="M2.024 25.976l20.928-.072-1.488-3.624-18.528.024-.912 3.672z" fill="none"></path><path d="M23.792 3.128h1.344c.144 0 .144 0 .144.168s0 .168-.144.168h-1.344c-.144 0-.144 0-.144-.168s0-.168.144-.168zM23.792 3.92h1.368c.12 0 .12 0 .12.144s0 .144-.12.144h-1.368c-.144 0-.144 0-.144-.144s0-.144.144-.144zM18.488 5.408h3.624V5.6h-3.624v-.192zM22.112 5.408h.168v15.288h-.168V5.408z" fill="#fff"></path><path d="M18.464 20.672h3.792v.216h-3.792v-.216zM18.488 21.896h2.904c.144 0 .144 0 .144.168 0 .192 0 .192-.144.192h-2.904c-.144 0-.144 0-.144-.192 0-.168 0-.168.144-.168z" fill="#fff"></path><path d="M21.512 21.944l.816 1.656-.24.168-.792-1.68.216-.144zM11.144 20.624h2.04v.24h-2.04v-.24zM11.216 22.016h1.944v.264h-1.944v-.264z" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.584 19.664h2.16v1.968h-2.16v-1.968zM2.144 2h22.848v17.664H2.144V2z" fill="#29aae1"></path><path d="M3.176 3.08h20.856v15.792H3.176V3.08z" fill="#fff"></path><path d="M3.68 3.44h19.776v14.928H3.68V3.44z" fill="#fff"></path><path d="M3.032 21.752h20.832l-1.032 4.224H2l1.032-4.224z" fill="#29aae1"></path><path d="M2.912 21.608h21.312L26 25.976H4.688l-1.776-4.368z" fill="#29aae1"></path><path d="M10.136 24.848h7.584v.888h-7.584v-.888zM5.96 22.304h.552v.552H5.96v-.552zM6.944 22.328h.576v.552h-.576v-.552zM8.216 23.336h.576v.552h-.576v-.552zM8.024 22.256h.552v.576h-.552v-.576zM8.984 22.304h.576v.552h-.576v-.552zM9.92 22.256h.576v.576H9.92v-.576zM15.8 22.352h.576v.576H15.8v-.576zM16.664 22.352h.576v.576h-.576v-.576zM17.48 22.352h.576v.576h-.576v-.576zM18.464 22.352h.552v.576h-.552v-.576zM19.352 22.352h.552v.576h-.552v-.576zM18.296 23.288h.552v.552h-.552v-.552zM20.36 22.352h.576v.576h-.576v-.576zM9.296 23.312h.552v.552h-.552v-.552zM10.376 23.312h.552v.552h-.552v-.552zM17.408 23.264h.48v.552h-.48v-.552zM16.424 23.264H17v.552h-.576v-.552zM10.976 22.28h.576v.576h-.576v-.576zM12.056 22.304h.552v.576h-.552v-.576zM13.04 22.28h.552v.576h-.552v-.576zM14.12 22.28h.552v.576h-.552v-.576zM15.008 22.304h.552v.576h-.552v-.576zM11.336 23.288h.576v.552h-.576v-.552zM12.416 23.288h.552v.552h-.552v-.552zM13.4 23.312h.576v.552H13.4v-.552zM14.384 23.312h.552v.552h-.552v-.552zM15.392 23.264h.552v.552h-.552v-.552z" fill="#fff"></path><path d="M2.024 25.976L26 25.88l-1.704-4.272-21.24.048-1.032 4.32z" fill="none"></path><path d="M12.464 19.664h2.352v.264h-2.352v-.264zM12.56 21.296h2.232v.312H12.56v-.312z" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.208 4.14h19.488c.264 0 .264 0 .264.38V23.6c0 .38 0 .38-.264.38H4.208c-.264 0-.264 0-.264-.38V4.52c0-.38 0-.38.264-.38z" fill="#999"></path><path d="M2.432 4.16h1.08v19.8h-1.08V4.16z" fill="#29aae1"></path><path d="M2.864 14.04c0 5.46-.192 9.86-.432 9.86S2 19.5 2 14.04c0-5.46.192-9.86.432-9.86s.432 4.4.432 9.86zM24.224 4.02h1.272v19.86h-1.272V4.02z" fill="#29aae1"></path><path d="M26 13.94c0 5.5-.216 9.94-.504 9.94-.288 0-.528-4.44-.528-9.94 0-5.48.24-9.94.528-9.94.288 0 .504 4.46.504 9.94z" fill="#29aae1"></path><path d="M25.304 5.8c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.304 6.98c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.376 8.16c0 .2-.144.34-.288.34-.168 0-.288-.14-.288-.34 0-.18.12-.34.288-.34.144 0 .288.16.288.34zM6.464 5.96h7.2v4.4h-7.2v-4.4zM14.528 5.96h7.2v4.4h-7.2v-4.4zM14.552 11.44h7.2v4.4h-7.2v-4.4zM14.528 17.08h7.2v4.4h-7.2v-4.4zM6.416 17.08h7.2v4.4h-7.2v-4.4zM6.752 11.48H9.32c.288 0 .288 0 .288.4v3.58c0 .4 0 .4-.288.4H6.752c-.264 0-.264 0-.264-.4v-3.58c0-.4 0-.4.264-.4zM10.76 11.42h2.544c.288 0 .288 0 .288.4v3.66c0 .38 0 .38-.288.38H10.76c-.288 0-.288 0-.288-.38v-3.66c0-.4 0-.4.288-.4z" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h23.976v17.535H2V3.5z" fill="#29aae1"></path><path d="M20.24 22.42c0 1.135-2.784 2.08-6.216 2.08-3.432 0-6.216-.945-6.216-2.08 0-1.154 2.784-2.078 6.216-2.078 3.432 0 6.216.924 6.216 2.08z" fill="#29aae1"></path><path d="M9.224 21.014H18.8v.126H9.224v-.126zM12.536 4.844h3.144c8.352 0 8.352 0 8.352 1.113v10.815c0 1.113 0 1.113-8.352 1.113h-3.144c-8.352 0-8.352 0-8.352-1.113V5.957c0-1.113 0-1.113 8.352-1.113z" fill="#fff"></path><path d="M12.848 5.075h2.544c8.352 0 8.352 0 8.352 1.113v10.29c0 1.113 0 1.113-8.352 1.113h-2.544c-8.352 0-8.352 0-8.352-1.112V6.188c0-1.113 0-1.113 8.352-1.113z" fill="gray"></path><path d="M23.552 18.116c0 .336-.264.588-.624.588-.336 0-.624-.252-.624-.588 0-.315.288-.588.624-.588.36 0 .624.273.624.588zM21.944 18.2c0 .147-.144.273-.312.273-.192 0-.336-.126-.336-.273 0-.147.144-.252.336-.252.168 0 .312.105.312.252z" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h24v17.094H2V3.5z" fill="#29aae1"></path><path d="M12.104 20.468h4.2v2.982h-4.2v-2.982z" fill="#29aae1"></path><path d="M2.792 4.13h22.296v15.456H2.792V4.13z" fill="#fff"></path><path d="M3.104 4.508H24.68v14.7H3.104v-14.7z" fill="#999"></path><path d="M12.104 20.594h4.224v.147h-4.224v-.146z" fill="#fff"></path><path d="M14.168 22.127h.024c3.744 0 3.744 0 3.744 1.197s0 1.197-3.744 1.197h-.024c-3.744 0-3.744 0-3.744-1.196 0-1.197 0-1.197 3.744-1.197z" fill="#29aae1"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.956 9.944l2.016-.048 3.468 16.08h-8.1l2.616-16.032z" fill="#29aae1"></path><path d="M13.424 7.304h1.08v2.448h-1.08V7.304z" fill="#2188b4"></path><path d="M15.008 6.368c0 .72-.48 1.32-1.056 1.32-.576 0-1.044-.6-1.044-1.32 0-.72.468-1.32 1.044-1.32.576 0 1.056.6 1.056 1.32z" fill="#2188b4"></path><path d="M16.1 4.784c.324.36.504 1.056.48 1.776-.024.72-.396 1.416-.396 1.416s-.276.336-.048-.216c.24-.552.288-.768.324-.96.024-.192.048-.144.036-.552-.012-.408-.156-.84-.204-.888-.048-.048-.252-.456-.252-.456l.06-.12zM11.84 4.736c-.3.384-.468 1.08-.444 1.8.024.72.372 1.416.372 1.416s.264.312.036-.24c-.216-.528-.264-.768-.288-.96-.036-.192-.048-.144-.048-.552.012-.384.156-.816.192-.864.048-.072.24-.48.24-.48l-.06-.12zM17.36 3.512c.708.648 1.104 1.896 1.056 3.168-.06 1.272-.888 2.496-.888 2.496s-.6.576-.084-.384c.504-.96.624-1.368.696-1.704.072-.336.108-.264.084-.984-.024-.696-.336-1.464-.444-1.56-.108-.096-.564-.816-.564-.816l.144-.216zM10.76 3.248c-.732.696-1.128 2.016-1.068 3.36.06 1.344.9 2.64.9 2.64s.6.6.084-.408c-.516-1.032-.648-1.464-.708-1.824-.072-.36-.12-.264-.096-1.032.036-.744.348-1.536.456-1.656.108-.096.564-.84.564-.84l-.132-.24z" fill="#7fcced"></path><path d="M18.356 2.192c1.068.912 1.656 2.64 1.572 4.416-.084 1.752-1.32 3.456-1.32 3.456s-.888.816-.12-.528c.756-1.344.936-1.92 1.044-2.376.096-.48.156-.36.12-1.368-.036-.984-.504-2.016-.66-2.184-.156-.144-.84-1.128-.84-1.128l.204-.288zM9.728 2C8.612 2.936 8 4.688 8.084 6.512c.084 1.8 1.38 3.552 1.38 3.552s.924.816.132-.552c-.792-1.392-.984-1.968-1.092-2.448-.108-.48-.168-.36-.132-1.368.036-1.032.528-2.088.696-2.232.168-.144.876-1.152.876-1.152L9.728 2z" fill="#7fcced"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M19.256 13.904a5.23 5.23 0 0 1-5.232 5.232 5.23 5.23 0 0 1-5.232-5.232 5.244 5.244 0 0 1 5.232-5.232 5.244 5.244 0 0 1 5.232 5.232z" fill="#29aae1"></path><path d="M18.632 13.88c0 2.544-2.064 4.608-4.584 4.608-2.544 0-4.584-2.064-4.584-4.608 0-2.52 2.04-4.584 4.584-4.584a4.6 4.6 0 0 1 4.584 4.584z" fill="#fff"></path><path d="M15.056 3.056c0 .576-.48 1.032-1.056 1.032a1.024 1.024 0 0 1-1.032-1.032C12.968 2.48 13.424 2 14 2c.576 0 1.056.48 1.056 1.056zM14.96 24.968c0 .576-.456 1.032-1.032 1.032-.576 0-1.056-.456-1.056-1.032 0-.6.48-1.056 1.056-1.056.576 0 1.032.456 1.032 1.056zM4.088 14.096c0 .6-.456 1.056-1.032 1.056-.6 0-1.056-.456-1.056-1.056 0-.576.456-1.032 1.056-1.032.576 0 1.032.456 1.032 1.032zM26 14.312c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.056 1.056-1.056.576 0 1.032.48 1.032 1.056zM6.488 5.696c0 .576-.48 1.056-1.056 1.056-.576 0-1.032-.48-1.032-1.056 0-.576.456-1.056 1.032-1.056.576 0 1.056.48 1.056 1.056zM23.504 22.856c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.032 1.056-1.032.576 0 1.032.456 1.032 1.032zM23.72 5.72c0 .6-.48 1.056-1.056 1.056-.576 0-1.032-.456-1.032-1.056 0-.576.456-1.032 1.032-1.032.576 0 1.056.456 1.056 1.032zM7.064 22.904c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.056 1.056-1.056.576 0 1.032.48 1.032 1.056z" fill="#29aae1"></path><path d="M13.664 4.232h.768v4.176h-.768V4.232zM13.568 19.448h.768v4.176h-.768v-4.176zM19.448 14.672l.024-.768 4.176.048-.024.768-4.176-.048zM4.4 14.528v-.768h4.176v.768H4.4zM21.248 6.584l.72.528-3.192 3.6-.72-.552 3.192-3.576zM9.944 17.936l.72.528-3.192 3.6-.72-.552 3.192-3.576zM10.232 9.68l-.576.696-3.384-3.408.576-.696 3.384 3.408zM21.704 21.488l-.576.696-3.384-3.408.576-.696 3.384 3.408z" fill="#7fcced"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 14.888h23.976V24.2H2v-9.312z" fill="#29aae1"></path><path d="M3.152 25.256h21.672v.72H3.152v-.72z" fill="#2188b4"></path><path d="M3.128 18.44H5.36v1.176H3.128V18.44z" fill="#fff"></path><path d="M4.208 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM6.56 18.44h2.232v1.176H6.56V18.44z" fill="#fff"></path><path d="M7.64 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM10.184 18.44h2.232v1.176h-2.232V18.44z" fill="#fff"></path><path d="M11.264 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM13.712 18.44h2.232v1.176h-2.232V18.44z" fill="#fff"></path><path d="M14.792 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672z" fill="#fff"></path><path d="M23.576 8.792c.912.216.912.216.744 1.32l-.864 5.496c-.168 1.128-.168 1.128-1.08.912-.888-.216-.888-.216-.72-1.32l.84-5.52c.192-1.104.192-1.104 1.08-.888z" fill="#29aae1"></path><path d="M24.536 2.696c.552.144.552.144.456.816l-.912 5.736c-.096.672-.096.672-.648.552-.576-.144-.576-.144-.456-.816l.888-5.736c.096-.672.096-.672.672-.552z" fill="#29aae1"></path><path d="M18.728 15.608h6.432v7.584h-6.432v-7.584z" fill="#fff"></path><path d="M18.944 15.872h5.976v7.032h-5.976v-7.032z" fill="#7fcced"></path><path d="M21.824 16.208l-.72.936h.384l.024 1.296h.744l-.072-1.296h.384l-.744-.936zM21.944 22.352l.72-.888-.36-.024-.024-1.296-.744-.024.072 1.296H21.2l.744.936zM22.208 19.352l.72.936.024-.456h1.032l.048-.912-1.056.048v-.336l.024-.144-.792.864zM21.584 19.352l-.72-.912-.024.456-1.032-.024-.048.912 1.056-.048v.36l-.024.144.792-.888z" fill="#fff"></path><path d="M4.352 8.312c.888-.216.888-.216 1.056.888l.864 5.496c.192 1.128.192 1.128-.72 1.344-.912.216-.912.216-1.08-.912l-.864-5.496c-.168-1.104-.168-1.104.744-1.32z" fill="#29aae1"></path><path d="M3.392 2.216c.552-.144.552-.144.672.552l.888 5.736c.096.672.096.672-.456.816-.552.12-.552.12-.648-.552l-.912-5.736c-.096-.696-.096-.696.456-.816z" fill="#29aae1"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.24 20.624h1.896v1.656H11.24v-1.656zM18.464 2H26v21.648h-7.536V2z" fill="#29aae1"></path><path d="M2.12 5.648h19.944v15H2.12v-15z" fill="#29aae1"></path><path d="M3.032 6.56h18.192v13.416H3.032V6.56z" fill="#fff"></path><path d="M3.464 6.872h17.28v12.672H3.464V6.872z" fill="#fff"></path><path d="M2.912 22.4H21.08l-.888 3.576H2l.912-3.576z" fill="#29aae1"></path><path d="M2.792 22.28h18.6l1.56 3.72h-18.6l-1.56-3.72z" fill="#29aae1"></path><path d="M9.104 25.04h6.624v.744H9.104v-.744zM5.456 22.856h.504v.48h-.504v-.48zM6.32 22.88h.504v.48H6.32v-.48zM7.448 23.744h.48v.48h-.48v-.48zM7.256 22.832h.504v.48h-.504v-.48zM8.096 22.856H8.6v.48h-.504v-.48zM8.936 22.832h.48v.48h-.48v-.48zM14.048 22.904h.504v.48h-.504v-.48zM14.816 22.904h.48v.48h-.48v-.48zM15.512 22.904h.504v.48h-.504v-.48zM16.352 22.904h.504v.48h-.504v-.48zM17.144 22.904h.48v.48h-.48v-.48zM16.208 23.696h.504v.48h-.504v-.48zM18.032 22.904h.504v.48h-.504v-.48zM8.36 23.72h.504v.48H8.36v-.48zM9.32 23.72h.48v.48h-.48v-.48zM15.44 23.672h.432v.48h-.432v-.48zM14.6 23.672h.48v.48h-.48v-.48zM9.848 22.856h.48v.48h-.48v-.48zM10.76 22.88h.504v.48h-.504v-.48zM11.624 22.856h.504v.48h-.504v-.48zM12.584 22.856h.48v.48h-.48v-.48zM13.352 22.88h.504v.48h-.504v-.48zM10.16 23.696h.48v.48h-.48v-.48zM11.072 23.696h.504v.48h-.504v-.48zM11.96 23.72h.48v.48h-.48v-.48zM12.8 23.72h.504v.48H12.8v-.48zM13.688 23.672h.48v.48h-.48v-.48z" fill="#fff"></path><path d="M2.024 25.976l20.928-.072-1.488-3.624-18.528.024-.912 3.672z" fill="none"></path><path d="M23.792 3.128h1.344c.144 0 .144 0 .144.168s0 .168-.144.168h-1.344c-.144 0-.144 0-.144-.168s0-.168.144-.168zM23.792 3.92h1.368c.12 0 .12 0 .12.144s0 .144-.12.144h-1.368c-.144 0-.144 0-.144-.144s0-.144.144-.144zM18.488 5.408h3.624V5.6h-3.624v-.192zM22.112 5.408h.168v15.288h-.168V5.408z" fill="#fff"></path><path d="M18.464 20.672h3.792v.216h-3.792v-.216zM18.488 21.896h2.904c.144 0 .144 0 .144.168 0 .192 0 .192-.144.192h-2.904c-.144 0-.144 0-.144-.192 0-.168 0-.168.144-.168z" fill="#fff"></path><path d="M21.512 21.944l.816 1.656-.24.168-.792-1.68.216-.144zM11.144 20.624h2.04v.24h-2.04v-.24zM11.216 22.016h1.944v.264h-1.944v-.264z" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.584 19.664h2.16v1.968h-2.16v-1.968zM2.144 2h22.848v17.664H2.144V2z" fill="#29aae1"></path><path d="M3.176 3.08h20.856v15.792H3.176V3.08z" fill="#fff"></path><path d="M3.68 3.44h19.776v14.928H3.68V3.44z" fill="#fff"></path><path d="M3.032 21.752h20.832l-1.032 4.224H2l1.032-4.224z" fill="#29aae1"></path><path d="M2.912 21.608h21.312L26 25.976H4.688l-1.776-4.368z" fill="#29aae1"></path><path d="M10.136 24.848h7.584v.888h-7.584v-.888zM5.96 22.304h.552v.552H5.96v-.552zM6.944 22.328h.576v.552h-.576v-.552zM8.216 23.336h.576v.552h-.576v-.552zM8.024 22.256h.552v.576h-.552v-.576zM8.984 22.304h.576v.552h-.576v-.552zM9.92 22.256h.576v.576H9.92v-.576zM15.8 22.352h.576v.576H15.8v-.576zM16.664 22.352h.576v.576h-.576v-.576zM17.48 22.352h.576v.576h-.576v-.576zM18.464 22.352h.552v.576h-.552v-.576zM19.352 22.352h.552v.576h-.552v-.576zM18.296 23.288h.552v.552h-.552v-.552zM20.36 22.352h.576v.576h-.576v-.576zM9.296 23.312h.552v.552h-.552v-.552zM10.376 23.312h.552v.552h-.552v-.552zM17.408 23.264h.48v.552h-.48v-.552zM16.424 23.264H17v.552h-.576v-.552zM10.976 22.28h.576v.576h-.576v-.576zM12.056 22.304h.552v.576h-.552v-.576zM13.04 22.28h.552v.576h-.552v-.576zM14.12 22.28h.552v.576h-.552v-.576zM15.008 22.304h.552v.576h-.552v-.576zM11.336 23.288h.576v.552h-.576v-.552zM12.416 23.288h.552v.552h-.552v-.552zM13.4 23.312h.576v.552H13.4v-.552zM14.384 23.312h.552v.552h-.552v-.552zM15.392 23.264h.552v.552h-.552v-.552z" fill="#fff"></path><path d="M2.024 25.976L26 25.88l-1.704-4.272-21.24.048-1.032 4.32z" fill="none"></path><path d="M12.464 19.664h2.352v.264h-2.352v-.264zM12.56 21.296h2.232v.312H12.56v-.312z" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.208 4.14h19.488c.264 0 .264 0 .264.38V23.6c0 .38 0 .38-.264.38H4.208c-.264 0-.264 0-.264-.38V4.52c0-.38 0-.38.264-.38z" fill="#999"></path><path d="M2.432 4.16h1.08v19.8h-1.08V4.16z" fill="#29aae1"></path><path d="M2.864 14.04c0 5.46-.192 9.86-.432 9.86S2 19.5 2 14.04c0-5.46.192-9.86.432-9.86s.432 4.4.432 9.86zM24.224 4.02h1.272v19.86h-1.272V4.02z" fill="#29aae1"></path><path d="M26 13.94c0 5.5-.216 9.94-.504 9.94-.288 0-.528-4.44-.528-9.94 0-5.48.24-9.94.528-9.94.288 0 .504 4.46.504 9.94z" fill="#29aae1"></path><path d="M25.304 5.8c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.304 6.98c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.376 8.16c0 .2-.144.34-.288.34-.168 0-.288-.14-.288-.34 0-.18.12-.34.288-.34.144 0 .288.16.288.34zM6.464 5.96h7.2v4.4h-7.2v-4.4zM14.528 5.96h7.2v4.4h-7.2v-4.4zM14.552 11.44h7.2v4.4h-7.2v-4.4zM14.528 17.08h7.2v4.4h-7.2v-4.4zM6.416 17.08h7.2v4.4h-7.2v-4.4zM6.752 11.48H9.32c.288 0 .288 0 .288.4v3.58c0 .4 0 .4-.288.4H6.752c-.264 0-.264 0-.264-.4v-3.58c0-.4 0-.4.264-.4zM10.76 11.42h2.544c.288 0 .288 0 .288.4v3.66c0 .38 0 .38-.288.38H10.76c-.288 0-.288 0-.288-.38v-3.66c0-.4 0-.4.288-.4z" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h23.976v17.535H2V3.5z" fill="#29aae1"></path><path d="M20.24 22.42c0 1.135-2.784 2.08-6.216 2.08-3.432 0-6.216-.945-6.216-2.08 0-1.154 2.784-2.078 6.216-2.078 3.432 0 6.216.924 6.216 2.08z" fill="#29aae1"></path><path d="M9.224 21.014H18.8v.126H9.224v-.126zM12.536 4.844h3.144c8.352 0 8.352 0 8.352 1.113v10.815c0 1.113 0 1.113-8.352 1.113h-3.144c-8.352 0-8.352 0-8.352-1.113V5.957c0-1.113 0-1.113 8.352-1.113z" fill="#fff"></path><path d="M12.848 5.075h2.544c8.352 0 8.352 0 8.352 1.113v10.29c0 1.113 0 1.113-8.352 1.113h-2.544c-8.352 0-8.352 0-8.352-1.112V6.188c0-1.113 0-1.113 8.352-1.113z" fill="gray"></path><path d="M23.552 18.116c0 .336-.264.588-.624.588-.336 0-.624-.252-.624-.588 0-.315.288-.588.624-.588.36 0 .624.273.624.588zM21.944 18.2c0 .147-.144.273-.312.273-.192 0-.336-.126-.336-.273 0-.147.144-.252.336-.252.168 0 .312.105.312.252z" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h24v17.094H2V3.5z" fill="#29aae1"></path><path d="M12.104 20.468h4.2v2.982h-4.2v-2.982z" fill="#29aae1"></path><path d="M2.792 4.13h22.296v15.456H2.792V4.13z" fill="#fff"></path><path d="M3.104 4.508H24.68v14.7H3.104v-14.7z" fill="#999"></path><path d="M12.104 20.594h4.224v.147h-4.224v-.146z" fill="#fff"></path><path d="M14.168 22.127h.024c3.744 0 3.744 0 3.744 1.197s0 1.197-3.744 1.197h-.024c-3.744 0-3.744 0-3.744-1.196 0-1.197 0-1.197 3.744-1.197z" fill="#29aae1"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.956 9.944l2.016-.048 3.468 16.08h-8.1l2.616-16.032z" fill="#29aae1"></path><path d="M13.424 7.304h1.08v2.448h-1.08V7.304z" fill="#2188b4"></path><path d="M15.008 6.368c0 .72-.48 1.32-1.056 1.32-.576 0-1.044-.6-1.044-1.32 0-.72.468-1.32 1.044-1.32.576 0 1.056.6 1.056 1.32z" fill="#2188b4"></path><path d="M16.1 4.784c.324.36.504 1.056.48 1.776-.024.72-.396 1.416-.396 1.416s-.276.336-.048-.216c.24-.552.288-.768.324-.96.024-.192.048-.144.036-.552-.012-.408-.156-.84-.204-.888-.048-.048-.252-.456-.252-.456l.06-.12zM11.84 4.736c-.3.384-.468 1.08-.444 1.8.024.72.372 1.416.372 1.416s.264.312.036-.24c-.216-.528-.264-.768-.288-.96-.036-.192-.048-.144-.048-.552.012-.384.156-.816.192-.864.048-.072.24-.48.24-.48l-.06-.12zM17.36 3.512c.708.648 1.104 1.896 1.056 3.168-.06 1.272-.888 2.496-.888 2.496s-.6.576-.084-.384c.504-.96.624-1.368.696-1.704.072-.336.108-.264.084-.984-.024-.696-.336-1.464-.444-1.56-.108-.096-.564-.816-.564-.816l.144-.216zM10.76 3.248c-.732.696-1.128 2.016-1.068 3.36.06 1.344.9 2.64.9 2.64s.6.6.084-.408c-.516-1.032-.648-1.464-.708-1.824-.072-.36-.12-.264-.096-1.032.036-.744.348-1.536.456-1.656.108-.096.564-.84.564-.84l-.132-.24z" fill="#7fcced"></path><path d="M18.356 2.192c1.068.912 1.656 2.64 1.572 4.416-.084 1.752-1.32 3.456-1.32 3.456s-.888.816-.12-.528c.756-1.344.936-1.92 1.044-2.376.096-.48.156-.36.12-1.368-.036-.984-.504-2.016-.66-2.184-.156-.144-.84-1.128-.84-1.128l.204-.288zM9.728 2C8.612 2.936 8 4.688 8.084 6.512c.084 1.8 1.38 3.552 1.38 3.552s.924.816.132-.552c-.792-1.392-.984-1.968-1.092-2.448-.108-.48-.168-.36-.132-1.368.036-1.032.528-2.088.696-2.232.168-.144.876-1.152.876-1.152L9.728 2z" fill="#7fcced"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M19.256 13.904a5.23 5.23 0 0 1-5.232 5.232 5.23 5.23 0 0 1-5.232-5.232 5.244 5.244 0 0 1 5.232-5.232 5.244 5.244 0 0 1 5.232 5.232z" fill="#29aae1"></path><path d="M18.632 13.88c0 2.544-2.064 4.608-4.584 4.608-2.544 0-4.584-2.064-4.584-4.608 0-2.52 2.04-4.584 4.584-4.584a4.6 4.6 0 0 1 4.584 4.584z" fill="#fff"></path><path d="M15.056 3.056c0 .576-.48 1.032-1.056 1.032a1.024 1.024 0 0 1-1.032-1.032C12.968 2.48 13.424 2 14 2c.576 0 1.056.48 1.056 1.056zM14.96 24.968c0 .576-.456 1.032-1.032 1.032-.576 0-1.056-.456-1.056-1.032 0-.6.48-1.056 1.056-1.056.576 0 1.032.456 1.032 1.056zM4.088 14.096c0 .6-.456 1.056-1.032 1.056-.6 0-1.056-.456-1.056-1.056 0-.576.456-1.032 1.056-1.032.576 0 1.032.456 1.032 1.032zM26 14.312c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.056 1.056-1.056.576 0 1.032.48 1.032 1.056zM6.488 5.696c0 .576-.48 1.056-1.056 1.056-.576 0-1.032-.48-1.032-1.056 0-.576.456-1.056 1.032-1.056.576 0 1.056.48 1.056 1.056zM23.504 22.856c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.032 1.056-1.032.576 0 1.032.456 1.032 1.032zM23.72 5.72c0 .6-.48 1.056-1.056 1.056-.576 0-1.032-.456-1.032-1.056 0-.576.456-1.032 1.032-1.032.576 0 1.056.456 1.056 1.032zM7.064 22.904c0 .576-.456 1.056-1.032 1.056-.576 0-1.056-.48-1.056-1.056 0-.576.48-1.056 1.056-1.056.576 0 1.032.48 1.032 1.056z" fill="#29aae1"></path><path d="M13.664 4.232h.768v4.176h-.768V4.232zM13.568 19.448h.768v4.176h-.768v-4.176zM19.448 14.672l.024-.768 4.176.048-.024.768-4.176-.048zM4.4 14.528v-.768h4.176v.768H4.4zM21.248 6.584l.72.528-3.192 3.6-.72-.552 3.192-3.576zM9.944 17.936l.72.528-3.192 3.6-.72-.552 3.192-3.576zM10.232 9.68l-.576.696-3.384-3.408.576-.696 3.384 3.408zM21.704 21.488l-.576.696-3.384-3.408.576-.696 3.384 3.408z" fill="#7fcced"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 14.888h23.976V24.2H2v-9.312z" fill="#29aae1"></path><path d="M3.152 25.256h21.672v.72H3.152v-.72z" fill="#2188b4"></path><path d="M3.128 18.44H5.36v1.176H3.128V18.44z" fill="#fff"></path><path d="M4.208 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM6.56 18.44h2.232v1.176H6.56V18.44z" fill="#fff"></path><path d="M7.64 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM10.184 18.44h2.232v1.176h-2.232V18.44z" fill="#fff"></path><path d="M11.264 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672zM13.712 18.44h2.232v1.176h-2.232V18.44z" fill="#fff"></path><path d="M14.792 19.232c.528 0 .528 0 .528.672v.12c0 .648 0 .648-.528.648s-.528 0-.528-.648v-.12c0-.672 0-.672.528-.672z" fill="#fff"></path><path d="M23.576 8.792c.912.216.912.216.744 1.32l-.864 5.496c-.168 1.128-.168 1.128-1.08.912-.888-.216-.888-.216-.72-1.32l.84-5.52c.192-1.104.192-1.104 1.08-.888z" fill="#29aae1"></path><path d="M24.536 2.696c.552.144.552.144.456.816l-.912 5.736c-.096.672-.096.672-.648.552-.576-.144-.576-.144-.456-.816l.888-5.736c.096-.672.096-.672.672-.552z" fill="#29aae1"></path><path d="M18.728 15.608h6.432v7.584h-6.432v-7.584z" fill="#fff"></path><path d="M18.944 15.872h5.976v7.032h-5.976v-7.032z" fill="#7fcced"></path><path d="M21.824 16.208l-.72.936h.384l.024 1.296h.744l-.072-1.296h.384l-.744-.936zM21.944 22.352l.72-.888-.36-.024-.024-1.296-.744-.024.072 1.296H21.2l.744.936zM22.208 19.352l.72.936.024-.456h1.032l.048-.912-1.056.048v-.336l.024-.144-.792.864zM21.584 19.352l-.72-.912-.024.456-1.032-.024-.048.912 1.056-.048v.36l-.024.144.792-.888z" fill="#fff"></path><path d="M4.352 8.312c.888-.216.888-.216 1.056.888l.864 5.496c.192 1.128.192 1.128-.72 1.344-.912.216-.912.216-1.08-.912l-.864-5.496c-.168-1.104-.168-1.104.744-1.32z" fill="#29aae1"></path><path d="M3.392 2.216c.552-.144.552-.144.672.552l.888 5.736c.096.672.096.672-.456.816-.552.12-.552.12-.648-.552l-.912-5.736c-.096-.696-.096-.696.456-.816z" fill="#29aae1"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.24 20.624h1.896v1.656H11.24v-1.656zM18.464 2H26v21.648h-7.536V2z" fill="#29aae1"></path><path d="M2.12 5.648h19.944v15H2.12v-15z" fill="#29aae1"></path><path d="M3.032 6.56h18.192v13.416H3.032V6.56z" fill="#fff"></path><path d="M3.464 6.872h17.28v12.672H3.464V6.872z" fill="#fff"></path><path d="M2.912 22.4H21.08l-.888 3.576H2l.912-3.576z" fill="#29aae1"></path><path d="M2.792 22.28h18.6l1.56 3.72h-18.6l-1.56-3.72z" fill="#29aae1"></path><path d="M9.104 25.04h6.624v.744H9.104v-.744zM5.456 22.856h.504v.48h-.504v-.48zM6.32 22.88h.504v.48H6.32v-.48zM7.448 23.744h.48v.48h-.48v-.48zM7.256 22.832h.504v.48h-.504v-.48zM8.096 22.856H8.6v.48h-.504v-.48zM8.936 22.832h.48v.48h-.48v-.48zM14.048 22.904h.504v.48h-.504v-.48zM14.816 22.904h.48v.48h-.48v-.48zM15.512 22.904h.504v.48h-.504v-.48zM16.352 22.904h.504v.48h-.504v-.48zM17.144 22.904h.48v.48h-.48v-.48zM16.208 23.696h.504v.48h-.504v-.48zM18.032 22.904h.504v.48h-.504v-.48zM8.36 23.72h.504v.48H8.36v-.48zM9.32 23.72h.48v.48h-.48v-.48zM15.44 23.672h.432v.48h-.432v-.48zM14.6 23.672h.48v.48h-.48v-.48zM9.848 22.856h.48v.48h-.48v-.48zM10.76 22.88h.504v.48h-.504v-.48zM11.624 22.856h.504v.48h-.504v-.48zM12.584 22.856h.48v.48h-.48v-.48zM13.352 22.88h.504v.48h-.504v-.48zM10.16 23.696h.48v.48h-.48v-.48zM11.072 23.696h.504v.48h-.504v-.48zM11.96 23.72h.48v.48h-.48v-.48zM12.8 23.72h.504v.48H12.8v-.48zM13.688 23.672h.48v.48h-.48v-.48z" fill="#fff"></path><path d="M2.024 25.976l20.928-.072-1.488-3.624-18.528.024-.912 3.672z" fill="none"></path><path d="M23.792 3.128h1.344c.144 0 .144 0 .144.168s0 .168-.144.168h-1.344c-.144 0-.144 0-.144-.168s0-.168.144-.168zM23.792 3.92h1.368c.12 0 .12 0 .12.144s0 .144-.12.144h-1.368c-.144 0-.144 0-.144-.144s0-.144.144-.144zM18.488 5.408h3.624V5.6h-3.624v-.192zM22.112 5.408h.168v15.288h-.168V5.408z" fill="#fff"></path><path d="M18.464 20.672h3.792v.216h-3.792v-.216zM18.488 21.896h2.904c.144 0 .144 0 .144.168 0 .192 0 .192-.144.192h-2.904c-.144 0-.144 0-.144-.192 0-.168 0-.168.144-.168z" fill="#fff"></path><path d="M21.512 21.944l.816 1.656-.24.168-.792-1.68.216-.144zM11.144 20.624h2.04v.24h-2.04v-.24zM11.216 22.016h1.944v.264h-1.944v-.264z" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M12.584 19.664h2.16v1.968h-2.16v-1.968zM2.144 2h22.848v17.664H2.144V2z" fill="#29aae1"></path><path d="M3.176 3.08h20.856v15.792H3.176V3.08z" fill="#fff"></path><path d="M3.68 3.44h19.776v14.928H3.68V3.44z" fill="#fff"></path><path d="M3.032 21.752h20.832l-1.032 4.224H2l1.032-4.224z" fill="#29aae1"></path><path d="M2.912 21.608h21.312L26 25.976H4.688l-1.776-4.368z" fill="#29aae1"></path><path d="M10.136 24.848h7.584v.888h-7.584v-.888zM5.96 22.304h.552v.552H5.96v-.552zM6.944 22.328h.576v.552h-.576v-.552zM8.216 23.336h.576v.552h-.576v-.552zM8.024 22.256h.552v.576h-.552v-.576zM8.984 22.304h.576v.552h-.576v-.552zM9.92 22.256h.576v.576H9.92v-.576zM15.8 22.352h.576v.576H15.8v-.576zM16.664 22.352h.576v.576h-.576v-.576zM17.48 22.352h.576v.576h-.576v-.576zM18.464 22.352h.552v.576h-.552v-.576zM19.352 22.352h.552v.576h-.552v-.576zM18.296 23.288h.552v.552h-.552v-.552zM20.36 22.352h.576v.576h-.576v-.576zM9.296 23.312h.552v.552h-.552v-.552zM10.376 23.312h.552v.552h-.552v-.552zM17.408 23.264h.48v.552h-.48v-.552zM16.424 23.264H17v.552h-.576v-.552zM10.976 22.28h.576v.576h-.576v-.576zM12.056 22.304h.552v.576h-.552v-.576zM13.04 22.28h.552v.576h-.552v-.576zM14.12 22.28h.552v.576h-.552v-.576zM15.008 22.304h.552v.576h-.552v-.576zM11.336 23.288h.576v.552h-.576v-.552zM12.416 23.288h.552v.552h-.552v-.552zM13.4 23.312h.576v.552H13.4v-.552zM14.384 23.312h.552v.552h-.552v-.552zM15.392 23.264h.552v.552h-.552v-.552z" fill="#fff"></path><path d="M2.024 25.976L26 25.88l-1.704-4.272-21.24.048-1.032 4.32z" fill="none"></path><path d="M12.464 19.664h2.352v.264h-2.352v-.264zM12.56 21.296h2.232v.312H12.56v-.312z" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M4.208 4.14h19.488c.264 0 .264 0 .264.38V23.6c0 .38 0 .38-.264.38H4.208c-.264 0-.264 0-.264-.38V4.52c0-.38 0-.38.264-.38z" fill="#999"></path><path d="M2.432 4.16h1.08v19.8h-1.08V4.16z" fill="#29aae1"></path><path d="M2.864 14.04c0 5.46-.192 9.86-.432 9.86S2 19.5 2 14.04c0-5.46.192-9.86.432-9.86s.432 4.4.432 9.86zM24.224 4.02h1.272v19.86h-1.272V4.02z" fill="#29aae1"></path><path d="M26 13.94c0 5.5-.216 9.94-.504 9.94-.288 0-.528-4.44-.528-9.94 0-5.48.24-9.94.528-9.94.288 0 .504 4.46.504 9.94z" fill="#29aae1"></path><path d="M25.304 5.8c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.304 6.98c0 .18-.12.34-.288.34-.144 0-.288-.16-.288-.34 0-.18.144-.34.288-.34.168 0 .288.16.288.34zM25.376 8.16c0 .2-.144.34-.288.34-.168 0-.288-.14-.288-.34 0-.18.12-.34.288-.34.144 0 .288.16.288.34zM6.464 5.96h7.2v4.4h-7.2v-4.4zM14.528 5.96h7.2v4.4h-7.2v-4.4zM14.552 11.44h7.2v4.4h-7.2v-4.4zM14.528 17.08h7.2v4.4h-7.2v-4.4zM6.416 17.08h7.2v4.4h-7.2v-4.4zM6.752 11.48H9.32c.288 0 .288 0 .288.4v3.58c0 .4 0 .4-.288.4H6.752c-.264 0-.264 0-.264-.4v-3.58c0-.4 0-.4.264-.4zM10.76 11.42h2.544c.288 0 .288 0 .288.4v3.66c0 .38 0 .38-.288.38H10.76c-.288 0-.288 0-.288-.38v-3.66c0-.4 0-.4.288-.4z" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h23.976v17.535H2V3.5z" fill="#29aae1"></path><path d="M20.24 22.42c0 1.135-2.784 2.08-6.216 2.08-3.432 0-6.216-.945-6.216-2.08 0-1.154 2.784-2.078 6.216-2.078 3.432 0 6.216.924 6.216 2.08z" fill="#29aae1"></path><path d="M9.224 21.014H18.8v.126H9.224v-.126zM12.536 4.844h3.144c8.352 0 8.352 0 8.352 1.113v10.815c0 1.113 0 1.113-8.352 1.113h-3.144c-8.352 0-8.352 0-8.352-1.113V5.957c0-1.113 0-1.113 8.352-1.113z" fill="#fff"></path><path d="M12.848 5.075h2.544c8.352 0 8.352 0 8.352 1.113v10.29c0 1.113 0 1.113-8.352 1.113h-2.544c-8.352 0-8.352 0-8.352-1.112V6.188c0-1.113 0-1.113 8.352-1.113z" fill="gray"></path><path d="M23.552 18.116c0 .336-.264.588-.624.588-.336 0-.624-.252-.624-.588 0-.315.288-.588.624-.588.36 0 .624.273.624.588zM21.944 18.2c0 .147-.144.273-.312.273-.192 0-.336-.126-.336-.273 0-.147.144-.252.336-.252.168 0 .312.105.312.252z" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 3.5h24v17.094H2V3.5z" fill="#29aae1"></path><path d="M12.104 20.468h4.2v2.982h-4.2v-2.982z" fill="#29aae1"></path><path d="M2.792 4.13h22.296v15.456H2.792V4.13z" fill="#fff"></path><path d="M3.104 4.508H24.68v14.7H3.104v-14.7z" fill="#999"></path><path d="M12.104 20.594h4.224v.147h-4.224v-.146z" fill="#fff"></path><path d="M14.168 22.127h.024c3.744 0 3.744 0 3.744 1.197s0 1.197-3.744 1.197h-.024c-3.744 0-3.744 0-3.744-1.196 0-1.197 0-1.197 3.744-1.197z" fill="#29aae1"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 38,
            "groupname": "Video",
            "lucidgroup": "Video",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="56" height="56"><defs><image width="1" height="1" id="ltb_2211a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/video/lucid_youtube.png" preserveAspectRatio="none"></image><pattern id="ltb_2211b" patternUnits="userSpaceOnUse" width="54" height="43.826"><use xlink:href="#ltb_2211a" transform="matrix(52 0 0 52 2 2)"></use></pattern></defs><path d="M2 12.174h52v31.652H2z" fill="url(#ltb_2211b)"></path><path d="M24.043 25.362v4.22c0 .583.473 1.056 1.056 1.056h5.8c.584 0 1.057-.473 1.057-1.055v-3.166c0-.582-.473-1.055-1.056-1.055h-5.8c-.584 0-1.057.473-1.057 1.055z" fill="#d41e20"></path><path d="M26.813 26.68l2.77 1.32-2.77 1.32z" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 21,
            "groupname": "Server Rack Diagram",
            "lucidgroup": "Server Rack Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1826a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1826a)"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1826a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1826a)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825a" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825b" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825c" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825d" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825e" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825f" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M9.29 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825a)"></path><path d="M18.14 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825b)"></path><path d="M9.86 2h8.28v.91H9.86z" stroke="#000" fill="url(#ltb_1825c)"></path><path d="M9.86 25.09h8.28V26H9.86z" stroke="#000" fill="url(#ltb_1825d)"></path><path d="M9.86 2.91h1.368v22.18H9.86z" stroke="#000" fill="url(#ltb_1825e)"></path><path d="M16.772 2.91h1.367v22.18H16.77z" stroke="#000" fill="url(#ltb_1825f)"></path><path d="M10.544 2h6.912v24h-6.912z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1828a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1828a)"></path><path d="M-23.87 14.897h36.578v2.243h-36.58zM-23.87 10.86h36.578v2.243h-36.58zM14 10.86h37.87v6.28H14z" stroke="#000" stroke-width=".449" fill="none"></path><path d="M22.48 12.206h21.477v2.243H22.48z" stroke="#000" stroke-width=".449" fill="#00d34c"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1832a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1832a)"></path><path d="M-18.3 10.41h64.6v7.18h-64.6z" stroke="#000" stroke-width=".449" fill="#85dcff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1826a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1826a)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825a" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825b" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825c" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825d" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825e" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825f" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M9.29 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825a)"></path><path d="M18.14 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825b)"></path><path d="M9.86 2h8.28v.91H9.86z" stroke="#000" fill="url(#ltb_1825c)"></path><path d="M9.86 25.09h8.28V26H9.86z" stroke="#000" fill="url(#ltb_1825d)"></path><path d="M9.86 2.91h1.368v22.18H9.86z" stroke="#000" fill="url(#ltb_1825e)"></path><path d="M16.772 2.91h1.367v22.18H16.77z" stroke="#000" fill="url(#ltb_1825f)"></path><path d="M10.544 2h6.912v24h-6.912z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1828a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1828a)"></path><path d="M-23.87 14.897h36.578v2.243h-36.58zM-23.87 10.86h36.578v2.243h-36.58zM14 10.86h37.87v6.28H14z" stroke="#000" stroke-width=".449" fill="none"></path><path d="M22.48 12.206h21.477v2.243H22.48z" stroke="#000" stroke-width=".449" fill="#00d34c"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1832a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1832a)"></path><path d="M-18.3 10.41h64.6v7.18h-64.6z" stroke="#000" stroke-width=".449" fill="#85dcff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1826a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1826a)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825a" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825b" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825c" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825d" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825e" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825f" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M9.29 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825a)"></path><path d="M18.14 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825b)"></path><path d="M9.86 2h8.28v.91H9.86z" stroke="#000" fill="url(#ltb_1825c)"></path><path d="M9.86 25.09h8.28V26H9.86z" stroke="#000" fill="url(#ltb_1825d)"></path><path d="M9.86 2.91h1.368v22.18H9.86z" stroke="#000" fill="url(#ltb_1825e)"></path><path d="M16.772 2.91h1.367v22.18H16.77z" stroke="#000" fill="url(#ltb_1825f)"></path><path d="M10.544 2h6.912v24h-6.912z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1828a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1828a)"></path><path d="M-23.87 14.897h36.578v2.243h-36.58zM-23.87 10.86h36.578v2.243h-36.58zM14 10.86h37.87v6.28H14z" stroke="#000" stroke-width=".449" fill="none"></path><path d="M22.48 12.206h21.477v2.243H22.48z" stroke="#000" stroke-width=".449" fill="#00d34c"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1832a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1832a)"></path><path d="M-18.3 10.41h64.6v7.18h-64.6z" stroke="#000" stroke-width=".449" fill="#85dcff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1826a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1826a)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825a" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825b" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825c" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825d" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825e" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1825f" x1="18.709" y1="2" x2="18.709" y2="26"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M9.29 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825a)"></path><path d="M18.14 2h.57v24h-.57z" stroke="#000" fill="url(#ltb_1825b)"></path><path d="M9.86 2h8.28v.91H9.86z" stroke="#000" fill="url(#ltb_1825c)"></path><path d="M9.86 25.09h8.28V26H9.86z" stroke="#000" fill="url(#ltb_1825d)"></path><path d="M9.86 2.91h1.368v22.18H9.86z" stroke="#000" fill="url(#ltb_1825e)"></path><path d="M16.772 2.91h1.367v22.18H16.77z" stroke="#000" fill="url(#ltb_1825f)"></path><path d="M10.544 2h6.912v24h-6.912z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1828a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1828a)"></path><path d="M-23.87 14.897h36.578v2.243h-36.58zM-23.87 10.86h36.578v2.243h-36.58zM14 10.86h37.87v6.28H14z" stroke="#000" stroke-width=".449" fill="none"></path><path d="M22.48 12.206h21.477v2.243H22.48z" stroke="#000" stroke-width=".449" fill="#00d34c"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><linearGradient gradientUnits="userSpaceOnUse" id="ltb_1832a" x1="26" y1="12.879" x2="26" y2="15.121"><stop offset="0%" stop-color="#e6e6e6"></stop><stop offset="100%" stop-color="#999"></stop></linearGradient></defs><path d="M-26.374 9.514h80.748v8.972h-80.748z" stroke="#000" stroke-width=".449" fill="url(#ltb_1832a)"></path><path d="M-18.3 10.41h64.6v7.18h-64.6z" stroke="#000" stroke-width=".449" fill="#85dcff"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 22,
            "groupname": "Tech Clipart",
            "lucidgroup": "Tech Clipart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1897a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1897b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1897a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1897b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1898a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_file_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1898b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1898a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1898b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1899a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_net_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1899b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1899a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1899b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1901a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/raid_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1901b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1901a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1901b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1905a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_small_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1905b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1905a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1905b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1910a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_largeformat_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1910b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1910a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1910b)"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1897a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1897b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1897a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1897b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1898a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_file_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1898b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1898a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1898b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1899a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_net_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1899b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1899a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1899b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1901a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/raid_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1901b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1901a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1901b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1905a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_small_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1905b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1905a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1905b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1910a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_largeformat_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1910b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1910a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1910b)"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1897a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1897b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1897a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1897b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1898a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_file_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1898b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1898a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1898b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1899a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_net_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1899b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1899a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1899b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1901a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/raid_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1901b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1901a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1901b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1905a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_small_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1905b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1905a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1905b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1910a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_largeformat_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1910b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1910a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1910b)"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1897a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1897b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1897a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1897b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1898a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_file_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1898b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1898a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1898b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1899a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_net_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1899b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1899a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1899b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1901a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/raid_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1901b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1901a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1901b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1905a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_small_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1905b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1905a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1905b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1910a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_largeformat_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1910b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1910a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1910b)"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1897a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1897b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1897a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1897b)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1898a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_file_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1898b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1898a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1898b)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1899a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/server_net_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1899b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1899a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1899b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1901a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/raid_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1901b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1901a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1901b)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1905a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_small_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1905b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1905a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1905b)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28" height="28"><defs><image width="1" height="1" id="ltb_1910a" xlink:href="https://d2slcw3kip6qmk.cloudfront.net/app/webroot/img/blocks/printer_largeformat_thumb.png" preserveAspectRatio="none"></image><pattern id="ltb_1910b" patternUnits="userSpaceOnUse" width="26" height="26"><use xlink:href="#ltb_1910a" transform="matrix(24 0 0 24 2 2)"></use></pattern></defs><path d="M2 2h24v24H2z" fill="url(#ltb_1910b)"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 23,
            "groupname": "User Images",
            "shapes": [{
                "name": "Rectangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "User Images",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "User Images",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "User Images",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "User Images",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 24,
            "groupname": "Electrical",
            "lucidgroup": "Circuit Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2v24h4.8V2z" fill="none"></path><path d="M4.4 2l19.2 12L4.4 26zM23.12 14H26M2 14h2.88" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" fill="none"></path><path d="M2 14h5.4l1.2-1.8 1.8 3.6 1.8-3.6 1.8 3.6 1.8-3.6 1.8 3.6 1.8-3.6 1.8 3.6 1.2-1.8H26" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.8 2h14.4v24H6.8z" fill="none"></path><path d="M6.8 11.6h5.76zm0 4.8h5.76zm5.76-7.2v9.6H14V9.2zm1.44 0L21.2 2v24L14 18.8" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2h24v24H2z" fill="none"></path><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12M5.6 5.6l16.8 16.8m0-16.8L5.6 22.4" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2v24h4.8V2z" fill="none"></path><path d="M4.4 2l19.2 12L4.4 26zM23.12 14H26M2 14h2.88" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" fill="none"></path><path d="M2 14h5.4l1.2-1.8 1.8 3.6 1.8-3.6 1.8 3.6 1.8-3.6 1.8 3.6 1.8-3.6 1.8 3.6 1.2-1.8H26" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.8 2h14.4v24H6.8z" fill="none"></path><path d="M6.8 11.6h5.76zm0 4.8h5.76zm5.76-7.2v9.6H14V9.2zm1.44 0L21.2 2v24L14 18.8" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 2v24h4.8V2z" fill="none"></path><path d="M4.4 2l19.2 12L4.4 26zM23.12 14H26M2 14h2.88" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" fill="none"></path><path d="M2 14h5.4l1.2-1.8 1.8 3.6 1.8-3.6 1.8 3.6 1.8-3.6 1.8 3.6 1.8-3.6 1.8 3.6 1.2-1.8H26" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.8 2h14.4v24H6.8z" fill="none"></path><path d="M6.8 11.6h5.76zm0 4.8h5.76zm5.76-7.2v9.6H14V9.2zm1.44 0L21.2 2v24L14 18.8" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 34,
            "groupname": "Logic Gates",
            "lucidgroup": "Circuit Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6v16h4.8V6zM21.2 6v16H26V6z" fill="none"></path><path d="M8.672 10H2m6.672 8H2zm10.848-4H26zM8.672 6v16h5.448c3 0 5.352-3.6 5.352-8S17.12 6 14.12 6H8.672z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M8.47 5.192h11.367v17.736H8.47V5.192zm0 0h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68m-16.93 0h2.73m.137-13.44h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68m-16.93 0h2.73M5.57 9.56h2.798" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6v16h4.8V6zM21.2 6v16H26V6z" fill="none"></path><path d="M9.2 14H2zm12 0H26zm-12-8l9.6 8-9.6 8zm12 8c0 .707-.537 1.28-1.2 1.28-.663 0-1.2-.573-1.2-1.28m2.4 0c0-.707-.537-1.28-1.2-1.28-.663 0-1.2.573-1.2 1.28" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6v16h4.8V6zM21.2 6v16H26V6z" fill="none"></path><path d="M8.672 10H2m6.672 8H2zm10.848-4H26zM8.672 6v16h5.448c3 0 5.352-3.6 5.352-8S17.12 6 14.12 6H8.672z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M8.47 5.192h11.367v17.736H8.47V5.192zm0 0h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68m-16.93 0h2.73m.137-13.44h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68m-16.93 0h2.73M5.57 9.56h2.798" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6v16h4.8V6zM21.2 6v16H26V6z" fill="none"></path><path d="M9.2 14H2zm12 0H26zm-12-8l9.6 8-9.6 8zm12 8c0 .707-.537 1.28-1.2 1.28-.663 0-1.2-.573-1.2-1.28m2.4 0c0-.707-.537-1.28-1.2-1.28-.663 0-1.2.573-1.2 1.28" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6v16h4.8V6zM21.2 6v16H26V6z" fill="none"></path><path d="M8.672 10H2m6.672 8H2zm10.848-4H26zM8.672 6v16h5.448c3 0 5.352-3.6 5.352-8S17.12 6 14.12 6H8.672z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M8.47 5.192h11.367v17.736H8.47V5.192zm0 0h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68M8.47 5.192h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68m-16.93 0h2.73m.137-13.44h11.367v17.736H8.47V5.192zm10.036 3.36a.518.518 0 0 0-.444.216c-.103.144-.17.36-.17.624s.067.456.17.6c.102.168.256.24.444.24.187 0 .324-.072.443-.24.102-.144.153-.336.153-.6 0-.264-.05-.48-.154-.624a.54.54 0 0 0-.444-.216m.358 1.824l.34.408H18.9l-.29-.336h-.068-.034c-.273 0-.478-.096-.632-.288-.17-.192-.24-.456-.24-.768 0-.336.07-.6.24-.792.154-.192.36-.288.632-.288a.78.78 0 0 1 .63.288c.155.192.24.456.24.792 0 .24-.034.432-.137.6a.69.69 0 0 1-.376.384m-.666 7.68a.54.54 0 0 0-.443.24c-.103.144-.17.36-.17.624 0 .24.067.456.17.6a.54.54 0 0 0 .443.24c.188 0 .325-.096.444-.24.103-.144.154-.36.154-.6 0-.264-.05-.48-.154-.624-.12-.144-.256-.24-.444-.24m.36 1.848l.34.408h-.307l-.29-.336h-.067-.035c-.273 0-.477-.096-.63-.288-.172-.192-.24-.456-.24-.768 0-.336.068-.6.24-.792.153-.192.357-.288.63-.288s.478.096.632.288c.17.192.24.456.24.792 0 .216-.035.432-.138.6a.884.884 0 0 1-.375.384M10.28 8.48v.264c-.103-.048-.188-.096-.274-.12-.102-.024-.17-.024-.256-.024-.136 0-.256.024-.324.096a.273.273 0 0 0-.12.24c0 .096.035.168.086.216.05.048.137.072.29.096l.154.048a.642.642 0 0 1 .41.192.57.57 0 0 1 .136.408c0 .192-.05.36-.188.456-.12.096-.29.144-.53.144-.084 0-.187 0-.29-.024a1.51 1.51 0 0 1-.306-.096v-.288a.89.89 0 0 0 .307.144c.085.024.188.048.29.048.137 0 .256-.024.34-.096.07-.072.12-.144.12-.264 0-.096-.033-.192-.084-.24a.68.68 0 0 0-.29-.12l-.153-.048a.642.642 0 0 1-.41-.192c-.085-.072-.136-.216-.136-.36 0-.192.07-.336.188-.432a.738.738 0 0 1 .478-.168c.086 0 .188.024.273.048.085 0 .187.024.29.072m-.274 10.392c.052 0 .12.048.17.12.052.072.103.168.155.264l.257.576h-.273l-.24-.528c-.068-.144-.12-.24-.187-.288-.05-.048-.137-.048-.24-.048h-.272v.864H9.12v-2.064h.58c.204 0 .375.048.477.144.102.096.154.24.154.456 0 .12-.016.24-.085.312-.05.096-.136.144-.24.192m-.63-.864v.72H9.7c.12 0 .204-.024.272-.096.07-.048.086-.144.086-.264 0-.12-.017-.216-.086-.288a.454.454 0 0 0-.273-.072h-.325m7.646-.456h2.39m.427-8.04h2.696m-2.68 9.12h2.68m-16.93 0h2.73M5.57 9.56h2.798" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6v16h4.8V6zM21.2 6v16H26V6z" fill="none"></path><path d="M9.2 14H2zm12 0H26zm-12-8l9.6 8-9.6 8zm12 8c0 .707-.537 1.28-1.2 1.28-.663 0-1.2-.573-1.2-1.28m2.4 0c0-.707-.537-1.28-1.2-1.28-.663 0-1.2.573-1.2 1.28" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 35,
            "groupname": "Basic Data Flow",
            "lucidgroup": "Data Flow Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 4.667h22.8V22.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.2 5.6H26v17.733H3.2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" fill="#fff"></path><path d="M2 8h24m0 12H2" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M24.08 4.4c1.06 0 1.92.86 1.92 1.92v15.36c0 1.06-.86 1.92-1.92 1.92H3.92A1.92 1.92 0 0 1 2 21.68V6.32c0-1.06.86-1.92 1.92-1.92z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 8.24h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M24.08 4.4c1.06 0 1.92.86 1.92 1.92v15.36c0 1.06-.86 1.92-1.92 1.92H3.92A1.92 1.92 0 0 1 2 21.68V6.32c0-1.06.86-1.92 1.92-1.92z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 11H2v6h24" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M6.8 11v6" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 11h24v6H2z" fill="none"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 4.667h22.8V22.4H2z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M3.2 5.6H26v17.733H3.2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" fill="#fff"></path><path d="M2 8h24m0 12H2" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M24.08 4.4c1.06 0 1.92.86 1.92 1.92v15.36c0 1.06-.86 1.92-1.92 1.92H3.92A1.92 1.92 0 0 1 2 21.68V6.32c0-1.06.86-1.92 1.92-1.92z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2 8.24h24" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M24.08 4.4c1.06 0 1.92.86 1.92 1.92v15.36c0 1.06-.86 1.92-1.92 1.92H3.92A1.92 1.92 0 0 1 2 21.68V6.32c0-1.06.86-1.92 1.92-1.92z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 11H2v6h24" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M6.8 11v6" stroke="#000" stroke-width="2" fill="none"></path><path d="M2 11h24v6H2z" fill="none"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 25,
            "groupname": "Messaging Systems",
            "lucidgroup": "Enterprise Integration",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.952 14c-.36 0-.744.75-.744 1.875 0 .945.384 1.875.744 1.875H23.24V14H4.952z" stroke="#000" fill="#818181"></path><path d="M23.6 15.875c0 .945-.192 1.875-.36 1.875-.384 0-.552-.93-.552-1.875 0-1.125.168-1.875.552-1.875.168 0 .36.75.36 1.875z" stroke="#000" fill="#818181"></path><path d="M5.696 11.195h16.608" stroke="#818181" fill="#aefe7d"></path><path d="M20.84 10.445l1.464.75-1.464.555z" stroke="#818181" fill="#818181"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M9.692 9.06v12m0 0h1.38m0-4.66h11.543V26H11.07z" stroke="#000" fill="#fff"></path><path d="M5.385 6.512C5.385 4.088 7.365 2 9.692 2c2.654 0 4.635 2.088 4.635 4.512 0 2.784-1.98 4.536-4.635 4.536-2.326 0-4.307-1.752-4.307-4.536z" stroke="#000" fill="#818181"></path><path d="M5.385 2v12H14V2z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2zM3.848 14h4.608M19.544 9.32h4.608M19.544 14h4.608M19.544 18.695h4.608M8.456 14l11.088-4.68" stroke="#000" fill="#aefe7d"></path><path d="M9.512 14c0 .375-.576.945-.936.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .936.375.936.93zM20.648 9.38c0 .375-.576.945-.936.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .936.375.936.93zM20.48 14c0 .375-.552.945-.912.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .912.375.912.93zM20.336 18.62c0 .375-.552.93-.912.93-.552 0-.936-.555-.936-.93 0-.57.384-.945.936-.945.36 0 .912.375.912.945z" stroke="#000"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.592 8.375h7.56v11.25h-7.56zM15.848 8.375h7.392v11.25h-7.392z" stroke="#000" fill="#fff"></path><path d="M8.456 10.25l12 7.5M8.456 17.75l12-7.5" stroke="#000" fill="#aefe7d"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.952 14c-.36 0-.744.75-.744 1.875 0 .945.384 1.875.744 1.875H23.24V14H4.952z" stroke="#000" fill="#818181"></path><path d="M23.6 15.875c0 .945-.192 1.875-.36 1.875-.384 0-.552-.93-.552-1.875 0-1.125.168-1.875.552-1.875.168 0 .36.75.36 1.875z" stroke="#000" fill="#818181"></path><path d="M5.696 11.195h16.608" stroke="#818181" fill="#aefe7d"></path><path d="M20.84 10.445l1.464.75-1.464.555z" stroke="#818181" fill="#818181"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.952 14c-.36 0-.744.75-.744 1.875 0 .945.384 1.875.744 1.875H23.24V14H4.952z" stroke="#000" fill="#818181"></path><path d="M23.6 15.875c0 .945-.192 1.875-.36 1.875-.384 0-.552-.93-.552-1.875 0-1.125.168-1.875.552-1.875.168 0 .36.75.36 1.875z" stroke="#000" fill="#818181"></path><path d="M5.696 11.195h16.608" stroke="#818181" fill="#aefe7d"></path><path d="M20.84 10.445l1.464.75-1.464.555z" stroke="#818181" fill="#818181"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M9.692 9.06v12m0 0h1.38m0-4.66h11.543V26H11.07z" stroke="#000" fill="#fff"></path><path d="M5.385 6.512C5.385 4.088 7.365 2 9.692 2c2.654 0 4.635 2.088 4.635 4.512 0 2.784-1.98 4.536-4.635 4.536-2.326 0-4.307-1.752-4.307-4.536z" stroke="#000" fill="#818181"></path><path d="M5.385 2v12H14V2z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2zM3.848 14h4.608M19.544 9.32h4.608M19.544 14h4.608M19.544 18.695h4.608M8.456 14l11.088-4.68" stroke="#000" fill="#aefe7d"></path><path d="M9.512 14c0 .375-.576.945-.936.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .936.375.936.93zM20.648 9.38c0 .375-.576.945-.936.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .936.375.936.93zM20.48 14c0 .375-.552.945-.912.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .912.375.912.93zM20.336 18.62c0 .375-.552.93-.912.93-.552 0-.936-.555-.936-.93 0-.57.384-.945.936-.945.36 0 .912.375.912.945z" stroke="#000"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.592 8.375h7.56v11.25h-7.56zM15.848 8.375h7.392v11.25h-7.392z" stroke="#000" fill="#fff"></path><path d="M8.456 10.25l12 7.5M8.456 17.75l12-7.5" stroke="#000" fill="#aefe7d"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.952 14c-.36 0-.744.75-.744 1.875 0 .945.384 1.875.744 1.875H23.24V14H4.952z" stroke="#000" fill="#818181"></path><path d="M23.6 15.875c0 .945-.192 1.875-.36 1.875-.384 0-.552-.93-.552-1.875 0-1.125.168-1.875.552-1.875.168 0 .36.75.36 1.875z" stroke="#000" fill="#818181"></path><path d="M5.696 11.195h16.608" stroke="#818181" fill="#aefe7d"></path><path d="M20.84 10.445l1.464.75-1.464.555z" stroke="#818181" fill="#818181"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M9.692 9.06v12m0 0h1.38m0-4.66h11.543V26H11.07z" stroke="#000" fill="#fff"></path><path d="M5.385 6.512C5.385 4.088 7.365 2 9.692 2c2.654 0 4.635 2.088 4.635 4.512 0 2.784-1.98 4.536-4.635 4.536-2.326 0-4.307-1.752-4.307-4.536z" stroke="#000" fill="#818181"></path><path d="M5.385 2v12H14V2z" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2zM3.848 14h4.608M19.544 9.32h4.608M19.544 14h4.608M19.544 18.695h4.608M8.456 14l11.088-4.68" stroke="#000" fill="#aefe7d"></path><path d="M9.512 14c0 .375-.576.945-.936.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .936.375.936.93zM20.648 9.38c0 .375-.576.945-.936.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .936.375.936.93zM20.48 14c0 .375-.552.945-.912.945-.552 0-.912-.57-.912-.945 0-.555.36-.93.912-.93.36 0 .912.375.912.93zM20.336 18.62c0 .375-.552.93-.912.93-.552 0-.936-.555-.936-.93 0-.57.384-.945.936-.945.36 0 .912.375.912.945z" stroke="#000"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.592 8.375h7.56v11.25h-7.56zM15.848 8.375h7.392v11.25h-7.392z" stroke="#000" fill="#fff"></path><path d="M8.456 10.25l12 7.5M8.456 17.75l12-7.5" stroke="#000" fill="#aefe7d"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 36,
            "groupname": "Message Routing",
            "lucidgroup": "Enterprise Integration",
            "shapes": [ {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.208 17.195h4.248V20H4.208zM11.6 17.195h4.248V20H11.6zM18.992 17.195h4.248V20h-4.248zM15.296 9.32c0 .735-.552 1.305-1.296 1.305-.912 0-1.488-.57-1.488-1.305 0-.945.576-1.5 1.488-1.5.744 0 1.296.555 1.296 1.5z" stroke="#000" fill="#fff"></path><path d="M6.608 17.195V14M21.392 17.195V14M6.608 14h14.784M14 14v3.195M14 14v-3.375" stroke="#000" fill="#aefe7d"></path><path d="M14 11.75L16.76 14 14 16.07 11.048 14z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.208 17.195h4.248V20H4.208zM11.6 17.195h4.248V20H11.6zM18.992 17.195h4.248V20h-4.248zM15.296 9.32c0 .735-.552 1.305-1.296 1.305-.912 0-1.488-.57-1.488-1.305 0-.945.576-1.5 1.488-1.5.744 0 1.296.555 1.296 1.5z" stroke="#000" fill="#fff"></path><path d="M6.608 17.195V14M21.392 17.195V14M6.608 14h14.784M14 14v3.195M14 14v-3.375" stroke="#000" fill="#aefe7d"></path><path d="M14 11.75L16.76 14 14 16.07 11.048 14z" stroke="#000" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14.024 5.888v16.224" stroke="#000" fill="#ff3"></path><path d="M11.072 12.056h5.856v3.912h-5.856z" stroke="#000" fill="#aefe7d"></path><path d="M11.072 2h5.856v3.912h-5.856zM11.072 22.088h5.856V26h-5.856zM20.144 7.544H26v3.888h-5.856zM20.144 16.712H26v3.912h-5.856zM2 7.472h5.856v3.912H2zM2 16.664h5.856v3.888H2zM16.856 12.08l3.288-2.712M11.144 12.08L7.856 9.368M7.856 18.656l3.288-2.712M20.192 18.704l-3.288-2.712" stroke="#000" fill="#ff3"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M9.632 9.755h8.616l-2.592 4.05v5.115l-3.264-.03v-5.145z" stroke="#000" fill="#818181"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2zM6.992 14h2.4M12.152 14h2.592M17.696 14h2.76" stroke="#000" fill="#aefe7d"></path><path d="M4.208 12.5h2.784v2.82H4.208zM9.392 12.5h2.76v2.82h-2.76zM14.744 12.5h2.952v2.82h-2.952zM20.456 12.5h2.784v2.82h-2.784z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.208 17.195h4.248V20H4.208zM11.6 17.195h4.248V20H11.6zM18.992 17.195h4.248V20h-4.248zM15.296 9.32c0 .735-.552 1.305-1.296 1.305-.912 0-1.488-.57-1.488-1.305 0-.945.576-1.5 1.488-1.5.744 0 1.296.555 1.296 1.5z" stroke="#000" fill="#fff"></path><path d="M6.608 17.195V14M21.392 17.195V14M6.608 14h14.784M14 14v3.195M14 14v-3.375" stroke="#000" fill="#aefe7d"></path><path d="M14 11.75L16.76 14 14 16.07 11.048 14z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M14.024 5.888v16.224" stroke="#000" fill="#ff3"></path><path d="M11.072 12.056h5.856v3.912h-5.856z" stroke="#000" fill="#aefe7d"></path><path d="M11.072 2h5.856v3.912h-5.856zM11.072 22.088h5.856V26h-5.856zM20.144 7.544H26v3.888h-5.856zM20.144 16.712H26v3.912h-5.856zM2 7.472h5.856v3.912H2zM2 16.664h5.856v3.888H2zM16.856 12.08l3.288-2.712M11.144 12.08L7.856 9.368M7.856 18.656l3.288-2.712M20.192 18.704l-3.288-2.712" stroke="#000" fill="#ff3"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M9.632 9.755h8.616l-2.592 4.05v5.115l-3.264-.03v-5.145z" stroke="#000" fill="#818181"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2zM6.992 14h2.4M12.152 14h2.592M17.696 14h2.76" stroke="#000" fill="#aefe7d"></path><path d="M4.208 12.5h2.784v2.82H4.208zM9.392 12.5h2.76v2.82h-2.76zM14.744 12.5h2.952v2.82h-2.952zM20.456 12.5h2.784v2.82h-2.784z" stroke="#000" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.5h24v15H2z" stroke="#000" fill="#aefe7d"></path><path d="M4.208 17.195h4.248V20H4.208zM11.6 17.195h4.248V20H11.6zM18.992 17.195h4.248V20h-4.248zM15.296 9.32c0 .735-.552 1.305-1.296 1.305-.912 0-1.488-.57-1.488-1.305 0-.945.576-1.5 1.488-1.5.744 0 1.296.555 1.296 1.5z" stroke="#000" fill="#fff"></path><path d="M6.608 17.195V14M21.392 17.195V14M6.608 14h14.784M14 14v3.195M14 14v-3.375" stroke="#000" fill="#aefe7d"></path><path d="M14 11.75L16.76 14 14 16.07 11.048 14z" stroke="#000" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 37,
            "groupname": "Timeline",
            "lucidgroup": "Timeline",
            "shapes": [ {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 12.714h24v2.572H2z" fill="none"></path><path d="M2 12.714h24v-37.428H2z" stroke="#3d4752" stroke-width="2" fill="#3d4752"></path><path d="M2 12.714v2.572m24-2.572v2.572m-20.57-40v20m3.427-20v20m3.43-20v20m3.427-20v20m3.43-20v20m3.427-20v20" stroke="#3d4752" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 13.143h24v1.714H2z" fill="none"></path><path d="M2 14h24m-24-.857v1.714m24-1.714v1.714M5.43 13.57v.86m3.427-.86v.86m3.43-.86v.86m3.427-.86v.86m3.43-.86v.86m3.427-.86v.86" stroke="#3d4752" stroke-width="2" fill="none"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11 2h6v24h-6z" fill="none"></path><path d="M14 2v18" stroke="#ed6058" stroke-width="2" fill="none"></path><path d="M11 20h6l-3 6z" stroke="#ed6058" stroke-width="2" fill="#ed6058"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 8h24v12H2z" fill="#9ed973"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 26,
            "groupname": "Equations",
            "lucidgroup": "Equation",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 4.48h108v19.04H2z" fill="none"></path><path d="M11.655 20.002l.27.228c-1.563 1.89-2.064 2.286-2.898 2.286-.584 0-.834-.25-.834-.852 0-.52.042-.685.48-2.39-1.564 2.35-2.774 3.263-4.233 3.263-1.168 0-2.086-.83-2.086-2.41 0-3.222 3.19-6.983 5.964-6.983.897 0 1.502.436 1.67 1.205l.228-.998.062-.063 1.272-.146.146.062c-.04.187-.062.23-.125.437-.98 3.553-1.855 7.128-1.855 7.543 0 .146.126.27.292.27.188 0 .46-.166 1.085-.852m-1.48-5.798c0-.727-.44-1.205-1.17-1.205-.937 0-1.854.645-2.73 1.913-.876 1.31-1.606 3.16-1.606 4.468 0 1.144.5 1.54 1.25 1.54 1.044 0 2.024-1.144 2.65-2.038.98-1.413 1.605-3.2 1.605-4.676M19.443 12.757l-.796 2.013h-5.765v-.176l2.624-2.778c1.386-1.454 1.917-2.57 1.917-3.82 0-1.337-.796-2.072-2.05-2.072-1.06 0-1.577.47-2.167 1.91l-.31-.073c.31-1.72 1.254-2.924 3.068-2.924 1.666 0 2.727 1.132 2.727 2.587 0 1.16-.574 2.263-1.886 3.644l-2.433 2.586h3.45c.62 0 .93-.16 1.417-.984M39.806 17.737h-5.443v5.424h-1.376v-5.423h-5.443v-1.372h5.443V10.94h1.376v5.425h5.443v1.372M48.877 16.282h.02c1.418-2.348 2.565-3.138 4.025-3.138 1.397 0 2.42.893 2.42 2.494 0 3.283-3.442 6.9-6.674 6.9-1.19 0-2.71-.48-2.71-1.102v-.125l2.96-10.868c.125-.5.188-.79.188-.977 0-.457-.104-.477-1.335-.52v-.352a47.178 47.178 0 0 0 3.192-.478l.104.104-.438 1.703m2.94 6.026c0-1.268-.542-1.788-1.46-1.788-1 0-1.96.873-2.856 2.39-.918 1.538-1.5 3.554-1.5 4.8 0 .48.31.707.958.707.896 0 1.793-.437 2.565-1.227 1.25-1.288 2.293-3.346 2.293-4.884M62.89 12.757l-.795 2.013H56.33v-.176l2.624-2.778c1.387-1.454 1.917-2.57 1.917-3.82 0-1.337-.795-2.072-2.048-2.072-1.062 0-1.578.47-2.168 1.91l-.31-.073c.31-1.72 1.254-2.924 3.068-2.924 1.666 0 2.727 1.132 2.727 2.587 0 1.16-.576 2.263-1.888 3.644l-2.433 2.586h3.45c.62 0 .928-.16 1.415-.984M84.45 15.658H72.17v-1.37h12.28v1.37m0 4.157H72.17v-1.372h12.28v1.372M98.547 20.085l.334.208c-1.27 1.6-2.376 2.244-3.94 2.244-1.94 0-3.065-1.08-3.065-3.2 0-1.933 1.084-3.74 2.564-4.925 1.02-.81 2.21-1.268 3.482-1.268 1.272 0 2.19.706 2.19 1.683a1 1 0 0 1-1.002.998c-.584 0-.813-.416-.813-.832 0-.374.313-.602.313-.997 0-.25-.292-.416-.772-.416-.834 0-1.668.374-2.273.998-1.167 1.226-1.897 2.992-1.897 4.842 0 1.496.667 2.37 1.856 2.37 1.105 0 1.897-.52 3.023-1.705M107.498 12.757l-.796 2.013h-5.766v-.176l2.625-2.778c1.387-1.454 1.918-2.57 1.918-3.82 0-1.337-.796-2.072-2.05-2.072-1.06 0-1.577.47-2.167 1.91l-.31-.073c.31-1.72 1.254-2.924 3.068-2.924 1.666 0 2.728 1.132 2.728 2.587 0 1.16-.575 2.263-1.887 3.644l-2.434 2.586h3.45c.62 0 .93-.16 1.415-.984"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M25.667 2h60.666v24H25.667z" fill="none"></path><path d="M27.276 17.28H84.72v-.808H27.275zM33.972 10.684h-5.284v-.627h5.284v.627M36.125 10.02h.01c.645-1.075 1.167-1.437 1.83-1.437.636 0 1.1.41 1.1 1.14 0 1.503-1.564 3.157-3.035 3.157-.54 0-1.233-.22-1.233-.504v-.057l1.347-4.972c.057-.228.086-.36.086-.447 0-.208-.048-.218-.607-.237v-.16c.635-.077.977-.134 1.45-.22l.048.048-.198.78m1.338 2.757c0-.58-.247-.818-.664-.818-.456 0-.892.398-1.3 1.092-.417.704-.683 1.626-.683 2.196 0 .22.142.323.436.323.407 0 .815-.198 1.166-.56.57-.59 1.044-1.53 1.044-2.233M45.374 10.475H42.89v1.987h-.627v-1.987h-2.476v-.627h2.476V8.004h.626v1.844h2.484v.627m0 3.127h-5.587v-.627h5.587v.627M54.964 2.804l-4.534 11.71h-.304L48.21 9.478c-.16-.428-.35-.56-.588-.56-.16 0-.408.104-.616.294l-.114-.19 1.48-1.178h.18l1.935 5.095h.038l3.927-10.133h.512"></path><path d="M54.63 3.366H83.9V2.8H54.63zM56.176 10.02h.01c.644-1.075 1.166-1.437 1.83-1.437.636 0 1.1.41 1.1 1.14 0 1.503-1.565 3.157-3.035 3.157-.54 0-1.232-.22-1.232-.504v-.057l1.347-4.972c.057-.228.085-.36.085-.447 0-.208-.047-.218-.607-.237v-.16c.636-.077.977-.134 1.45-.22l.05.048-.2.78m1.337 2.757c0-.58-.247-.818-.664-.818-.455 0-.892.398-1.3 1.092-.417.704-.683 1.626-.683 2.196 0 .22.143.323.437.323.408 0 .816-.198 1.167-.56.57-.59 1.043-1.53 1.043-2.233M62.55 7.95l-.36.92h-2.624v-.08l1.194-1.27c.63-.666.872-1.177.872-1.748 0-.612-.362-.948-.932-.948-.483 0-.718.215-.986.874l-.14-.034c.14-.786.57-1.337 1.394-1.337.758 0 1.24.517 1.24 1.183 0 .53-.26 1.035-.858 1.667L60.244 8.36h1.57c.28 0 .422-.074.643-.45M69.57 10.684h-5.284v-.627h5.284v.627M74.664 11.188h-.977v1.587h-.74v-1.587H70.29v-.608l2.98-4.23h.417v4.23h.977v.608m-1.717-.608V7.32l-2.277 3.26h2.277M79.32 11.72l.124.105c-.71.865-.94 1.045-1.318 1.045-.266 0-.38-.114-.38-.39 0-.237.02-.313.22-1.092-.713 1.074-1.263 1.492-1.927 1.492-.532 0-.95-.38-.95-1.103 0-1.473 1.452-3.194 2.713-3.194.408 0 .683.2.76.552l.104-.456.028-.03.58-.067.065.03c-.02.085-.028.104-.057.2-.446 1.624-.844 3.26-.844 3.45 0 .066.056.123.132.123.085 0 .208-.076.493-.39m-.674-2.652c0-.333-.198-.55-.53-.55-.427 0-.844.293-1.242.873-.4.6-.73 1.445-.73 2.044 0 .524.227.704.568.704.475 0 .92-.523 1.205-.93.447-.648.73-1.465.73-2.14M83.002 11.758l.15.095c-.577.732-1.08 1.027-1.79 1.027-.884 0-1.396-.494-1.396-1.464 0-.884.493-1.71 1.167-2.253.465-.37 1.005-.58 1.584-.58.58 0 .996.324.996.77 0 .257-.21.457-.455.457-.266 0-.37-.19-.37-.38 0-.172.142-.276.142-.457 0-.114-.133-.19-.35-.19-.38 0-.76.17-1.035.456-.53.56-.863 1.368-.863 2.214 0 .685.303 1.084.844 1.084.503 0 .863-.238 1.376-.78M55.732 24.378l-.512 1.302h-3.71v-.114l1.69-1.796c.89-.94 1.232-1.664 1.232-2.472 0-.865-.512-1.34-1.318-1.34-.683 0-1.015.304-1.395 1.236l-.2-.048c.2-1.112.806-1.89 1.973-1.89 1.072 0 1.755.73 1.755 1.672 0 .75-.37 1.463-1.214 2.357l-1.565 1.673h2.218c.4 0 .598-.105.91-.637M60.37 24.625l.124.105c-.712.865-.94 1.045-1.32 1.045-.264 0-.378-.114-.378-.39 0-.237.02-.313.218-1.092-.712 1.074-1.262 1.492-1.926 1.492-.53 0-.948-.38-.948-1.103 0-1.473 1.45-3.194 2.713-3.194.408 0 .683.2.76.552l.103-.457.028-.028.58-.067.065.03c-.02.085-.03.104-.058.2-.445 1.624-.844 3.26-.844 3.45 0 .066.057.123.133.123.086 0 .21-.075.494-.39m-.673-2.65c0-.334-.198-.552-.53-.552-.427 0-.845.294-1.243.874-.398.6-.73 1.445-.73 2.044 0 .523.227.703.57.703.473 0 .92-.524 1.203-.932.446-.647.73-1.464.73-2.14"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 3.18h108v21.64H2z" fill="none"></path><path d="M10.606 20.8l.288.29c-1.37 1.68-2.908 2.594-4.904 2.594-1.947 0-3.245-1.298-3.245-3.292 0-3.724 3.582-7.57 7.188-7.57 1.274 0 1.97.626 1.97 1.635 0 2.066-2.523 3.94-6.826 4.493-.24.48-.24 1.106-.24 1.466 0 1.32.89 2.186 2.235 2.186 1.058 0 1.803-.384 3.534-1.802m-4.952-3.436l-.41 1.058c2.07-.505 2.982-.937 3.87-1.778.747-.72 1.203-1.586 1.203-2.33 0-.578-.168-.938-.84-.938-1.37 0-3.006 1.85-3.823 3.988M21.784 7.45l-.357 1.257h-1.734c-.238.85-1.14 3.772-1.14 4.11 0 .392.17.715.528.715.34 0 .8-.12 1.208-1.036h.272c-.255 1.053-1.054 2.412-2.33 2.412-.73 0-1-.61-1-1.274 0-.39.168-1.036.287-1.36l1.292-3.567H17.04c-.765 2.073-1.207 5.03-2.584 6.116a1.097 1.097 0 0 1-.612.204c-.442 0-.85-.34-.85-.747 0-.255.085-.714.51-.833.714-.187 1.054-.747 1.224-1.19l1.394-3.55h-.102c-.884 0-1.343.017-2.09.934h-.273c.917-1.545 1.8-2.19 3.518-2.19h4.606M26.27 4.544c0 .476-.39.867-.832.867-.493 0-.815-.356-.815-.9 0-.526.34-.9.798-.9.46 0 .85.442.85.934m-.713 8.24l.22.187c-.933 1.43-1.477 1.938-2.327 1.938-.56 0-.833-.306-.833-.934 0-.34.12-.935.374-1.886l.817-3.007c.085-.305.153-.61.153-.747 0-.34-.17-.39-1.088-.408v-.272c.663-.05 1.003-.1 2.72-.424l.067.05-1.598 5.827c-.085.29-.17.51-.17.748 0 .17.102.255.238.255.29 0 .697-.357 1.427-1.325M49.572 18.133h-6.274v6.272h-1.586v-6.272h-6.274v-1.585h6.274v-6.272h1.586v6.272h6.274v1.585M65.558 23.42h-6.635v-.36c1.78-.097 2.284-.602 2.284-1.923v-10.79c0-.816-.217-1.176-.72-1.176-.242 0-.65.12-1.083.29l-.65.24v-.337l4.304-2.186.216.072v14.343c0 1.034.48 1.466 2.284 1.466v.36M90.125 15.73h-14.16v-1.585h14.16v1.586m0 4.806h-14.16V18.95h14.16v1.586M109.404 15.49c0 4.133-1.514 8.266-5.433 8.266-4.11 0-5.43-4.47-5.43-8.41 0-4.253 1.657-8.17 5.527-8.17 3.15 0 5.337 3.39 5.337 8.314m-2.308.12c0-4.997-1.057-7.81-3.173-7.81-1.995 0-3.077 2.837-3.077 7.714 0 4.878 1.058 7.617 3.125 7.617 2.045 0 3.126-2.762 3.126-7.52"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 5.724h108v16.552H2z" fill="none"></path><path d="M4.24 18.882l2-8.016c.22-.878.746-2.393 2.064-2.393.44 0 .714.23.714.494 0 .362-.263.647-.57.647-.165 0-.34-.076-.34-.263 0-.285.196-.35.196-.45 0-.054-.043-.087-.12-.087-.55 0-.824.79-1.11 1.943l-2.01 8.06c-.22.89-.768 2.218-2 2.218-.438 0-.713-.23-.713-.494 0-.363.265-.648.573-.648.164 0 .34.1.34.285 0 .32-.198.308-.198.428 0 .055.044.088.12.088.517 0 .78-.702 1.056-1.81M10.877 9.214h.008c.528-.877.955-1.172 1.5-1.172.52 0 .9.333.9.93 0 1.228-1.282 2.58-2.486 2.58-.443 0-1.01-.18-1.01-.413v-.047l1.103-4.06c.046-.187.07-.296.07-.366 0-.17-.04-.178-.498-.194V6.34c.52-.06.8-.107 1.19-.177l.038.038-.164.638m1.094 2.252c0-.474-.2-.668-.543-.668-.372 0-.73.326-1.063.893-.342.574-.56 1.327-.56 1.793 0 .18.117.264.358.264.334 0 .668-.163.955-.458.466-.48.854-1.25.854-1.824M10.636 20.573l.1.085c-.58.707-.768.854-1.078.854-.218 0-.31-.093-.31-.318 0-.194.015-.256.178-.893-.583.878-1.033 1.22-1.577 1.22-.436 0-.778-.31-.778-.9 0-1.204 1.19-2.61 2.222-2.61.334 0 .56.164.62.45l.086-.372.024-.023.473-.054.055.024c-.016.07-.023.085-.047.163-.365 1.328-.69 2.663-.69 2.818 0 .055.046.1.108.1.07 0 .17-.06.404-.317m-.552-2.166c0-.272-.163-.45-.435-.45-.35 0-.69.24-1.017.714-.326.49-.598 1.18-.598 1.67 0 .426.186.573.466.573.39 0 .754-.428.987-.76.365-.53.598-1.197.598-1.748M17.75 15.083h17.365v-.66H17.75zM22.456 5.915l.046.046-.303 1.18-.467 1.702c-.24.885-.505 1.785-.505 1.91 0 .093.04.155.14.155.132 0 .218-.07.637-.55l.093.076c-.38.567-.753.885-1.14.885-.203 0-.32-.14-.32-.35 0-.177.016-.302.1-.69-.457.77-.853 1.025-1.38 1.025-.506 0-.832-.318-.832-.908 0-1.258 1.258-2.6 2.267-2.6.327 0 .46.146.505.45h.008l.35-1.267c.116-.41.108-.442.108-.55 0-.164-.07-.187-.497-.203v-.132a9.408 9.408 0 0 0 1.19-.178m-1.283 2.5c0-.28-.186-.443-.365-.443-.218 0-.49.132-.708.357-.512.543-.9 1.39-.9 2.034 0 .357.178.566.45.566.714 0 1.522-1.335 1.522-2.515"></path><path d="M22.82 7.895h.723c.17-.552.303-.98.56-1.344.232-.332.55-.596 1.024-.596.38 0 .668.2.668.48a.34.34 0 0 1-.326.335.295.295 0 0 1-.288-.304c0-.132.077-.17.077-.24 0-.063-.063-.102-.172-.102-.435 0-.722.544-.947 1.77h.832l-.047.25h-.84l-.558 2.483c-.326 1.437-.846 2.198-1.553 2.198-.35 0-.614-.202-.614-.474 0-.177.132-.325.296-.325.178 0 .295.124.295.287 0 .1-.07.14-.07.225 0 .07.063.125.156.125.326 0 .575-.42.753-1.258l.683-3.26h-.707M28.156 12.468l-.093.124c-1.227-.7-1.895-2.01-1.895-3.33 0-1.437.676-2.555 1.918-3.293l.07.123c-1.08.924-1.32 1.646-1.32 3.145 0 1.444.233 2.32 1.32 3.23M30.276 8.46l.093.444c.543-.83.83-1.11 1.172-1.11.187 0 .32.116.32.287 0 .164-.11.28-.265.28-.148 0-.218-.132-.404-.132-.14 0-.42.342-.76.94 0 .054.014.163.06.35l.25 1.04c.054.217.124.318.232.318.1 0 .187-.078.365-.31.07-.094.1-.14.163-.218l.117.07c-.45.7-.652.885-.948.885-.248 0-.365-.14-.458-.528l-.225-.924-.685.925c-.34.458-.497.528-.737.528s-.39-.124-.39-.326c0-.155.11-.28.265-.28.07 0 .148.03.25.086.077.046.154.07.2.07.086 0 .234-.148.397-.38l.637-.9-.218-.964c-.11-.467-.164-.53-.358-.53-.062 0-.155.016-.303.055l-.14.04-.024-.125.086-.03c.473-.172.73-.226.908-.226.194 0 .288.14.396.667M32.094 6.093l.093-.124a3.924 3.924 0 0 1 1.895 3.33c0 1.436-.684 2.54-1.918 3.292l-.07-.124c1.102-.91 1.32-1.64 1.32-3.145 0-1.452-.194-2.345-1.32-3.23M26.684 16.686l.047.047-.302 1.18-.466 1.7c-.24.885-.505 1.786-.505 1.91 0 .093.04.155.14.155.132 0 .217-.07.637-.55l.093.077c-.38.567-.753.885-1.142.885-.202 0-.318-.14-.318-.35 0-.178.015-.302.1-.69-.457.768-.854 1.024-1.382 1.024-.505 0-.83-.318-.83-.908 0-1.258 1.257-2.6 2.267-2.6.326 0 .458.147.505.45h.008l.35-1.266c.116-.412.108-.443.108-.55 0-.165-.07-.188-.497-.203v-.132a9.408 9.408 0 0 0 1.188-.18m-1.28 2.5c0-.278-.188-.44-.366-.44-.218 0-.49.13-.707.356-.512.544-.9 1.39-.9 2.035 0 .357.18.567.45.567.715 0 1.523-1.336 1.523-2.516M28.618 19.233l.093.442c.545-.83.832-1.11 1.174-1.11.186 0 .318.116.318.287 0 .163-.108.28-.264.28-.147 0-.217-.132-.404-.132-.14 0-.42.34-.76.94 0 .054.015.162.06.35l.25 1.04c.054.216.124.317.233.317.1 0 .186-.077.365-.31.07-.093.1-.14.163-.218l.117.07c-.45.698-.653.884-.948.884-.248 0-.365-.14-.458-.528l-.225-.924-.683.924c-.342.458-.497.528-.738.528-.24 0-.39-.124-.39-.326 0-.155.11-.28.265-.28.07 0 .148.032.25.086.076.047.154.07.2.07.086 0 .234-.147.397-.38l.636-.9-.217-.964c-.108-.466-.162-.528-.356-.528-.062 0-.156.016-.303.055l-.14.038-.022-.124.085-.03c.474-.17.73-.225.91-.225.193 0 .286.14.395.668M43.98 10l.064.065-.428 1.67-.66 2.403c-.34 1.252-.713 2.526-.713 2.7 0 .133.055.22.198.22.188 0 .308-.098.9-.78l.133.11c-.538.803-1.065 1.253-1.614 1.253-.287 0-.452-.197-.452-.493 0-.253.022-.428.143-.977-.647 1.087-1.207 1.45-1.954 1.45-.714 0-1.175-.45-1.175-1.286 0-1.78 1.78-3.678 3.208-3.678.46 0 .648.21.714.637h.01l.495-1.79c.165-.582.154-.626.154-.78 0-.23-.098-.263-.702-.285v-.187a13.305 13.305 0 0 0 1.68-.25m-1.812 3.534c0-.395-.263-.626-.516-.626-.307 0-.692.187-1 .506-.724.768-1.274 1.965-1.274 2.876 0 .505.253.802.638.802 1.01 0 2.152-1.89 2.152-3.558M46.724 13.6l.132.626c.77-1.175 1.175-1.57 1.66-1.57.262 0 .45.165.45.406 0 .23-.155.395-.374.395-.21 0-.308-.186-.572-.186-.197 0-.593.484-1.076 1.33 0 .076.022.23.088.493l.35 1.472c.078.307.177.45.33.45.144 0 .264-.11.517-.44.098-.13.142-.197.23-.307l.165.1c-.638.987-.923 1.25-1.34 1.25-.352 0-.517-.197-.648-.746l-.32-1.306-.966 1.306c-.482.648-.7.747-1.042.747-.34 0-.55-.177-.55-.462 0-.22.155-.396.374-.396.1 0 .21.044.352.12.11.067.22.1.285.1.12 0 .33-.21.56-.538l.9-1.274-.307-1.36c-.154-.66-.23-.748-.506-.748-.088 0-.22.022-.428.077l-.2.054-.032-.176.12-.044c.67-.24 1.034-.318 1.286-.318.275 0 .407.198.56.944M59.015 13.985h-6.47v-.725h6.47v.725m0 2.196h-6.47v-.724h6.47v.725M63.057 12.8h1.02c.243-.78.43-1.385.792-1.9.328-.473.78-.846 1.45-.846.537 0 .943.285.943.68a.48.48 0 0 1-.46.473.417.417 0 0 1-.407-.43c0-.185.11-.24.11-.34 0-.087-.088-.142-.242-.142-.615 0-1.022.77-1.34 2.504H66.1l-.067.35h-1.186l-.79 3.514c-.462 2.03-1.198 3.107-2.198 3.107-.495 0-.868-.285-.868-.67 0-.25.187-.46.417-.46.252 0 .417.176.417.406 0 .143-.1.198-.1.32 0 .098.09.174.22.174.462 0 .813-.593 1.066-1.778l.966-4.612h-1M70.602 19.266l-.132.176c-1.735-.99-2.68-2.844-2.68-4.71 0-2.032.956-3.613 2.713-4.656l.1.175c-1.527 1.308-1.868 2.33-1.868 4.448 0 2.042.33 3.283 1.867 4.568M72.722 14.314h.01c.748-1.24 1.352-1.658 2.12-1.658.737 0 1.275.472 1.275 1.318 0 1.734-1.812 3.645-3.515 3.645-.626 0-1.428-.254-1.428-.583v-.066l1.56-5.74c.066-.265.1-.42.1-.518 0-.24-.056-.252-.704-.274v-.187c.736-.087 1.13-.152 1.68-.25l.055.054-.23.9m1.548 3.184c0-.67-.285-.944-.77-.944-.526 0-1.03.46-1.503 1.263-.483.812-.79 1.877-.79 2.536 0 .253.164.373.504.373.472 0 .945-.23 1.35-.647.66-.682 1.21-1.77 1.21-2.582M76.742 10.25l.132-.174a5.55 5.55 0 0 1 2.68 4.71c0 2.03-.967 3.59-2.713 4.656l-.098-.176c1.56-1.285 1.867-2.317 1.867-4.447 0-2.054-.275-3.317-1.868-4.57M89.35 15.083h-6.117v-.725h6.118v.725M92.953 12.8h1.022c.242-.78.428-1.385.79-1.9.33-.473.78-.846 1.45-.846.54 0 .945.285.945.68a.48.48 0 0 1-.46.473.417.417 0 0 1-.408-.43c0-.185.11-.24.11-.34 0-.087-.088-.142-.24-.142-.616 0-1.023.77-1.34 2.504h1.174l-.066.35h-1.186l-.79 3.514c-.462 2.03-1.198 3.107-2.198 3.107-.494 0-.867-.285-.867-.67 0-.25.185-.46.416-.46.253 0 .417.176.417.406 0 .143-.1.198-.1.32 0 .098.09.174.22.174.462 0 .814-.593 1.067-1.778l.966-4.612h-1M100.5 19.266l-.133.176c-1.735-.99-2.68-2.844-2.68-4.71 0-2.032.956-3.613 2.713-4.656l.1.175C98.97 11.56 98.63 12.58 98.63 14.7c0 2.042.33 3.283 1.867 4.568M105.914 16.28l.143.12c-.824 1-1.088 1.208-1.527 1.208-.308 0-.44-.132-.44-.45 0-.275.023-.363.253-1.263-.823 1.24-1.46 1.724-2.23 1.724-.614 0-1.098-.44-1.098-1.275 0-1.702 1.68-3.69 3.142-3.69.472 0 .79.232.878.638l.12-.527.034-.033.67-.077.076.033c-.022.098-.033.12-.066.23-.516 1.877-.978 3.766-.978 3.985 0 .077.066.143.154.143.1 0 .242-.088.57-.45m-.778-3.064c0-.384-.23-.637-.616-.637-.494 0-.977.34-1.438 1.01-.462.692-.846 1.67-.846 2.36 0 .605.264.814.66.814.548 0 1.064-.603 1.394-1.075.516-.747.846-1.69.846-2.47M106.65 10.25l.132-.174a5.55 5.55 0 0 1 2.68 4.71c0 2.03-.967 3.59-2.713 4.656l-.1-.176c1.56-1.285 1.867-2.317 1.867-4.447 0-2.054-.275-3.317-1.867-4.57"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 2.218h108v23.564H2z" fill="none"></path><path d="M7.808 15.78H4.552v-.207c.87-.07 1.063-.303 1.063-1.063V8.03c0-.662-.138-.883-.58-.883-.11 0-.29 0-.51.028v-.22c.952-.236 1.462-.374 2.18-.61l.07.056v8.18c0 .76.15.938 1.033.993v.208M10.58 7.05c0 .4-.302.705-.716.705a.687.687 0 0 1-.69-.704c0-.386.317-.704.704-.704.4 0 .703.318.703.705m1.008 8.73h-3.27v-.207c.953-.055 1.09-.18 1.09-1.23V11.21c0-.65-.11-.87-.455-.87-.124 0-.33 0-.58.07v-.222l2.14-.76.054.056v4.848c0 1.022.11 1.174 1.02 1.243v.208M22.64 15.78H19.63v-.207c.772-.082.896-.234.896-1.036v-2.845c0-1.09-.276-1.547-1.062-1.547-.648 0-1.062.248-1.476.842v3.48c0 .9.207 1.093.993 1.106v.208h-3.09v-.207c.786-.055.938-.138.938-.98v-2.915c0-.953-.303-1.533-.896-1.533-.51 0-1.186.262-1.462.594-.097.11-.18.206-.18.234v3.84c0 .594.207.732.94.76v.207h-3.064v-.207c.772-.013.966-.207.966-1.008V11.14c0-.677-.125-.912-.483-.912-.15 0-.26.014-.44.055v-.235a19.48 19.48 0 0 0 1.917-.62l.11.04v1.022h.028c.91-.94 1.49-1.063 2.11-1.063.746 0 1.215.372 1.463 1.16.745-.8 1.45-1.16 2.25-1.16 1.116 0 1.6.856 1.6 2.486v2.804c0 .622.18.8.593.83l.36.026v.208M6.487 22.94l.137.127c-.663.908-.907 1.103-1.366 1.103-.244 0-.458-.156-.458-.527 0-.098.02-.225.156-.733l.43-1.582c.077-.303.136-.654.136-.772 0-.175-.088-.283-.234-.283-.39 0-.83.48-1.444 1.387-.44.655-.517.88-.976 2.423h-.73l.935-3.42a.86.86 0 0 0 .02-.165c0-.196-.137-.254-.634-.264v-.156c.79-.156 1.062-.196 1.58-.303l.038.02-.654 2.13c.976-1.564 1.63-2.15 2.254-2.15.42 0 .634.244.634.596 0 .177-.04.382-.098.587l-.546 1.983c-.098.35-.137.517-.137.596 0 .087.04.175.158.175.136 0 .312-.155.595-.516.068-.078.136-.166.204-.254M15.228 21.562v.098c-.936.4-1.678 1.123-2.32 1.866l-.197-.186c.226-.322.51-.635.8-.938a.428.428 0 0 0 .138-.273c0-.1-.078-.196-.254-.196H7.56v-.645h5.844c.098 0 .254-.118.254-.216 0-.088-.04-.146-.137-.244a6.07 6.07 0 0 1-.8-.938l.196-.185c.634.732 1.376 1.465 2.312 1.855M24.252 21.914c0 .948-.702 2.17-1.93 2.17-.8 0-1.357-.52-1.962-1.418-.44.89-1.103 1.417-2.04 1.417-.838 0-1.716-.606-1.716-1.954 0-1.798 1.297-2.248 1.863-2.248.712 0 1.2.186 2.127 1.436.45-.81.897-1.436 1.883-1.436.878 0 1.775.723 1.775 2.032m-3.463-.225v.03c.7 1.16 1.238 1.786 1.9 1.786.548 0 .977-.537.977-1.162 0-.89-.498-1.64-1.356-1.64-.867 0-1.238.575-1.52.985m-.645.625v-.03c-.702-1.162-1.317-1.826-1.98-1.826-.547 0-.976.536-.976 1.16 0 .83.497 1.642 1.355 1.642.868 0 1.337-.596 1.6-.947M33.034 21.21v.455c-2.15-2.032-3.68-5.202-3.68-9.327 0-4.05 1.53-7.296 3.68-9.328v.455c-1.364 1.668-2.454 4.277-2.454 8.873 0 4.64 1.09 7.204 2.454 8.872M39.774 15.78h-3.808v-.207c1.02-.055 1.31-.345 1.31-1.105V8.266c0-.47-.123-.677-.413-.677-.138 0-.372.068-.62.165l-.373.138V7.7l2.47-1.257.124.04v8.248c0 .595.275.843 1.31.843v.208M52.88 12.742h-7.684v-.912h7.685v.912M58.482 12.742h6.526v-.83h-6.526zM63.145 9.87h-2.692v-.145c.72-.04.926-.244.926-.782V4.558c0-.332-.09-.48-.293-.48-.098 0-.264.05-.44.118l-.263.098v-.137l1.746-.89.088.03V9.13c0 .42.195.595.927.595v.146M63.79 19.404l.135.127c-.663.91-.907 1.105-1.365 1.105-.244 0-.46-.156-.46-.527 0-.098.02-.225.157-.733l.43-1.582c.078-.303.136-.655.136-.772 0-.175-.088-.282-.234-.282-.39 0-.83.478-1.445 1.387-.44.654-.517.88-.975 2.422h-.732l.936-3.418a.86.86 0 0 0 .02-.167c0-.196-.137-.254-.634-.264v-.157c.79-.157 1.063-.196 1.58-.303l.04.02-.654 2.13c.975-1.564 1.63-2.15 2.253-2.15.42 0 .633.244.633.596 0 .175-.04.38-.097.586l-.547 1.982c-.098.352-.137.518-.137.596 0 .088.04.176.156.176.136 0 .31-.156.594-.518.068-.078.137-.166.205-.254M67.98 3.465V3.01c2.152 2.032 3.682 5.202 3.682 9.328 0 4.05-1.53 7.295-3.68 9.327v-.455c1.362-1.668 2.453-4.277 2.453-8.872 0-4.64-1.09-7.205-2.454-8.873M79.84 4.612h-5.434v-.645h5.434v.645M84.952 5.618l.137.127c-.665.908-.91 1.103-1.367 1.103-.244 0-.46-.156-.46-.527 0-.097.02-.224.157-.732l.43-1.582c.078-.303.136-.654.136-.772 0-.175-.088-.283-.234-.283-.39 0-.83.48-1.444 1.388-.44.655-.517.88-.975 2.423H80.6l.938-3.418a.86.86 0 0 0 .02-.166c0-.195-.138-.254-.635-.264v-.156c.79-.156 1.063-.195 1.58-.303l.04.02-.654 2.13c.974-1.564 1.628-2.15 2.252-2.15.42 0 .634.244.634.596 0 .175-.04.38-.097.585l-.548 1.983c-.097.35-.136.517-.136.596 0 .087.04.175.156.175.137 0 .312-.157.595-.518.068-.078.137-.166.205-.254M99.36 11.36h-8.126v-.91h8.126v.91m0 2.763h-8.126v-.912h8.126v.913M108.797 14.275l.165.166c-.786.968-1.67 1.493-2.814 1.493-1.117 0-1.862-.746-1.862-1.893 0-2.14 2.055-4.35 4.125-4.35.732 0 1.132.358 1.132.938 0 1.188-1.45 2.266-3.918 2.583-.138.278-.138.637-.138.844 0 .76.51 1.257 1.283 1.257.606 0 1.034-.22 2.027-1.035m-2.842-1.975l-.235.607c1.187-.29 1.71-.538 2.222-1.022.427-.414.69-.91.69-1.34 0-.33-.097-.538-.484-.538-.786 0-1.724 1.063-2.193 2.293"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 6.093h108v15.814H2z" fill="none"></path><path d="M9.802 9.214l-3.37 7.884H6.2L2.736 9.214h7.065m-.737.48h-4.89L6.61 15.47M20.13 16.7l-.538.55-2.702-2.69-2.702 2.69-.538-.538 2.69-2.702-2.69-2.703.55-.538 2.69 2.69 2.702-2.69.538.526-2.69 2.714M28.224 12.688v.012c1.287.163 2.258.947 2.258 2.058 0 1.252-1.123 2.2-3.205 2.2h-3.85v-.293c.855-.093 1.03-.257 1.03-.912V10.29c0-.69-.233-.89-1.03-.948V9.05h3.71c1.883 0 2.947.667 2.947 1.87 0 .89-.49 1.487-1.86 1.768m-1.895-2.656v2.562c1.46 0 1.824-.444 1.824-1.59 0-1.03-.363-1.603-1.158-1.603-.468 0-.667.176-.667.632zm0 2.913v2.866c0 .563.222.773.736.773.913 0 1.404-.643 1.404-1.825 0-1.193-.597-1.813-1.837-1.813h-.304M41.746 13.214h-6.89v-.772h6.89v.772m0 2.34h-6.89v-.772h6.89v.772M51.056 15.59l.164.104c-.725 1.123-1.076 1.392-1.602 1.392-.328 0-.574-.2-.574-.526 0-.2.082-.608.176-.89l.386-1.216h-.012c-1.03 1.825-1.672 2.61-2.374 2.61-.223 0-.363-.118-.42-.33-.458 1.756-.528 2.318-.785 2.622h-.83c.163-.234.327-.574.514-1.31l1.53-6.095h.88l-.88 3.487c-.022.105-.045.21-.045.316 0 .316.14.56.467.56.69 0 1.966-2.186 2.164-2.935l.386-1.427h.9l-.923 3.51c-.048.187-.223.784-.223.9 0 .095.047.176.128.176.188 0 .363-.152.97-.947M55.66 15.99c0 1.423-.52 2.845-1.868 2.845-1.415 0-1.87-1.538-1.87-2.895 0-1.464.57-2.812 1.903-2.812 1.083 0 1.836 1.166 1.836 2.862m-.793.04c0-1.72-.364-2.687-1.092-2.687-.686 0-1.06.976-1.06 2.655 0 1.68.365 2.622 1.077 2.622.703 0 1.075-.95 1.075-2.59M60.59 18.84l-.14.188c-1.85-1.053-2.855-3.03-2.855-5.018 0-2.164 1.017-3.85 2.89-4.96l.104.187c-1.627 1.392-1.99 2.48-1.99 4.738 0 2.175.352 3.497 1.99 4.866M66.52 9.05v.292c-.878.06-1.03.27-1.03 1.112v5.03c0 1.766-.854 2.597-2.48 2.597-.468 0-.97-.07-1.263-.268-.433-.293-.784-.796-.784-1.287 0-.433.398-.866.83-.866.445 0 .843.42.843.888 0 .35-.316.468-.316.772 0 .234.2.375.527.375.538 0 .748-.328.748-1.053v-6.434c0-.68-.234-.83-1.18-.866V9.05h4.104M76.824 14.384H73.77v3.053H73v-3.053h-3.053v-.772H73V10.56h.77v3.052h3.054v.772M84.918 11.8l-.21 1.508h-.187c-.08-.538-.292-1.252-1.157-1.252-.807 0-1.614 1.217-1.802 2.036h2.095l-.07.374H81.48a2.387 2.387 0 0 0-.117.795c0 .855.35 1.405 1.04 1.405.656 0 1.053-.292 1.72-.96l.187.118c-.655.795-1.17 1.263-2.34 1.263-1.064 0-1.613-.795-1.613-1.766 0-1.66 1.415-3.52 3.076-3.52.56 0 .737.198 1.053.198.14 0 .21-.094.245-.2h.188M89.137 15.99c0 1.423-.52 2.845-1.87 2.845-1.414 0-1.87-1.538-1.87-2.895 0-1.464.572-2.812 1.904-2.812 1.084 0 1.837 1.166 1.837 2.862m-.794.04c0-1.72-.364-2.687-1.092-2.687-.685 0-1.058.976-1.058 2.655 0 1.68.364 2.622 1.076 2.622.703 0 1.075-.95 1.075-2.59M93.855 14.384h10.82v-.702h-10.82zM96.17 6.723l-.083-.166c.23-.14.53-.19.81-.19 1.042 0 1.555.744 1.555 2.15 0 1.225-.504 3.466-2.44 3.466-.81 0-1.125-.637-1.125-1.34 0-1.166.918-2.35 2.126-2.35.265 0 .62.092.794.398a3.27 3.27 0 0 0 .058-.578c0-.728-.24-1.497-1.084-1.497-.222 0-.404.04-.61.108m1.422 2.53c0-.537-.28-.71-.505-.71-.818 0-1.53 1.232-1.53 2.382 0 .314.033.81.554.81.638 0 1.126-.827 1.358-1.67.074-.274.124-.555.124-.81M103.754 10.172l-.33 1.72h-4.84v-.206c.612-.067.728-.2.728-.63v-3.96c0-.423-.157-.555-.728-.59v-.205h4.773v1.663h-.207c-.19-1.108-.612-1.38-1.96-1.38-.43 0-.538.13-.538.446v1.86c.877-.01 1.24-.273 1.34-1.233h.215v2.796h-.215c-.083-.984-.438-1.282-1.34-1.282v2.003c0 .355.15.463.687.463.644 0 1.115-.124 1.504-.447.28-.232.43-.48.678-1.018h.232M97.702 16.455l-.083-.165c.23-.14.528-.19.81-.19 1.042 0 1.554.744 1.554 2.15 0 1.224-.504 3.466-2.44 3.466-.81 0-1.124-.637-1.124-1.34 0-1.166.918-2.35 2.125-2.35.265 0 .62.092.794.398a3.27 3.27 0 0 0 .057-.58c0-.727-.24-1.496-1.083-1.496-.224 0-.406.04-.612.107m1.422 2.53c0-.536-.28-.71-.504-.71-.82 0-1.53 1.233-1.53 2.382 0 .315.033.81.554.81.637 0 1.125-.826 1.356-1.67.075-.273.124-.554.124-.81M102.433 18.085l-.042.264h-.694l-.72 2.713a.65.65 0 0 0-.016.115c0 .108.05.133.124.133.133 0 .265-.132.67-.653l.108.058c-.496.76-.753 1-1.183 1-.224 0-.38-.098-.38-.305 0-.09.065-.347.13-.612l.646-2.45h-.62c-.008-.023-.008-.048-.008-.048 0-.09.074-.166.272-.207.265-.058.803-.463 1.1-.91.034-.05.083-.074.116-.074.05 0 .075.024.075.065 0 0 0 .04-.008.058l-.23.852h.66M106.43 9.237l.14-.187a5.912 5.912 0 0 1 2.853 5.018c0 2.164-1.03 3.825-2.89 4.96l-.104-.187c1.66-1.368 1.987-2.467 1.987-4.737 0-2.187-.292-3.533-1.988-4.866"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 4.48h108v19.04H2z" fill="none"></path><path d="M11.655 20.002l.27.228c-1.563 1.89-2.064 2.286-2.898 2.286-.584 0-.834-.25-.834-.852 0-.52.042-.685.48-2.39-1.564 2.35-2.774 3.263-4.233 3.263-1.168 0-2.086-.83-2.086-2.41 0-3.222 3.19-6.983 5.964-6.983.897 0 1.502.436 1.67 1.205l.228-.998.062-.063 1.272-.146.146.062c-.04.187-.062.23-.125.437-.98 3.553-1.855 7.128-1.855 7.543 0 .146.126.27.292.27.188 0 .46-.166 1.085-.852m-1.48-5.798c0-.727-.44-1.205-1.17-1.205-.937 0-1.854.645-2.73 1.913-.876 1.31-1.606 3.16-1.606 4.468 0 1.144.5 1.54 1.25 1.54 1.044 0 2.024-1.144 2.65-2.038.98-1.413 1.605-3.2 1.605-4.676M19.443 12.757l-.796 2.013h-5.765v-.176l2.624-2.778c1.386-1.454 1.917-2.57 1.917-3.82 0-1.337-.796-2.072-2.05-2.072-1.06 0-1.577.47-2.167 1.91l-.31-.073c.31-1.72 1.254-2.924 3.068-2.924 1.666 0 2.727 1.132 2.727 2.587 0 1.16-.574 2.263-1.886 3.644l-2.433 2.586h3.45c.62 0 .93-.16 1.417-.984M39.806 17.737h-5.443v5.424h-1.376v-5.423h-5.443v-1.372h5.443V10.94h1.376v5.425h5.443v1.372M48.877 16.282h.02c1.418-2.348 2.565-3.138 4.025-3.138 1.397 0 2.42.893 2.42 2.494 0 3.283-3.442 6.9-6.674 6.9-1.19 0-2.71-.48-2.71-1.102v-.125l2.96-10.868c.125-.5.188-.79.188-.977 0-.457-.104-.477-1.335-.52v-.352a47.178 47.178 0 0 0 3.192-.478l.104.104-.438 1.703m2.94 6.026c0-1.268-.542-1.788-1.46-1.788-1 0-1.96.873-2.856 2.39-.918 1.538-1.5 3.554-1.5 4.8 0 .48.31.707.958.707.896 0 1.793-.437 2.565-1.227 1.25-1.288 2.293-3.346 2.293-4.884M62.89 12.757l-.795 2.013H56.33v-.176l2.624-2.778c1.387-1.454 1.917-2.57 1.917-3.82 0-1.337-.795-2.072-2.048-2.072-1.062 0-1.578.47-2.168 1.91l-.31-.073c.31-1.72 1.254-2.924 3.068-2.924 1.666 0 2.727 1.132 2.727 2.587 0 1.16-.576 2.263-1.888 3.644l-2.433 2.586h3.45c.62 0 .928-.16 1.415-.984M84.45 15.658H72.17v-1.37h12.28v1.37m0 4.157H72.17v-1.372h12.28v1.372M98.547 20.085l.334.208c-1.27 1.6-2.376 2.244-3.94 2.244-1.94 0-3.065-1.08-3.065-3.2 0-1.933 1.084-3.74 2.564-4.925 1.02-.81 2.21-1.268 3.482-1.268 1.272 0 2.19.706 2.19 1.683a1 1 0 0 1-1.002.998c-.584 0-.813-.416-.813-.832 0-.374.313-.602.313-.997 0-.25-.292-.416-.772-.416-.834 0-1.668.374-2.273.998-1.167 1.226-1.897 2.992-1.897 4.842 0 1.496.667 2.37 1.856 2.37 1.105 0 1.897-.52 3.023-1.705M107.498 12.757l-.796 2.013h-5.766v-.176l2.625-2.778c1.387-1.454 1.918-2.57 1.918-3.82 0-1.337-.796-2.072-2.05-2.072-1.06 0-1.577.47-2.167 1.91l-.31-.073c.31-1.72 1.254-2.924 3.068-2.924 1.666 0 2.728 1.132 2.728 2.587 0 1.16-.575 2.263-1.887 3.644l-2.434 2.586h3.45c.62 0 .93-.16 1.415-.984"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M25.667 2h60.666v24H25.667z" fill="none"></path><path d="M27.276 17.28H84.72v-.808H27.275zM33.972 10.684h-5.284v-.627h5.284v.627M36.125 10.02h.01c.645-1.075 1.167-1.437 1.83-1.437.636 0 1.1.41 1.1 1.14 0 1.503-1.564 3.157-3.035 3.157-.54 0-1.233-.22-1.233-.504v-.057l1.347-4.972c.057-.228.086-.36.086-.447 0-.208-.048-.218-.607-.237v-.16c.635-.077.977-.134 1.45-.22l.048.048-.198.78m1.338 2.757c0-.58-.247-.818-.664-.818-.456 0-.892.398-1.3 1.092-.417.704-.683 1.626-.683 2.196 0 .22.142.323.436.323.407 0 .815-.198 1.166-.56.57-.59 1.044-1.53 1.044-2.233M45.374 10.475H42.89v1.987h-.627v-1.987h-2.476v-.627h2.476V8.004h.626v1.844h2.484v.627m0 3.127h-5.587v-.627h5.587v.627M54.964 2.804l-4.534 11.71h-.304L48.21 9.478c-.16-.428-.35-.56-.588-.56-.16 0-.408.104-.616.294l-.114-.19 1.48-1.178h.18l1.935 5.095h.038l3.927-10.133h.512"></path><path d="M54.63 3.366H83.9V2.8H54.63zM56.176 10.02h.01c.644-1.075 1.166-1.437 1.83-1.437.636 0 1.1.41 1.1 1.14 0 1.503-1.565 3.157-3.035 3.157-.54 0-1.232-.22-1.232-.504v-.057l1.347-4.972c.057-.228.085-.36.085-.447 0-.208-.047-.218-.607-.237v-.16c.636-.077.977-.134 1.45-.22l.05.048-.2.78m1.337 2.757c0-.58-.247-.818-.664-.818-.455 0-.892.398-1.3 1.092-.417.704-.683 1.626-.683 2.196 0 .22.143.323.437.323.408 0 .816-.198 1.167-.56.57-.59 1.043-1.53 1.043-2.233M62.55 7.95l-.36.92h-2.624v-.08l1.194-1.27c.63-.666.872-1.177.872-1.748 0-.612-.362-.948-.932-.948-.483 0-.718.215-.986.874l-.14-.034c.14-.786.57-1.337 1.394-1.337.758 0 1.24.517 1.24 1.183 0 .53-.26 1.035-.858 1.667L60.244 8.36h1.57c.28 0 .422-.074.643-.45M69.57 10.684h-5.284v-.627h5.284v.627M74.664 11.188h-.977v1.587h-.74v-1.587H70.29v-.608l2.98-4.23h.417v4.23h.977v.608m-1.717-.608V7.32l-2.277 3.26h2.277M79.32 11.72l.124.105c-.71.865-.94 1.045-1.318 1.045-.266 0-.38-.114-.38-.39 0-.237.02-.313.22-1.092-.713 1.074-1.263 1.492-1.927 1.492-.532 0-.95-.38-.95-1.103 0-1.473 1.452-3.194 2.713-3.194.408 0 .683.2.76.552l.104-.456.028-.03.58-.067.065.03c-.02.085-.028.104-.057.2-.446 1.624-.844 3.26-.844 3.45 0 .066.056.123.132.123.085 0 .208-.076.493-.39m-.674-2.652c0-.333-.198-.55-.53-.55-.427 0-.844.293-1.242.873-.4.6-.73 1.445-.73 2.044 0 .524.227.704.568.704.475 0 .92-.523 1.205-.93.447-.648.73-1.465.73-2.14M83.002 11.758l.15.095c-.577.732-1.08 1.027-1.79 1.027-.884 0-1.396-.494-1.396-1.464 0-.884.493-1.71 1.167-2.253.465-.37 1.005-.58 1.584-.58.58 0 .996.324.996.77 0 .257-.21.457-.455.457-.266 0-.37-.19-.37-.38 0-.172.142-.276.142-.457 0-.114-.133-.19-.35-.19-.38 0-.76.17-1.035.456-.53.56-.863 1.368-.863 2.214 0 .685.303 1.084.844 1.084.503 0 .863-.238 1.376-.78M55.732 24.378l-.512 1.302h-3.71v-.114l1.69-1.796c.89-.94 1.232-1.664 1.232-2.472 0-.865-.512-1.34-1.318-1.34-.683 0-1.015.304-1.395 1.236l-.2-.048c.2-1.112.806-1.89 1.973-1.89 1.072 0 1.755.73 1.755 1.672 0 .75-.37 1.463-1.214 2.357l-1.565 1.673h2.218c.4 0 .598-.105.91-.637M60.37 24.625l.124.105c-.712.865-.94 1.045-1.32 1.045-.264 0-.378-.114-.378-.39 0-.237.02-.313.218-1.092-.712 1.074-1.262 1.492-1.926 1.492-.53 0-.948-.38-.948-1.103 0-1.473 1.45-3.194 2.713-3.194.408 0 .683.2.76.552l.103-.457.028-.028.58-.067.065.03c-.02.085-.03.104-.058.2-.445 1.624-.844 3.26-.844 3.45 0 .066.057.123.133.123.086 0 .21-.075.494-.39m-.673-2.65c0-.334-.198-.552-.53-.552-.427 0-.845.294-1.243.874-.398.6-.73 1.445-.73 2.044 0 .523.227.703.57.703.473 0 .92-.524 1.203-.932.446-.647.73-1.464.73-2.14"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="28"><path d="M2 3.18h108v21.64H2z" fill="none"></path><path d="M10.606 20.8l.288.29c-1.37 1.68-2.908 2.594-4.904 2.594-1.947 0-3.245-1.298-3.245-3.292 0-3.724 3.582-7.57 7.188-7.57 1.274 0 1.97.626 1.97 1.635 0 2.066-2.523 3.94-6.826 4.493-.24.48-.24 1.106-.24 1.466 0 1.32.89 2.186 2.235 2.186 1.058 0 1.803-.384 3.534-1.802m-4.952-3.436l-.41 1.058c2.07-.505 2.982-.937 3.87-1.778.747-.72 1.203-1.586 1.203-2.33 0-.578-.168-.938-.84-.938-1.37 0-3.006 1.85-3.823 3.988M21.784 7.45l-.357 1.257h-1.734c-.238.85-1.14 3.772-1.14 4.11 0 .392.17.715.528.715.34 0 .8-.12 1.208-1.036h.272c-.255 1.053-1.054 2.412-2.33 2.412-.73 0-1-.61-1-1.274 0-.39.168-1.036.287-1.36l1.292-3.567H17.04c-.765 2.073-1.207 5.03-2.584 6.116a1.097 1.097 0 0 1-.612.204c-.442 0-.85-.34-.85-.747 0-.255.085-.714.51-.833.714-.187 1.054-.747 1.224-1.19l1.394-3.55h-.102c-.884 0-1.343.017-2.09.934h-.273c.917-1.545 1.8-2.19 3.518-2.19h4.606M26.27 4.544c0 .476-.39.867-.832.867-.493 0-.815-.356-.815-.9 0-.526.34-.9.798-.9.46 0 .85.442.85.934m-.713 8.24l.22.187c-.933 1.43-1.477 1.938-2.327 1.938-.56 0-.833-.306-.833-.934 0-.34.12-.935.374-1.886l.817-3.007c.085-.305.153-.61.153-.747 0-.34-.17-.39-1.088-.408v-.272c.663-.05 1.003-.1 2.72-.424l.067.05-1.598 5.827c-.085.29-.17.51-.17.748 0 .17.102.255.238.255.29 0 .697-.357 1.427-1.325M49.572 18.133h-6.274v6.272h-1.586v-6.272h-6.274v-1.585h6.274v-6.272h1.586v6.272h6.274v1.585M65.558 23.42h-6.635v-.36c1.78-.097 2.284-.602 2.284-1.923v-10.79c0-.816-.217-1.176-.72-1.176-.242 0-.65.12-1.083.29l-.65.24v-.337l4.304-2.186.216.072v14.343c0 1.034.48 1.466 2.284 1.466v.36M90.125 15.73h-14.16v-1.585h14.16v1.586m0 4.806h-14.16V18.95h14.16v1.586M109.404 15.49c0 4.133-1.514 8.266-5.433 8.266-4.11 0-5.43-4.47-5.43-8.41 0-4.253 1.657-8.17 5.527-8.17 3.15 0 5.337 3.39 5.337 8.314m-2.308.12c0-4.997-1.057-7.81-3.173-7.81-1.995 0-3.077 2.837-3.077 7.714 0 4.878 1.058 7.617 3.125 7.617 2.045 0 3.126-2.762 3.126-7.52"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 27,
            "groupname": "Walls",
            "lucidgroup": "Floor Plan",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 12v4h24v-4z" stroke="#fff" fill="#fff"></path><path d="M2 12h24v4H2v-4z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M16 2h-4v24h4z" stroke="#fff" fill="#fff"></path><path d="M16 2v24h-4V2h4z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 26H2V2h24v9.6" stroke="#000" stroke-width="5" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 14h24" stroke="#000" stroke-width="5" fill="none"></path></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 12v4h24v-4z" stroke="#fff" fill="#fff"></path><path d="M2 12h24v4H2v-4z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M16 2h-4v24h4z" stroke="#fff" fill="#fff"></path><path d="M16 2v24h-4V2h4z" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M11.6 26H2V2h24v9.6" stroke="#000" stroke-width="5" fill="none"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 14h24" stroke="#000" stroke-width="5" fill="none"></path></svg>'
            }],
            "pinned": false,
        },{
            "id": 36,
            "groupname": "Rooms",
            "lucidgroup": "Floor Plan",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><path d="M50.88 4l1.04-2 1.04-2h-52L2 2l1.04 2z" stroke="#fff" fill="#fff"></path><path d="M50.88 4H3.04M.96 0h52m-2.08 4" stroke="#000" stroke-width="2" fill="none"></path><path d="M49.92 50.88l2 1.04 2 1.04v-52l-2 1.04-2 1.04z" stroke="#fff" fill="#fff"></path><path d="M49.92 50.88V3.04m4-2.08v52m-4-2.08" stroke="#000" stroke-width="2" fill="none"></path><path d="M3.04 49.92l-1.04 2-1.04 2h52l-1.04-2-1.04-2z" stroke="#fff" fill="#fff"></path><path d="M3.04 49.92h47.84m2.08 4h-52m2.08-4" stroke="#000" stroke-width="2" fill="none"></path><g><path d="M4 3.04L2 2 0 .96v52l2-1.04 2-1.04z" stroke="#fff" fill="#fff"></path><path d="M4 3.04v47.84m-4 2.08v-52m4 2.08" stroke="#000" stroke-width="2" fill="none"></path></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><path d="M50.94 46.04l2 .53 2 .532V7.837l-2 .53-2 .53z" stroke="#fff" fill="#fff"></path><path d="M50.94 46.04V8.9m4-1.06V47.1m-4-1.06" stroke="#000" stroke-width="2" fill="none"></path><path d="M52.408 10.367l.53-2 .53-2h-52l.532 2 .53 2z" stroke="#fff" fill="#fff"></path><path d="M52.408 10.367H2.53m-1.06-4h52m-1.062 4" stroke="#000" stroke-width="2" fill="none"></path><path d="M2.53 44.57l-.53 2-.53 2h52l-.53-2-.532-2z" stroke="#fff" fill="#fff"></path><path d="M2.53 44.57H52.41m1.06 4h-52m1.063-4" stroke="#000" stroke-width="2" fill="none"></path><g><path d="M4 8.898l-2-.53-2-.53V47.1l2-.53 2-.53z" stroke="#fff" fill="#fff"></path><path d="M4 8.898V46.04m-4 1.062V7.837m4 1.06" stroke="#000" stroke-width="2" fill="none"></path></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><path d="M26.94 4l.53-2L28 0H1.47L2 2l.53 2z" stroke="#fff" fill="#fff"></path><path d="M26.94 4H2.53M1.47 0H28m-1.06 4" stroke="#000" stroke-width="2" fill="none"></path><path d="M50.94 52.408l2 .53 2 .53V26.94l-2 .53-2 .532z" stroke="#fff" fill="#fff"></path><path d="M50.94 52.408V28m4-1.06v26.53m-4-1.062" stroke="#000" stroke-width="2" fill="none"></path><path d="M52.408 29.47l.53-2 .53-2H28l-.53 2-.53 2z" stroke="#fff" fill="#fff"></path><path d="M52.408 29.47h-25.47m1.062-4h25.47m-1.062 4" stroke="#000" stroke-width="2" fill="none"></path><path d="M2.53 50.94l-.53 2-.53 2h52l-.53-2-.532-2z" stroke="#fff" fill="#fff"></path><path d="M2.53 50.94H52.41m1.06 4h-52m1.063-4" stroke="#000" stroke-width="2" fill="none"></path><g><path d="M25.47 28l2-.53 2-.53V1.47l-2 .53-2 .53z" stroke="#fff" fill="#fff"></path><path d="M25.47 28V2.53m4-1.06v25.47m-4 1.06" stroke="#000" stroke-width="2" fill="none"></path></g><g><path d="M4 2.53L2 2l-2-.53v52l2-.53 2-.532z" stroke="#fff" fill="#fff"></path><path d="M4 2.53V52.41m-4 1.06v-52m4 1.063" stroke="#000" stroke-width="2" fill="none"></path></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56"><path d="M4 3.04L2 2 0 .96v52l2-1.04 2-1.04z" stroke="#fff" fill="#fff"></path><path d="M4 3.04v47.84m-4 2.08v-52m4 2.08" stroke="#000" stroke-width="2" fill="none"></path><path d="M52.96 4V0h-52L2 2l1.04 2z" stroke="#fff" fill="#fff"></path><path d="M52.96 4H3.04M.96 0h52v4" stroke="#000" stroke-width="2" fill="none"></path><path d="M3.04 49.92l-1.04 2-1.04 2h52v-4z" stroke="#fff" fill="#fff"></path><path d="M3.04 49.92h49.92v4h-52m2.08-4" stroke="#000" stroke-width="2" fill="none"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 28,
            "groupname": "Mind Map",
            "lucidgroup": "Mind Map", 
            "shapes": [{
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 9.655h24v8.69H2z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M21.2 8c2.65 0 4.8 2.686 4.8 6s-2.15 6-4.8 6H6.8C4.15 20 2 17.314 2 14s2.15-6 4.8-6z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M5.6 17.61A3.605 3.605 0 0 1 2 14c0-1.595.975-2.94 2.488-3.432C4.4 5.88 10.4 4.978 12.8 6.782 14 4.075 20 4.977 20 7.684c3.6-.902 7.2 2.707 4.8 7.218 2.4 3.61 0 8.12-4.8 6.316-1.2 2.346-6 2.346-7.2 0-2.4 1.805-7.2.902-7.2-3.61z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 24.286h24L14 3.714z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 29,
            "groupname": "Equipment",
            "lucidgroup": "Process Engineering",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 37,
            "groupname": "Piping",
            "lucidgroup": "Process Engineering",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8v14.4h15.84L26 26V2l-8.16 4.8z" fill="none"></path><path d="M2 14h15.84z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M24.8 3.6L26 6l-1.2 2.4zM17.84 14l6.96-8M24.8 11.6L26 14l-1.2 2.4zM17.84 14h6.96M24.8 19.6L26 22l-1.2 2.4zM17.84 14l6.96 8" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8v14.4h24V6.8z" fill="none"></path><path d="M2 9.2h22.8m0-1.44L26 9.2l-1.2 1.44zM2 14h22.8m0-1.44L26 14l-1.2 1.44zM2 18.8h22.8m0-1.44L26 18.8l-1.2 1.44z" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8v14.4h15.84L26 26V2l-8.16 4.8z" fill="none"></path><path d="M2 14h15.84z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M24.8 3.6L26 6l-1.2 2.4zM17.84 14l6.96-8M24.8 11.6L26 14l-1.2 2.4zM17.84 14h6.96M24.8 19.6L26 22l-1.2 2.4zM17.84 14l6.96 8" stroke="#000" stroke-width="2"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M2 6.8v14.4h24V6.8z" fill="none"></path><path d="M2 9.2h22.8m0-1.44L26 9.2l-1.2 1.44zM2 14h22.8m0-1.44L26 14l-1.2 1.44zM2 18.8h22.8m0-1.44L26 18.8l-1.2 1.44z" stroke="#000" stroke-width="2"></path></svg>'
            },{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.44 8.19l16.392 3.275v8.97L6.44 23.75V8.19" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M9.752 8.93V4.933H2m19.2 5.87v-5.87h3.96" stroke="#000" stroke-width="2" fill="none"></path><path d="M24.92 4.25l1.104.683-1.104.682z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M10.112 18.113L8.096 21.09l11.88-.084-2.52-3.432-.144.042" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M8.312 10.37s.336-.582.504-.81c.144-.226.168-.353.576-.793.432-.426.792-.766 1.344-1.05.552-.297.888-.58 1.776-.68.888-.114 1.176-.128 1.176-.128l8.928.027-.024 5.375-3.312-.014s.048.497.048.794c0 .312.024.624-.072 1.092-.096.468-.168.88-.432 1.447-.264.568-.528.994-.72 1.235-.192.255-.312.425-.72.794-.384.382-.624.566-1.08.807-.456.256-.72.412-1.056.497-.336.1-.432.17-.96.227-.552.043-.888.07-1.224.043-.36-.042-.768-.085-1.08-.198-.312-.114-.84-.34-1.152-.51-.288-.17-.312-.114-.744-.455-.408-.34-.504-.312-.864-.794-.36-.468-.696-.908-.912-1.447-.216-.54-.432-1.32-.432-1.32" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M2.12 12.68H3.2v.285H2.12v-.284z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M2.024 11.05h.144v3.715h-.144S2 14.736 2 14.71v-3.603c0-.028.024-.057.024-.057zM3.128 11.86h8.16v2.04h-8.16v-2.04zM23.072 9.448h2.88s.024.014.024.042v.227c0 .014-.024.043-.024.043h-2.88c-.024 0-.048-.03-.048-.043V9.49c0-.028.024-.042.048-.042z" stroke="#000" stroke-width="2" fill="#ccc"></path><path d="M25.928 8.554a.1.1 0 0 1 .096.1v2.27a.1.1 0 0 1-.096.098c-.048 0-.072-.043-.072-.1v-2.27c0-.055.024-.098.072-.098z" stroke="#000" stroke-width="2" fill="#ccc"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><path d="M6.66 3.128v20.568c5.16 1.32 10.04 1.224 14.68 0V3.128c-5.62-1.128-10.5-1.104-14.68 0z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M7.98 24.008l-1.32 1.968h14.68l-1.32-1.944c-3.2.72-7.2 1.008-12.04-.024z" stroke="#000" stroke-width="2" fill="#fff"></path><path d="M4 11.12v4.584M4 13.4h2.66M21.34 13.4H24m0-2.28v4.584" stroke="#000" stroke-width="2" fill="none"></path><path d="M18.8 18.56c0 2.208-2.08 3.984-4.66 3.984s-4.68-1.776-4.68-3.984 2.1-4.008 4.68-4.008c2.58 0 4.66 1.8 4.66 4.008zM18.66 8.384c0 2.208-2.08 3.984-4.66 3.984s-4.66-1.776-4.66-3.984S11.42 4.376 14 4.376s4.66 1.8 4.66 4.008z" stroke="#000" stroke-width="2" fill="#fff"></path></svg>'
            }],
            "pinned": false,
        }, {
            "id": 30,
            "groupname": "Venn Diagram",
            "lucidgroup": "Venn Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><radialGradient gradientUnits="userSpaceOnUse" id="ltb_2195a" fx="14" fy="14" cx="14" cy="14" r="12.324"><stop offset="0%" stop-color="#82d4be" stop-opacity=".4"></stop><stop offset="60%" stop-color="#49c1a1" stop-opacity=".6"></stop><stop offset="100%" stop-color="#40a98d"></stop></radialGradient></defs><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#49c1a1" stroke-width="2" fill="url(#ltb_2195a)"></path></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><radialGradient gradientUnits="userSpaceOnUse" id="ltb_2196a" fx="14" fy="14" cx="14" cy="14" r="12.324"><stop offset="0%" stop-color="#a298ea" stop-opacity=".4"></stop><stop offset="60%" stop-color="#7769e0" stop-opacity=".6"></stop><stop offset="100%" stop-color="#685cc4"></stop></radialGradient></defs><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#7769e0" stroke-width="2" fill="url(#ltb_2196a)"></path></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><radialGradient gradientUnits="userSpaceOnUse" id="ltb_2197a" fx="14" fy="14" cx="14" cy="14" r="12.324"><stop offset="0%" stop-color="#f4e590" stop-opacity=".4"></stop><stop offset="60%" stop-color="#efd95d" stop-opacity=".6"></stop><stop offset="100%" stop-color="#d1be51"></stop></radialGradient></defs><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#efd95d" stroke-width="2" fill="url(#ltb_2197a)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><radialGradient gradientUnits="userSpaceOnUse" id="ltb_2198a" fx="14" fy="14" cx="14" cy="14" r="12.324"><stop offset="0%" stop-color="#eb83e6" stop-opacity=".4"></stop><stop offset="60%" stop-color="#e24adb" stop-opacity=".6"></stop><stop offset="100%" stop-color="#c641c0"></stop></radialGradient></defs><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#e24adb" stroke-width="2" fill="url(#ltb_2198a)"></path></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><radialGradient gradientUnits="userSpaceOnUse" id="ltb_2199a" fx="14" fy="14" cx="14" cy="14" r="12.324"><stop offset="0%" stop-color="#ed8787" stop-opacity=".4"></stop><stop offset="60%" stop-color="#e55050" stop-opacity=".6"></stop><stop offset="100%" stop-color="#c84646"></stop></radialGradient></defs><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#e55050" stroke-width="2" fill="url(#ltb_2199a)"></path></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<div _ngcontent-fsl-36="" class="item" lucid-default-disabled=""><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"><defs><radialGradient gradientUnits="userSpaceOnUse" id="ltb_2200a" fx="14" fy="14" cx="14" cy="14" r="12.324"><stop offset="0%" stop-color="#f7b898" stop-opacity=".4"></stop><stop offset="60%" stop-color="#f49769" stop-opacity=".6"></stop><stop offset="100%" stop-color="#d6845c"></stop></radialGradient></defs><path d="M26 14c0 6.627-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2s12 5.373 12 12z" stroke="#f49769" stroke-width="2" fill="url(#ltb_2200a)"></path></svg></div>'
            }],
            "pinned": false,
        }];

    });