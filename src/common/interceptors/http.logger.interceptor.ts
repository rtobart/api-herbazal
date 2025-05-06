import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HEALTH_PATH } from '../const/excludePathsInterceptor.const';


@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
    constructor() {}
    
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;
        if (request.originalUrl == HEALTH_PATH) {
            return next.handle();
        }
        const message = 'REQUEST | Method: ' + method + ' | URL: ' + url;
        Logger.log(message);

        const response = context.switchToHttp().getResponse();
        const _message = `RESPONSE | Status: ${response.statusCode}`;

        return next.handle().pipe(
            map(data => {
                Logger.log(_message);
                return data;
            }),
            catchError(err => {
                Logger.log(_message);
                throw err;
            })
        );
    }
}