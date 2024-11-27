
import ApiService from "./ApiService";

class UserService extends ApiService {
    constructor(){
        super('http://localhost:5043/api/account')
    }

    /* 
  FETCHING USER DATA / MODIFYING USER DATA 
  ---------------------------
  ---------------------------
  ---------------------------
  ********** START **********
  */
  /**
   * Fetching user personal data from the database!
   * @returns {JSON} [User's data in JSON FORMAT]
   */ 
  
   async getPersonalDataFromDb() {  
    const response =  await this.get('profile/data' , true)
    sessionStorage.setItem(`user`, response.username)
    console.log(response)
    return response;
  }
// de modificat metoda pentru schimbarea datelor din cache la update0ul de date

  /**
   * 
   * @param {String} token [Confirmation token]
   * @param {Object} newDataDto [The modified DTO that will be sent to the DB]
   * @returns {int} [An int based on the response status]
   */

   confirmPersonalDataChanging(token , newDataDto){
    // -4 for 404
    // -2 for 400
    if(newDataDto.gen === true){
        newDataDto.gen = 1;
    }else if(newDataDto.gen === false){
        newDataDto.gen = 0;
    }else {
        newDataDto.gen = null;
    }
    // aici e unautorhized ( anoymous)
    return this.post(`changeEmail/${token}` , 
    {
      Nume: newDataDto.nume,
      Prenume: newDataDto.prenume,
      Gen: newDataDto.gen,
      NrTelefon: newDataDto.nrTelefon,
      Email: newDataDto.email,
      Username: newDataDto.username,
    } , false , true)
    
}

/**
 * 
 * @param {Object} updatedUserData [Modified data]
 * @param {string} endpoint  [the endpoint]
 * @returns {integer} [1 for email not changed and 0 for email changed]
 */

  modifyPersonalDataFromDb(updatedUserData) {
    if (updatedUserData.gen === 'Masculin') {
        updatedUserData.gen = true;
     } else if (updatedUserData.gen === 'Feminin') {
        updatedUserData.gen = false;
     } else {
        updatedUserData.gen = null;
     }
    return this.post('profile/data' ,  
    {
      Nume: updatedUserData.nume,
      Prenume: updatedUserData.prenume,
      Gen : updatedUserData.gen,
      NrTelefon : updatedUserData.nrTelefon,
      Email : updatedUserData.email,
      Username : updatedUserData.username
    } , false);
    
  }

  /**
   * 
   * @returns {Object} [The user's adresses]
   */

  async loadUserAdresses(){
    return this.get('profile/addresses' , true);
    
  }

  /**
   * 
   * @param {Object} addressToBeSaved [The new address to be saved/modfied]
   * @returns {HttpStatusCode} [The response status]
   */

   saveAddressToDb(addressToBeSaved){
    if(addressToBeSaved.cif === ''){
      addressToBeSaved.cif = null
    }
    if(addressToBeSaved.nume_firma === ''){
      addressToBeSaved.nume_firma = null
    }
    return this.post('profile/addresses' , {
      AliasDto: addressToBeSaved.alias,
      TipAdresaDto: addressToBeSaved.tip_adresa,
      BlocDto: addressToBeSaved.bloc,
      NrBlocDto: addressToBeSaved.nr_bloc,
      StradaDto: addressToBeSaved.strada,
      NrStradaDto: addressToBeSaved.nr_strada,
      OrasDto : addressToBeSaved.oras,
      JudetDto : addressToBeSaved.judet,
      CodPostalDto: addressToBeSaved.codPostal,
      CifDto : addressToBeSaved.cif,
      NumeFirmaDto : addressToBeSaved.nume_firma,
    } , false);

  }

   deleteUserAddress(alias) {
    return this.put('profile/addresses' , {
      AddresToDeleteAliasDto: alias
    }, false)
  }
  
  updateDataFromAdmin(changeRequestId){
    return this.get(`admin/emailChanged/${changeRequestId}` , false , false );
  }
  // de modificat USER.js sa foloseasva API Service
  // de scris enpoint-ul pentru get-ul de schimbare mail la client-side 
  
}

export default new UserService();