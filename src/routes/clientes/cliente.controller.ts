import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { ClienteDto } from '../aluguel/dto/cliente.dto';

@Controller('cliente')
@ApiTags('Cliente')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post('/cadastrar')
  cadastrar(@Req() request: Request, @Body() body: ClienteDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.clienteService.cadastrar(body, token);
  }

  @Get('/buscar')
  buscar(@Req() request: Request, @Query() body: any) {
    const token = request.headers.authorization.split(' ')[1];
    return this.clienteService.listar(body, token);
  }
}
