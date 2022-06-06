import axios from "axios";

import tokenUtils from '../utils/token-utils'

const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers = {
    Authorization: tokenUtils.getToken()
  }
  return config;
})

instance.interceptors.response.use((response) => {
  if (response.data.code === 401) {
    tokenUtils.setToken('')
    alert('token过期,请刷新页面！')
  }
  return response
})

export default instance;