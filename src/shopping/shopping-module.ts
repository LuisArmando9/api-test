import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import {  ShoppingController } from './infrestructure/controllers/shopping-controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { GetLogView } from 'src/core/shared/views/log-views';
import { Shopping } from './infrestructure/entities/shopping-entity';
import { ViewShopping } from 'src/core/shared/views/shopping-view';
import { ShoppingService } from './domain/services/shopping-service';
import { CreateShoppingHandler } from './aplication/command/handler/create-shopping-handler';
import { DeleteShoppingHandler } from './aplication/command/handler/delete-shopping-handler';
import { UpdateShoppingHandler } from './aplication/command/handler/update-shopping-handler';
import { GetShoppingByIdHandler } from './aplication/query/handler/get-shopping-by-id-query-handler';
import { GetShoppingHandler } from './aplication/query/handler/get-shopping-query-handler';
import { ViewInventory } from 'src/core/shared/views/inventory-view';
import { GetUserView } from 'src/core/shared/views/user-views';
import { ShoppingRepository } from './infrestructure/repositories/shopping-repository';
const commands = [
  CreateShoppingHandler,
  DeleteShoppingHandler,
  UpdateShoppingHandler
];
const queries = [
  GetShoppingByIdHandler,
  GetShoppingHandler
]

@Module({
  imports: [
    TypeOrmModule.forFeature([Shopping, UserLogEntity, ViewShopping, ViewInventory, GetLogView, GetUserView])
  ],
  controllers: [ShoppingController],
  providers: [
    ShoppingRepository,
    ShoppingService,
    UserLogRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],

})
export class ShoppingModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit() {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  
