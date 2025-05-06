import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('status')
export class HealthController {
  @Get('health')
  @HttpCode(HttpStatus.OK)
  healhtStatus() {
    return;
  }
}