import axios from "axios";
import { useUserStore } from "~/store/user";
import qs from "qs"
import { useI18n } from "#imports";
class ApiService {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async apiRequest(method, url, data = null, options = {}, returnData) {
        const store = useUserStore();
        const localePath = useLocalePath()
        
        try {
            const response = await axios({
                method,
                url: `${this.baseURL}/${url}`,
                data,
                withCredentials: options.withCredentials,
                responseType : options.responseType || 'json',
                params: options.params,
                paramsSerializer : (params) =>
                    qs.stringify(params , {arrayFormat: 'comma'})
            });
            
            const returnObj = {
                status : response.status,
                message : response.data
            }

         

            if (response.status === 200) {
                if(returnData === null){
                    return returnObj; // Ok()
                }
                return returnData ? response.data : 1;
            } else if (response.status === 204) {
                if(returnData === null){ // NoContent()
                    return returnObj;
                }
                return returnData ? response.data : 0;
            } else if(response.status === 202){
                if(returnData === null){ // Accepted()
                    return returnObj;
                }
                return returnData ? response.data : 2;
            }
        } catch (error) {
            const errorStatus = error.response?.status || 500;

            const errorReturnObJ = {
                status : errorStatus,
                message : error.response?.data
            }
            if (errorStatus === 401) {
                store.showSnackbar(useI18n('logout.expiredLoginToken'));
                navigateTo(localePath('/user/login'));
            } else if (errorStatus === 400) {
                if(returnData === null){
                    return  errorReturnObJ;
                }
                return -2;
            } else if (errorStatus === 515) {
                if(returnData === null){
                    return  errorReturnObJ;
                }
                return -3;
            } else if(errorStatus === 404) {
                if(returnData === null){
                    return  errorReturnObJ;
                }
                return -4;
            }
            console.error(error.message || error.response?.status);
            return 0;
        }
    }

    get(url, returnData = false, isBlob = false, isAnonymous = false , params = {}) {
        const options = {
            params, // Add query parameters here
            ...(isAnonymous ? {withCredentials: false} : { withCredentials: true }), // Conditionally set credentials
        };
      
        if (isBlob) {
            options.responseType = 'blob';
        }
       
        return this.apiRequest("GET", url, null, options, returnData);
    }

    post(url, data, returnData = false, isAnonymous = false) {
        const options = isAnonymous ? {} : { withCredentials: true }; // Conditionally set credentials
        return this.apiRequest("POST", url, data, options, returnData);
    }

    put(url, data, returnData = false, isAnonymous = false) {
        const options = isAnonymous ? {} : { withCredentials: true }; // Conditionally set credentials
        return this.apiRequest("PUT", url, data, options, returnData);
    }

    delete(url, data = null, returnData = false, isAnonymous = false) {
        const options = isAnonymous ? {} : { withCredentials: true }; // Conditionally set credentials
        return this.apiRequest("DELETE", url, data, options, returnData);
    }
}

export default ApiService;

