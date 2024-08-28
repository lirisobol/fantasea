import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError, ResourceNotFoundError, ValidationError } from "../models/client-errors";
import { StatusCode } from "../models/status-codes";

export function handleError(err: any): never {
    if (err.isAxiosError) {
        const axiosError = err as AxiosError;

        switch (axiosError.response?.status) {
            case StatusCode.Unauthorized:
                throw new UnauthorizedError("Unauthorized access to the API.");
            case StatusCode.BadRequest:
                throw new ValidationError("Bad request to the API.");
            case StatusCode.NotFound:
                throw new ResourceNotFoundError("Resource not found.");
            default:
                throw new Error(`Unexpected error: ${axiosError.message}`);
        }
    } else {
        // Handle non-Axios errors
        console.error("Error:", err);
        throw new Error("An unexpected error occurred");
    }
}

