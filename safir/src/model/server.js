import axios from 'axios'

import user from './user'

const server = 'http://192.168.43.152:26321/';
const serviceAddr = server + 'wcf/omidservice.svc/';

export const getURL = (path) => `${server}${path}`;
export const getService = (path) => `${serviceAddr}${path}`;

export const isOffline = true;

export const request = (path, data, cb) => {
    axios.post(getService(path), JSON.stringify(data)).then(cb).catch(e => console.error(`Service Request Error: ` + e))
};

export const requestWithUserInfo = (path, data, cb) => {
    data.UserInfo = {
        username: user.auth.username,
        password: user.auth.password,
    };
    request(path, data, cb);
};