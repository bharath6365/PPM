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

const generateUniqueSequence = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sequence = '';
  
  for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      sequence += characters.charAt(randomIndex);
  }
  
  return sequence;
}


export {setJWTTokenOnHeader, checkFormErrors, generateUniqueSequence}