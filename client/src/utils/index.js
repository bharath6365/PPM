import axios from 'axios';
const setJWTTokenOnHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}


export {setJWTTokenOnHeader}