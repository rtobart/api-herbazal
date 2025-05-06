import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { ThrottlerModule, ThrottlerModuleOptions } from '@nestjs/throttler'
import { RateLimitConfigsModule } from 'src/common/services/rate-limit/rate-limit-configs.module'
import { RateLimitConfigsProviderAbstract } from 'src/common/services/rate-limit/rate-limit-configs.provider.abstract'
import { ThrottlerBehindProxyGuard } from 'src/common/services/rate-limit/throttler-behind-proxy.guard'

@Module({
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard }
  ],
  imports: [
    RateLimitConfigsModule,
    ThrottlerModule.forRootAsync({
      imports: [
        RateLimitConfigsModule
      ],
      inject: [RateLimitConfigsProviderAbstract],
      useFactory: (configSvc: RateLimitConfigsProviderAbstract) => {
        const { periodInMs, requestLimit } = configSvc.getConfigs()
        console.info('Setting rate limit using', { periodInMs, requestLimit })
        const options: ThrottlerModuleOptions = {
          throttlers: [
            {
              ttl: periodInMs,
              limit: requestLimit
            }
          ]
        }
        return options
      }
    })
  ],
  exports: [
    RateLimitConfigsModule
  ]
})
export class RateLimitModule { }