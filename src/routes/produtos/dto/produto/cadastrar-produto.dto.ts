import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CadastrarProdutodto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  CATEGORIA: string;
  @ApiProperty({
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  CODIGO: string;
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  DESCRICAO: string;
}
