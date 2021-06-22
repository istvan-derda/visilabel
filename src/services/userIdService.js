import {CookieStorage} from 'cookie-storage'
import uuid from 'uuid-random'


let cookieStorage = new CookieStorage()

export function userIdFromCookie() {
    let idFromCookie = cookieStorage.getItem('user_id')
    if (idFromCookie !== null) {
        return idFromCookie
    }
    let newUserId = uuid()
    cookieStorage.setItem('user_id', newUserId)
    return newUserId
}