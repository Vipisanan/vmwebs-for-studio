import API from '../utils/api';

export const getSchedule = async () => {
    let schedule = await API.get('http://localhost/wordpress/index.php/wp-json/wl/v1/latest-posts/1');

    return schedule;
};

//user register
export const userRegister = async (data) => {
    let schedule = await API.post('http://localhost/wordpress/index.php/wp-json/wl/v1/std-users' , data);
    return schedule;
};

export const bookingSchedule = async (data) => {
    let schedule = await API.post('http://localhost/wordpress/index.php/wp-json/wl/v1/schedule' , data);
    return schedule;
};


// import axios from 'axios';
//
// export function getSchedule() {
//     return new Promise(((resolve, reject) => {
//         axios({
//             method: 'GET',
//             url: `http://localhost/wordpress/index.php/wp-json/wl/v1/latest-posts/1`,
//             data: null,
//             timeout: 60000,
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//             }
//         }).then((res) => {
//             resolve(res);
//         }).catch((error) => {
//             reject(error);
//         });
//     }));
// }
