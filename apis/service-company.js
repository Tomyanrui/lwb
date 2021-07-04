import { host } from "./host.js";

//保存劳务公司信息
export const API_SC_SAVE = `${host()}/Busi/ServiceCompanyInfo/Save`

//获取劳务公司信息
export const API_SC_GET = `${host()}/Busi/ServiceCompanyInfo/Get`

//获取手机号码
export const API_USER_GET_PHONE = `${host()}/Vip/VipInfo/GetPhoneNumber`

//上传图片
export const API_IMS_UPLOAD = `${host()}/File/Image/Upload`

//查找劳务公司
export const API_SC_SEARCH = `${host()}/Busi/ServiceCompanyInfo/Search`

//获取劳务公司在招职位
export const API_SC_RELEASEJOBS = `${host()}/Busi/ServiceCompanyInfo/GetReleaseJobs`

//获取劳务公司合作的企业
export const API_SC_GETCCOMPANY = `${host()}/Busi/ServiceCompanyInfo/GetCooperativeCompany`




