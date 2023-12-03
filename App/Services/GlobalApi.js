import axios from "axios";

const BASE_URL='https://bard-api-heroku-2eb69013d3de.herokuapp.com/api/bardapi' //Replace with System PC IP address

const getBardApi=(msg)=>axios.get(BASE_URL+"?ques="+msg);

export default{
    getBardApi
}