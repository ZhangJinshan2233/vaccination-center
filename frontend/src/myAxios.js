import axios from 'axios';


const myAxios=axios.create({
  baseURL: '/api/v0'
});
export default myAxios