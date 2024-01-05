import { ProductService } from "src/products/domain/services/product-service";
import { GetInventoryByDtoQuery } from "../implementation/get-inventory-query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InventoryService } from "src/inventory/domain/services/inventory-service";

@QueryHandler(GetInventoryByDtoQuery)
export class GetInventoryHandler implements IQueryHandler<GetInventoryByDtoQuery> {
  constructor(private readonly service: InventoryService) {}

  public async execute(command: GetInventoryByDtoQuery) {
    return await this.service.getByDto(command.dto, command.user_id);
  }
}