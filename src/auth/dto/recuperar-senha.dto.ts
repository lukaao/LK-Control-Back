import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RecuperarSenhaDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  USUARIO: string;
}
