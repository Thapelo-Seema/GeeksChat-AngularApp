import { ChatMessage } from "./chat-message";

export class SelectedMessageData{
    currentUserId: number;
    currentUserName: string;
    contactId: number;
    contactName: string;
    messages: ChatMessage[]

    constructor(currentUserId?: number, currentUserName?: string, contactId?: number, contactName?: string, messages?: ChatMessage[]){
        this.currentUserId = currentUserId || 0;
        this.currentUserName = currentUserName || "";
        this.contactId = contactId || 0;
        this.contactName = contactName || "";
        this.messages = messages || [];
    }
}