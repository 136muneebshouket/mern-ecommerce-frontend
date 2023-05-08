import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"http://localhost:8000",
});

const URL = "http://localhost:8000";

// let AccessToken;

// Function to get JWT token from local storage
function getAccessToken() {
  return localStorage.getItem("usertoken");
}

//  Function to get refresh token from local storage
function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

// Function to set new tokens in local storage
function setTokens(accessToken) {
  localStorage.setItem("usertoken", accessToken);
  // localStorage.setItem('refreshToken', refreshToken);
  // AccessToken = accessToken;
}

// Function to clear tokens from local storage
function clearTokens() {
  localStorage.removeItem("usertoken");
  localStorage.removeItem("refreshToken");
}

// let login = checkApiStatusoflogin();
// console.log(login)

// let signup = checkApiStatusofsignup();
// console.log(signup)

// let refresh_token = localStorage.getItem('refreshToken');
// let access_token = localStorage.getItem('usertoken');

if (getAccessToken() && getRefreshToken()) {
  // // Axios Interceptor
  axiosInstance.interceptors.request.use(async (config) => {
    console.log("interceptor config hitted");
    const token = getAccessToken();
    if (token) {
      // config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authtokken = token;
    }

    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      //   // TODO: do custom logics here.
      console.log("Response Interceptor");
      console.log(response);
      //   // setEMAIL(data.email)
      return response;
    },
    async (error) => {
      console.log("interception error");
      console.log(error);
      if (
        error.response.status === 401 &&
        error.response.data === "Invalid access token"
      ) {
        console.log(error.response.status);
        //     // JWT token has expired, try to obtain a new token with the refresh token
        const refreshToken = getRefreshToken();
        if (!refreshToken) {
          // No refresh token available, prompt user to log in again
          // clearTokens();
          console.log("reloaded error 1 intercepters");
          // window.location.reload();
        } else {
          return axios
            .post(`${URL}/api/refreshtoken/token`, { refreshToken })
            .then((response) => {
              const { accessToken } = response.data;
              setTokens(accessToken);

              // console.log(accessToken);
              // Retry the original request with the new JWT token
              const config = error.config;
              config.headers.Authorization = `Bearer ${accessToken}`;
              return axiosInstance.request(config);
            })
            .catch((error) => {
              // Refresh token is invalid or has expired, prompt user to log in again
              console.log("reloaded error 2 intercepters");
              // clearTokens();
              // window.location.reload();
            });
        }
      }
      return Promise.reject(error);
    }
  );
}


export default axiosInstance;