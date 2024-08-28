import axios from "axios";
import GeneralInfo from "../models/general-info/general-info";
import { appConfig } from "../utils/appConfig";

class GeneralInfoService {
    public async fetchGeneralInfo(): Promise<GeneralInfo> {
        const response = await axios.get<GeneralInfo>(appConfig.base_url + 'general-info');
        console.log('client service:',response.data);
    
        return response.data;
    }
}
export const generalInfoService = new GeneralInfoService();