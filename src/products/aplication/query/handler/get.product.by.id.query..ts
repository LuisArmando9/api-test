import { ProductService } from "src/products/domain/services/product.service";
import { GetProductByDtoQuery } from "../implementation/get.product.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductByIdQuery } from "../implementation/get.product.by.id.query";

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery> {
  constructor(private readonly productService: ProductService) {}

  public async execute(command: GetProductByIdQuery) {
    return await this.productService.getById(command.id);
  }
}