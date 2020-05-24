import axios from 'axios';
const setJWTTokenOnHeader = (token) => {
  if (token) {
    axios.defaults.common.headers['Authorization'] = token;
  } else {
    delete axios.defaults.common.headers['Authorization'];
  }
}

export {setJWTTokenOnHeader}