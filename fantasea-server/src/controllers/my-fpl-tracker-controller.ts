import express, { NextFunction, Request, Response } from "express";
import { myFPLTrackerService } from "../services/my-fpl-tracker-service";
import { ManagerDetails } from "../models/manager/ManagerDetails";
import { LeagueDetails } from "../models/manager/LeagueDetails";
import { ManagerPicks } from "../models/manager/ManagerPicks";

class MyFPLTrackerController {
    public readonly router = express.Router();
    public constructor() {
        this.registerRoutes();
    }
    private registerRoutes():void {
        this.router.get("/:managerId", this.getManagerDetails)
        this.router.get("/league/:leagueId", this.getLeagueDetails)
        this.router.get("/:managerId/:event", this.getManagerPicks); 
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
    public async getManagerPicks(request:Request, response:Response, next: NextFunction):Promise<void> {
        try {
            console.log("in controller");
            
            const managerId = parseInt(request.params.managerId);
            const event = parseInt(request.params.event)
            if(isNaN(managerId)) {
                response.status(400).json({error: "Invalid Manager ID"})
                return
            }
            const managerDetails:ManagerPicks = await myFPLTrackerService.fetchManagerPicks(managerId,event);
            response.status(200).json(managerDetails)
        }
        catch (err:any) {next(err)};
    }
    public async getLeagueDetails(request:Request, response:Response, next:NextFunction):Promise<void> {
        try {
            const leagueId = parseInt(request.params.leagueId);
            if(isNaN(leagueId)) {
                response.status(400).json({error: "Invalid League ID"})
                return
            }
            const leagueDetails: LeagueDetails = await myFPLTrackerService.fetchLeagueDetails(leagueId);
            response.status(200).json(leagueDetails);
        }
        catch (err:any) {next(err)};
    };

}
const myFPLTrackerController = new MyFPLTrackerController();
export const myFPLTrackerRouter = myFPLTrackerController.router;