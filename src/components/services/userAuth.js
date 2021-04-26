import hostUrl from "./hostUrl";
import axios from "axios";
import user from "@/components/services/user";
const userUrl = hostUrl ;
export default {

  login: (user) => {
    return axios.post(userUrl+'login', user, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
  },
  register: (formData)=>{
    return axios.post(userUrl+'register', formData, {
          headers: {
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
          }
        }
    )
  }


}