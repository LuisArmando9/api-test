import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ProductDto, UpdateProductDto } from '../dtos/product-dto';
import { CreateProductCommand } from 'src/products/aplication/command/implementation/create-product-commant';
import { UpdateProductCommand } from 'src/products/aplication/command/implementation/update-product-command';
import { DeleteProductCommand } from 'src/products/aplication/command/implementation/delete-product-command';
import { SearchProductDto } from '../dtos/search-product-dto';
import { GetProductByDtoQuery } from 'src/products/aplication/query/implementation/get-product-query';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from '../entities/product-entity';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { GetProductByIdQuery } from 'src/products/aplication/query/implementation/get-product-by-id.query';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags('Products')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("products")
export class ProductController {
  constructor(private readonly command_bus: CommandBus, private readonly query_bus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create Product' })
  @ApiResponse({ status: 200, description: 'Create Product', type: ProductEntity })
  @UseInterceptors(
    FileInterceptor('buffer_file', {
      limits: {
        fileSize: 2097152,
      },
    }),
    ClassSerializerInterceptor,
  )
  @ApiBody({type: ProductDto})
  @ApiConsumes('multipart/form-data') 
  async create(@Body() dto: ProductDto, @Req() req: IApiRequest, @UploadedFile() file: Express.Multer.File){
    console.log(dto);
    console.log(file)
    dto.user_id = req.user.id;
    dto.buffer_file = file;
    return await this.command_bus.execute(new CreateProductCommand(dto))
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update Product' })
  @ApiResponse({ status: 200, description: 'Update Product', type: ProductEntity})
  @ApiParam({ example: 3, name: "id" })
  @UseInterceptors(
    FileInterceptor('buffer_file', {
      limits: {
        fileSize: 2097152,
      },
    }),
    ClassSerializerInterceptor,
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({type: UpdateProductDto})
  async update(@Body() dto: UpdateProductDto, @Param("id") id: number, @Req() req: IApiRequest, @UploadedFile() file: Express.Multer.File){
    dto.user_id = req.user.id;
    dto.id = id;
    dto.buffer_file = file
    return await this.command_bus.execute(new UpdateProductCommand(dto))
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete Product' })
  @ApiResponse({ status: 200, description: 'soft delete product' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return await this.command_bus.execute(new DeleteProductCommand(Number(id), req.user.id));
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list  Products' })
  @ApiResponse({ status: 200, type:[ProductEntity] })
  async getByDto(@Query() dto: SearchProductDto, @Req() req: IApiRequest){
    return await this.query_bus.execute(new GetProductByDtoQuery(dto, req.user.id));
  }

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get product  by id' })
  @ApiResponse({ status: 200, description: 'product', type:ProductEntity })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number): Promise<ProductEntity>{
    return await this.query_bus.execute(new GetProductByIdQuery(Number(id)));
  }
}
