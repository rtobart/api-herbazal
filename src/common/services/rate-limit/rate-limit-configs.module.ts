import { Module } from '@nestjs/common'
import { RateLimitConfigsProvider } from 'src/common/services/rate-limit/rate-limit-configs.provider'
import { RateLimitConfigsProviderAbstract } from 'src/common/services/rate-limit/rate-limit-configs.provider.abstract'

@Module({
  providers: [
    { provide: RateLimitConfigsProviderAbstract, useClass: RateLimitConfigsProvider }
  ],
  exports: [
    RateLimitConfigsProviderAbstract
  ]
})
export class RateLimitConfigsModule {

}