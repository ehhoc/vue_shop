import { request } from "./request";

export function getLoginMultidata(username, password) {
    // const data = {
    //     username,
    //     password
    // }
    return request({
        url: '/login',
        method: 'POST',
        data:{
            username,
            password
        }
    })
}

