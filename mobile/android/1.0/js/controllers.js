angular.module('lucidMobile.controllers', [])
    .controller('AppCtrl', ['$scope', '$ionicModal', '$location', function($scope, $ionicModal, $location) {
        //to set active tab in menu
        $scope.getClass = function(path) {
            return ($location.path() === path) ? 'active' : '';
        };
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        // Form data for the login modal
        $scope.loginData = {};

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function() {
            $scope.modal.hide();
        };

        // Open the login modal
        $scope.login = function() {
            $scope.modal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function() {
            console.log('Doing login', $scope.loginData);
            $scope.closeLogin();

        };


    }])
    .controller('documentsCtrl', ['$scope', 'documents', 'folders', '$stateParams', '$ionicActionSheet',
        function($scope, documents, folders, $stateParams, $ionicActionSheet) {
            if ($stateParams.folderID) {
                //console.log(folders.getByID($stateParams.folderID));
                $scope.folderName = folders.getByID($stateParams.folderID).name;
                $scope.folders = folders.getFromFolder($stateParams.folderID);
                $scope.documents = documents.getFromFolder($stateParams.folderID);
            } else {
                $scope.filter = $stateParams.filter;
                $scope.folderName = $stateParams.filter || 'My Documents';
                $scope.documents = documents.getFromFolder(0);
                $scope.folders = folders.getFromFolder(0);
            }
            $scope.showDrawer = function() {

                // Show the action sheet
                $ionicActionSheet.show({
                    buttons: [
                        { text: '<i class="icon material-icons">text_format</i>Rename' },
                        { text: '<i class="icon material-icons">content_copy</i>Copy' },
                        { text: '<i class="icon material-icons">folder</i>Move' },
                        { text: '<i class="icon material-icons">people</i>Share' }
                    ],
                    destructiveText: '<i class="icon material-icons">delete</i>Delete',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        console.log(index);
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        console.log('delete');
                        return true;
                    }
                });

                // For example's sake, hide the sheet after two seconds

            };

        }
    ])
    .controller('documentCtrl', ['$scope', '$stateParams', 'documents', '$rootScope', function($scope, $stateParams, documents, $rootScope) {
        $scope.currentDocument = documents.getByID($stateParams.documentID);
        $rootScope.currentPage = documents.getByID($stateParams.documentID).pages[0];
    }])
    .controller('shapeManagerCtrl', ['$scope', 'lucidShapesData', '$rootScope', '$ionicModal', function($scope, lucidShapesData, $rootScope, $ionicModal) {
        $scope.pinnedShapeGroups = lucidShapesData.lucidShapeGroups();
        $scope.search = {};
        $scope.showShapeManager = function() {
            //console.log('manage shapes');
            var $scope = $rootScope.$new();
            $ionicModal.fromTemplateUrl('templates/shape-manager-modal.html', {
                scope: $scope,
                animation: 'slide-in-up',
                focusFirstInput: true
            }).then(function(modal) {
                $scope.modal = modal;
                $scope.modal.show();




                $scope.cancel = function() {
                    $scope.modal.hide().then(function() {
                        $scope.modal.remove();
                    });
                };
            });
        };
    }]);