import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as entities from './core/entities';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({})],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        Logger.verbose(`${configService.get('PGHOST')}`);
        return {
          type: 'postgres',
          host: configService.get('PGHOST'),
          port: configService.get('PGPORT'),
          username: configService.get('PGUSER'),
          password: configService.get('PGPASSWORD'),
          database: configService.get('PGDATABASE'),
          logging: true,
          entities: Object.values(entities),
          autoLoadEntities:true,
          synchronize: true,
        };
      },
    }),
  ]
})

export class DatabaseModule {
  
}
