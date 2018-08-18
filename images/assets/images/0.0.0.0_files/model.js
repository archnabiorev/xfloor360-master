/*========================================
=            HELPER FUNCTIONS            =
========================================*/

function convertToBase64(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL;
  //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


var safeLoad = function(url , TAG){
   // console.log("SAFE LOADING : "+url);
                return new Promise( function(resolve , reject){
                    //preload this image to the queue
                    var tag = ( typeof TAG == "undefined" ) ? uuid() : TAG;
                    var queue = new createjs.LoadQueue(true , null , true);
                    queue.loadFile({ id:tag , src : url , crossOrigin:"Anonymous" });

                    queue.on("fileload" , function(){
                        MEGAQUEUE[ tag ] = queue;
                        resolve({ id : tag , queue:queue });

                    }, this);

                });
            };



var layerPackCacher = function(layerPack){ //single layer pack
    return new Promise( function(resolve , reject){
        //layer pack format -> { layerID : <> , layers : <> }
        var initIndex = 0;
        var layersById = [];
        console.log( "GOT :" );
        console.log(layerPack);
        layersById[layerPack.layerID] = layerPack.layers;
        function injectLayerPack(LP , index){

            //get download url
            getDownloadImageURL(LP[index]["fileName"]).
            then(function(image){


                safeLoad(image , LP[index].fileName).
                    then(function(){

                        if( ( ( Object.keys(LP).length-1 ) == initIndex )  ){
                    //that was last 
                    resolve( "success" );
                }else{
                    console.log( "DOWNLOADABLE : " );
                    $('#sublog').html(LP[index].fileName);
                    console.log( image );
                    initIndex = initIndex+1;
                        injectLayerPack(LP , initIndex);

                    
                    
                }

                        


                    }).catch(function(error){
                        alert(error);
                        console.log(error);
                    });


                
                
                



            }).catch(function(error){
                alert(error);
                console.log(error);
            });



        }
        injectLayerPack(layerPack , 0);

    });
};
/*=====  End of HELPER FUNCTIONS  ======*/



var dbModel = function(fb) { //firebase instance

	var storageRef = firebase.storage().ref();



    this.getLayerPacks = function(id){
        return new Promise(function(resolve, reject) {

            firebase.database().ref('layer_packs/'+id).once('value').then(function(snapshot) {

                //get all layer packs
                resolve(snapshot);

            }).catch(function(error) {

                reject(error);

            });

        });


    };

    this.getLotById = function(id) 
    {

        return new Promise(function(resolve, reject) {
            firebase.database().ref('lots/' + id).once('value').then(function(snapshot) {

                var lotData = { lots : snapshot , layerpacks : '' };
                var layoutPlansData = [];
                //get all layer packs

                getLayerPacks(id)
                .then(function(snapshot){
                    lotData.layerpacks = snapshot;


                    //cache and get layer packs
                    var LPs = snapshot.val();
                    var keys = Object.keys( LPs );

                    resolve(lotData);
                    
                }).catch(function(error){
                    reject(error);
                });


                //resolve(snapshot);

            }).catch(function(error) {

                reject(error);

            });

        });

    };


this.getAllLots = function(id) 
    {

        return new Promise(function(resolve, reject) {

            firebase.database().ref('lots/').once('value').then(function(snapshot) {

                resolve(snapshot);

            }).catch(function(error) {

                reject(error);

            });

        });

    };

    this.saveLot = function(id, data)
    {

        return new Promise(function(resolve, reject) {

            firebase.database().ref('lots/' + id).set(data).then(function(snapshot) {

                resolve(snapshot);

            }).catch(function(error) {

                reject(error);

            });

        });

    };

    this.getDownloadImageURL = function(ref){
    	return new Promise(function(resolve , reject){

    		var imgRef = storageRef.child( ref );
    		imgRef.getDownloadURL().then(function(url) {
    			resolve(url);
			}).catch(function(error){
				reject(error);
			});


    	})
    }


    this.uploadBase = function(base64 , imgRef)
    {

    	return new Promise(function(resolve , reject){

    		var lotIdRef = storageRef.child( imgRef );
    		lotIdRef.putString(base64, 'data_url' ).then(function(snapshot){
    			resolve(snapshot);
    			console.log("UPLOADED");
    			console.log(snapshot);
    		}).catch(function(error){
    			console.log(error);
    			reject(error);
    			alert(error);
    		});

    	});
    };





    
    return this;
}



/*===============================
=            GARBAGE            =
===============================

Default FB rule
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}


dbModel.saveLot("id" , {json : "data"}).then(function(fulfilled){
alert("success");	
}).catch(function(error){
	alert("error");
});

=====  End of GARBAGE  ======*/