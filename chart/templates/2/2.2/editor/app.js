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


        ////templates

        
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

    });