import ApiService from "./ApiService"

class ProductsService extends ApiService{
    constructor(){
        // super("http://localhost:5043/api/product")
        super(process.env.NODE_ENV === 'development' ?  'http://localhost:5043/api/product' : 'production backend url')

    }

    /**
     * @param {int?} pageNumber [The page number of with the current products]
     * @param {Array<string>} productTypes [The array of product types to filter]
     * @param {Array<string>} productColors [The array of color types to filter]
     * @param {Array<string>} widthRange [The array of product dimensions width to filter]
     * @param {Array<string>} heightRange [The array of product dimension height to filter]
     * @param {Array<int>} priceRange [The array of product price to filter]
     * @param {boolean} reverseFace [The type of reverse face (true or false)]
     * @returns {List} [The list with a limit of 15 products]
     */
    
    getProductsForUsers(pageNumber , productTypes , productColors, productDimensions, productPrice , productReverseFace, currency){
       
        const params = {
            productTypes,
            productColors,
            productDimensions,
            productPrice,
            productReverseFace
        }
        return this.get(`paginated/${pageNumber}/${currency}` , true , false , false , params) 
    }


    /**
     * @param {int?} pageNumber [The page number of with the current products]
     * @param {Array<string>} productTypes [The array of product types to filter]
     * @param {Array<string>} colorTypes [The array of color types to filter]
     * @param {Array<string>} widthRange [The array of product dimensions width to filter]
     * @param {Array<string>} heightRange [The array of product dimension height to filter]
     * @param {Array<int>} priceRange [The array of product price to filter]
     * @param {boolean} reverseFace [The type of reverse face (true or false)]
     * @returns {List} [The list with a limit of 15 products]
     */
    
    getSetsForUsers(pageNumber , productTypes , productPrice ,productName ,currency){
       console.log('in products.js',currency)
        const params = {
            productTypes,
            productPrice,
            productName
        }
        return this.get(`sets/paginated/${pageNumber}/${currency}` , true , false , false , params) 
    }

    /**
     * @param {NONE}
     * @returns {Object
     * {
     *      filterColors : IMutableHashSet(ReadOnly),
     *      filterProductTypes : IMutableHashSet(ReadOnly)
     * }}
     *  [The class with the filter options - color and productTypes]
     */
    
    getFilterOptions(currency = "RON"){
        return this.get(`filterOptions/${currency}` , true , false , true) 
    }

    /**
     * @param {String} productCode [The product code]
     * @param {String} productType [The type of the product]
     * @param {String} currency [The current currency : RON or EUR]
     * 
     * @returns {Object{
     *      - integer : 1 or 0 (depends on succes)
     *      - productData : class (null if product has not been found )
     * }}
     */

    getProductData(productCode , productType, currency){
        return this.get(`${productCode}/${productType}/${currency}` , true , false, false)
    }

    /**
     * 
     * @param {String} encodedIdSet [The encoded id of the set]
     * @param {String} numeSet  [ The set name]
     * @param {String} currency  [Current currency selected]
     * @returns 
     */
    getSetData(encodedIdSet , numeSet , currency){
        return this.get(`set/${encodedIdSet}/${numeSet}/${currency}` , true,false,false)
    }

    /**
     * @param {FormData} form [The form with the review info]
     * @returns {KeyValuePair<int,string>} [The info about the succefullness of the request]
     */

    postProductReview(form){
        return this.post('postReview' , form , false , false);
    }

    /**
     * @param {FormData} form [The form with the cart item informations to add or increment quantity]
     * @returns {HttpStatusCode} [The status code of the request]
     */

    addToCart(form){
        return this.post('cart/add' , form , null , false)
    }

     /**
     * @param {FormData} form [The form with the cart item informations to remove or decrement quantity]
     * @returns {HttpStatusCode} [The status code of the request]
     */

     deleteFromCart(form){
        return this.post('cart/delete' , form , null , false)
    }

    /**
     * 
     * @param {String} currency [The current currency selected]
     * @returns {List}
     */
    getMostViewedProducts(currency){
        return this.get(`mostViewedProducts/${currency}` , true , false , true)
    }

    /**
     * 
     * @returns {List} [List of items in the cart]
     */
    getCartItems(currency){
        return this.get(`cart/${currency}` , true , false , false )
    }

    /**
     * 
     * @param {Object} body [Product/Bundle data to decrement/increment quantity]
     * @returns 
     */
    modifyQuantity(body){
        return this.post('modify/quantity' , body , false , false)
    }

    deleteItemFromCart(body){
        return this.post('cart/delete' , body , false , false)
    }

    /**
     * 
     * @param {String} currency  [Currency currency selected]
     * @returns {(List,List)} [Tuple with two lists : First list is the updated products
     * and the second list is the products that got their prices modified]
     */
    syncCartOnCheckout(currency){
        return this.get(`syncCartOnCheckout/${currency}` , true , false , false)
    }

    /**
     * 
     * @param {String} data  [Currency currency selected]
     * @returns {HttpStatusCode} [The response if the voucher was applied succefully]
     */
    applyVoucherCode(data){
        return this.post("applyVoucher" , data , null , false)
    }

    getProductTypesAndCategoriesForUser(){
        return this.get("productTypesAndCategories" , true , false , false)
    }

    /**
     * 
     * @returns {List} [The list with the newProducts cached for 30 minutes]
     */
    getNewProductsInShop(currentCurrency){
        return this.get(`newProducts/${currentCurrency}` , true , false ,false)
    }

     /**
     * 
     * @returns {List} [The list with the limitedEdition cached for 30 minutes]
     */
    getLimitedEditionProductsInShop(currentCurrency){
        return this.get(`limitedEditionProducts/${currentCurrency}` , true , false ,false)
    }


}

export default new ProductsService()

