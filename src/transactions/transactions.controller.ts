import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreatePaymentTransactionDto, CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaymentOrder } from './entities/payment-order.entity';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { ViewSoldCustomer } from 'src/core/shared/views/view-sold';

@Controller('transactions')
@ApiTags('transactions')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post('create-order')
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create order' })
  @ApiResponse({ status: 200, description: 'Create order', type: PaymentOrder })
  async createPaymentOrder( @Req() req: IApiRequest, @Body() dto: CreateTransactionDto) {
    dto.user_id = req.user.id
    const paymentOrder = await this.service.createPaymentOrder(dto);
    return paymentOrder;
  }

  @Post('create-payment/:orderId')
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create payment transaction' })
  @ApiResponse({ status: 200, description: 'Create payment transaction', type: PaymentOrder })
  async createPaymentTransaction(
    @Param('orderId') orderId: number,
    @Body() data: CreatePaymentTransactionDto,
    @Req() req: IApiRequest,
  ) {
    data.order_id = orderId;
    data.user_id = req.user.id

    const paymentTransaction = await this.service.createPaymentTransaction(data);
    return paymentTransaction;
  }

  @Post('sold/:userId')
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Get sold transaction' })
  @ApiResponse({ status: 200, description: 'Get sold transaction by user', type: [ViewSoldCustomer] })
  @ApiParam({name:"userId", description:"user id"})
  async getSoldTransaction(
    @Param('userId') user_id: number
  ) {
  
    return  this.service.getSoldTransaction(user_id);;
  }
}
