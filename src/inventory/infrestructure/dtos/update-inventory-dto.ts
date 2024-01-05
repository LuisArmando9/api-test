import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateInventoryDto } from './create-inventory-dto';
import { IsDefined, IsNumber } from 'class-validator';
import { IBaseDto } from 'src/core/shared/interfaces/base-dto-interface';

export class UpdateInventoryDto implements IBaseDto {
  @ApiProperty({ example: 49 })
  @IsDefined()
  @IsNumber()
  quantity: number;

  @ApiHideProperty()
  user_id: number;
  @ApiHideProperty()
  id: number;
}
