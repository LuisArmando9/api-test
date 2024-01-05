import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { Supplier } from '../entities/supplier-entity';
import { CreateSupplierDto } from '../dtos/create-supplier-dto';
import { CreateSupplierCommand } from 'src/supplier/aplication/command/implementation/create-supplier-commant';
import { UpdateSupplierDto } from '../dtos/update-supplier-dto';
import { UpdateSupplierCommand } from 'src/supplier/aplication/command/implementation/update-supplier-command';
import { ViewSupplier } from 'src/core/shared/views/supplier-view';
import { DeleteSupplierCommand } from 'src/supplier/aplication/command/implementation/delete-supplier-command';
import { SearchSupplierDto } from '../dtos/search-supplier.dto';
import { GetSupplierQuery } from 'src/supplier/aplication/query/implementation/get-supplier-query';
import { GetSupplierByIdQuery } from 'src/supplier/aplication/query/implementation/get-supplier-by-id-query';


@ApiTags('Supplier')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@Controller("supplier")
export class SupplierController {
  constructor(private readonly command_bus: CommandBus, private readonly query_bus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create supplier' })
  @ApiResponse({ status: 200, description: 'Create supplier', type: Supplier })
  async create(@Body() dto: CreateSupplierDto, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    return await this.command_bus.execute(new CreateSupplierCommand(dto))
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update supplier' })
  @ApiResponse({ status: 200, description: 'Update supplier', type: ViewSupplier})
  @ApiParam({ example: 3, name: "id" })
  async update(@Body() dto: UpdateSupplierDto, @Param("id") id: number, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    dto.id = id;
    return await this.command_bus.execute(new UpdateSupplierCommand(dto))
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete supplier' })
  @ApiResponse({ status: 200, description: 'soft delete supplier' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return await this.command_bus.execute(new DeleteSupplierCommand(id, req.user.id));
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list  supplier' })
  @ApiResponse({ status: 200, description: 'get list supplier', type:[ViewSupplier] })
  async getByDto(@Query() dto: SearchSupplierDto, @Req() req: IApiRequest){
    return await this.query_bus.execute(new GetSupplierQuery(dto, req.user.id));
  }

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get supplier  by id' })
  @ApiResponse({ status: 200, description: 'supplier', type: ViewSupplier })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number){
    return await this.query_bus.execute(new GetSupplierByIdQuery(Number(id)));
  }
}
