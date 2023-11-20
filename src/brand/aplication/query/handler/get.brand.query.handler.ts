import { ProductService } from "src/products/domain/services/product.service";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import BrandService from "src/brand/domain/services/brand.service";
import { GetBrandQuery } from "../implementation/get.brand.query";

@QueryHandler(GetBrandQuery)
export class GetBrandHandler implements IQueryHandler<GetBrandQuery> {
  constructor(private readonly brandService: BrandService) {}

  public async execute(command: GetBrandQuery) {
    return await this.brandService.getByDto(command.dto, command.userId);
  }
}