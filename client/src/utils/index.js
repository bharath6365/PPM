import axios from 'axios';
const setJWTTokenOnHeader = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

const checkFormErrors = (nextProps, callback) => {
  try {
    if (Object.keys(nextProps.errors).length > 0 ) {
      callback();
  }
  } catch(e) {
    console.error(e);
  }
}


export {setJWTTokenOnHeader, checkFormErrors}