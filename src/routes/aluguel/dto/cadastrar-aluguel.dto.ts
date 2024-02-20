import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CadastrarAluguelDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  CODPROD: number;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  DATAINICIO: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  DATAFINAL: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  ENDERECO: string;
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  PRECOINICIAL: number;

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
