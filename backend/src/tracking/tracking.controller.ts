import { Controller, Post, Body } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private trackingService: TrackingService) {}

  @Post('lookup')
  lookup(
    @Body()
    body: {
      orderNumber?: string;
      name?: string;
      email?: string;
    },
  ) {
    return this.trackingService.lookup(body);
  }
}
