import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ListarProdutoDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  CATEGORIA: string;
}
