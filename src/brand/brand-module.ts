import { Module, OnModuleInit } from '@nestjs/common';
import {  brandController } from './infrestructure/controllers/brand-controller';
import { BrandService } from './domain/services/brand-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './infrestructure/entities/brand-entity';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateBrandHandler } from './aplication/command/handler/create-brand-handler';
import { UpdateBrandHandler } from './aplication/command/handler/update-brand-handler';
import { GetBrandHandler } from './aplication/query/handler/get.brand.query.handler';
import { DeleteBrandHandler } from './aplication/command/handler/delete-brand-handler';
import { BrandRepository } from './infrestructure/repositories/brand-repository';
import { GetBrandByIdHandler } from './aplication/query/handler/get.brand.by.id.query.handler';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { GetLogView } from 'src/core/shared/views/log-views';
const commands = [
    UpdateBrandHandler,
    CreateBrandHandler,
    DeleteBrandHandler
];
const queries = [
  GetBrandHandler,
  GetBrandByIdHandler
]

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity, UserLogEntity, GetBrandView, GetLogView])
  ],
  controllers: [brandController],
  providers: [
    BrandService, 
    UserLogRepository, 
    BrandRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],
})
export class BrandModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit() {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  
