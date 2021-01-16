import API from '../utils/api';

export const loginUser = async (data) => {
    try{
        let schedule = await API.post(`http://localhost/wordpress/index.php/wp-json/jwt-auth/v1/token/` , data);

        return schedule.data;
    }catch(err) {
        throw err;
    }
};
