import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { CreateReportingDto } from './dto/create-reporting.dto';
import { UpdateReportingDto } from './dto/update-reporting.dto';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiAuthGuard } from 'src/core/auth/domain/guards/auth-guard';
import { GetLogView } from 'src/core/shared/views/log-views';
import { SearchLogDto } from './dto/search-log-dto';
import { SearchProductInventoryDto } from './dto/search-product-inventory.dto';
import { ViewProductInventory } from 'src/core/shared/views/product-inventory-view';

@Controller('reporting')

@ApiTags('reporting')
@ApiConsumes('Application/json')
@ApiProduces('Application/json')
export class ReportingController {
  constructor(private readonly reporting_service: ReportingService) {}

  @Get("log/:id")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get log  by user id' })
  @ApiResponse({ status: 200, description: 'log', type:GetLogView })
  @ApiParam({ example: 3, name: "id" })
  async getLogs(
    @Param("id") id: number,
    @Query() dto: SearchLogDto
  ){
    dto.user_id = id;
    return await this.reporting_service.getByDto(dto);
  }

  @Get("product/inventories")
  @UseGuards(ApiAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'get product inventories list' })
  @ApiResponse({ status: 200, description: 'log', type:[ViewProductInventory] })
  async getProductInventories(
    @Query() dto: SearchProductInventoryDto
  ){

    return await this.reporting_service.getProductInventories(dto);
  }
}
