import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { error } from "console";
import { ZodError } from "zod";

@Catch(ZodError, HttpException)
export class ErrorFilter implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost) {
        
        const response = host.switchToHttp().getResponse();

        if (error instanceof HttpException) {
            response.status(exception.getStatus()).json({
                errors: exception.getResponse(),
            });

        } else if (exception instanceof ZodError) {
            // Map over each error in ZodError and format them
            const formattedErrors = exception.errors.map(err => ({
                path: err.path.join("."),
                message: err.message,
            }));

            response.status(400).json({
                errors: formattedErrors,
            });
        } else {
            response.status(500).json({
                errors: exception.message,
            });
        }
    }
}