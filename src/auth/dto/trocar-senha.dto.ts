import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TrocarSenhaDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  SENHA: string;
}
