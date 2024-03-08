import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FaturarDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  CODALU: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  DATAFATURADO: Date;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  PRECOFINAL: number;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  CUSTO: number;
}
