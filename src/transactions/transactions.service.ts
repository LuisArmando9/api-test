import { Injectable } from '@nestjs/common';
import { CreatePaymentTransactionDto, CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentOrder } from './entities/payment-order.entity';
import { Repository } from 'typeorm';
import { PaymentTransaction } from './entities/payment-transactions.entity';
import { UserEntity } from 'src/core/auth/infrestructure/entities/user-entity';
import { InvalidAmountException, OrderNotFound } from './execptions';
import { ViewSoldCustomer } from 'src/core/shared/views/view-sold';
import { SaleView } from 'src/core/shared/views/sale-view';
import { UserNotFoundException } from 'src/core/auth/domain/exceptions/user-exceptions';
import { SaleNotFound } from 'src/sales/sale-exceptions';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(PaymentOrder)
    private readonly order_repository: Repository<PaymentOrder>,
    @InjectRepository(PaymentTransaction)
    private readonly transaction_repository: Repository<PaymentTransaction>,
    @InjectRepository(UserEntity)
    private readonly user_repository: Repository<UserEntity>,
    @InjectRepository(ViewSoldCustomer)
    private readonly sold_repository: Repository<ViewSoldCustomer>,
    @InjectRepository(SaleView)
    private readonly sale_repository: Repository<SaleView>,
  ) {}

  async createPaymentOrder(dto: CreateTransactionDto): Promise<PaymentOrder> {
    const user = await this.user_repository.findOneBy({id:dto.user_id});
    const sale = await this.sale_repository.findOneBy({id:dto.sale_id})
    if (!user) throw new UserNotFoundException()
    if (!sale) throw new SaleNotFound();
    if (dto.total_amount > sale.total_amount) throw new InvalidAmountException()

    const paymentOrder = this.order_repository.create({
      user,
      total_amount: dto.total_amount,
      remaining_amount: dto.total_amount,
      sale_id:dto.sale_id,
      status: 'Pending',
    });

    return this.order_repository.save(paymentOrder);
  }

  async createPaymentTransaction(dto: CreatePaymentTransactionDto): Promise<PaymentTransaction> {
    const order = await this.order_repository.findOneBy({id: dto.order_id});
    if (!order) throw new OrderNotFound()
    order.remaining_amount -= dto.amount;
    const paymentTransaction = this.transaction_repository.create({
      order,
      transaction_amount: dto.amount,
    });

    return this.transaction_repository.save(paymentTransaction);
  }

  async getSoldTransaction(user_id: number) {
    return this.sold_repository.findBy({user_id})
  }

}
