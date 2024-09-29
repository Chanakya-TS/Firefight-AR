// -----JS CODE-----
global.startVoiceMLTranscribe(callback);

// @input SceneObject model
// @input SceneObject camera_1
// @input SceneObject camera_2
// @input Component.ScriptComponent refScript

 //@input Asset.RemoteServiceModule rsm
 //@input Asset.RemoteMediaModule rmm
 //@input Component.Image image

 function makeReq() {
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

script.model.enabled = true;
script.camera_1.enabled = true;
script.camera_2.enabled = true;

function delayedHide() {
    script.model.enabled=false;
}

function delayedShow(){
    script.model.enabled=true;
}

function delayedC1Show(){
    script.camera_1.enabled = true;
}

function delayedC1Hide(){
    script.camera_1.enabled = false;
}

function delayedC2Show(){
    script.camera_2.enabled = true;
}

function delayedC2Hide(){
    script.camera_2.enabled = false;
}

function delayedCHideAll(){
    script.model.enabled = false;
    script.camera_1.enabled = false;
    script.camera_2.enabled = false;
}


function callback(eventArgs){
    // intermediate transcription
    if(eventArgs.transcription.trim() == "") return;
    print(eventArgs.transcription);
    if (eventArgs.transcription == "Show building layout.") { 
        print("showing model");
        global.getTTSResults("Showing building layout.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedShow);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Hide building layout."){
        print("Hiding model");
        global.getTTSResults("Hiding building layout.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedHide);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Show camera one.") {
        print("S Camera 1");
        global.getTTSResults("Showing camera one.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedC1Show);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Hide camera one.") {
        print("H Camera 1");
        global.getTTSResults("Hiding camera one.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedC1Hide);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Show camera two.") {
        print("S Camera 2");
        global.getTTSResults("Showing camera two.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedC2Show);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Hide camera two.") {
        print("H Camera 2");
        global.getTTSResults("Hiding camera two.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedC2Hide);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Best option."){
        global.getTTSResults("Best path is to camera one because there was a person and fire detected.");
    } else if(eventArgs.transcription == "Hide everything."){
        global.getTTSResults("Hiding everything.");
        var delayedEvent = script.createEvent("DelayedCallbackEvent");
        delayedEvent.bind(delayedCHideAll);
        delayedEvent.reset(1.0);
    } else if(eventArgs.transcription == "Refresh.") {
        global.getTTSResults("Refreshing cameras.");        
        makeReq();
    }
    // final transcription
    if(!eventArgs.isFinalTranscription) return;
    print("Final Transcription: " + eventArgs.transcription);      
}


