export default class AuthApi {
    
    constructor(){
        this.authenticated = false;
    }

    login(callBack){
        this.authenticated = true;
        callBack();
    }
    
    logout(callBack){
        this.authenticated = false;
        callBack();
    }
    
    isAuthenticated(){
        return this.authenticated;
    }
} 