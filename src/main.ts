import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import moment from 'moment';
import * as express from 'express';
import helmet from 'helmet';
import { AppModule } from '@src/app.module';
import { VARS } from '@src/config/envVars';
import { HttpLoggerInterceptor } from '@src/common/interceptors/http.logger.interceptor';
import { TimeOutInterceptor } from '@src/common/interceptors/timeout.interceptor'

async function bootstrap() {
  const apiPrefix = process.env.API_PREFIX ?? 'api';
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(`${apiPrefix}`),
    bufferLogs: true,
    bodyParser: true,
  });
  
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  
  const configService = app.get(ConfigService);
  
  app.useGlobalInterceptors(
    new HttpLoggerInterceptor(),
    new TimeOutInterceptor(configService.get<number>(VARS.TIME_OUT))
  );
  
  const apiVersion = configService.get<string>(VARS.API_VERSION);
  app.setGlobalPrefix(`${apiPrefix}/${apiVersion}`);

  app.use(helmet());
  
  const corsList: string[] = configService.get<string>(VARS.ORIGIN_CORS).split('|');
  Logger.log(`VALID CORS LIST: ${corsList}`);
  const corsConfig = {
    origin: corsList,
    methods: ['GET', 'POST'],
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsConfig);
  
  Date.prototype.toJSON = function (): any {
    return moment(this);
  };
  
  app.enableShutdownHooks();
  
  const PORT = configService.get<string>(VARS.PORT);
  await app.listen(PORT, () => {
    Logger.log(`Server listening on port ${PORT}`);
  });
}
bootstrap();
