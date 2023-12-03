import axios from "axios";

const BASE_URL='http://localhost:3000/api/bardapi' //Replace with System PC IP address

const getBardApi=(msg)=>axios.get(BASE_URL+"?ques="+msg);

export default{
    getBardApi
}