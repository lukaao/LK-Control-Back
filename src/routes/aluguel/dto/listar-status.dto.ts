import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ListarStatusDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  STATUS: string;
}
