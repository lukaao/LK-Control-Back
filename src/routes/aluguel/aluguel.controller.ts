import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AluguelService } from './aluguel.service';
import { CadastrarAluguelDto } from './dto/cadastrar-aluguel.dto';
import { AtualizarAluguelDto } from './dto/atualizar-aluguel.dto';
import { BuscarAluguelDto } from './dto/buscar-aluguel.dto';
import { ListarStatusDto } from './dto/listar-status.dto';
import { FaturarDto } from './dto/faturar-aluguel.dto';

@Controller('aluguel')
@ApiTags('Aluguel')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class AluguelController {
  constructor(private readonly aluguelService: AluguelService) {}

  @Post('/cadastrar')
  cadastrar(@Req() request: Request, @Body() body: CadastrarAluguelDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.cadastra(body, token);
  }
  @Patch('/atualizar')
  atualizar(@Req() request: Request, @Body() body: AtualizarAluguelDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.atualiza(body, token);
  }

  @Get('/buscar')
  buscar(@Req() request: Request, @Query() body: BuscarAluguelDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.buscar(body, token);
  }

  @Get('/remover')
  remover(@Req() request: Request, @Query() body: BuscarAluguelDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.deletar(body, token);
  }

  @Get('/listar')
  listar(@Req() request: Request, @Query() body: ListarStatusDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.listar(body, token);
  }
  ///////////////////////////////////////////////////////////////////////////////

  @Post('/faturar')
  cadastrarfat(@Req() request: Request, @Body() body: FaturarDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.faturar(body, token);
  }

  @Get('/buscar/faturados')
  buscarFat(@Req() request: Request, @Query() body: any) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.buscarFaturado(body, token);
  }
  @Get('/listar/faturados')
  listarFat(@Req() request: Request, @Query() body: any) {
    const token = request.headers.authorization.split(' ')[1];
    return this.aluguelService.listarFaturado(body, token);
  }
}
