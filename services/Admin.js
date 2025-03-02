import { HttpStatusCode } from "axios"
import ApiService from "./ApiService";

class AdminService extends ApiService{
    constructor(){
        // super("http://localhost:5043/api/admin")
        super(process.env.NODE_ENV === 'development' ? "http://localhost:5043/api/admin" : '/api/admin')
    }

    adminLogin(key){
        return this.post('login' , {Key : key} , false);
    }


    uploadXlsxFile(file){
        const formData = new FormData();
        formData.append('ExcelFromClient', file);
        return this.post('products/addProducts', formData,null);
    }
    

    getProductsForAdminPage(){
        return this.get('products' , true)
    }

    getProductForAdminPage(codProdus){
        return this.get(`product/${codProdus}` , true);
    }

    getProductOptions(){
        return this.get('getProductTypes' , true);
    }

    deleteProductType(categorieInDb,codProdusInDb){
        return this.delete(`delete/${categorieInDb}/${codProdusInDb}/type` , null , false);
    }

    deleteDimension(lungime,latime,pret,recomandarePat,codProdusInDb){
        return this.delete(`delete/${codProdusInDb}/${lungime}/${latime}/${pret}/${recomandarePat}` , null , false)
    }

    deleteColor(numeCuloare,codCuloare,codProdusInDb){
        return this.delete(`delete/${codProdusInDb}/${numeCuloare}/${codCuloare}/color` , null , false)
    }
    deleteImage(numeCuloare,codCuloare,caleImagine,codProdusInDb,fisierInBucket){
        return this.delete(`delete/${codProdusInDb}/${numeCuloare}/${codCuloare}/${caleImagine}/${fisierInBucket}/image` , null , false)
    }


    saveProductChanges(modifiedProduct, codProdus) {
        const formData = new FormData();
        formData.append('productDto', JSON.stringify(modifiedProduct));

        modifiedProduct.culoriProdusDto.forEach(culoare => {
            if (culoare.imaginiProdusDto) {
                culoare.imaginiProdusDto.forEach(imagine => {
                    if (imagine.imageStream) {
                        formData.append('images', imagine.imageStream);
                    }
                });
            }
        });

        return this.put(`save/${codProdus}`, formData , true) ;
    }

    deleteProduct(productCode){
        return this.delete(`delete/${productCode}` , null , false)
    }

    getProductCodesAndNames(){
        return this.get('getProductCodesAndNames' , true)
    }
    
    toggleProductStatus(productCode,activationState){
        return this.put(`toggleActivationState/${productCode}/${activationState}` , null , false)
    }

    deleteSelectedProducts(selectedProducts){
        this.put(`activateSelectedProducts` , { 
            SelectedItemsToDoBulkOperations: selectedProducts 
        },false)
    }

    activateSelectedProducts(selectedProducts){
        this.put(`activateSelectedProducts` , { 
            SelectedItemsToDoBulkOperations: selectedProducts 
        },false)
    }

     /**
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     */

    /**
     * THE BEGGINING OF THE REST API's of the Seturi table
     * @returns {none}
     */

    getSeturi(){
        return this.get('seturi' , true)
    }

    getCurrentSet(encodedIdSet){
        return this.get(`set/${encodedIdSet}` , true)
    }

    deleteCurrentProductOnSet(encodedIdSet , idProdus){
        return this.delete(`set/delete/${encodedIdSet}/${idProdus}` , null , false);
    }

    toggleSetActivationState(encodedIdSet , state){
        return this.put(`set/activate/${encodedIdSet}/${state}` , false , false, false)
    }

    deleteCurrentSet(encodedIdSet){
        return this.put(`set/delete/${encodedIdSet}` ,false , false, false) 
    }

    getProductCodes(){
        return this.get('produse/coduriProduse',true)
    }

    getSeturiNames(){
        return this.get('seturi/nume',true)
    }

    getProductDataForSetAdding(codProdus){
        return this.get(`produs/${codProdus}/data` , true);
    }

    updateOrAddSet(encodedIdSet , form){
        const endpoint = encodedIdSet ? `set/${encodedIdSet}/update` : 'set/add';
        return encodedIdSet ? this.put(endpoint, form , false) : this.post(endpoint, form , false);
    }


    /**
     * THE END OF THE REST API's of the Seturi table
     * @returns {none}
     */

    
    /**
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     */

     

    /**
     * THE BEGGINING OF THE REST API's of the Inele_Prindere table
     * @returns {none}
     */


    /**
     * @param [none]
     * @returns {Array} [array with all the inele_prindere (converted to DTO)]
     */

    getInelePrindere(){
        return this.get(`inele` , true)
    }

    /**
     * @param [none]
     * @returns {Array<string>} [array with all the inele_prindere colors]
     */

    getInelePrindereColors(){
        return this.get('inele/culori' , true)
    }

     /**
     * @param {integer} encodedIdInel [The encoded id of the current inel page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP reuqest was succefully with all the data 
     *                  , if not HTTP error code]
     */

    getCurrentInel(encodedIdInel){
        return this.get(`inel/${encodedIdInel}` , true);
    }

    /**
     * @param {integer} encodedIdInel [The encoded id of the current inel page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    deleteInelImage(encodedIdInel){
        return this.put(`inel/${encodedIdInel}/image/delete` , null,false);
    }

     /**
     * @param {integer} encodedIdInel [The encoded id of the current inel page (using Sqids in C#)]
     * @param {FormData} form [The data containing the modified DTO and the current image]
     * @returns {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */


    updateOrAddInel(encodedIdInel , form){
        const endpoint = encodedIdInel ? `inel/${encodedIdInel}/update` : 'inel/add';
        return encodedIdInel ? this.put(endpoint, form , false) : this.post(endpoint, form , false);
    }

    /**
     * @param {integer} encodedIdInel [The encoded id of the current inel page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    deleteInel(encodedIdInel){
        return this.delete(`inel/delete/${encodedIdInel}` , false);
    }

   /**
     * THE END OF THE REST API's of the Inele_Prindere table
     * @returns {none}
     */

   /**
     * THE BEGGINING OF THE REST API's of the TipuriGalerie table
     * @returns {none}
     */


   /**
     * @param [none]
     * @returns {Array} [array with all the tipuri galerie (converted to DTO)]
     */


    getTipuriGalerie(){
        return this.get(`tipuri_galerie` , true)
    }

    /**
     * @param [none]
     * @returns {Array<String>} [array with all the tipuri galerie names ]
     */


    getTipuriGalerieNames(){
        return this.get('tipuri_galerie/nume' , true)
    }

     /**
     * @param {integer} encodedIdTipGalerie [The encoded id of the current tip galerie page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */


    getCurrentTipGalerie(encodedIdTipGalerieDto){
        return this.get(`tip_galerie/${encodedIdTipGalerieDto}` , true);
    }

     /**
     * @param {integer} encodedIdTipGalerie [The encoded id of the current tip galerie page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    deleteTipGalerieImage(encodedIdTipGalerie){
        return this.put(`tip_galerie/${encodedIdTipGalerie}/image/delete` , null,false);
    }

     /**
     * @param {integer} encodedIdTipGalerie [The encoded id of the current tip galerie page (using Sqids in C#)]]
     * @param {FormData} form [The data containing the modified DTO and the current image]
     * @returns {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    updateOrAddTipGalerie(encodedIdTipGalerie , form){
        const endpoint = encodedIdTipGalerie ? `tip_galerie/${encodedIdTipGalerie}/update` : 'tip_galerie/add';
        return encodedIdTipGalerie ? this.put(endpoint, form , false) : this.post(endpoint, form , false);
    }

     /**
     * @param {integer} encodedIdTipGalerie [The encoded id of the current tip galerie page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    deleteTipGalerie(encodedIdTipGalerie){
        return this.delete(`tip_galerie/delete/${encodedIdTipGalerie}` , false);
    }

    /**
     * THE END OF THE REST API's of the Tip galerie table
     * @returns {none}
     */

     /**
     * THE BEGGINING OF THE REST API's of the Tip linie table
     * @returns {none}
     */

     /**
     * @param [none]
     * @returns {Array} [array with all the tipuri linie (converted to DTO)]
     */


    getTipuriLinie(){
        return this.get(`tipuri_linie` , true)
    }

    /**
     * @param [none]
     * @returns {Array<String>} [array with all the tipuri linie names ]
     */


    getTipuriLinieNames(){
        return this.get('tipuri_linie/nume' , true)
    }

     /**
     * @param {integer} encodedIdTipLinie [The encoded id of the current tip linie page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */


    getCurrentTipLinie(encodedIdTipLinie){
        return this.get(`tip_linie/${encodedIdTipLinie}` , true);
    }

     /**
     * @param {integer} encodedIdTipLinie [The encoded id of the current tip linie page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    deleteTipLinieImage(encodedIdTipLinie){
        return this.put(`tip_linie/${encodedIdTipLinie}/image/delete` , null,false);
    }

     /**
     * @param {integer} encodedIdTipLinie [The encoded id of the current tip linie page (using Sqids in C#)]]
     * @param {FormData} form [The data containing the modified DTO and the current image]
     * @returns {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    updateOrAddTipLinie(encodedIdTipLinie , form){
        const endpoint = encodedIdTipLinie ? `tip_linie/${encodedIdTipLinie}/update` : 'tip_linie/add';
        return encodedIdTipLinie ? this.put(endpoint, form , false) : this.post(endpoint, form , false);
    }

     /**
     * @param {integer} encodedIdTipLinie [The encoded id of the current tip galerie page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

    deleteTipLinie(encodedIdTipLinie){
        return this.delete(`tip_linie/delete/${encodedIdTipLinie}` , false);
    }

      /**
     * THE END OF THE REST API's of the Tip linie table
     * @returns {none}
     */



      /**
     * THE BEGGINING OF THE REST API's of the ADMIN Clients table
     * @returns {none}
     */

      /**
       * The list with all the clients/guests
       * @returns {Array<>}
       */

       getClientsData(){
        return this.get('customers' , true)
      }

      getClientData(encodedIdContDto){
        return this.get(`customer/${encodedIdContDto}` , true,false , false)
      }

      modifyClientData(form){
        return this.put("customer/data/update" , form , false , false , )
      }

      modifyAddressActivationState(alias,addressState ,tipAdresa ,encodedIdAccountDto){
        return this.put(`customer/update/address/state/${alias}/${addressState}/${tipAdresa}/${encodedIdAccountDto}` , false)
      }

      saveAddressChanges(form){
        return this.put('customer/update/addresses' , form , false)
      }

      getMainOrders(){
        return this.get('mainOrders' , true)
      }



      /**
     * THE end OF THE REST API's of the ADMIN Clients table
     * @returns {none}
     */

       /**
     * THE BEGGINING OF THE REST API's of the ADMIN Vouchers table
     * @returns {none}
     */

      /**
       * The list with all the vouchers
       * @returns {Array}
       */

      getVouchers(){
        return this.get('vouchere' , true)
      }

      /**
     * @param [none]
     * @returns {Array<String>} [array with all the voucher codes ]
     */


     getVoucherCodes(){
        return this.get('vouchere/coduri' , true)
    }

     /**
     * @param {integer} encodedIdVoucher [The encoded id of the current voucher page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */


     getCurrentVoucher(encodedIdVoucher){
        return this.get(`voucher/${encodedIdVoucher}` , true);
    }

     /**
     * @param {integer} encodedIdVoucher [The encoded id of the current voucher page (using Sqids in C#)]
     * @returns  {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

      deleteVoucher(encodedIdVoucher){
        return this.delete(`voucher/delete/${encodedIdVoucher}` , false);

      }


      /**
       * THE BEGGINING OF API CALLS FOR MANOPERE TABLES
       */

      /**
       * THE LIST WITH THE CURRENT MANOPERE (ONLY STANDARD TYPE)
       * @returns {Array}
       */
      getManopere(){
        return this.get('manopere' , true,false,false,{});
      }

      
      /**
       * 
       * @param {String} encodedIdManopera {The encoded id of current manopera}
       * @returns The object with the data of the current manopera
       */
      getManopera(encodedIdManopera){
        return this.get(`manopera/${encodedIdManopera}` , null , false , false , {})
      }


      getManopereOptions(){
        return this.get('manopere/options' , true , false , false , {})
      }

      /**
       * 
       * @param {String} encodedIdManopera  {The encoded id of current manopera}
       * {If we add a new manopera , the encoded id is set to '0'. DONT CHANGE}
       * @param {Boolean} isUpdating 
       *  {The current chosen state : TRUE -> update | FALSE -> insert}
       * @param {FormData} form 
       * {The form with the new data/replaced data}
       * @returns {HttpStatusCode} {The success of the API call}
       */

      updateOrAddManopera(encodedIdManopera = '0' , isUpdating , form){
        return this.post(`manopera/${encodedIdManopera}/${isUpdating}` , form , false , false)
      }


      /**
       * THE END OF API CALLS FOR MANOPERE TABLES
       */

      /**
     * @param {integer} encodedIdVoucher [The encoded id of the current voucher page (using Sqids in C#)]]
     * @param {FormData} form [The data containing the modified DTO]
     * @returns {HttpStatusCode}[The succes code if the HTTP request was succefully 
     *                  , if not HTTP error code]
     */

      updateOrAddVoucher(encodedIdVoucher , form){
        const endpoint = encodedIdVoucher ? `voucher/${encodedIdVoucher}/update` : 'voucher/add';
        return encodedIdVoucher ? this.put(endpoint, form , false) : this.post(endpoint, form , false);
      }


      /**
     * THE end OF THE REST API's of the ADMIN Vouchers table
     * @returns {none}
     */
    

       /**
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     */

    /**
     * ------------------ GENERAL FUNCTION ---------------------
     * @param {Array} arrayOfObj [The array with the current objects (either ID's(int) or Codes(strings))]
     * @param {String} operation  [The operation: deletion/update]
     * @param {String} endPointStart [The endpoint: EX: "materiale" for Materiale table]
     * @returns {HttpStatusCode} [The status code : either 200 for success , 401 for Invalid Token(JWT , isAdmin cookie)]
     */
    bulkOperations(arrayOfObj,operation,endPointStart){
        let endpoint;
        if(endPointStart === 'seturi'){
            endpoint = operation === 'deletion' ? 'set/deleteBulk' : 'set/activateBulk';
            return this.put(endpoint, { SelectedItemsToDoBulkOperations: arrayOfObj } , false);
        }else if(endPointStart === 'inele'){
            endpoint = 'inele/deleteSelected'
            return this.put(endpoint, { SelectedItemsToDoBulkOperations: arrayOfObj } , false);
        }else if(endPointStart === 'produse'){
            endpoint = operation === 'deletion' ? 'deleteSelectedProducts' : 'activateSelectedProducts'
            return this.put(endpoint, { SelectedItemsToDoBulkOperations: arrayOfObj } , false);
        }else if(endPointStart === 'tipuri_galerie'){
            endpoint = 'tipuri_galerie/deleteSelected'
            return this.put(endpoint, { SelectedItemsToDoBulkOperations: arrayOfObj } , false);
        }else if(endPointStart === 'tipuri_linie'){
            endpoint = 'tipuri_linie/deleteSelected'
            return this.put(endpoint, { SelectedItemsToDoBulkOperations: arrayOfObj } , false);
        }else if(endPointStart === 'vouchere'){
            endpoint = 'vouchere/deleteSelected'
            return this.put(endpoint, { SelectedItemsToDoBulkOperations: arrayOfObj } , false);
        }
    /**
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     * --------------SPLIT LINE --------------
     */
    }

    /**
     * EXCEL EXAMPLE FOR PRODUCT IMPORTING
     */
     downloadExcel(){
        
        return this.get('downloadExcel', true, true , false)
    }

    /**
     * THE ** BEGGINING ** OF THE API'S FOR THE DASHBOARD DATA
     */
    getMainDashboardData(lowerInterval = null , upperInterval = null){
        return this.get(`dashboard/${lowerInterval}/${upperInterval}` , true)
    }

    getGoogleAnalyticsData(lowerInterval = null , upperInterval = null){
        return this.get(`dashboard/GA/${lowerInterval}/${upperInterval}` , true)

    }
    /**
     * THE ** END ** OF THE API'S FOR THE DASHBOARD DATA
     */

    modifyGeneralSettings(formData){
        return this.post('modifyGeneralSettings' , formData , false , false)
    }

    getGeneralSettings(){
        return this.get('generalSettings' , true , false , false)
    }
}

export default new AdminService();