import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { isNotEmpty } from "src/core/shared/utlis/lodash-utils";
import { ProductNotFoundException } from "src/products/domain/exceptions/product-exceptions";
import { paginate, paginateRaw } from "nestjs-typeorm-paginate";
import { IBaseRepository } from "src/core/shared/interfaces/base-repository-interface";
import { GetProductView } from "src/core/shared/views/produc-views";
import { GetBrandView } from "src/core/shared/views/branch-views";
import { BrandNotFoundException } from "src/brand/domain/services/exceptions/brand-exceptions";
import { ViewInventory } from "src/core/shared/views/inventory-view";
import { Inventory } from "../entities/inventory-entity";
import { SearchInventoryDto } from '../dtos/search-invetory-dto';
import { CreateInventoryDto } from '../dtos/create-inventory-dto';
import { UpdateInventoryDto } from '../dtos/update-inventory-dto';
import { ViewSupplier } from 'src/core/shared/views/supplier-view';
import { QueryBuilderParamHelper } from 'src/core/shared/helpers/builder-helper';
import { SupplierNotFoundException } from 'src/supplier/domain/services/exceptions/supplier-exceptions';


export class InventoryRepository implements IBaseRepository<Inventory, SearchInventoryDto, CreateInventoryDto>  {
    /**
     * PRIVATE INJECT REPOSITORIES
     */
    //Inventory entity
    @InjectRepository(Inventory) 
    private readonly inventoryRepository: Repository<Inventory>;
    //Inventory view
    @InjectRepository(ViewInventory) 
    private readonly viewInventory: Repository<ViewInventory>;
    @InjectRepository(GetProductView) 
    private readonly viewProduct: Repository<GetProductView>;
    @InjectRepository(ViewSupplier) 
    private readonly viewSupplier: Repository<ViewSupplier>;
     /**
     * END INJECT PROPERTIES
     */
   
    findById(id: number) {
        return this.viewInventory.findOneBy({id});
    }

    async insert(dto: CreateInventoryDto) {
        await this.validateToInsert(dto.id_product)
        const entity = this.inventoryRepository.create(dto);
        return this.inventoryRepository.save(entity);
    }

    async update(dto: UpdateInventoryDto) {
        const inventory = await this.viewInventory.findOneBy({id:dto.id});
        if (inventory) {
            const id = dto.id;
            delete dto.id;
            delete dto.user_id;
            await this.inventoryRepository.update(id, dto);
            return inventory as any;
        }
        throw new ProductNotFoundException()
    }

    findByDto(dto: SearchInventoryDto) {
        const qb = this.viewInventory.createQueryBuilder("p");
        return QueryBuilderParamHelper.buildWithPaginate<SearchInventoryDto, ViewInventory>(
            qb,
            dto,
            {
                page: dto.page,
                limit: dto.limit
            }
        );
    }

    async existsById(id: number) {
        const count = await this.viewInventory.count({where:{id: Number(id)}});
        return count > 0;
    }

    softDelete(id: number) {
        return this.inventoryRepository.softDelete(id);
    }

    private async validateToInsert(product_id: number) {
        const total_products = await this.viewProduct.countBy({id:product_id})
        if (!total_products) throw new ProductNotFoundException()

    }

}