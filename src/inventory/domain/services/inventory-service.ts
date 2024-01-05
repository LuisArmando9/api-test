import { Injectable } from '@nestjs/common';
import { InventoryAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import {  InvalidInfoInventoryException, InventoryNotFoundException } from '../exceptions/inventory-exceptions';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { ProductEntity } from 'src/products/infrestructure/entities/product-entity';
import { InventoryRepository } from 'src/inventory/infrestructure/repositories/inventory.repository';
import { Inventory } from 'src/inventory/infrestructure/entities/inventory-entity';
import { SearchInventoryDto } from 'src/inventory/infrestructure/dtos/search-invetory-dto';
import { CreateInventoryDto } from 'src/inventory/infrestructure/dtos/create-inventory-dto';


@Injectable()
export class InventoryService extends BaseRepository<Inventory, SearchInventoryDto, CreateInventoryDto > {
    constructor(
        private inventory_repository: InventoryRepository,
        private log_repository: UserLogRepository
    ) { 
        super(
            log_repository, 
            inventory_repository, 
            InventoryAction, {
            invalid_data: new InvalidInfoInventoryException(),
            not_found: new InventoryNotFoundException()
        });

    }
}
