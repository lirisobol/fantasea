import express, { NextFunction, Request, Response } from "express";
import { playerHistoryService } from "../services/player-history-service";
import { PlayerHistoryItem } from "../models/PlayerHistoryItems";

class PlayerHistoryController {
    public readonly router = express.Router();
    public constructor() {
        this.registerRoutes();
    };
    private registerRoutes(): void {
        this.router.get("/:playerId", this.getPlayerHistory);
    }
    private async getPlayerHistory(request: Request, response: Response, next:NextFunction): Promise<void> {
        try {
            const playerId = parseInt(request.params.playerId, 10);
            if(isNaN(playerId)) {
                response.status(400).json({error: 'Invalid Player Id'})
                return
            }
            console.log(playerId);
            
            const history:PlayerHistoryItem[] = await playerHistoryService.fetchPlayerHistory(playerId);
            response.status(200).json(history);
        }
        catch(err:any) {next(err)};
    }
}
const playerHistoryController = new PlayerHistoryController();
export const playerHistoryRouter = playerHistoryController.router;