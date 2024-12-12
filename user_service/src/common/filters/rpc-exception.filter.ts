import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const contextType = host.getType();

    if (contextType === 'rpc') {
      // Handle RPC exceptions
      const errorResponse = {
        status: 'error',
        message:
          exception instanceof HttpException
            ? exception.getResponse()
            : exception.message || 'Internal server error',
      };

      // Log the error for debugging purposes
      console.error('Exception caught:', exception);

      // Return the error response
      return errorResponse;
    } else {
      console.error('Unhandled exception:', exception);
      return { status: 'error', message: 'Unhandled exception' };
    }
  }
}
