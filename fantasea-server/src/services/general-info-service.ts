
import axios from "axios";
import GeneralInfo from "../models/general-info/general-info";
import { ResourceNotFoundError } from "../models/client-errors";
import { handleError } from "../utils/error-handler";

class GeneralInfoService {
    private generalInfoEndpoint = "https://fantasy.premierleague.com/api/bootstrap-static/";

    public async fetchGeneralInfo(): Promise<GeneralInfo> {
        try {
            const response = await axios.get(this.generalInfoEndpoint);
            
            if(!response.data) {
                throw new ResourceNotFoundError("General Information Data is missing.");
            }
            const generalInfo = new GeneralInfo(response.data);
            // generalInfo.elements = response.data.elements;
            // generalInfo.teams = response.data.teams;
            // generalInfo.element_types = response.data.element_types;
            // generalInfo.element_stats = response.data.element_stats;
            // generalInfo.events = response.data.events;
            return generalInfo;
        } 
        catch (err) {
            handleError(err);
        }
    }
}

export const generalInfoService = new GeneralInfoService();
