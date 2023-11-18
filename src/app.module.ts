import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigVars, Vars } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy';
import { ProductEntity } from './products/infrestructure/entities/product.entity';
import { UserEntity } from './core/auth/infrestructure/entities/user.entity';
import { UserLogEntity } from './core/shared/entities/action.user.log.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './products/product.module';
import { AuthModule } from './core/auth/auth.module';
import { BrandEntity } from './brand/infrestructure/entities/brand.entity';
import { BrandModule } from './brand/brand.module';
const Modules = [
  ProductModule,
  AuthModule,
  BrandModule
];
const entities = [
  ProductEntity,
  UserEntity,
  UserLogEntity,
  BrandEntity
];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [Vars],

    }),
    ...Modules,
    CqrsModule,
    TypeOrmModule.forRootAsync({
      useFactory: ({ db }: ConfigVars) => ({
        name: 'default',
        type: 'postgres',
        host: db.host,
        port: db.port,
        username: db.user,
        password: db.password,
        database: db.name,
        autoLoadEntities: true,
        entities: entities,
        synchronize: false,
        legacySpatialSupport: false,
      }),
      inject: [Vars.KEY],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
