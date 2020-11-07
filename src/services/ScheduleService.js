import API from '../utils/api';

export const getSchedule = async () => {
    alert("var");
    let schedule = await API.get('http://localhost/wordpress/index.php/wp-json/wl/v1/latest-posts/1');

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
