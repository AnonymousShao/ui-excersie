import axios from 'axios';

axios.defaults.baseURL = ''  
// axios.interceptors.request.use((config)=>{
//   config.headers.token = localStorage.getItem("cookie");
//   return config;
// })

axios.interceptors.response.use(config =>{
  return config;
});

const http = {
  post: (api, data) => {
    return new Promise((resolve, reject)=>{
      axios.post(api,data).then(response=>{
        resolve(response)
      }).catch(err => {
        reject(err);
      })
    })
  },
  get: (api, data = {}) => {
    return new Promise((resolve, reject)=>{
      axios.get(api,data).then(response=>{
        resolve(response)
      }).catch(err => {
        reject(err);
      })
    })
  },
};

export default http;
