import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HELALTH')
@Controller('HELALTH')
export class AppController {

  @Get()
  getHello() {
    return 'server running';
  }
}
