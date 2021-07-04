import { host } from "./host.js";
import { wxRequest } from './index.js'

//登录接口
export const API_USER_LOGIN = `${host()}/Vip/VipInfo/Login`

//用户信息
export const API_USER_INFO = `${host()}/Vip/VipInfo/GetUserInfo`

//获取手机号码
export const API_USER_GET_PHONE = `${host()}/Vip/VipInfo/GetPhoneNumber`

//上传图片
export const API_IMS_UPLOAD = `${host()}/File/Image/Upload`
