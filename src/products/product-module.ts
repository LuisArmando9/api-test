import { Module, OnModuleInit } from '@nestjs/common';
import { ProductController } from './infrestructure/controllers/product-controller';
import { ProductService } from './domain/services/product-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrestructure/entities/product-entity';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { ProductRepository } from './infrestructure/repositories/product-repository';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductHandler } from './aplication/command/handler/create-product-handler';
import { DeleteProductHandler } from './aplication/command/handler/delete-product-handler';
import { UpdateProductHandler } from './aplication/command/handler/update-product-handler';
import { GetProductsHandler } from './aplication/query/handler/get-product-query-handler';
import { GetProductByIdHandler } from './aplication/query/handler/get-product-by-id-query.';
import { GetProductView } from 'src/core/shared/views/produc-views';
import { GetLogView } from 'src/core/shared/views/log-views';
const commands = [
    UpdateProductHandler,
    CreateProductHandler,
    DeleteProductHandler
];
const queries = [
    GetProductsHandler,
    GetProductByIdHandler
]

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, UserLogEntity, GetProductView, GetLogView])
  ],
  controllers: [ProductController],
  providers: [ProductService, 
    UserLogRepository, 
    ProductRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],
})
export class ProductModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit(): any {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  
