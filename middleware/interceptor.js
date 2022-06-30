import axios from 'axios'
const axiosInterceptor = axios.interceptors.request.use((request) => {
  request.headers.type = 'web'
  return request
})

export default axiosInterceptor
