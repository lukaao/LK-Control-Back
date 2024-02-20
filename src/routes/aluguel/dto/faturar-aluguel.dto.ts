import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FaturarDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  CODALU: number;

  @IsNotEmpty()
  @IsDateString()
  DATAFATURADO: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  PRECOFINAL: number;
}
