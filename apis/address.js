import { host } from "./host.js";

//获取省列表
export const API_ADDRESS_PROVINCE = `${host()}/Base/AddressInfo/GetProvince`

//根据省获取市列表
export const API_ADDRESS_CITY = `${host()}/Base/AddressInfo/GetCity`

//根据市获取区县列表
export const API_ADDRESS_COUNTY = `${host()}/Base/AddressInfo/GetCounty`

