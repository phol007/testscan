var camera = angular.module('camera', ['ngCordova'])
camera.controller('cmr', function ($scope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $cordovaActionSheet) {
console.log("function camera ready!!");
  $scope.image = null;

  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

// Present Actionsheet for switch beteen Camera / Library
    $scope.loadImage = function() {
      var options = {
        title: 'Select Image Source',
        buttonLabels: ['Load from Library', 'Use Camera'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton : true,
      };

      $cordovaActionSheet.show(options).then(function(btnIndex) {
        var type = null;
        if (btnIndex === 1) {
          type = Camera.PictureSourceType.PHOTOLIBRARY;

        } else if (btnIndex === 2) {
          type = Camera.PictureSourceType.CAMERA;
        }
        if (type !== null) {
          $scope.selectPicture(type);
        }
      });
    };

    // Take image with the camera or from library and store it inside the app folder
    // Image will not be saved to users Library.
    $scope.selectPicture = function(sourceType) {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 200,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
      };

      $cordovaCamera.getPicture(options).then(function(imagePath) {
        // Grab the file name of the photo in the temporary directory
        var currentName = imagePath.replace(/^.*[\\\/]/, '');

        //Create a new name for the photo
        var d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";

        // If you are trying to load image from the gallery on Android we need special treatment!
        if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          window.FilePath.resolveNativePath(imagePath, function(entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function fail(e) {
              console.error('Error: ', e);
            }

            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              // Only copy because of access rights
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
                $scope.image = newFileName;
                console.log('select file');
                $scope.uploadImage();
              }, function(error){
                $scope.showAlert('Error', error.exception);
              });
            };
          }
        );
        } else {
          var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          //var namePath = localStorage.barcode;
          // Move the file to permanent storage
          $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
            console.log('camera file');
            console.log($scope.image);
            $.mobile.changePage("#uploadimg",{transition: 'slidefade'});
            //$scope.uploadImage();
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        }
      },
      function(err){
        // Not always an error, maybe cancel was pressed...
      })
    };

    $scope.pathForImage = function(image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };

    $scope.uploadImage = function() {
      // Destination URL
      loading();
      var url = "http://api.nopadol.com/apiv2/UploadSave.php";

      // File for Upload
      var targetPath = $scope.pathForImage($scope.image);

      // File name only
      var filename = $scope.image;
      //var filename = localStorage.barcode+".jpg";
       console.log(filename);

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
        //$scope.showAlert('Success', 'Image upload finished.');
        //insert_image("0001",filename);
        closeload();
        alertify.success("อัพโหลดเสร็จเรียบร้อย");
      }, function(error){
        closeload();
        alertify.error("Error network");
      });
    }

});
