/**
 * 公共配置
 */
import {getCookie} from './cookie'
// 公共api
export const API_ROOT = 'http://118.178.238.202:9988/v1/'
// 公共headers - Authorization
export let AUTH_TOKEN = `${getCookie('sessionToken')}`