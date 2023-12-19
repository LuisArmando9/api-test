import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { BrandService } from "src/brand/domain/services/brand-service";
import { GetBrandByIdQuery } from "../implementation/get.brand.by.id.query";

@QueryHandler(GetBrandByIdQuery)
export class GetBrandByIdHandler implements IQueryHandler<GetBrandByIdQuery> {
  constructor(private readonly brandService: BrandService) {}

  public async execute(command: GetBrandByIdQuery) {
    return await this.brandService.getById(command.id);
  }
}