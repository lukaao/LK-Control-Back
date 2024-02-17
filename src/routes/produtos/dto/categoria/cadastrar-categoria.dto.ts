import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CadastrarCategoriaDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  DESCRICAO: string;
}
