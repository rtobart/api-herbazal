import { Injectable } from '@nestjs/common'
import { RateLimitConfigs } from 'src/common/services/rate-limit/rate-limit-configs'
import { RateLimitConfigsProviderAbstract } from 'src/common/services/rate-limit/rate-limit-configs.provider.abstract'

@Injectable()
export class RateLimitConfigsProvider implements RateLimitConfigsProviderAbstract {
  getConfigs(): RateLimitConfigs {
    return {
      periodInMs: parseInt(process.env.RATE_LIMIT_PERIOD_IN_MS ?? '1000'),
      requestLimit: parseInt(process.env.RATE_LIMIT_MAX_REQUEST ?? '100')
    }
  }
}