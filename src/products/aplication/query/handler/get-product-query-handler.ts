import { ProductService } from "src/products/domain/services/product-service";
import { GetProductByDtoQuery } from "../implementation/get-product-query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetProductByDtoQuery)
export class GetProductsHandler implements IQueryHandler<GetProductByDtoQuery> {
  constructor(private readonly product_service: ProductService) {}

  public async execute(command: GetProductByDtoQuery) {
    return await this.product_service.getByDto(command.dto, command.user_id);
  }
}