import { RateLimitConfigs } from 'src/common/services/rate-limit/rate-limit-configs'

export abstract class RateLimitConfigsProviderAbstract {
  abstract getConfigs(): RateLimitConfigs
}