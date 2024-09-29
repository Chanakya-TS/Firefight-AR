import { NewScript } from './Refresh_dec';

@component
export class myNewScript extends BaseScriptComponent {
    @input('Component.ScriptComponent')
    refScript: NewScript;
    @input
    comps: SceneObject[];
    
//    interval = 5;
    elapsedTime = 0.0;
//    event: any = script.createEvent("UpdateEvent");

    onAwake(){
        this.refScript.refreshTexture();
//        this.scheduleNextInterval();
////        let event = this.createEvent('UpdateEvent');
//    // Bind the function printTime to the event UpdateEvent
////    event.bind(this.onRefresh.bind(this));
//
//            // Define the interval in seconds
//// this.interval = 2.0; // Time in seconds
////
////// Create an event that will repeatedly call the function
//// this.event = script.createEvent("UpdateEvent");
////
////event.bind(function() {
////    print("This is called every " + interval + " seconds");
////        this.refScript.refreshTexture();
////});
    }

// Function to repeatedly schedule the event
// scheduleNextInterval() {
//        let event = this.createEvent('UpdateEvent');
//        event.bind(() => {
//            this.elapsedTime += getDeltaTime();
//
//            if(this.elapsedTime >= this.interval){
//            print("This is called every " + this.interval + " seconds");
//            this.refScript.refreshTexture();
//            
//            // Schedule the next interval
//                this.elapsedTime = 0.0;
//            }
//
//        });
//}    
//    
    onTog() {
       this.comps.forEach((comp) => {comp.enabled = !comp.enabled}); 
    }
    onRefresh(){
        print("REFRESH FROM TS");
//        this.scheduleNextInterval();
        this.refScript.refreshTexture();
//        this.scheduleNextInterval();
    }
}

