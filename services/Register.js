
import ApiService from "./ApiService";

class RegisterService extends ApiService {
  constructor() {
    
    super('http://localhost:5043/api/user');
  }

   getEmailInDbAsync(email) {
    return this.post(`getUserByEmail` , {Email : email} , false , true)
    
  }

   getUsernameInDbAsync(username) {
    return this.post(`getUserByUsername` , {Username : username} , false , true)
   
  }

  registerAccount(registerData){
    return this.post('inregistrare' ,registerData , false , true)
  }

   getConfirmationLink(token){
    return this.get(`confirmare/${token}` , false , false , true)
   
  }

  requestNewConfirmationLink(token){
    return this.post(`confirmare/${token}` , null , false , true)
    
  }
  
   checkPasswordInDb(unHashedPassword,token){
    return this.post('checkPassword' ,
    {
      HashedPasswordDtoProp:unHashedPassword,
      TokenProp: token
    },false , true)
    
  }

  async sendEmailForForgotPassword(email){
    return this.post('forgotpassword' ,
    {EmailProp: email},false , true)
    
  }

   checkTokenValiditiy(token) {
    return this.get(`forgotpassword/${token}` , false, false , true)
    
}


   changePassword(unHashedPassword,token){
    return this.post(`forgotpassword/${token}` , 
    {
      NewHashedPasswordProp : unHashedPassword,
      TokenProp : token
    },false , true)
   
  }

   login(username,unHashedPassword){
    return this.post('login' , {
      NumeProp : username ,
      ParolaProp : unHashedPassword,
      TokenProp : '',
      RoleProp: ''
    } , false , false)
    
    
  }

   logout(){
    sessionStorage.clear();
    return  this.get('logout' , false , false , false)
    
  }

  googleLogIn(){
    window.location.href = 'http://localhost:5043/api/user/signin-google';
  }

}

export default new RegisterService();
