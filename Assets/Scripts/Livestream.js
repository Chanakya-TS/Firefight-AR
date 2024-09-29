//const apiUrl = 'https://chanakya.pythonanywhere.com/'
//
//var remoteService = require("LensStudio:RemoteServiceModule");
//var remoteMedia = require("LensStudio:RemoteMediaModule");
//
//function onSuccess() {
//    print("SUCCESS");
//}
//
//function onFailure(error) {
//    print("FAILURE " + error);
//}
//
//var resource = remoteService.makeResourceFromUrl("[https://firebasestorage.googleapis.com/v0/b/fireai-f5a1a.appspot.com/o/images%2Fcamera_1.jpg?alt=media]")
//remoteMedia.loadResourceAsImageTexture(resource, (texture) => {onSuccess(texture);}, (error) => {onFailure(error);});

 //@input Asset.RemoteServiceModule rsm
 //@input Asset.RemoteMediaModule rmm
 //@input Component.Image image
//@input Asset.Texture testTexture

 script.test = function() {
    print("MAKING REQUEST");
    let request = RemoteServiceHttpRequest.create();
    request.url = "https://firebasestorage.googleapis.com/v0/b/firea-7b21c.appspot.com/o/images%2Fcamera_1.jpg?alt=media";
    
    script.rsm
        .performHttpRequest(request, function(response){
            const dynamicResource = response.asResource()
            script.rmm.loadResourceAsImageTexture(dynamicResource, function(texture) {
                print(JSON.stringify(texture));
                script.image.mainPass.baseTex = texture;
            },function(error){
                print(error)
            })
        })
}

script.refreshTexture = function() {
    print("HELLO FROM JS");
    script.test();
};