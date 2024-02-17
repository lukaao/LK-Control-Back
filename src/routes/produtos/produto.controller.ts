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
import { CategoriaService } from './categoria.service';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CadastrarCategoriaDto } from './dto/categoria/cadastrar-categoria.dto';
import { AtualizarCategoriaDto } from './dto/categoria/atualiza-categoria.dto';
import { BuscarCategoriaDto } from './dto/categoria/buscar-categoria.dto';
import { ListarStatusDto } from './dto/listar-status.dto';
import { ProdutoService } from './produto.service';
import { CadastrarProdutodto } from './dto/produto/cadastrar-produto.dto';
import { AtualizarProdutodto } from './dto/produto/atualizar-produto.dto';
import { BuscarProdutoDto } from './dto/produto/buscar-produto.dto';
import { ListarProdutoDto } from './dto/produto/listar-produto.dto';

@Controller('produto')
@ApiTags('Produto')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ProdutosController {
  constructor(
    private readonly categoriaService: CategoriaService,
    private readonly produtoService: ProdutoService,
  ) {}

  @Post('/cadastrar')
  cadastrar(@Req() request: Request, @Body() body: CadastrarProdutodto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.produtoService.cadastra(body, token);
  }
  @Patch('/atualizar')
  atualizar(@Req() request: Request, @Body() body: AtualizarProdutodto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.produtoService.atualiza(body, token);
  }

  @Get('/buscar')
  buscar(@Req() request: Request, @Query() body: BuscarProdutoDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.produtoService.buscar(body, token);
  }

  @Get('/listar')
  listar(@Req() request: Request, @Query() body: ListarProdutoDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.produtoService.listar(body, token);
  }
  ///////////////////////////////////////////////////////////////////////////////

  @Post('/cadastrar/categoria')
  cadastrarCategoria(
    @Req() request: Request,
    @Body() body: CadastrarCategoriaDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    return this.categoriaService.cadastra(body, token);
  }
  @Patch('/atualizar/categoria')
  atualizarCategoria(
    @Req() request: Request,
    @Body() body: AtualizarCategoriaDto,
  ) {
    const token = request.headers.authorization.split(' ')[1];
    return this.categoriaService.atualiza(body, token);
  }

  @Get('/buscar/categoria')
  buscarCategoria(@Req() request: Request, @Query() body: BuscarCategoriaDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.categoriaService.buscar(body, token);
  }

  @Get('/listar/categoria')
  listarCategoria(@Req() request: Request, @Query() body: ListarStatusDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.categoriaService.listar(body, token);
  }
}
