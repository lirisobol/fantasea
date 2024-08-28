import express, { NextFunction, Request, Response } from "express";
import { generalInfoService } from "../services/general-info-service";

class GeneralInfoController {
    public readonly router = express.Router();
    public constructor() {
        this.registerRoutes();
    };

    private registerRoutes(): void {
        this.router.get("/general-info", this.getGeneralInformation);
    };

    // http://localhost:4000/api/general-info/
    private async getGeneralInformation(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const generalInfo = await generalInfoService.fetchGeneralInfo();
            response.json(generalInfo);
        }
        catch(err:any) {next(err)}
    };
};
const generalInfoController = new GeneralInfoController();
export const generalInfoRouter = generalInfoController.router;
