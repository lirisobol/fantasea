import { NextFunction, Request, Response } from "express";
import { RouteNotFoundError } from "../models/client-errors";
import { StatusCode } from "../models/status-codes";

class ErrorsMiddleware {
    public routeNotFound(request: Request, response: Response, next: NextFunction ) {
        const err = new RouteNotFoundError(request.originalUrl);
        next(err);
    };

    // Catch All 
    public catchAll(err:any, request: Request, response: Response, next:NextFunction) {
        console.log(err);
        const status = err.status || StatusCode.InternalServerError;
        const message = (err.message);
        response.status(status).send(message);
    };
}
export const errorsMiddleware = new ErrorsMiddleware();