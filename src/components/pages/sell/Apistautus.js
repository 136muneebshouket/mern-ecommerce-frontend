import axios from 'axios';

async function checkApiStatus() {

    const URL = "http://localhost:8000";

  try {
    await axios.get(`${URL}/api/products/createproduct`);
    return true; // API was hit successfully
  } catch (error) {
    return false; // API failed to hit
  }
}

export default checkApiStatus