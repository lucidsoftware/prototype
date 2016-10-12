angular.module('lucidMobile.controllers', [])
    .controller('appCtrl', ['$scope', '$location', function($scope, $location) {
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


    }])
    .controller('documentsCtrl', ['$scope', 'documents', 'folders', '$stateParams', '$ionicActionSheet', '$state',
        function($scope, documents, folders, $stateParams, $ionicActionSheet, $state) {
            $scope.folderID = $stateParams.folderID || 0;
            console.log($scope.folderID);
            $scope.folders = folders.all();
            $scope.documents = documents.all();
            $scope.goTo = function(state) {
                $state.go('app.folder', state);
            };

            if ($stateParams.folderID) {
                $scope.folderName = folders.getByID($stateParams.folderID).name;
            } else {
                if ($stateParams.filter) {
                    $scope.filter = $stateParams.filter;
                }
                $scope.folderName = $stateParams.filter || 'My Documents';
            }
            $scope.showFileOptions = function(editDocument) {
                console.log('action sheet', editDocument);
                // Show the action sheet
                $ionicActionSheet.show({
                    buttons: [
                        { text: '<i class="icon"><img src="img/icons/text.svg"></i>Rename' },
                        { text: '<i class="icon"><img src="img/icons/pages.svg"></i>Copy' },
                        { text: '<i class="icon"><img src="img/icons/folder.svg"></i>Move' },
                        { text: '<i class="icon"><img src="img/icons/person.svg"></i>Share' }
                    ],
                    destructiveText: '<i class="icon"><img src="img/icons/trash.svg"></i>Delete',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        console.log(index);
                        if (index === 1) {
                            documents.copy(editDocument);
                        }
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        console.log('delete', editDocument);
                        documents.delete(editDocument.id);
                        return true;
                    }
                });
            };
            $scope.showFolderOptions = function(editFolder) {
                console.log('action sheet', editFolder);
                // Show the action sheet
                $ionicActionSheet.show({
                    buttons: [
                        { text: '<i class="icon"><img src="img/icons/text.svg"></i>Rename' },
                        { text: '<i class="icon"><img src="img/icons/folder.svg"></i>Move' },
                        { text: '<i class="icon"><img src="img/icons/person.svg"></i>Share' }
                    ],
                    destructiveText: '<i class="icon"><img src="img/icons/trash.svg"></i>Delete',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        console.log(index);
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        console.log('delete', editFolder);
                        folders.delete(editFolder.id);
                        return true;
                    }
                });
            };
            $scope.openDocument = function(documentID) {
                //console.log('manage shapes');
                documents.openDocument(documentID);

            };

        }
    ])
    .controller('shapeManagerCtrl', ['$scope', 'lucidShapesData', '$rootScope', '$ionicModal', function($scope, lucidShapesData, $rootScope, $ionicModal) {
        $scope.pinnedShapeGroups = lucidShapesData.lucidShapeGroups();
        angular.forEach($scope.pinnedShapeGroups, function(shapegroup) {
            //open all shapegroups when opening the shapemanager
            shapegroup.openInManager = true;
        });
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
                $scope.close = function() {
                    $scope.modal.hide().then(function() {
                        $scope.modal.remove();
                    });
                };
            });
        };
    }])
    .controller('fabCtrl', ['$scope', 'documents', '$stateParams', '$state',
        function($scope, documents, $stateParams) {
            $scope.clickFab = function() {
                if ($scope.openFab) {
                    $scope.createDocument();
                    $scope.openFab = false;
                } else {

                    $scope.openFab = true;
                }
            };
            $scope.createDocument = function() {
                console.log('doc create');
                //insert folderID into create doc
                var documentID = documents.all().length + 1;
                documents.create(documentID, $stateParams.folderID);
                documents.openDocument(documentID);
                console.log(documents.all());
            };
        }
    ]);