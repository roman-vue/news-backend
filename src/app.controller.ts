import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HELALTH')
@Controller()
export class AppController {

  @Get()
  getHello() {
    return 'server running';
  }
}
