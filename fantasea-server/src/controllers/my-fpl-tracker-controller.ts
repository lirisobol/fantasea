import express, { NextFunction, Request, Response } from "express";
import { myFPLTrackerService } from "../services/my-fpl-tracker-service";
import { ManagerDetails } from "../models/manager/ManagerDetails";

class MyFPLTrackerController {
    public readonly router = express.Router();
    public constructor() {
        this.registerRoutes();
    }
    private registerRoutes():void {
        this.router.get("/:managerId", this.getManagerDetails)
    }
    public async getManagerDetails(request:Request, response:Response, next: NextFunction):Promise<void> {
        try {
            const managerId = parseInt(request.params.managerId);
            if(isNaN(managerId)) {
                response.status(400).json({error: "Invalid Manager ID"})
                return
            }
            const managerDetails:ManagerDetails = await myFPLTrackerService.fetchManagerDetails(managerId);
            response.status(200).json(managerDetails)
        }
        catch (err:any) {next(err)};
    }

}
const myFPLTrackerController = new MyFPLTrackerController();
export const myFPLTrackerRouter = myFPLTrackerController.router;