import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ClienteDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  CLIENTE: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  CONTATO: string;
}
