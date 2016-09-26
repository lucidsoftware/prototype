angular.module("lucidMobile",["ionic","lucidMobile.controllers","lucidMobile.services","lucidComponents","lucidShapesData","lucidCanvas","ngDraggable"]).run(["$ionicPlatform",function(e){e.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault()})}]).config(["$stateProvider","$urlRouterProvider","$sceDelegateProvider",function(e,t,o){ionic.Platform.setPlatform("android"),e.state("app",{url:"/app",abstract:!0,templateUrl:"templates/menu.html",controller:"appCtrl"}).state("app.documents",{url:"/documents/:filter",views:{menuContent:{templateUrl:"templates/documents.html",controller:"documentsCtrl"}}}).state("app.folder",{url:"/folder/:folderID",views:{menuContent:{templateUrl:"templates/documents.html",controller:"documentsCtrl"}}}),t.otherwise("/app/documents/"),o.resourceUrlWhitelist(["self","http://particle.golucid.co/components/**","https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-157/**"])}]),angular.module("lucidMobile.controllers",[]).controller("appCtrl",["$scope","$location",function(e,t){e.getClass=function(e){return t.path()===e?"active":""}}]).controller("documentsCtrl",["$scope","documents","folders","$stateParams","$ionicActionSheet",function(e,t,o,n,l){e.folderID=n.folderID||0,console.log(e.folderID),e.folders=o.all(),e.documents=t.all(),n.folderID?e.folderName=o.getByID(n.folderID).name:(n.filter&&(e.filter=n.filter),e.folderName=n.filter||"My Documents"),e.showFileOptions=function(e){console.log("action sheet",e),l.show({buttons:[{text:'<i class="icon material-icons">text_format</i>Rename'},{text:'<i class="icon material-icons">content_copy</i>Copy'},{text:'<i class="icon material-icons">folder</i>Move'},{text:'<i class="icon material-icons">people</i>Share'}],destructiveText:'<i class="icon material-icons">delete</i>Delete',cancel:function(){},buttonClicked:function(o){return console.log(o),1===o&&t.copy(e),!0},destructiveButtonClicked:function(){return console.log("delete",e),t.delete(e.id),!0}})},e.showFolderOptions=function(e){console.log("action sheet",e),l.show({buttons:[{text:'<i class="icon material-icons">text_format</i>Rename'},{text:'<i class="icon material-icons">folder</i>Move'},{text:'<i class="icon material-icons">people</i>Share'}],destructiveText:'<i class="icon material-icons">delete</i>Delete',cancel:function(){},buttonClicked:function(e){return console.log(e),!0},destructiveButtonClicked:function(){return console.log("delete",e),o.delete(e.id),!0}})},e.openDocument=function(e){t.openDocument(e)}}]).controller("shapeManagerCtrl",["$scope","lucidShapesData","$rootScope","$ionicModal",function(e,t,o,n){e.pinnedShapeGroups=t.lucidShapeGroups(),e.search={},e.showShapeManager=function(){var e=o.$new();n.fromTemplateUrl("templates/shape-manager-modal.html",{scope:e,animation:"slide-in-up",focusFirstInput:!0}).then(function(t){e.modal=t,e.modal.show(),e.close=function(){e.modal.hide().then(function(){e.modal.remove()})}})}}]).controller("fabCtrl",["$scope","documents","$stateParams","$state",function(e,t,o){e.clickFab=function(){e.openFab?(e.createDocument(),e.openFab=!1):e.openFab=!0},e.createDocument=function(){console.log("doc create");var e=t.all().length+1;t.create(e,o.folderID),t.openDocument(e),console.log(t.all())}}]),angular.module("lucidMobile.services",[]).factory("documents",["$filter","$rootScope","$ionicModal",function(e,t,o){var n=[{id:0,thumb:"img/thumb.jpg",name:"Doc Title",insideFolder:0,pages:[{name:"Page 1",thumb:"assets/thumb-placeholder-flowchart.png",id:14543,canvasBG:"#FFF",blocks:[{customcolor:!1,swatch:{fill:"#ffffff",text:"#AEAEAE",border:"#666666"},swatchnumber:1,borderwidth:3,borderstyle:"solid",comment:{text:"yep this is a comment"},table:!0,text:{verticalalignment:"middle",horizontalalignment:"center",text:"Process",size:16},padding:7,metrics:{z:2,x:75,y:75,width:120,height:100},svg:'<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'},{customcolor:!1,swatch:{fill:"#ffffff",text:"#AEAEAE",border:"#666666"},swatchnumber:1,borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:"Process",size:16},padding:7,metrics:{z:2,x:75,y:243,width:120,height:80}}],lines:[{points:"450.5 184 450.5 240",endarrow:!0,width:3}],linecolor:"#333"}]},{id:1,name:"Doc 2 title",insideFolder:1,thumb:"img/thumb.jpg",group:"Recent",pages:[{name:"Page 1",thumb:"assets/thumb-placeholder-flowchart.png",id:14543,canvasBG:"#FFF",blocks:[{customcolor:!1,swatch:{fill:"#ffffff",text:"#AEAEAE",border:"#666666"},swatchnumber:1,borderwidth:3,borderstyle:"solid",comment:{text:"yep this is a comment"},table:!0,text:{verticalalignment:"middle",horizontalalignment:"center",text:"Process",size:16},padding:7,metrics:{z:2,x:75,y:75,width:120,height:100},svg:'<svg width="30px" height="30px" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g class="lucid-shapes-fill-stroke" sketch:type="MSArtboardGroup" stroke="#979797" stroke-width="2" fill="#FFFFFF"><rect id="Rectangle-32-Copy-3" sketch:type="MSShapeGroup" x="1" y="2" width="28" height="26" rx="2"></rect></g>'},{customcolor:!1,swatch:{fill:"#ffffff",text:"#AEAEAE",border:"#666666"},swatchnumber:1,borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:"Process",size:16},padding:7,metrics:{z:2,x:75,y:243,width:120,height:80}}],lines:[{points:"450.5 184 450.5 240",endarrow:!0,width:3}],linecolor:"#333"}]}],l={all:function(){return n},getByID:function(t){var o=e("filter")(n,{id:t});return o[0]},copy:function(e){var t=angular.copy(e);t.name=t.name+" (Copy)",t.id=l.all().length+1,n.push(t)},delete:function(e){var t;for(t=l.all().length-1;t>=0;t--)l.all()[t].id===e&&l.all().splice(t,1)},getFromFolder:function(t){return e("filter")(n,{insideFolder:t})},create:function(e,t){var o={id:e,name:"Doc"+Number(n.length)+1,insideFolder:t||0,thumb:"img/thumb.jpg",group:"Recent",pages:[{name:"Page 1",thumb:"assets/thumb-placeholder-flowchart.png",id:14543,canvasBG:"#FFF",blocks:[]}]};n.push(o),console.log("doc pushed",o)},openDocument:function(e){var n=t.$new();o.fromTemplateUrl("templates/document-modal.html",{scope:n,animation:"slide-in-up",focusFirstInput:!0}).then(function(o){n.modal=o,n.modal.show(),n.currentDocument=l.getByID(e),t.currentPage=l.getByID(e).pages[0],n.close=function(){n.modal.hide().then(function(){n.modal.remove()})}})}};return l}]).factory("folders",["$filter",function(e){var t=[{id:1,name:"UX Group",insideFolder:0,shared:!0,group:"Shared with me"},{id:2,name:"My Folder",insideFolder:0,group:"Recent"},{id:3,name:"Android Concepts",insideFolder:1},{id:4,name:"1.0",insideFolder:3}],o={all:function(){return t},getByID:function(o){var n=e("filter")(t,{id:o});return n[0]},delete:function(e){var t;for(t=o.all().length-1;t>=0;t--)o.all()[t].id===e&&o.all().splice(t,1)},getFromFolder:function(o){return e("filter")(t,{insideFolder:o})}};return o}]),angular.module("lucidCanvas",[]).controller("canvasCtrl",["$scope","$rootScope",function(e,t){e.blocks=t.currentPage.blocks,t.selectedType="nothing",e.deselectBlock=function(){var e=JSON.parse(JSON.stringify(t.selectedBlock));t.selectedBlock=e},e.dropToCanvas=function(e,o){var n=t.currentPage.blocks.indexOf(e);if(n===-1&&e){e.metrics||(e={customcolor:!1,swatch:{fill:"#ffffff",text:"#333333",border:"#666666"},swatchnumber:1,borderwidth:3,borderstyle:"solid",text:{verticalalignment:"middle",horizontalalignment:"center",text:e.name,size:"12px"},padding:10,metrics:{z:2,width:120,height:45},shapepanel:!1});var l=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().left,r=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().top;e.metrics.x=o.x-l-e.metrics.width/2,e.metrics.y=o.y-r-e.metrics.height/2,t.currentPage.blocks.push(e),t.selectedBlock=e}},e.onDragSuccess=function(e,o,n){if(o.y<470){var l=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().left,r=angular.element(document.querySelector("#lucid-canvas"))[0].getBoundingClientRect().top;if(e){if(angular.element(o.event.srcElement).hasClass("lucid-block-comment"))return;e.metrics.x=o.x-l-o.element.centerX,e.metrics.y=o.y-r-o.element.centerY,e.shapepanel=!1}}t.selectedBlock=n}}]).controller("shapeCtrl",["$scope",function(e){e.onDrag=function(t){console.log("drag",t.gesture.center.pageX,t.gesture.center.pageY),e.draggedStyle={left:t.gesture.center.pageX+"px",top:t.gesture.center.pageY+"px"}},e.onRelease=function(t,o){console.log("drop",t.gesture.center.pageX,t.gesture.center.pageY),e.doshadow=0,o.metrics.x=t.gesture.center.pageX,o.metrics.y=t.gesture.center.pageY}}]);