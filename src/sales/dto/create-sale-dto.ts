import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';
import { IBaseDto } from 'src/core/shared/interfaces/base-dto-interface';

export class CreateSaleDto implements IBaseDto {
  user_id: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({example:7})
  id_product: number;

  @IsDefined()
  @IsNumber()
  @ApiProperty({example:7})
  quantity: number;

  @ApiHideProperty()
  total_amount: number;
}
