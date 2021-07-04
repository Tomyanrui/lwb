import { host } from "./host.js";
import { wxRequest } from './index.js'

//获取代理信息
export const API_AGENT_GET = `${host()}/Busi/AgentInfo/Get`

//保存代理信息
export const API_AGENT_SAVE = `${host()}/Busi/AgentInfo/Save`
