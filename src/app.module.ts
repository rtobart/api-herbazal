import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import { APP_GUARD } from '@nestjs/core';
import * as Joi from 'joi'
import { environments } from '@src/environment';
import config from '@src/config/config';
import { VARS } from '@src/config/envVars';
import { HealthModule } from './health/health.module';
import { ProductsModule } from './products/products.module';
import { CommonModule } from './common/services/common.module';
import { RateLimitModule } from './common/services/rate-limit/rate-limit.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || environments.development,
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'qa').default('development'),
        PORT: Joi.number().default(3000),
        TIME_OUT: Joi.number().default(60000),
        REQUEST_RATE_LIMIT: Joi.number().default(50),
      })
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): ThrottlerModuleOptions => ({
        throttlers: [{
          ttl: configService.get<number>(VARS.REQUEST_TIME_TO_LIVE),
          limit: configService.get<number>(VARS.REQUEST_RATE_LIMIT)
        }]
      })
    }),
    HealthModule,
    ProductsModule,
    CommonModule,
    RateLimitModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
