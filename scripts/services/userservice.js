'use strict';

/**
 * @ngdoc service
 * @name floorxApp.user
 * @description
 * # user
 * Factory in the floorxApp.
 */
angular.module('floorxApp')
  .factory('userService', function () {
    
    //Update extra userinfo 

    var updateExtraInfo = function(data){
      return new Promise(function(resolve , reject){
        console.log(data);
        firebase.database().ref('/floorXusers/'+data.uid).set({
          company : (data.company) ? data.company : '',
          position : (data.position) ? data.position : '' ,
          work_number : (data.work_number) ? data.work_number : '' ,
          work_address : (data.work_address) ? data.work_address : ''
         }).then(function(resp){
          resolve("Injected");
        }).catch(function(e){
          reject(e);
        });

      });
    };

    var uploadImage = function(base64 , imgRef)
    {

        return new Promise(function(resolve , reject){

      var lotIdRef = storageRef.child( imgRef );
            var uploadTask = lotIdRef.putString(base64, 'data_url' ); 

            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'

        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          $('#progress-percentage').html( Math.round(progress) +'%');
          switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
          }
        },
        function(error) {
          reject(error);
        }, function() {
        // Upload completed successfully, now we can get the download URL
        var downloadURL = uploadTask.snapshot.downloadURL;
        resolve(uploadTask.snapshot);
        }
        );



        });


    };

    

    return {

      getAdditionalInfo: function(){

                return new Promise(function(resolve , reject){
          
          setTimeout(function(){

          var user = firebase.auth().currentUser;
          var uid = user.uid;
          var favs = [
          firebase.database().ref('/homeXusers/'+uid).once('value'),
          firebase.database().ref('/floorXusers/'+uid).once('value')
          ];
          Promise.all(favs).then(function(resp){
            var snapshotHX = resp[0];
            var snapshotFX = resp[1];
          resolve( { homeX : { data :  snapshotHX.val() ? snapshotHX.val() : {} } , floorX : { data :  snapshotFX.val() ? snapshotFX.val() : {} } } );
          // resolve( snapshot.val() ? snapshot.val() : {} );
          }).catch(function(err){
          reject(err);
          });

          },500);
          

        });


      }, //end additional info
    
      fbLogin: function () {

          var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('email');
            provider.setCustomParameters({
              'display': 'popup'
            });

          
          return new Promise(function(resolve , reject){

          firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          resolve(user);
          }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          reject(error);
          });

          });


      },//end FaceBook Login

      googleLogin: function(){


          var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('email');
            provider.setCustomParameters({
              'display': 'popup'
            });

          
          return new Promise(function(resolve , reject){

          firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          var user = result.user;
          resolve(user);
          }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          reject(error);
          });

          });




      },//end google login

      emailSignUp : function(n , e , p){

        return new Promise(function(resolve , reject){

          firebase.auth().createUserWithEmailAndPassword(e, p).then(function(resp){
            resolve(resp);
          })
          .catch(function(error) {
            
          var errorCode = error.code;
          var errorMessage = error.message;
          reject(error);

          });

        });

      },

      emailSignIn : function(e , p ){

        return new Promise(function(resolve , reject){

          firebase.auth().signInWithEmailAndPassword(e, p).then(function(resp){
            resolve(resp);
          }).catch(function(error) {
            reject(error);
          });

        });

      },

      emailLogin: function(e,p){

        return new Promise(function(resolve , reject){


        firebase.auth().signInWithEmailAndPassword(e, p).then(function(response){
        resolve(response);
        }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        reject(error);
        });


        });
      },//end E-Mail Login

      updateProfile : function(data){

        return new Promise(function(resolve , reject){


          var user = firebase.auth().currentUser;

          if( !user ){ reject("Unauthorized access"); }
          user.updateProfile({
            displayName : data.name
          }).then(function(){
            //update extras
            updateExtraInfo(data).then(function(resp){
              resolve('updated');
            }).catch(function(err){
              reject(err);
            });

          }).catch(function(e){
            reject(e);
          });


        });

      },//end update profile logic 

      resetPassword : function(email){

        var auth = firebase.auth();
        return new Promise(function(resolve , reject){

          auth.sendPasswordResetEmail(email).then(function() {
          resolve(true);
        }).catch(function(error) {
          reject(error);
        });

        });

      },

      updatePassword : function(password){

        var user = firebase.auth().currentUser;

        user.updatePassword(password).then(function() {
          resolve('Changed');
        }).catch(function(error) {
          reject(error);
        });

      },//update password

      addToFavorite : function(sessionId , image , label){

        return new Promise(function(resolve , reject){

          var id = uuid();
          var user = firebase.auth().currentUser;

          firebase.database().ref('/floorXusers/'+user.uid+'/favorites/'+id).set({ sessionID : sessionId , label : label, image : image , dated : new Date() }).then(function(snap){
            resolve(snap);
          }).catch(function(err){
            reject(err);
          });
          

        });

      },//end 

      logout : function(){

        return new Promise(function(resolve , reject){


            firebase.auth().signOut().then(function() {
            resolve();
            }).catch(function(error) {
            reject(error);
            });



        });

      }, //end Logout 
    
    };

  });
