import axios from "axios";
import { appConfig } from "../../utils/AppConfig";
import GenInfo from "../../models/gen-info/GenInfo";

class GenInfoService {
    public async fetchGenInfo():Promise <GenInfo> {
        const response = await axios.get<GenInfo>(appConfig.base_url + 'general-info')
        console.log('GenInfo Service Response --', response.data);
        return response.data
    }
}
export const genInfoService = new GenInfoService();