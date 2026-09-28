import axios from 'axios';

const ServerURL = 'http://localhost:5000';

const getData = async (url) => {
    try {
        const response = await axios.get(`${ServerURL}${url}`);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const postData = async (url, body) => {
    try {
        const response = await axios.post(`${ServerURL}${url}`, body);
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export { ServerURL, getData, postData };
