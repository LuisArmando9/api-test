import { Module, OnModuleInit } from '@nestjs/common';
import {  SupplierController } from './infrestructure/controllers/supplier-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { GetLogView } from 'src/core/shared/views/log-views';
import { Supplier } from './infrestructure/entities/supplier-entity';
import { ViewSupplier } from 'src/core/shared/views/supplier-view';
import { SupplierRepository } from './infrestructure/repositories/supplier-repository';
import { SupplierService } from './domain/services/supplier-service';
import { CreateSupplierHandler } from './aplication/command/handler/create-supplier-handler';
import { DeleteSupplierHandler } from './aplication/command/handler/delete-supplier-handler';
import { UpdateSupplierCommand } from './aplication/command/implementation/update-supplier-command';
import { UpdateSupplierHandler } from './aplication/command/handler/update-supplier-handler';
import { GetSupplierByIdHandler } from './aplication/query/handler/get-supplier-by-id-query-handler';
import { GetSupplierQuery } from './aplication/query/implementation/get-supplier-query';
import { GetSupplierHandler } from './aplication/query/handler/get-supplier-query-handler';
import { GetUserView } from 'src/core/shared/views/user-views';
const commands = [
  CreateSupplierHandler,
  DeleteSupplierHandler,
  UpdateSupplierHandler
];
const queries = [
  GetSupplierByIdHandler,
  GetSupplierHandler

]

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier, UserLogEntity, ViewSupplier, GetLogView, GetUserView])
  ],
  controllers: [SupplierController],
  providers: [
    SupplierRepository,
    SupplierService,
    UserLogRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],
})
export class SupplierModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit() {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  
