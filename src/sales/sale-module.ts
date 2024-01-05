import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewInventory } from 'src/core/shared/views/inventory-view';
import { Inventory } from 'src/inventory/infrestructure/entities/inventory-entity';
import { SalesService } from './sale-service';
import { SaleRepository } from './repositories/sale-repository';
import { Sale } from './entities/sale-entity';
import { SaleController } from './controllers/sales-controller';
import { SaleView } from 'src/core/shared/views/sale-view';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { GetLogView } from 'src/core/shared/views/log-views';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { GetUserView } from 'src/core/shared/views/user-views';
import { ViewProductInventory } from 'src/core/shared/views/product-inventory-view';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Sale,
      ViewInventory,
      Inventory,
      SaleView,
      GetLogView,
      UserLogEntity,
      GetUserView,
      ViewProductInventory,
    ]),
  ],
  controllers: [SaleController],
  providers: [SalesService, SaleRepository, UserLogRepository],
})
export class SalesModule {}
