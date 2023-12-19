export class ChatUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    handle?: string;
    constructor(id?: number, firstName?: string, lastName?: string, email?: string, handle?: string){
        this.id = id || 0;
        this.firstName = firstName || "";
        this.lastName = lastName  || "";
        this.email = email || "";
        this.handle = handle || "";
    }
    
}