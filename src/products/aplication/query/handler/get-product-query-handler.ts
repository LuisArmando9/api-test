import { ProductService } from "src/products/domain/services/product-service";
import { GetProductByDtoQuery } from "../implementation/get-product-query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetProductByDtoQuery)
export class GetProductsHandler implements IQueryHandler<GetProductByDtoQuery> {
  constructor(private readonly productService: ProductService) {}

  public async execute(command: GetProductByDtoQuery) {
    return await this.productService.getByDto(command.dto, command.userId);
  }
}