import { Module } from '@nestjs/common';
import { ReportingService } from './reporting.service';
import { ReportingController } from './reporting.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetLogView } from 'src/core/shared/views/log-views';
import { GetUserView } from 'src/core/shared/views/user-views';
import { ViewProductInventory } from 'src/core/shared/views/product-inventory-view';

@Module({
  imports: [
    TypeOrmModule.forFeature([GetLogView, GetUserView, ViewProductInventory]),
  ],
  controllers: [ReportingController],
  providers: [ReportingService],
})
export class ReportingModule {}
