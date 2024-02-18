import { TestInterface } from "./test-interface";

export class TestClass implements TestInterface{

    testData: String;

    constructor(){
        this.testData = "";
    }

    doSomething(){
        console.log("doing something...");
    }
}