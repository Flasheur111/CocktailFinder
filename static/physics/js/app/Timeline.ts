/**
 * Created by Francois on 12/10/15.
 */
class Timeline {
    eventArray:any[];

    resetTimeline() {
        for (var key in this.eventArray) {
            clearInterval(this.eventArray[key]);
        }
        this.eventArray = [];
    }
}