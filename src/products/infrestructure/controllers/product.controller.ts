import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductDto } from '../dtos/product.dto';
import { CreateProductCommand } from 'src/products/aplication/command/implementation/create.product.commant';
import { UpdateProductCommand } from 'src/products/aplication/command/implementation/update.product.command';
import { DeleteProductCommand } from 'src/products/aplication/command/implementation/delete.product.command';
import { SearchProductDto } from '../dtos/search.product.dto';
import { GetProductByDtoQuery } from 'src/products/aplication/query/implementation/get.product.query';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product.entity';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth.guard';
import { IApiRequest } from 'src/core/shared/interfaces/request.interface';


@ApiTags('Products')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("products")
export class ProductController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({ status: 200, description: 'Create Product', type: ProductEntity })
  async create(@Body() dto: ProductDto, @Req() req: IApiRequest){
    dto.userId = req.user.id;
    return await this.commandBus.execute(new CreateProductCommand(dto))
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({ status: 200, description: 'Update Product', type: ProductEntity})
  @ApiParam({ example: 3, name: "id" })
  async update(@Body() dto: ProductDto, @Param("id") id: number, @Req() req: IApiRequest){
    dto.userId = req.user.id;
    return await this.commandBus.execute(new UpdateProductCommand(dto))
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete Product' })
  @ApiResponse({ status: 200, description: 'soft delete product' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return await this.commandBus.execute(new DeleteProductCommand(id, req.user.id));
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list product Product' })
  @ApiResponse({ status: 200, description: 'get list delete product', type:[ProductEntity] })
  async getByDto(@Query() dto: SearchProductDto, @Req() req: IApiRequest){
    return await this.queryBus.execute(new GetProductByDtoQuery(dto, req.user.id));
  }
}
