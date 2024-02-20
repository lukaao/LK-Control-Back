import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CadastrarProdutodto } from './dto/produto/cadastrar-produto.dto';
import { AtualizarProdutodto } from './dto/produto/atualizar-produto.dto';
import { BuscarProdutoDto } from './dto/produto/buscar-produto.dto';
import { ListarProdutoDto } from './dto/produto/listar-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastra(body: CadastrarProdutodto, jwt: string) {
    try {
      const cat = await this.prisma.categoria.findFirst({
        where: { DESCRICAO: body.CATEGORIA },
      });
      if (!cat) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      const codigo = await this.prisma.produto.findFirst({
        where: {
          CODIGO: body.CODIGO,
        },
      });
      if (codigo) {
        throw new HttpException(
          'Codigo já cadastrado para outro produto',
          HttpStatus.AMBIGUOUS,
        );
      }

      const cadastra = await this.prisma.produto.create({
        data: {
          DESCRICAO: body.DESCRICAO,
          CODCAT: cat.CODCAT,
          CODIGO: body.CODIGO,
        },
      });
      return cadastra;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async atualiza(body: AtualizarProdutodto, jwt: string) {
    try {
      const busca = await this.prisma.produto.findFirst({
        where: { CODPROD: body.CODPROD },
      });
      if (!busca) {
        throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
      }

      const cat = await this.prisma.categoria.findFirst({
        where: { DESCRICAO: body.CATEGORIA },
      });
      if (!cat) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      if (body.CODIGO) {
        const codigo = await this.prisma.produto.findFirst({
          where: {
            CODIGO: body.CODIGO,
            CODCAT: cat.CODCAT,
          },
        });
        if (codigo.CODPROD !== busca.CODPROD) {
          throw new HttpException(
            'Codigo já cadastrado para outro produto',
            HttpStatus.AMBIGUOUS,
          );
        }
      }

      const cadastra = await this.prisma.produto.update({
        where: { CODPROD: busca.CODPROD },
        data: {
          DESCRICAO: body.DESCRICAO,
          CODCAT: cat.CODCAT,
          CODIGO: body.CODIGO,
          STATUS: body.STATUS,
        },
      });
      return cadastra;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async buscar(body: BuscarProdutoDto, jwt: string) {
    try {
      const busca = await this.prisma.produto.findFirst({
        where: { CODPROD: body.CODPROD },
        include: { CATEGORIA: true },
      });
      if (!busca) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      return busca;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async listar(body: ListarProdutoDto, jwt: string) {
    try {
      if (body.CATEGORIA) {
        const cat = await this.prisma.categoria.findFirst({
          where: { DESCRICAO: body.CATEGORIA },
        });
        if (!cat) {
          throw new HttpException(
            'Categoria não encontrada',
            HttpStatus.NOT_FOUND,
          );
        }
        const lista = await this.prisma.produto.findMany({
          where: { STATUS: true, CODCAT: cat.CODCAT },
          include: { CATEGORIA: true },
        });
        return lista;
      }
      const lista = await this.prisma.produto.findMany({
        where: { STATUS: true },
        include: { CATEGORIA: true },
      });
      return lista;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
