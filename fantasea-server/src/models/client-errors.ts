import { StatusCode } from "./status-codes";

// Parent Prototype Class
abstract class ClientError {
    public message: string;
    public status: number;
    public constructor(message:string, status:number) {
        this.message = message;
        this.status = status;
    };
};
// Route Not Found
export class RouteNotFoundError extends ClientError {
    public constructor(route:string) {
        super(`Route ${route} not found.`, StatusCode.NotFound);
    };
};
// Resource Not Found Error
export class ResourceNotFoundError extends ClientError {
    public constructor(id:string) {
        super(`id ${id} not exist.`, StatusCode.NotFound);
    };
};
// Validation error:
export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(message, StatusCode.BadRequest);
    };
};
// Unauthorized error:
export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(message, StatusCode.Unauthorized);
    };
};
