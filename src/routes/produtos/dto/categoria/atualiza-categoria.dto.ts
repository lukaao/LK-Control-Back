import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AtualizarCategoriaDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  CODCAT: number;
  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  DESCRICAO: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  STATUS: boolean;
}
