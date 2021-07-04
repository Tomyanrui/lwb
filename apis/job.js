import { host } from "./host.js";

//保存职位
export const API_JOB_SAVE = `${host()}/Busi/JobInfo/Save`

//获取招聘职位列表
export const API_JOB_LIST = `${host()}/Busi/JobInfo/Get`

//获取招聘职位详情
export const API_JOB_DETAIL = `${host()}/Busi/JobInfo/GetById`

//查找职位列表
export const API_JOB_SEARCH = `${host()}/Busi/JobInfo/Search`
