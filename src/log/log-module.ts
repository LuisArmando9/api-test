import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {  GetLogByIdHandler } from './aplication/query/handler/get-log.by.id.query.handler';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { GetLogView } from 'src/core/shared/views/log-views';
import { LogController } from './infrestructure/controllers/log-controller';
import { GetLogByIdQuery } from './aplication/query/implementation/get.log.by.id.query';
import { LogService } from './domain/services/log-service';
import { GetUserView } from 'src/core/shared/views/user-views';

const queries = [
  GetLogByIdHandler
]

@Module({
  imports: [
    TypeOrmModule.forFeature([ GetBrandView, GetLogView, UserLogEntity, GetUserView])
  ],
  providers: [
    UserLogRepository, 
    LogService,
    QueryBus,
    ...queries,
],
})
export class LogModule  implements OnModuleInit {
    constructor(private readonly query$: QueryBus) {}
  
    onModuleInit() {
      this.query$.register(queries);
    }
  }
  
