import axios from "axios";
import {ElMessage} from "element-plus";


const defaultError = () => ElMessage.error("发生了一些错误，请联系管理员")
const defaultFailure = (description) => ElMessage.warning(description)
function doPost(url, data, success, failure = defaultFailure, error = defaultError){
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    }).then(function (RestBean){
        if(RestBean.data.code===200){
            success(RestBean.data)
        }else{
            failure(RestBean.data.description)
        }
    }).catch(error)
}

function doGet(url, success, failure = defaultFailure, error = defaultError){
    axios.get(url, {
        withCredentials: true
    }).then(function (RestBean){
        if(RestBean.data.code===200){
            success(RestBean.data)
        }else{
            failure(RestBean.data.description)
        }
    }).catch(error)
}

export {doPost, doGet}