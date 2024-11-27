
import ApiService from "./ApiService";

class RegisterService extends ApiService {
  constructor() {
    
    super('http://localhost:5043/api/user');
  }

   getEmailInDbAsync(email) {
    return this.post(`getUserByEmail` , {Email : email} , false , true)
    // try {
    //   const response = await axios.get(`${this.AUTHENTICATION_BASE_API}/getUserByEmail/${email}`);
      
    //   if (response.data) {
    //     console.log(response.data)
    //     return true;
    //   } else {
    //     console.log(response.data)
    //     return false;
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 404) {
    //     return false;
    //   } else {
    //     console.error('There was an error checking the email!', error);
    //     throw error;
    //   }
    // }
  }

   getUsernameInDbAsync(username) {
    return this.post(`getUserByUsername` , {Username : username} , false , true)
    // try {
    //   const response = await axios.get(`${this.AUTHENTICATION_BASE_API}/getUserByUsername/${username}`);
    //   if (response.data) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } catch (error) {
    //   if (error.response && error.response.status === 404) {
    //     return false;
    //   } else {
    //     console.error('There was an error checking the username!', error);
    //     throw error;
    //   }
    // }
  }

  registerAccount(registerData){
    return this.post('inregistrare' ,registerData , false , true)
  }

   getConfirmationLink(token){
    return this.get(`confirmare/${token}` , false , false , true)
    // try {
    //     const response = await axios.get(`${this.AUTHENTICATION_BASE_API}/confirmare/${token}`);
    //     if(response.status === 200){
    //         console.log(response.status)
    //         return 1;
    //     }
        
    // } catch (error) {
    //     if(error.response.status === 404){
    //         return -1;
    //     }else if(error.response.status === 400){
    //         console.error("Error confirming account: " , error)
    //         return 0;
    //     }
    // }
  }

  requestNewConfirmationLink(token){
    return this.post(`confirmare/${token}` , null , false , true)
    // try {
    //     const response = await axios.post(`${this.AUTHENTICATION_BASE_API}/confirmare/${token}`)
    //     if(response.status === 200){
    //         return 1;
    //     }
    // } catch (error) {
    //     if(error.response.status === 404){
    //         return -1;
    //     }else if(error.response.status === 400){
    //         console.error("Error when resending the confirmation link: (400) " , error)
    //         return 0;
    //     }else {
    //         console.error(error);
    //     }
    // }
  }
  
   checkPasswordInDb(unHashedPassword,token){
    return this.post('checkPassword' ,
    {
      HashedPasswordDtoProp:unHashedPassword,
      TokenProp: token
    },false , true)
    // try {
    //     const response = await axios.post(`${this.AUTHENTICATION_BASE_API}/checkpassword` 
    //     , )
    //     if(response.status === 200){
    //         console.log(response.status)
    //         return 1;
    //     }
       
    // } catch (error) {
    //     console.log(error.response.status);
    //     if(error.response.status === 404){
    //       return -1;
    //     }
    // }
  }

  async sendEmailForForgotPassword(email){
    return this.post('forgotpassword' ,
    {EmailProp: email},false , true)
    // try {
    //     const response = await axios.post(`${this.AUTHENTICATION_BASE_API}/forgotpassword` , )
    //     console.log(response.status)
    //     if(response.status === 200){
    //         return 1;
    //     }
    //     console.log(response.status)
    // } catch (error) {
    //     console.error("O eroare la trimiterea mail-ului");
    //     if(error.response.status === 404){
    //       return -1;
    //     }else if(error.response.status === 400){
    //       return 0;
    //     }

    // }
  }

   checkTokenValiditiy(token) {
    return this.get(`forgotpassword/${token}` , false, false , true)
    // try {

    //     const response = await axios.get(`${this.AUTHENTICATION_BASE_API}/forgotpassword/${token}`);
    //     if (response.status === 200) {
    //         return 1;
    //     }
    // } catch (error) {
    //     console.error("Eroare la verificarea codului de resetare a parolei");
    //     console.error(error);

    //     if (error.response && error.response.status === 404) {
    //         return -1;
    //     }
    // }
    // return -1; 
}


   changePassword(unHashedPassword,token){
    return this.post(`forgotpassword/${token}` , 
    {
      NewHashedPasswordProp : unHashedPassword,
      TokenProp : token
    },false , true)
    // try {

    //   const response = await axios.post(`${this.AUTHENTICATION_BASE_API}/forgotpassword/${token}`, 
    //     );

    //   switch (response.status) {
    //     case 200:
    //       return 1;
    //     case 600:
    //       return -2;
    //     default:
    //       return 2;
    //   }
    // } catch (error) {
    //   console.error("O eroare s-a intamplat in changePassword(unhashedPassword ,token)");
    //   console.error(error);
    //   if(error.response.status === 400){
    //     return -1;
    //   }else if ( error.response.status === 404){
    //     return 0;
    //   }
    // }
  }

   login(username,unHashedPassword){
    return this.post('login' , {
      NumeProp : username ,
      ParolaProp : unHashedPassword,
      TokenProp : '',
      RoleProp: ''
    } , false , false)
    // try {
    
    //   console.log(username,unHashedPassword)
    //   const response = await axios.post(`${this.AUTHENTICATION_BASE_API}/login`, 
    //   , {withCredentials : true})
   
    //   if(response.status == 200){
    //     return 1
    //   }
    // } catch (error) {
    //   console.error('Error during login', error.response.status);
    //   if(error.response.status === 500){
    //     return 0;
    //   }else if(error.response.status == 401){
    //     return -1;
    //   }
    // }
    
  }

   logout(){
    let response =  this.get('logout' , false , false , false)
    if(response === 1){
      sessionStorage.clear();
    }
    return response;
    // try {
      
    //   const response = await axios.get(`${this.AUTHENTICATION_BASE_API}/logout`,
    //     {withCredentials : true}
    //   );
    //   if(response.status === 200){
    //     sessionStorage.clear();
    //     return 1;
    //   }
     
    // } catch (error) {
    //   console.error(error);
    //   if(error.response.status === 401){
    //     return -1;
    //   }
    // }
  }

  googleLogIn(){
    window.location.href = 'http://localhost:5043/api/user/signin-google';
  }

}

export default new RegisterService();
