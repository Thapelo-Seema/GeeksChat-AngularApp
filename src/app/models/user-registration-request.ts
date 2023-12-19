export class UserRegistrationRequest{
    firstName: string;
    lastName: string;
    email: string;
    handle: string;
    password: string;

    constructor(firstName: string, lastName: string, email: string, handle: string, password: string){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.handle = handle;
        this.password = password;
    }
}