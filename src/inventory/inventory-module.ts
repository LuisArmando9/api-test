import { Module, OnModuleInit } from '@nestjs/common';
import { InventoryService } from './domain/services/inventory-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetInventoryHandler } from './aplication/query/handler/get-inventory-query-handler';
import { GetInventoryByIdHandler } from './aplication/query/handler/get-inventory-by-id-query.';
import { GetProductView } from 'src/core/shared/views/produc-views';
import { GetLogView } from 'src/core/shared/views/log-views';
import { GetBrandView } from 'src/core/shared/views/branch-views';
import { InventoryController } from './infrestructure/controllers/inventory-controller';
import { InventoryRepository } from './infrestructure/repositories/inventory.repository';
import { ProductEntity } from 'src/products/infrestructure/entities/product-entity';
import { Inventory } from './infrestructure/entities/inventory-entity';
import { ViewInventory } from 'src/core/shared/views/inventory-view';
import { ViewSupplier } from 'src/core/shared/views/supplier-view';
import { CreateInventoryHandler } from './aplication/command/handler/create-inventory-handler';
import { UpdateInventoryHandler } from './aplication/command/handler/update-inventory-handler';
import { DeleteInventoryHandler } from './aplication/command/handler/delete-inventory-handler';
import { ProductService } from 'src/products/domain/services/product-service';
import { ProductRepository } from 'src/products/infrestructure/repositories/product-repository';
import { FileService } from 'src/core/shared/services/file-service';
import { GetUserView } from 'src/core/shared/views/user-views';
const commands = [
  CreateInventoryHandler,
  UpdateInventoryHandler,
  DeleteInventoryHandler
];
const queries = [
    GetInventoryByIdHandler,
    GetInventoryHandler
]

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Inventory,
      ViewInventory,
      ViewSupplier, 
      UserLogEntity, 
      GetProductView, 
      GetLogView,
      ProductEntity,
      GetBrandView,
      GetUserView
    ])
  ],
  controllers: [InventoryController],
  providers: [
    FileService,
    ProductService, 
    UserLogRepository,
    InventoryRepository,
    InventoryService,
    ProductRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],
})
export class InventoryModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit(): any {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  
