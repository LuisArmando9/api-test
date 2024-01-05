import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({example:49})
  @IsDefined()
  @IsNumber()
  quantity: number;

  @ApiProperty({example:5})
  @IsDefined()
  @IsNumber()
  id_product: number;


  @ApiHideProperty()
  user_id: number;
}
