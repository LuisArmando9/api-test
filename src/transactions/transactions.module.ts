import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/supplier/infrestructure/entities/supplier-entity';
import { UserEntity } from 'src/core/auth/infrestructure/entities/user-entity';
import { PaymentOrder } from './entities/payment-order.entity';
import { PaymentTransaction } from './entities/payment-transactions.entity';
import { ViewSoldCustomer } from 'src/core/shared/views/view-sold';
import { TransactionsController } from './transactions.controller';
import { SaleView } from 'src/core/shared/views/sale-view';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PaymentOrder,
      PaymentTransaction,
      ViewSoldCustomer,
      SaleView,
    ]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
