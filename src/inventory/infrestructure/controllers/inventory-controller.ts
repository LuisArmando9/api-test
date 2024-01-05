import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Req, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { IApiRequest } from 'src/core/shared/interfaces/request-interface';
import { Inventory } from '../entities/inventory-entity';
import { CreateInventoryDto } from '../dtos/create-inventory-dto';
import { CreateInventoryCommand } from 'src/inventory/aplication/command/implementation/create-inventory-commant';
import { ViewInventory } from 'src/core/shared/views/inventory-view';
import { UpdateInventoryDto } from '../dtos/update-inventory-dto';
import { UpdateInventoryCommand } from 'src/inventory/aplication/command/implementation/update-inventory-command';
import { DeleteInventoryCommand } from 'src/inventory/aplication/command/implementation/delete-inventory-command';
import { SearchInventoryDto } from '../dtos/search-invetory-dto';
import { GetInventoryByIdQuery } from 'src/inventory/aplication/query/implementation/get-inventory-by-id.query';
import { GetInventoryByDtoQuery } from 'src/inventory/aplication/query/implementation/get-inventory-query';


@Controller('inventory')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
@ApiTags('inventory')
export class InventoryController {
  constructor(private readonly command_bus: CommandBus, private readonly query_bus: QueryBus) {}

  @Post("create")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Create Inventory' })
  @ApiResponse({ status: 200, description: 'Create Inventory', type: Inventory })
  @ApiBody({type:CreateInventoryDto})
  async create(@Body() dto: CreateInventoryDto, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    return await this.command_bus.execute(new CreateInventoryCommand(dto))
  }

  @Put(":id")
  @ApiBearerAuth()
  @UseGuards(ApiAuthGuard)
  @ApiOperation({ summary: 'Update Inventory' })
  @ApiResponse({ status: 200, description: 'Update Inventory', type: ViewInventory})
  @ApiParam({ example: 3, name: "id" })
  @ApiBody({type:UpdateInventoryDto})
  async update(@Body() dto: UpdateInventoryDto, @Param("id") id: number, @Req() req: IApiRequest){
    dto.user_id = req.user.id;
    dto.id = id;
    return await this.command_bus.execute(new UpdateInventoryCommand(dto))
  }


  @Delete(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'soft delete Inventory' })
  @ApiResponse({ status: 200, description: 'soft delete Inventory' })
  @ApiParam({ example: 3, name: "id" })
  async delete(@Param("id") id: number, @Req() req: IApiRequest){

    return await this.command_bus.execute(new DeleteInventoryCommand(id, req.user.id));
  }

  @Get()
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get list  Inventory' })
  @ApiResponse({ status: 200, description: 'get list Inventory', type:[ViewInventory] })
  async getByDto(@Query() dto: SearchInventoryDto, @Req() req: IApiRequest){
    return await this.query_bus.execute(new GetInventoryByDtoQuery(dto, req.user.id));
  }

  @Get(":id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get Inventory  by id' })
  @ApiResponse({ status: 200, description: 'Inventory', type: ViewInventory })
  @ApiParam({ example: 3, name: "id" })
  async getById(@Param("id") id: number){
    return await this.query_bus.execute(new GetInventoryByIdQuery(Number(id)));
  }

}
