import ApiService from "./ApiService"

class OrderService extends ApiService{
    constructor(){
        // super("http://localhost:5043/api/order")
        super(process.env.NODE_ENV === 'development' ? "http://localhost:5043/api/order" : 'api/order')

    }

    getClientOrders(currency){
        return this.get(`client/orders/${currency}` , true , false , false )
    }

    placeOrder(currency,formData){
        return this.post(`place_order/${currency}` , formData , null , false)
    }

    getConfirmationPage(orderId , confirmationKey){
        return this.get(`confirmation/${confirmationKey}/${orderId}` , false , false , false)
    }

}

export default new OrderService();