/*global angular : true fixes codekit error*/
var particleApp = angular.module('particleApp', ['appConfig', 'ngRoute', 'lucidComponentFactory', 'ngAnimate', 'lucidComponents', 'hljs', 'lucidIcons', 'lucidSnippets', 'lucidProductionFactory', 'lucidColors']);

particleApp.run(['$route', '$rootScope', '$location', function($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function(path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function() {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
particleApp.config(function($routeProvider) {
    $routeProvider
        .when('/overview', {
            templateUrl: 'templates/codepen.html',
        })
                .when('/persona-it', {
            templateUrl: 'templates/persona-it.html',
            controller: 'angularController'
        })
        .when('/codepen', {
            templateUrl: 'templates/codepen.html',
        })

         .when('/persona-director', {
            templateUrl: 'templates/persona-director.html',
            controller: 'angularController'
        })
         .when('/persona-tech', {
            templateUrl: 'templates/persona-tech.html',
     
        })
          .when('/persona-engineer', {
            templateUrl: 'templates/persona-engineer.html',
     
        })
        .when('/components', {
            templateUrl: 'templates/components.html',
            controller: 'componentController'
        })
        .when('/components/:componentGroupID', {
            templateUrl: 'templates/components.html',
            controller: 'componentController',
            reloadOnSearch: false
        })
        .when('/components/:componentGroupID/:searchResults', {
            templateUrl: 'templates/components.html',
            controller: 'componentController'
        })
        .when('/search', {
            templateUrl: 'templates/search.html',
        })
        .when('/reserved', {
            templateUrl: 'templates/reserved.html',
        })
        .when('/icons/:searchResults', {
            templateUrl: 'templates/icons.html',
            controller: 'iconController',
            reloadOnSearch: false
        })
        .when('/production', {
            templateUrl: 'templates/production-components.html',
            controller: 'productionController',
            reloadOnSearch: false
        })
        .when('/production/:searchResults', {
            templateUrl: 'templates/production-components.html',
            controller: 'productionController',
            reloadOnSearch: false
        })
        .when('/colors', {
            templateUrl: 'templates/colors.html',
            controller: 'colorController',
            reloadOnSearch: false
        })
        .when('/colors/:searchResults', {
            templateUrl: 'templates/colors.html',
            controller: 'colorController',
            reloadOnSearch: false
        })

    .otherwise({
        redirectTo: '/overview'
    });
});


particleApp.controller('mainController', function($scope, $location, lucidComponentFactory) {

    //this function adds active class to sidebar items//
    $scope.isActive = function(viewRoot, viewEnd) {
        var viewLocation = viewRoot + viewEnd;
        var active = ($location.url().indexOf(viewLocation) > -1);
        return active;
    };

    //this pulls in the component groups for the sidebar//
    $scope.componentGroups = lucidComponentFactory;
    //this adds URLs to the side bar for prototypes
    $scope.prototypes = [{
        'title': 'Chart Editor',
        'url': 'latest-prototype/chart-editor'
    }, {
        'title': 'Press Editor',
        'url': 'latest-prototype/press-editor'
    },  {
        'title': 'Press Docs List',
        'url': 'latest-prototype/press-docslist'
    }];

    $scope.checkedUsers = [];


    $scope.addUser = function(user){
        var newuser = user;
        $scope.checkedUsers.push(newuser);
    }

    $scope.reachout = function(groupName){
       console.log($scope.checkedUsers);
       for(var i = 0; i<$scope.checkedUsers.length; i++)
            {
               $scope.checkedUsers[i].status = "Reserved";
            }
            $location.path('/reserved');

            console.log(groupName + "groupName");
            
    }

    $scope.saveNote = function(){
        
        console.log("note =" + $scope.newNoteText);
    }

    $scope.getUserInfo = function(user) {

        $scope.nameClicked=true;

        $scope.name=user.name;
        $scope.personaSummary = user.persona;
        $scope.jobTitle = user.jobTitle;
        $scope.previousTool = user.previousTool;
        $scope.reasonsForSwitch = user.reasonsForSwitch;
        $scope.usage = user.usage;
        $scope.diagramTypes=user.diagramTypes;
        $scope.toolsUsed = user.toolsUsed;
        $scope.featureImprovements = user.featureImprovements;
        $scope.companyName = user.companyName;
        $scope.companySize = user.companySize;
        $scope.teamSize = user.teamSize;
        $scope.accountSize = user.accountSize;
        $scope.accountType = user.accountType;
        $scope.userID = user.userID;
        $scope.email = user.email;
        $scope.contacted = user.contacted;
        $scope.giftcard = user.giftCard;
        $scope.fluency = user.fluency;
        $scope.status = user.status;
    };


    $scope.personaDrop = function (String) {
        if(String == "Persona"){
            return '';
        }else{
            return String;
        }
    };

    $scope.fluencyDrop = function (String) {
        if(String == "Fluency"){
            return '';
        }else{
            return String;
        }
    };

    $scope.orgDrop = function (String) {
        if(String == "Org Size"){
            return '';
        }else{
            return String;
        }
    };

        $scope.subDrop = function (String) {
        if(String == "Subscription"){
            return '';
        }else{
            return String;
        }
    };


        $scope.orgDrop = function (String) {
        if(String == "Org Size"){
            return '';
        }else{
            return String;
        }
    };


$scope.users = [
  {
    "name": "Michael Stuart",
    "persona": "(Not IT?)",
    "jobTitle": "Business & IT Consultant",
    "previousTool": "Visio",
    "reasonsForSwitch": "Multiple devices, cross-OS, Collaboration",
    "usage": "Weekly",
    "diagramTypes": "",
    "toolsUsed": "Word, Docs, Powerpoint, Excel, Basecamp, Poster, Dropbox, Powerpoint, PDF",
    "featureImprovements": "",
    "companyName": "1stOnlineRealty",
    "companySize": 50,
    "teamSize": "",
    "accountSize": 1,
    "accountType": "professional",
    "userID": 1468893,
    "email": "michaelalanstuart@gmail.com",
    "contacted": "8/16/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Adamu Ibrahim",
    "persona": "(Not IT?)",
    "jobTitle": "Systems Analyst",
    "previousTool": "Visio",
    "reasonsForSwitch": "",
    "usage": "",
    "diagramTypes": "Call flow diagram, call process",
    "toolsUsed": "",
    "featureImprovements": "Call flow diagram template",
    "companyName": "McFarland Clinic",
    "companySize": 5000,
    "teamSize": 3,
    "accountSize": 20,
    "accountType": "team-20",
    "userID": "",
    "email": "aibrahim@mcfarlandclinic.com",
    "contacted": "8/16/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Aaron Hatton",
    "persona": "?",
    "jobTitle": "IT specialist",
    "previousTool": "Visio, Powerpoint",
    "reasonsForSwitch": "Collaboration, Used it at previous job, heard at Conference (AutoTask?)",
    "usage": "",
    "diagramTypes": "Mindmap, processes, AWS, org charts, matrices, etc.",
    "toolsUsed": "Whiteboard, flipchart, Lucidchart, Paint, PDF, Google Drive",
    "featureImprovements": "Load time is slow - can't use on conference calls because too slow",
    "companyName": "Pearson",
    "companySize": 40000,
    "teamSize": "",
    "accountSize": 31250,
    "accountType": "enterprise-31250",
    "userID": 112577963,
    "email": "Aaron.Hatton@pearson.com",
    "contacted": "8/16/2016",
    "giftCard": "TRUE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Corprew Reed",
    "persona": "Director / Head of",
    "jobTitle": "Head of Engineering",
    "previousTool": "omnigraffle, visio",
    "reasonsForSwitch": "Collaboration, Omnigraffle was unreliable (crashed)",
    "usage": "Monthly",
    "diagramTypes": "Database architecture",
    "toolsUsed": "Whiteboard, Tableau, IDE, Word Doc, Powerpoint, Keynote",
    "featureImprovements": "",
    "companyName": "Freeform Development",
    "companySize": 10,
    "teamSize": "",
    "accountSize": 1,
    "accountType": "Pro-monthly",
    "userID": 112555045,
    "email": "corprew@gmail.com",
    "contacted": "8/16/2016",
    "giftCard": "TRUE",
    "fluency": "Beginner",
    "status":"Available"
  },
  {
    "name": "Jamey Taylor",
    "persona": "Director / Head of",
    "jobTitle": "CTO",
    "previousTool": "Visio",
    "reasonsForSwitch": "Price, collaboration",
    "usage": "Weekly",
    "diagramTypes": "Flowcharts, business processes",
    "toolsUsed": "Word Doc, Sketch, Invision, Google Drive, Powerpoint",
    "featureImprovements": "",
    "companyName": "Ticket Biscuit",
    "companySize": 70,
    "teamSize": 12,
    "accountSize": 20,
    "accountType": "team-20",
    "userID": 1657763,
    "email": "jtaylor@ticketbiscuit.com",
    "contacted": "8/16/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Christopher Devairakkam",
    "persona": "Generic Software / Analysis",
    "jobTitle": "Analyst",
    "previousTool": "Visio,Cadpro",
    "reasonsForSwitch": "Free (university), Already available at org",
    "usage": "Weekly",
    "diagramTypes": "",
    "toolsUsed": "Paper, PDF, Google Drive",
    "featureImprovements": "More welcoming way for non-users to access product (request license dialog is harsh)",
    "companyName": "Google",
    "companySize": 10000,
    "teamSize": "",
    "accountSize": 10000,
    "accountType": "enterprise-10000",
    "userID": 111759863,
    "email": "cdevairakkam@google.com",
    "contacted": "8/16/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Tony Geistkemper",
    "persona": "Generic Software / Analysis",
    "jobTitle": "Managing Director",
    "previousTool": "Visio",
    "reasonsForSwitch": "",
    "usage": "Weekly",
    "diagramTypes": "Site maps, process, flowchart",
    "toolsUsed": "Whiteboard, Lucidchart, Google Docs, Instant Message",
    "featureImprovements": "Hard to move arrow after drawing it (also hard to delete it), this is arrow selection, wishes flowchart sections pasted responsively (infinite canvas), improved shape definition and use case (what shape meant and how to use it), footnote/long-form annotation for shapes, screenshots/images to supplement blocks on canvas",
    "companyName": "Therapy Sites",
    "companySize": 50,
    "teamSize": "",
    "accountSize": 15,
    "accountType": "team-15",
    "userID": 108239923,
    "email": "tgeistkemper@officite.com",
    "contacted": "8/21/2016",
    "giftCard": "FALSE",
    "fluency": "Advanced",
    "status":"Reserved"
  },
  {
    "name": "Kenny Wong",
    "persona": "Generic Software / Analysis",
    "jobTitle": "Senior Software Developer",
    "previousTool": "Visio, Google Charts, Power Point",
    "reasonsForSwitch": "Already available at org",
    "usage": "Weekly",
    "diagramTypes": "Flow diagram, sequence, mind map, block diagram",
    "toolsUsed": "Whiteboard, Box Notes, Lucidchart, Word doc, Confluence, Powerpoint",
    "featureImprovements": "Increase visibility of Confluence integration, copy + paste from Lucidchart to Confluence",
    "companyName": "Box.com",
    "companySize": 5000,
    "teamSize": "",
    "accountSize": 450,
    "accountType": "team-450",
    "userID": 102692717,
    "email": "wong@box.com",
    "contacted": "8/21/2016",
    "giftCard": "FALSE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Alexey Shockov",
    "persona": "Generic Software / Analysis",
    "jobTitle": "Senior Software Developer",
    "previousTool": "White board, nomnoml UML, MS Visio.",
    "reasonsForSwitch": "",
    "usage": "Monthly",
    "diagramTypes": "UML, deployment diagrams, class diagrams",
    "toolsUsed": "Whiteboard (picture), PDF",
    "featureImprovements": "",
    "companyName": "",
    "companySize": "",
    "teamSize": "",
    "accountSize": 1,
    "accountType": "Free",
    "userID": 317903,
    "email": "alexey@shockov.com",
    "contacted": "8/21/2016",
    "giftCard": "FALSE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Jeffrey Barney",
    "persona": "Generic Software / Analysis",
    "jobTitle": "Engineering Manager",
    "previousTool": "Visio, MindMup",
    "reasonsForSwitch": "Collaboration, exporting, revision history",
    "usage": "Weekly",
    "diagramTypes": "Mindmap, flowchart",
    "toolsUsed": "",
    "featureImprovements": "Imrpove Auto-layout for Mind Map, collapsible hierarchy, move nodes",
    "companyName": "Dematic",
    "companySize": 5000,
    "teamSize": "",
    "accountSize": 20,
    "accountType": "enterprise-20",
    "userID": 113067101,
    "email": "jeffrey.barney@dematic.com",
    "contacted": "8/21/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Leo Funes",
    "persona": "Generic Software / Analysis",
    "jobTitle": "Senior Manager Client Solutions",
    "previousTool": "Visio",
    "reasonsForSwitch": "Collaboration, price",
    "usage": "Daily",
    "diagramTypes": "Org chart, floorplan, flowchart",
    "toolsUsed": "Confluence",
    "featureImprovements": "Better revision history - with \"states\" of things",
    "companyName": "Jive",
    "companySize": 1000,
    "teamSize": "",
    "accountSize": 100,
    "accountType": "Team-100",
    "userID": 108961721,
    "email": "lfunes@jive.com",
    "contacted": "8/23/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Ben Perry",
    "persona": "Generic Software / Analysis",
    "jobTitle": "VP of Technology",
    "previousTool": "Visio, Gliffy",
    "reasonsForSwitch": "Collaboration, Cross platform",
    "usage": "Daily",
    "diagramTypes": "Database flow, business process",
    "toolsUsed": "Whiteboard, Google Docs, PDF, Slack",
    "featureImprovements": "More integrations, better offline app",
    "companyName": "Motion Intelligence",
    "companySize": 10,
    "teamSize": 10,
    "accountSize": 10,
    "accountType": "team-10-monthly",
    "userID": 4352345525,
    "email": "ben.perry@motionintel.com",
    "contacted": "8/23/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Sathish Gajendran",
    "persona": "General Software Engineer",
    "jobTitle": "Software Engineer",
    "previousTool": "",
    "reasonsForSwitch": "",
    "usage": "Yearly",
    "diagramTypes": "Flowcharts, business processes",
    "toolsUsed": "Google Drive, Powerpoint",
    "featureImprovements": "",
    "companyName": "Pearson",
    "companySize": 40000,
    "teamSize": "",
    "accountSize": 31250,
    "accountType": "enterprise-31250",
    "userID": 64574564,
    "email": "",
    "contacted": "8/23/2016",
    "giftCard": "TRUE",
    "fluency": "Advanced",
    "status":"Available"
  },
  {
    "name": "Naveen Hiremath",
    "persona": "IT Consultant",
    "jobTitle": "Technical Architect",
    "previousTool": "Visio, Omnigraffle",
    "reasonsForSwitch": "Need to collaborate — we are remote.(found via Google Search), Easy to Use",
    "usage": "Weekly",
    "diagramTypes": "ERD, Process diagrams, Flowcharts in swimlanes, AWS, Occasionally mindmap, UI",
    "toolsUsed": "Whiteboard (drop pictures in Google Drive), PDF, Visio, Google Drive",
    "featureImprovements": "Whiteboard capture, better Safari experience, native mac app",
    "companyName": "Blue Wolf",
    "companySize": 1000,
    "teamSize": 4,
    "accountSize": 150,
    "accountType": "Enterprise-150",
    "userID": 34535763,
    "email": "nhiremath@bluewolfgroup.com",
    "contacted": "8/23/2016",
    "giftCard": "TRUE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Johnathan Deckert",
    "persona": "IT Consultant",
    "jobTitle": "Project Manager (Consultant)",
    "previousTool": "Visio, MindJet, LogicGate, Adobe Illustrator",
    "reasonsForSwitch": "Collaboration",
    "usage": "Weekly",
    "diagramTypes": "BPMN, process flows, org charts, communication plans, collaborative brainstorming, system maps, issue escalation plans, website mockups, business model canvases, remodel floor plans",
    "toolsUsed": "PDF, Powerpoint",
    "featureImprovements": "Easier entry for non-users (like Smartsheet), consultant referral program, faster load times, default line arrows,",
    "companyName": "Self",
    "companySize": 1,
    "teamSize": "--",
    "accountSize": 10,
    "accountType": "Team-10-monthly",
    "userID": 103829265,
    "email": "j@jdeckert.com",
    "contacted": "8/23/2016",
    "giftCard": "TRUE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Anthony Culver",
    "persona": "IT Consultant",
    "jobTitle": "Senior Consultant",
    "previousTool": "Erwin, Visio, Aris Express",
    "reasonsForSwitch": "",
    "usage": "Daily",
    "diagramTypes": "ERD (Database)",
    "toolsUsed": "Powerpoint",
    "featureImprovements": "Visual Studio Import (UML)",
    "companyName": "Cap Tech",
    "companySize": 600,
    "teamSize": "",
    "accountSize": 1,
    "accountType": "Free",
    "userID": 110247535,
    "email": "aculver28@gmail.com",
    "contacted": "8/23/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Bernhard Albler",
    "persona": "IT Consultant",
    "jobTitle": "Systems Engineer",
    "previousTool": "Visio, Omnigraffle",
    "reasonsForSwitch": "Switched to Mac, needed Confluence integration. Frustrated with different people having different versions of Visio",
    "usage": "Daily",
    "diagramTypes": "Network diagram, flowchart",
    "toolsUsed": "Powerpoint, Word, Confluence",
    "featureImprovements": "",
    "companyName": "",
    "companySize": 8,
    "teamSize": 5,
    "accountSize": 5,
    "accountType": "Team-5",
    "userID": 107613757,
    "email": "balbler@frink.at",
    "contacted": "8/28/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Garrett Sulzman",
    "persona": "IT Consultant",
    "jobTitle": "Solution Architect",
    "previousTool": "Visio",
    "reasonsForSwitch": "Price",
    "usage": "Monthly",
    "diagramTypes": "system architecture, flowcharts, business processes",
    "toolsUsed": "Lucidchart, Word",
    "featureImprovements": "",
    "companyName": "Thrive Market",
    "companySize": 100,
    "teamSize": "",
    "accountSize": 15,
    "accountType": "enterprise-15",
    "userID": 108600923,
    "email": "garrett.sulzman@thrivemarket.com",
    "contacted": "8/28/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Bryan Wood",
    "persona": "IT Consultant",
    "jobTitle": "Senior Cloud Solutions Manager",
    "previousTool": "Visio",
    "reasonsForSwitch": "Already at org,",
    "usage": "",
    "diagramTypes": "",
    "toolsUsed": "Google Docs, Google Drive",
    "featureImprovements": "Export annotations & footnotes",
    "companyName": "FX Global",
    "companySize": "",
    "teamSize": 12,
    "accountSize": 5,
    "accountType": "Team-5",
    "userID": 445361627,
    "email": "bryan.wood@rapiot.com",
    "contacted": "8/28/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Brady Wescott",
    "persona": "IT Consultant",
    "jobTitle": "Business & IT Consultant",
    "previousTool": "Visio",
    "reasonsForSwitch": "Already at org, company migration to LC",
    "usage": "Monthly",
    "diagramTypes": "Flowcharts, process maps",
    "toolsUsed": "Whiteboard, Powerpoint, Google Slides",
    "featureImprovements": "",
    "companyName": "Salesforce",
    "companySize": 10000,
    "teamSize": "",
    "accountSize": 10000,
    "accountType": "enterprise-10000",
    "userID": 654632234,
    "email": "bwescott@salesforce.com",
    "contacted": "8/28/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Jeff Skahill",
    "persona": "IT Consultant",
    "jobTitle": "Technical Architect",
    "previousTool": "Visio",
    "reasonsForSwitch": "",
    "usage": "",
    "diagramTypes": "ERD, Workflow, Technical requirements illustrating functional components",
    "toolsUsed": "Whiteboard, Word, Screenshare, PDF, Sharepoint",
    "featureImprovements": "",
    "companyName": "Quantum Spatial",
    "companySize": 500,
    "teamSize": 4,
    "accountSize": 85,
    "accountType": "enterprise-85",
    "userID": 3456345634,
    "email": "jskahill@quantumspatial.com",
    "contacted": "8/28/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Trevor Bryant",
    "persona": "Network Engineer",
    "jobTitle": "Network Engineer",
    "previousTool": "Visio",
    "reasonsForSwitch": "Price, Hosted in cloud, Visio import, had to run VM on mac, price (Visio was expensive)",
    "usage": "Weekly",
    "diagramTypes": "Network diagram",
    "toolsUsed": "Network diagramming, Confluence, Public File Share",
    "featureImprovements": "Has to manually update Confluence when diagram changes, network discovery tool, make changes to network with diagram, set line type defaults, template that has auto text that shows last updated, revision date, creator date, etc.",
    "companyName": "LogMeIn",
    "companySize": 5000,
    "teamSize": 4,
    "accountSize": 75,
    "accountType": "enterprise-75",
    "userID": 112509049,
    "email": "trevor.bryant@logmein.com",
    "contacted": "9/1/2016",
    "giftCard": "FALSE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Paul McGurn",
    "persona": "Network Engineer",
    "jobTitle": "IT Manager",
    "previousTool": "Visio",
    "reasonsForSwitch": "Price, Mac",
    "usage": "",
    "diagramTypes": "Network diagrams, server rack, call flows",
    "toolsUsed": "Confluence",
    "featureImprovements": "Line are terrible, text on network object is terrible,",
    "companyName": "LogMeIn",
    "companySize": 5000,
    "teamSize": 4,
    "accountSize": 75,
    "accountType": "enterprise-75",
    "userID": 2134456656,
    "email": "",
    "contacted": "9/1/2016",
    "giftCard": "TRUE",
    "fluency": "Intermediate",
    "status":"Available"
  },
  {
    "name": "Ronald Kopcho",
    "persona": "Technical Sales",
    "jobTitle": "Senior Solution Architect",
    "previousTool": "omnigraffle, visio",
    "reasonsForSwitch": "",
    "usage": "Weekly",
    "diagramTypes": "Sequence diagrams, network diagrams",
    "toolsUsed": "Whiteboard, Lucidchart, Google Docs, Webex, Salesforce",
    "featureImprovements": "Make mobile better, better reusable snippets of diagrams, faster performance",
    "companyName": "Ping Identity",
    "companySize": 500,
    "teamSize": 25,
    "accountSize": 200,
    "accountType": "enterprise-200",
    "userID": 1714583,
    "email": "rkopcho@pingidentity.com",
    "contacted": "9/1/2016",
    "giftCard": "TRUE",
    "fluency": "Beginner",
    "status":"Available"
  },
  {
    "name": "Kevin Wise",
    "persona": "Technical Sales",
    "jobTitle": "Senior Solution Architect",
    "previousTool": "Visio, Omnigraffle",
    "reasonsForSwitch": "Collaboration, Too many OS types, needed one solution across devices, Visio buggy (VM Mac), Omnigraffle unnintuitive, official announcement",
    "usage": "Weekly",
    "diagramTypes": "Network diagram, database, flowchart",
    "toolsUsed": "Evernote, Excel, Vidyo, PDF, Visio, Salesforce",
    "featureImprovements": "",
    "companyName": "Rackspace",
    "companySize": 10000,
    "teamSize": "",
    "accountSize": 200,
    "accountType": "Team-200-monthly",
    "userID": 111306991,
    "email": "kevin.wise@RACKSPACE.COM",
    "contacted": "9/1/2016",
    "giftCard": "TRUE",
      "fluency": "Beginner",
    "status":"Available"
  }
];


    var personas = [{
        "name": "IT Consultant",
        "roles":"Systems Engineer, Solution Architect, Solutions Manager, Technical Architect, Business Consultant, Project Manager",
        "jobs": [{
            "sentence": "“I need to improve an existing system for a client.”",
            "summary":"Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum. Cras mattis consectetur purus sit amet fermentum. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nulla vitae elit libero, a pharetra augue. Cras mattis consectetur purus sit amet fermentum. Cras mattis consectetur purus sit amet fermentum.",
            "table": [{
                "likely_usage": "1",
                "opportunity": "0",
                "jobs_to_be_done": "Gather requirements",
                "example_tools": "Words, Docs, PDF, Excel, other note-taking and long-form content tools",
                },{
                "likely_usage": "6",
                "opportunity": "2",
                "jobs_to_be_done": "Discovery of an existing system",
                "example_tools": "Lucidchart, Visio, whiteboard, other discovery tools (documentation), network monitoring tools, Amazon console, Azure",
                },{
                "likely_usage": "2",
                "opportunity": "0",
                "jobs_to_be_done": "Reference an existing diagram",
                "example_tools": "Lucidchart (import), Visio, Omnigraffle",
                },{
                "likely_usage": "8",
                "opportunity": "2",
                "jobs_to_be_done": "Design System",
                "example_tools": "Lucidchart, Visio",
            }], 
    }],

}];





});
particleApp.controller('iconController', function(config, $scope, lucidIconFactory, $routeParams, $location) {

    $scope.icongroups = lucidIconFactory;


    $scope.$watch('searchResults', function(newValue) {
        if (newValue != null) {
            var newPath = '/icons/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath')
        }
    });

    angular.forEach($scope.icongroups, function(icongroup) {
        angular.forEach(icongroup.icons, function(icon) {
            icon.url = config.componentsURL + 'icon/icons/' + icon.name + '.svg';
        });
    });

    $scope.searchResults = $routeParams.searchResults;

});

particleApp.controller('componentController', function($scope, config, lucidComponentFactory, $routeParams, $filter, $location) {
    //gets component id from URL
    $scope.componentGroupID = $routeParams.componentGroupID;

    $scope.components = $filter('filter')(lucidComponentFactory, {
        "groupid": $routeParams.componentGroupID
    });
    $scope.componentPath = config.componentsURL; //

    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue != null) {
            var newPath = '/components/' + $scope.componentGroupID + '/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath', newPath)
        }

    });
});

particleApp.controller('angularController', function($scope, $sce, lucidSnippets) {
    $scope.getIframeSrc = function(codepen) {
        return $sce.trustAsResourceUrl(codepen);
    };
    $scope.snippets = lucidSnippets;

});

particleApp.controller('productionController', function($scope, lucidProductionFactory, $routeParams, $filter, $location) {

    $scope.productionComponents = lucidProductionFactory;

    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue != null) {
            var newPath = '/production/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath', newPath)
        }

    });
    //button function for alerts direct to URL

    $scope.openURL = function(url) {
        var win = window.open(url, '_blank');
        win.focus();
    };

});
particleApp.controller('colorController', function($scope, lucidColorFactory, $routeParams, $filter, $location) {

    $scope.colors = lucidColorFactory;
    $scope.searchResults = $routeParams.searchResults;

    $scope.$watch('searchResults', function(newValue) {
        if (newValue != null) {
            var newPath = '/colors/' + newValue;
            $location.path(newPath, false);
            //console.log('changepath', newPath)
        }

    });


});
particleApp.controller('colorCtrl', function($scope, $timeout) {

    $scope.copyItem = function(item) {
        $scope.copied = item;
        $timeout(function() {
            $scope.copied = null;
        }, 750);
    };


});
//////// directives ////////
particleApp.directive('collapse', ['$timeout', function($timeout) {
    return {
        restrict: 'A',

        link: function($scope, ngElement, attributes) {
            var element = ngElement[0];

            $scope.$watch(attributes.collapse, function(collapse) {

                $timeout(function() {
                    var newHeight = collapse ? 0 : getElementAutoHeight();
                    //console.log("new Height", newHeight);

                    element.style.height = newHeight + 'px';
                    ngElement.toggleClass('collapsed', collapse);
                }, 10);
            });

            function getElementAutoHeight() {
                var currentHeight = getElementCurrentHeight();

                element.style.height = 'auto';
                var autoHeight = getElementCurrentHeight();

                element.style.height = currentHeight;
                getElementCurrentHeight(); // Force the browser to recalc height after moving it back to normal

                return autoHeight;
            }

            function getElementCurrentHeight() {
                return element.offsetHeight;
            }
            $scope.updateHeight = function() {
                $timeout(function() {
                    var newHeight = getElementAutoHeight();
                    //console.log("update Height", newHeight);

                    element.style.height = newHeight + 'px';

                }, 1);
            };
        }
    };
}]);
particleApp.directive('clipboard', ['$document', function($document) {
    return {
        restrict: 'A',
        scope: {
            onCopied: '&',
            onError: '&',
            text: '='
        },
        link: function(scope, element) {
            function createNode(text) {
                var node = $document[0].createElement('textarea');
                node.style.position = 'absolute';
                node.style.left = '-10000px';
                node.textContent = text;
                return node;
            }

            function copyNode(node) {
                // Set inline style to override css styles
                $document[0].body.style.webkitUserSelect = 'initial';

                var selection = $document[0].getSelection();
                selection.removeAllRanges();
                node.select();

                if (!$document[0].execCommand('copy')) {
                    throw ('failure copy');
                }
                selection.removeAllRanges();

                // Reset inline style
                $document[0].body.style.webkitUserSelect = '';
            }

            function copyText(text) {
                var node = createNode(text);
                $document[0].body.appendChild(node);
                copyNode(node);
                $document[0].body.removeChild(node);
            }

            element.on('click', function() {
                try {
                    copyText(scope.text);
                    if (angular.isFunction(scope.onCopied)) {
                        scope.$evalAsync(scope.onCopied());
                    }
                } catch (err) {
                    if (angular.isFunction(scope.onError)) {
                        scope.$evalAsync(scope.onError({
                            err: err
                        }));
                    }
                }
            });
        }
    };
}]);