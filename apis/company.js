import { host } from "./host.js";

//获企业列表
export const API_COMPANY_LIST = `${host()}/Busi/CompanyInfo/GetList`

//保存企业信息
export const API_COMPANY_SAVE = `${host()}/Busi/CompanyInfo/Save`

//查找企业列表
export const API_COMPANY_SEARCH = `${host()}/Busi/CompanyInfo/Search`

//获取企业详情
export const API_COMPANY_GET = `${host()}/Busi/CompanyInfo/Get`

//获取企业在招职位
export const API_COMPANY_GETJOBS = `${host()}/Busi/CompanyInfo/GetReleaseJobs`

//获取企业合作的劳务公司
export const API_COMPANY_CSC = `${host()}/Busi/CompanyInfo/GetCooperativeServiceCompany`
