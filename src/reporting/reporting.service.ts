import { Injectable } from '@nestjs/common';
import { GetLogView } from 'src/core/shared/views/log-views';
import { GetUserView } from 'src/core/shared/views/user-views';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchLogDto } from './dto/search-log-dto';
import { isNotEmpty } from 'class-validator';
import { QueryBuilderParamHelper } from 'src/core/shared/helpers/builder-helper';
import { ViewProductInventory } from 'src/core/shared/views/product-inventory-view';
import { SearchProductInventoryDto } from './dto/search-product-inventory.dto';

@Injectable()
export class ReportingService {
  @InjectRepository(GetLogView)
  private readonly log_view: Repository<GetLogView>;
  @InjectRepository(GetUserView)
  private readonly user: Repository<GetUserView>;
  @InjectRepository(ViewProductInventory)
  private readonly view_product_inventory: Repository<ViewProductInventory>;


  async getByDto(dto: SearchLogDto) {
    const qb = this.log_view
      .createQueryBuilder('l')
      .orderBy('created_at', 'DESC');
    if (isNotEmpty(dto?.action)) {
      const action = dto.action;
      delete dto.action
      qb.andWhere(`l.action LIKE '%${action}%'`)
    }

    return QueryBuilderParamHelper.buildWithPaginate(qb, dto, {
      page: dto.page,
      limit: dto.limit,
    });
  }

  async getProductInventories(dto: SearchProductInventoryDto) {
    const qb = this.view_product_inventory
    .createQueryBuilder('vpi')
    return QueryBuilderParamHelper
    .buildWithPaginate(qb, dto as any, {
      page: dto.page,
      limit: dto.limit,
      withDates:false
    });

  }
}
