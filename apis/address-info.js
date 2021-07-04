import { host } from "./host.js";
import { wxRequest } from './index.js'

//根据编号获取地址信息
export const API_ADDRESS_GET = `${host()}/Base/AddressInfo/Get`

//获取省列表
export const API_ADDRESS_GET_PROVINCE = `${host()}/Base/AddressInfo/GetProvince`

// 根据省编号获取城市列表
export const API_ADDRESS_GET_CITY = `${host()}/Base/AddressInfo/GetCity`

//根据城市编号获取区/县列表
export const API_ADDRESS_GET_COUNTY = `${host()}/Base/AddressInfo/GetCounty`
