import cors from "cors";
import express from "express";
import { errorsMiddleware } from "./middleware/errors-middleware";
import { generalInfoRouter } from "./controllers/general-info-controller";
import { playerHistoryRouter } from "./controllers/player-history-controller";
import { myFPLTrackerRouter } from "./controllers/my-fpl-tracker-controller";
class App {
    private server = express();

    public async start():Promise<void> {
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use("/api", generalInfoRouter);
        this.server.use("/api/player-history", playerHistoryRouter)
        this.server.use("/api/manager", myFPLTrackerRouter)
        this.server.use(errorsMiddleware.routeNotFound);
        this.server.use(errorsMiddleware.catchAll);
        this.server.listen(4000, '0.0.0.0',() => console.log("Listening on port: ",4000));
    };
}
const app = new App();
app.start();