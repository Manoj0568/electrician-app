import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api"
})

axiosInstance.interceptors.response.use(
    (res)=>{return res},
    async (err)=>{
        const orginal_request = err.config;

        if(err.response.status === 401 ){
            try {
                // const refreshToken = localStorage.getItem('refreshToken')
                // const existingUser = localStorage.getItem('existingUser')
                // if(!refreshToken || !existingUser) return new Error(err)
                // const response = await axios.post('/api/refresh',{refreshToken,existingUser},{withCredentials:true})
                // console.log(response)
                // if(response.status == 200){
                //    return axiosInstance(orginal_request)
                // }
            } catch (error) {
                // console.log('refresh token failed',err)
                // localStorage.removeItem('existingUser')
                // localStorage.removeItem('refreshToken')
                window.location.href='/login'
            }
        }
        

        return Promise.reject(err)
    }

    
)

export default axiosInstance