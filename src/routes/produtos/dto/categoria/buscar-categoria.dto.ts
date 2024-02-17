import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuscarCategoriaDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  CODCAT: number;
}
