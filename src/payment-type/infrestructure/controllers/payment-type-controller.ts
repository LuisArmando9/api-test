import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { PaymentType } from '../entities/payment-type-entity';
import { CreatePaymentTypeDto } from '../dtos/create-payment-type-dto';
import { CreatePaymentTypeCommand } from 'src/payment-type/aplication/command/implementation/create-payment-type-commant';



@ApiTags('PaymentType')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("PaymentType")
export class PaymentTypeController {
  constructor(private readonly command_bus: CommandBus, private readonly query_bus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create PaymentType' })
  @ApiResponse({ status: 200, description: 'Create PaymentType', type: PaymentType })
  async create(@Body() dto: CreatePaymentTypeDto, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    return await this.command_bus.execute(new CreatePaymentTypeCommand(dto))
  }

 
}
