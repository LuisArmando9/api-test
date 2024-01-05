import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { Sale } from '../entities/Sale-entity';
import { SalesService } from '../sale-service';
import { CreateSaleDto } from '../dto/create-sale-dto';
import { UpdateSaleDto } from '../dto/update-sale-dto';
import { SaleView } from 'src/core/shared/views/sale-view';
import { SearchSaleDto } from '../dto/search-sale-dto';


@ApiTags('Sales')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("Sale")
export class SaleController {
  constructor(private readonly service: SalesService) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create Sale' })
  @ApiResponse({ status: 200, description: 'Create Sale', type: Sale })
  async create(@Body() dto: CreateSaleDto, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    return await this.service.insert(dto)
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update Sale' })
  @ApiResponse({ status: 200, description: 'Update Sale'})
  @ApiParam({ example: 3, name: "id" })
  async update(@Body() dto: UpdateSaleDto, @Param("id") id: number, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    dto.id = id;
    return await this.service.update(dto as any)
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete Sale' })
  @ApiResponse({ status: 200, description: 'soft delete Sale' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return  await this.service.softDelete(id, req.user.id);
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list  Sale' })
  @ApiResponse({ status: 200, description: 'get list Sale', type:[SaleView] })
  async getByDto(@Query() dto: SearchSaleDto, @Req() req: IApiRequest){
    return await this.service.getByDto(dto, req.user.id);
  }

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get Sale  by id' })
  @ApiResponse({ status: 200, description: 'Sale', type: SaleView })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number){
    return  await this.service.getById(id);
  }
}
