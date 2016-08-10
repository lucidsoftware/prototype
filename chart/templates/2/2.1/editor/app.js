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
        'lucidShapesData',
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


        ////TEMPLATE MANAGER STUFF////

         $scope.toggleClass = function(string, template) {
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
                    {name:'Android Mockup', preview:'images/shapeLibrary/android-44px.png', recommended: 'false', example1: 'images/examples/android1.png', example2: 'images/examples/android2.png', example3:'images/examples/android3.png', example4:'images/examples/android4.png', details:'With custom-built Android shapes and elements, you can create mockups and wireframes with less pixelation. We offer the 4 most common Android devices and 60+ GUI elements.'},
                    {name:'AWS Architecture', preview:'images/shapeLibrary/aws-44px.png', recommended: 'false', example1:'images/examples/aws1.png', example2:'images/examples/aws2.png', example3:'images/examples/aws3.png', details: 'Accurately diagram AWS architecture with the official AWS Simple Icons. You can chart with network shapes, database symbols, and a variety of other Amazon Web Services elements.'},
                    {name:'Azure', preview:'images/shapeLibrary/azure-44px.png', recommended: 'false', example1:'images/examples/azure1.png', example2:'images/examples/azure2.png', example3:'images/examples/azure3.png', details:'Diagram your network infrastructure using official Microsoft Azure icons. You can accurately depict your architecture setup with the wide range of shapes, including those for cloud, enterprise, VMs, and more.'},
                    {name:'BPMN 2.0', preview:'images/shapeLibrary/bpmn-44px.png', recommended: 'false', example1:'images/examples/bpmn1.png', example2:'images/examples/bpmn2.png', example3:'images/examples/bpmn3.png',example4:'images/examples/bpmn4.png', details: 'BPMN 2.0 is the most up-to-date version of business process modeling notation. Model common business activities like tasks, transactions, and end events.'},
                    {name:'Circuit Diagram', preview:'images/shapeLibrary/circuit-44px.png', recommended: 'false', example1:'images/examples/circuit1.png', example2:'images/examples/circuit2.png', example3:'images/examples/circuit3.png',example4:'images/examples/circuit4.png', details:'Create circuit diagrams to help you model processes for electrical engineering tasks. Our library is outfitted with custom options that increase ease of use and diagramming speed.'},
                    {name:'Cisco Network', preview:'images/shapeLibrary/cisco-44px.png', recommended: 'false', example1:'images/examples/cisco1.png', example2:'images/examples/cisco2.png', example3:'images/examples/cisco3.png',example4:'images/examples/cisco4.png', details:'Cisco network icons are globally recognized symbols for diagramming network architecture. Use our standard shape set to model nodes and connections in a computer network.'},
                    {name:'Data Flow', preview:'images/shapeLibrary/data-flow-44px.png', recommended: 'false', example1:'images/examples/data1.png', example2:'images/examples/data2.png', example3:'images/examples/data3.png',example4:'images/examples/data4.png', details:'Data flow diagrams will help you document the logical flow of information through a step-by-step process. Model the path of data from home to destination.'},
                    {name:'Enterprise Integration', preview:'images/shapeLibrary/enterprise-int-44px.png', recommended: 'false',example1:'images/examples/enterprise1.png', example2:'images/examples/enterprise2.png', example3:'images/examples/enterprise3.png',example4:'images/examples/enterprise4.png', details:'Use these standard shapes to add more detail to your diagram. Text blocks with either a transparent background, solid background, or as note. Plus a hotspot shape for creating interactive diagrams.' },
                    {name:'Entity Relationship', preview:'images/shapeLibrary/erd-44px.png', recommended: 'false', example1:'images/examples/entity1.png', example2:'images/examples/entity2.png', example3:'images/examples/entity3.png',example4:'images/examples/entity4.png', details:'Model databases in an easy-to-read format with entity relationship diagrams. You can get started with our shapes, which include contstraints, entities, relationships, and attributes.'},
                    {name:'Equation', preview:'images/shapeLibrary/equations-44px.png', recommended: 'false', example1:'images/examples/equations1.png', example2:'images/examples/equations2.png', example3:'images/examples/equations3.png',example4:'images/examples/equations4.png', details:'Create a mathematical expression using LaTeX markup language and insert it directly into your diagram. You can easily edit the expression by double-clicking it.'},
                    {name:'Flowchart', preview:'images/shapeLibrary/flowchart-44px.png', recommended: 'false', example1:'images/examples/flowchart1.png', example2:'images/examples/flowchart2.png', example3:'images/examples/flowchart3.png',example4:'images/examples/flowchart4.png', details:'Build and optimize any process, whether simple or complex, with a variety of flowchart shapes and containers. Try demoing a path for surveys, software flow, and business activities.'},
                    {name:'Floorplan', preview:'images/shapeLibrary/floorplans-44px.png', recommended: 'false', example1:'images/examples/floorplan1.png', example2:'images/examples/floorplan2.png', example3:'images/examples/floorplan3.png',example4:'images/examples/floorplan4.png', details:'Lay out floor plans for homes, offices, and buildings. Create and manage your space with standard shapes and specialized ones like office chairs and bathroom vanities.'},
                    {name:'iOS Mockup', preview: 'images/shapeLibrary/ios-44px.png', recommended: 'false', example1:'images/examples/ios.png', example2:'images/examples/ios.png', example3:'images/examples/ios.png',example4:'images/examples/ios.png', details:'Create iPad and iPhone mockups with iOS shapes based on Apples UIKit and Human Interface Guidelines.'},
                    {name:'Mind Mapping', preview:'images/shapeLibrary/mind-map-44px.png', recommended: 'false', example1:'images/examples/mind.png', example2:'images/examples/mind.png', example3:'images/examples/mind.png',example4:'images/examples/mind.png', details:'Mind mapping is perfect for jotting down your thoughts. Navigate quickly with keyboard shortcuts to add new ideas and build on old ones.'},
                    {name:'Network Infrastructure', preview:'images/shapeLibrary/network-44px.png', recommended: 'false', example1:'images/examples/network.png', example2:'images/examples/network.png', example3:'images/examples/network.png',example4:'images/examples/network.png', details:'Create fast, accurate network diagrams with this library. Unlike our Cisco and AWS shapes, these are vendor-neutral and allow for great flexibility.'},
                    {name:'Org Charts', preview:'images/shapeLibrary/org-chart-44px.png', recommended: 'false', example1:'images/examples/org.png', example2:'images/examples/org.png', example3:'images/examples/org.png',example4:'images/examples/org.png', details:'Create org charts in minutes with .csv import and premade layouts. You can personalize your chart by uploading pictures and customizing role, name, and contact information.'},
                    {name:'Process Engineering', preview:'images/shapeLibrary/process-eng-44px.png', recommended: 'false', example1:'images/examples/process.png', example2:'images/examples/process.png', example3:'images/examples/process.png',example4:'images/examples/process.png', details:'Create efficient process flow diagrams for any factory or plant, with shapes like pumps, valves, heat exchangers, vessels, and more.'},
                    {name:'Server Rack Diagram', preview:'images/shapeLibrary/server-rack-44px.png', recommended: 'false', example1:'images/examples/server.png', example2:'images/examples/server.png', example3:'images/examples/server.png',example4:'images/examples/server.png', details:'Create rack diagrams to efficiently lay out servers, server racks, and power supply. Our shapes aren"t vendor-specific, so you can use them in various scenarios.'},
                    {name:'Site Map', preview:'images/shapeLibrary/site-maps-44px.png', recommended: 'false', example1:'images/examples/site.png', example2:'images/examples/site.png', example3:'images/examples/site.png',example4:'images/examples/site.png', details:'Visualize your new or existing website with custom site map shapes. Add urls to each page and press "Enter" or "Tab" to quickly create more pages.'},
                    {name:'Table', preview: 'images/shapeLibrary/tables-44px.png', recommended: 'false', example1:'images/examples/table.png', example2:'images/examples/table.png', example3:'images/examples/table.png',example4:'images/examples/table.png', details:'Organize your data with tables. Use advanced features to copy and paste data from Excel and Google Spreadsheets.'},
                    {name:'Timeline', preview:'images/shapeLibrary/tech-clipart-44px.png', recommended: 'false', example1:'images/examples/timeline.png', example2:'images/examples/timeline.png', example3:'images/examples/timeline.png',example4:'images/examples/timeline.png', details:'Organize your data with timelines. Use advanced features to copy and paste data from Excel and Google Spreadsheets.'},
                    {name:'Tech Clipart', preview:'images/shapeLibrary/tech-clipart-44px.png', recommended: 'false', example1:'images/examples/tech.png', example2:'images/examples/tech.png', example3:'images/examples/tech.png',example4:'images/examples/tech.png', details:'Our tech clipart library will enhance network diagrams with a host of electronics shapes, like servers, printers, and monitors. Tech clipart can be added to any diagram type, including floor plans and BPMN diagrams.'},
                    {name:'UI Mockup', preview:'images/shapeLibrary/ui-44px.png', recommended: 'false', example1:'images/examples/ui.png', example2:'images/examples/ui.png', example3:'images/examples/ui.png',example4:'images/examples/ui.png', details:'Plan the ideal user interaction flow with UI mockups. Our tool gives you a variety of widgets, containers, and UI elements, to which you can easily add interactivity.'},
                    {name:'UML', preview:'images/shapeLibrary/uml-44px.png', recommended: 'false', example1:'images/examples/uml.png', example2:'images/examples/uml.png', example3:'images/examples/uml.png',example4:'images/examples/uml.png', details:'UML is a standard language for modeling object-based software. Use our Unified Modeling Language shapes and connectors to draw state diagrams, activity diagrams, use case diagrams, and more.'},
                    {name:'Value Stream', preview: 'images/shapeLibrary/value-stream-44px.png', recommended: 'false', example1:'images/examples/value.png', example2:'images/examples/value.png', example3:'images/examples/value.png',example4:'images/examples/value.png', details:'Use our value stream maps to identify waste in any process--especially manufacturing--then quickly eliminate it. We offer shapes like materials, shipments, information, kanban, and more.'},
                    {name:'Venn Diagram', preview:'images/shapeLibrary/venn-diagrams.png', recommended: 'false', example1:'images/examples/venn.png', example2:'images/examples/venn.png', example3:'images/examples/venn.png',example4:'images/examples/venn.png', details:'Venn diagrams are perfect for students and teachers, especially when solving logic, probability, and comparison problems. We offer premade templates and easy design options.'},
                    {name:'Video', preview:'images/shapeLibrary/videos-44px.png', recommended: 'false', example1:'images/examples/video.png', example2:'images/examples/video.png', example3:'images/examples/video.png',example4:'images/examples/video.png', details:'The video shape library allows you to upload any Youtube video to your diagram. If you publish the video, everyone--even non-Lucidchart users--can see it.'},        
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
            "pinned": true,
            "pinnedOrder": 2

        }, {
            "id": 3,
            "lucidgroup": "Flowchart",
            "groupname": "Flowchart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Flowchart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true,
            "pinnedOrder": 3

        }, {
            "id": 4,
            "lucidgroup": "Flowchart",
            "groupname": "Containers",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Containers",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Containers",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Containers",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Containers",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": true,
            "pinnedOrder": 4

        }, {
            "id": 5,
            "lucidgroup": "Geometric Shapes",
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
            "pinned": true,
            "pinnedOrder": 5

        }, {
            "id": 6,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Devices",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }]
        }, {
            "id": 61,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Dialogs",
            "shapes": [{
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }]
        }, {
            "id": 62,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Blocks",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
        }, {
            "id": 63,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Inputs",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
        }, {
            "id": 64,
            "lucidgroup": "Android Mockup",
            "groupname": "Android Icons",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Android Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
        }, {
            "id": 7,
            "lucidgroup": "Entity Relationship",
            "groupname": "Entity Relationship",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Entity Relationship",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
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
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }]
        }, {
            "id": 81,
            "lucidgroup": "iOS Mockups",
            "groupname": "iPhone Elements",
            "shapes": [{
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }]
        }, {
            "id": 82,
            "lucidgroup": "iOS Mockups",
            "groupname": "iPad Elements",
            "shapes": [{
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 83,
            "lucidgroup": "iOS Mockups",
            "groupname": "Common iOS Elements",
            "shapes": [{
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 84,
            "lucidgroup": "iOS Mockups",
            "groupname": "iOS Icons",
            "shapes": [{
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }]
        }, {
            "id": 85,
            "lucidgroup": "iOS Mockups",
            "groupname": "iOS Devices",
            "shapes": [{
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "iOS Mockups",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }],
            "pinned": false
        }, {
            "id": 9,
            "lucidgroup": "Site Map",
            "groupname": "Site Maps",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Site Maps",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
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
            }]
        }, {
            "id": 101,
            "lucidgroup": "UI Mockup",
            "groupname": "UI Widgets",
            "shapes": [{
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
            }]
        }, {
            "id": 102,
            "lucidgroup": "UI Mockup",
            "groupname": "UI Input",
            "shapes": [{
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
            }]
        }, {
            "id": 103,
            "lucidgroup": "UI Mockup",
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
            "lucidgroup": "UI Mockup",
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
            }],
            "pinned": false

        }, {
            "id": 113,
            "lucidgroup": "UML",
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
            "lucidgroup": "UML",
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
            "lucidgroup": "UML",
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
            "groupname": "BPMN 2.0",

            "shapes": [{
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "BPMN 2.0",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
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
            "groupname": "Org Charts",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Org Charts",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 15,
            "groupname": "Table",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tables",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tables",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tables",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tables",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 16,
            "groupname": "Value Stream",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Value Stream",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 17,
            "groupname": "AWS Architecture",
            "lucidgroup": "AWS Architecture",
            "shapes": [{
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "AWS Architecture",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 18,
            "groupname": "Azure",
            "lucidgroup": "Azure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Azure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Azure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Azure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Azure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 19,
            "groupname": "Cisco Network",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Cisco Network Icons",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 20,
            "groupname": "Network Infrastructure",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Network Infrastructure",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 21,
            "groupname": "Server Rack Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Server Rack Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 22,
            "groupname": "Tech Clipart",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Tech Clipart",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
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
            "groupname": "Circuit Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Circuit Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 25,
            "groupname": "Enterprise Integration",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Enterprise Integration",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 26,
            "groupname": "Equation",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Equations",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Equations",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Equations",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Equations",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 27,
            "groupname": "Floor Plans",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Floor Plans",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 28,
            "groupname": "Mind Mapping",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Mind Mapping",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 29,
            "groupname": "Process Engineering",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Process Engineering",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }, {
            "id": 30,
            "groupname": "Venn Diagram",
            "shapes": [{
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Rectangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-rectangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g></g>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Triangle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-triangle.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Triangle-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27 27 3 27 "></polygon></g></g></svg>'
            }, {
                "name": "Polygon",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-polygon.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g class="lucid-shapes-fill-stroke" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Polygon-1-Copy-4" sketch:type="MSShapeGroup" points="15 3 27.3637347 11.9827791 22.6412083 26.5172209 7.35879172 26.5172209 2.63626529 11.9827791 "/></g></g></svg>'
            }, {
                "name": "Circle",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-oval.svg",
                "svg": '<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><ellipse id="Oval-9-Copy-4" sketch:type="MSShapeGroup" cx="15" cy="15" rx="13" ry="13"></ellipse></g></g></svg>'
            }, {
                "name": "Star",
                "tags": "Venn Diagrams",
                "url": "assets/icon-shapes-star.svg",
                "svg": '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 30 30" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke-width="2" stroke="#979797" fill="#FFFFFF"><polygon id="Star-1-Copy-4" sketch:type="MSShapeGroup" points="15 23 6.77100647 27.3262379 8.34260439 18.163119 1.68520877 11.6737621 10.8855032 10.336881 15 2 19.1144968 10.336881 28.3147912 11.6737621 21.6573956 18.163119 23.2289935 27.3262379 "/></g></g></svg>'
            }],
            "pinned": false,
        }];

    });