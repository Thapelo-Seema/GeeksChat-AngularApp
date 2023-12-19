import { ChatUser } from './chat-user'

export class LoginResponse{
    status: any;
    message: string;
    data?: ChatUser;

    constructor(status: any, message: string, data?: ChatUser){
        this.status = status;
        this.message = message;
        this.data = data;
    }

}