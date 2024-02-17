import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class AtualizarProdutodto {
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsNumber()
  CODPROD: number;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  CATEGORIA: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  CODIGO: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  DESCRICAO: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  STATUS: boolean;
}
