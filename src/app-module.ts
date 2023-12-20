import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigVars, Vars } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './products/infrestructure/entities/product-entity';
import { UserEntity } from './core/auth/infrestructure/entities/user-entity';
import { UserLogEntity } from './core/shared/entities/action-user-log.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './products/product-module';
import { AuthModule } from './core/auth/auth-module';
import { BrandEntity } from './brand/infrestructure/entities/brand-entity';
import { BrandModule } from './brand/brand-module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { GetBrandView } from './core/shared/views/branch-views';
import { GetLogView } from './core/shared/views/log-views';
import { GetProductView } from './core/shared/views/produc-views';
import { GetUserView } from './core/shared/views/user-views';
import { LogModule } from './log/log-module';
const Modules = [
  ProductModule,
  AuthModule,
  BrandModule,
  LogModule
];
const entities = [
  ProductEntity,
  UserEntity,
  UserLogEntity,
  BrandEntity,
  GetBrandView,
  GetLogView,
  GetProductView,
  GetUserView
];
@Module({
  imports: [
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
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
        ssl: db.ssl === "true",
        extra:{
          ssl: db.ssl === "true" ? { rejectUnauthorized: true} : null
        }
      }),
      inject: [Vars.KEY],
    }),
  ],
})
export class AppModule {}
