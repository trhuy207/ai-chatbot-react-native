import axios from "axios";

const BASE_URL='http://192.168.1.28:3000/api/bardapi' //Replace with System PC IP address

const getBardApi=(msg)=>axios.get(BASE_URL+"?ques="+msg);

export default{
    getBardApi
}