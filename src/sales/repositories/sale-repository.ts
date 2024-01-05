import { Injectable } from "@nestjs/common";
import { IBaseRepository } from "src/core/shared/interfaces/base-repository-interface";
import { Sale } from "../entities/sale-entity";
import { SearchSaleDto } from "../dto/search-sale-dto";
import { CreateSaleDto } from "../dto/create-sale-dto";
import { Pagination, IPaginationMeta } from "nestjs-typeorm-paginate";
import { Repository, UpdateResult } from "typeorm";
import { ViewInventory } from "src/core/shared/views/inventory-view";
import { InvalidAmountProduct, InvalidCreateSale, InventoryNotFound, NotUpdateSaleException, SaleNotFound } from "../sale-exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { Inventory } from "src/inventory/infrestructure/entities/inventory-entity";
import { UpdateSaleDto } from "../dto/update-sale-dto";
import { QueryBuilderParamHelper } from "src/core/shared/helpers/builder-helper";
import { SaleView } from "src/core/shared/views/sale-view";

@Injectable()
export class SaleRepository implements IBaseRepository<Sale, SearchSaleDto, CreateSaleDto>   {

    @InjectRepository(Inventory)
    private readonly inventory_repository: Repository<Inventory>;
    @InjectRepository(Sale)
    private readonly sale_repository: Repository<Sale>;
    @InjectRepository(ViewInventory)
    private readonly inventory_view: Repository<ViewInventory>;
    @InjectRepository(SaleView)
    private readonly sale_view: Repository<SaleView>;

    async create(dto: CreateSaleDto) {
        const inventory = await this.inventory_view
        .findOneBy({product_id: dto.id_product});
        console.log(inventory)
        this.validateToCreate(inventory, dto.quantity);
        const new_quantity = inventory.quantity - dto.quantity;    
        const sale = await this.save(dto, inventory.price);
        await this.updateInventory(inventory.id, new_quantity);
        if (new_quantity <= inventory.reorder_point) {
          return {
            message:"Has re-order point to product: " + inventory.product_name,
            dto
          }
        }
        return dto;
      }
    insert(dto: CreateSaleDto): Promise<Sale> {
        return this.create(dto) as any
    }
    update<T extends CreateSaleDto>(dto: UpdateSaleDto): Promise<Sale | CreateSaleDto> {
        throw new NotUpdateSaleException();
    }
    findByDto(dto: SearchSaleDto): Promise<Pagination<any, IPaginationMeta>> {
        return QueryBuilderParamHelper.buildWithPaginate< SearchSaleDto, SaleView>(
            this.sale_view.createQueryBuilder("s"),
            dto,
            {
                page:dto.page,
                limit:dto.limit
            }
        )
    }
    async findById(id: number){
        const sale = await this.sale_view.findBy({id})
        if (!sale) throw new SaleNotFound()
        return sale
    }
    existsById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async softDelete(id: number): Promise<void | UpdateResult> {
        return await this.sale_repository.softDelete({id})
    }

    private validateToCreate(inventory: ViewInventory, quantity: number) {
        if (!inventory) throw new InventoryNotFound();
        if (inventory.quantity < quantity) throw new InvalidAmountProduct();
      }
    
      private async updateInventory(id: number, quantity:number) {
        await this.inventory_repository
        .update(
          id, 
          {
            quantity
          }
        );
      }
    
      private async save(dto: CreateSaleDto, price: number){
        dto.total_amount = dto.quantity * price;
        const sale = await this.sale_repository.save(
          this.sale_repository.create(dto)
        )
        if (!sale) throw new InvalidCreateSale();
        return sale;
      }

} 