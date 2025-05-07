import { ExecutionContext, Injectable, Logger } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ThrottlerGuard, ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler'
import { HEALTH_PATH } from '@src/common/const/excludePathsInterceptor.const'

@Injectable()
export class ThrottlerBehindProxyGuard extends ThrottlerGuard {

  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
  ) {
    super(options, storageService, reflector)
  }

  async getTracker(req: Record<string, any>): Promise<string> {
    return req.ips.length ? req.ips[0] : req.ip // individualize IP extraction
  }

  generateKey(context: ExecutionContext, suffix: string, name: string): string {
    const sessionKey = super.generateKey(context, suffix, name)
    const request = context.switchToHttp().getRequest()
    if (request.url.includes(HEALTH_PATH)) return sessionKey
    try {
      const newKey = sessionKey
      Logger.log({
        source: 'ThrottlerBehindProxyGuard.generateKey',
        message: 'Returning compound session key',
        newKey
      })
      return newKey
    } catch (error) {
      Logger.error({
        source: 'ThrottlerBehindProxyGuard.generateKey',
        message: 'Returning original session key',
        error
      })
      return sessionKey
    }
  }
}