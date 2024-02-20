import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AtualizarAluguelDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  CODALU: number;
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsDateString()
  DATAINICIO: Date;
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsDateString()
  DATAFINAL: Date;
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  ENDERECO: string;
  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsNumber()
  PRECOINICIAL: number;

  @ApiProperty({
    required: true,
  })
  @IsOptional()
  @IsString()
  CONTATO: string;
}
