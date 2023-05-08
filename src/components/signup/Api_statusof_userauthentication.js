import axios from "axios";

async function checkApiStatusoflogin() {
  const URL = "http://localhost:8000";

  try {
    await axios.post(`${URL}/api/auth/login`);
    return true; // API was hit successfully
  } catch (error) {
    return false; // API failed to hit
  }
}
async function checkApiStatusofsignup() {
  const URL = "http://localhost:8000";

  try {
    await axios.post(`${URL}/api/auth/createuser`);
    return true; // API was hit successfully
  } catch (error) {
    return false; // API failed to hit
  }
}

export { checkApiStatusoflogin, checkApiStatusofsignup };
