import API from '../utils/api';
import axios from 'axios';

export const loginUser = async (data) => {
    try {
        const response = await axios.post( `http://localhost/wordpress/index.php/wp-json/jwt-auth/v1/token/` , data )
        return response.data;
    }catch(err) {
        throw err;
    }

};
