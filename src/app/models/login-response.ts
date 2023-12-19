import { ChatUser } from './chat-user'

export class LoginResponse{
    status: any;
    message: string;
    user?: ChatUser;

    constructor(status: any, message: string, user?: ChatUser){
        this.status = status;
        this.message = message;
        this.user = user;
    }

}