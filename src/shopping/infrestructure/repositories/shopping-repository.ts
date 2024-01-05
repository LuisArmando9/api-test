import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, IPaginationMeta } from 'nestjs-typeorm-paginate';
import { QueryBuilderParamHelper } from 'src/core/shared/helpers/builder-helper';
import { IBaseRepository } from 'src/core/shared/interfaces/base-repository-interface';
import { BaseRepository } from 'src/core/shared/repositories/base-repositoy';
import { ViewInventory } from 'src/core/shared/views/inventory-view';
import { ViewShopping } from 'src/core/shared/views/shopping-view';
import { CreateShoppingDto } from 'src/shopping/infrestructure/dtos/create-shopping-dto';
import { SearchShoppingDto } from 'src/shopping/infrestructure/dtos/search-shopping.dto';
import { Shopping } from 'src/shopping/infrestructure/entities/shopping-entity';
import { Repository, UpdateResult } from 'typeorm';
import { ShoppingNotFoundException } from '../../domain/services/exceptions/shopping-exceptions';
import { InventoryNotFoundException } from 'src/inventory/domain/exceptions/inventory-exceptions';
import { UpdateShoppingDto } from 'src/shopping/infrestructure/dtos/update-shopping-dto';

@Injectable()
export class ShoppingRepository
  implements IBaseRepository<Shopping, SearchShoppingDto, CreateShoppingDto>
{
  @InjectRepository(Shopping)
  private readonly Shopping_repository: Repository<Shopping>;
  @InjectRepository(ViewShopping)
  private readonly view_Shopping: Repository<ViewShopping>;

  @InjectRepository(ViewInventory)
  private readonly view_inventory: Repository<ViewInventory>;
  async findById(id: number) {
    const Shopping = await this.view_Shopping.findOneBy({
      id,
    });
    if (!Shopping) throw new ShoppingNotFoundException();
    return Shopping;
  }

  async insert(dto: CreateShoppingDto) {
    const inventory = await this.view_inventory.countBy({
      id: dto.inventory_id,
    });
    if (!inventory) throw new InventoryNotFoundException();
    const entity = this.Shopping_repository.create(dto);
    return this.Shopping_repository.save(entity);
  }

  async update(dto: UpdateShoppingDto) {
    const Shopping = await this.Shopping_repository.findOneBy({ id: dto.id });
    if (Shopping) {
      const id = dto.id;
      delete dto.id;
      delete dto.user_id
      await this.Shopping_repository.update(id, dto);
      return Shopping;
    }
    throw new ShoppingNotFoundException();
  }

  findByDto(dto: SearchShoppingDto) {
    const qb = this.view_Shopping.createQueryBuilder('b');
    return QueryBuilderParamHelper.buildWithPaginate<
      SearchShoppingDto,
      ViewShopping
    >(qb, dto, {
      page: dto.page,
      limit: dto.limit,
    });
  }

  softDelete(id: number) {
    return this.Shopping_repository.softDelete(id);
  }

  existsById(id: number): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
