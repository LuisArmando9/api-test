import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetLogView } from 'src/core/shared/views/log-views';
import { PaymentTypeRepository } from './infrestructure/repositories/payment-type-repository';
import { PaymentTypeService } from './domain/services/payment-type-service';
import { PaymentTypeController } from './infrestructure/controllers/payment-type-controller';
import { PaymentType } from './infrestructure/entities/payment-type-entity';
import { CreatePaymentTypeHandler } from './aplication/command/handler/create-payment-type-handler';
import { GetUserView } from 'src/core/shared/views/user-views';
const commands = [
  CreatePaymentTypeHandler
];
const queries = [


]

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentType, UserLogEntity, GetLogView, GetUserView])
  ],
  controllers: [PaymentTypeController],
  providers: [
    PaymentTypeRepository,
    PaymentTypeService,
    UserLogRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],
})
export class PaymentTypeModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit() {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  
