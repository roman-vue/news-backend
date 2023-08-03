import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    let version = 'v0.0.1';
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('NEws Backend')
      .setVersion(`${version}`)
      .build();
    Logger.verbose(version);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/news/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}
