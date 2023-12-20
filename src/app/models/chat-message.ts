import { getLocaleDateTimeFormat } from "@angular/common";
import { IonDatetime } from "@ionic/angular";

export class ChatMessage{
    id: number = 0;
    sender: number = 0;
    receiver: number = 0;
    txtContent: string = "";
    topic: string = "";
    createdAt: Date = new Date();
    //Using the builder pattern to easily create chat messages
    constructor(sender?: number, receiver?: number, message?: string, topic?: string, createdAt?: Date, id?:number){
        this.sender = sender || 0;
        this.receiver = receiver || 0;
        this.txtContent = message || "";
        this.topic = topic || "";
        this.createdAt = createdAt || new Date();
        this.id = id || 0;
    }
}