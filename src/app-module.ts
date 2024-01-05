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
import { SupplierModule } from './supplier/supplier-module';
import { InventoryModule } from './inventory/inventory-module';
import { Inventory } from './inventory/infrestructure/entities/inventory-entity';
import { ViewInventory } from './core/shared/views/inventory-view';
import { Supplier } from './supplier/infrestructure/entities/supplier-entity';
import { ViewSupplier } from './core/shared/views/supplier-view';
import { PaymentType } from './payment-type/infrestructure/entities/payment-type-entity';
import { PaymentTypeModule } from './payment-type/payment-type-module';
import { Shopping } from './shopping/infrestructure/entities/shopping-entity';
import { SalesModule } from './sales/sale-module';
import { Sale } from './sales/entities/sale-entity';
import { SaleView } from './core/shared/views/sale-view';
import { ViewShopping } from './core/shared/views/shopping-view';
import { PaymentOrder } from './transactions/entities/payment-order.entity';
import { PaymentTransaction } from './transactions/entities/payment-transactions.entity';
import { ViewSoldCustomer } from './core/shared/views/view-sold';
import { CloudinaryModule } from 'nestjs-cloudinary';
import {v2 as cloudinary} from 'cloudinary';
import { TransactionsModule } from './transactions/transactions.module';
import { ShoppingModule } from './shopping/shopping-module';
import { ReportingModule } from './reporting/reporting.module';
const Modules = [
  ProductModule,
  AuthModule,
  BrandModule,
  LogModule,
  SupplierModule,
  InventoryModule,
  PaymentTypeModule,
  SalesModule,
  TransactionsModule,
  ShoppingModule,
  ReportingModule
];
const entities = [
  ProductEntity,
  UserEntity,
  UserLogEntity,
  BrandEntity,
  GetBrandView,
  GetLogView,
  GetProductView,
  GetUserView,
  Inventory,
  ViewInventory,
  Supplier,
  ViewSupplier,
  PaymentType,
  Shopping,
  ViewShopping,
  Sale,
  SaleView,
  PaymentOrder,
  PaymentTransaction,
  ViewSoldCustomer,
  Shopping
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
