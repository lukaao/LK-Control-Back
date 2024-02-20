import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { BuscarCategoriaDto } from './dto/categoria/buscar-categoria.dto';
import { AtualizarCategoriaDto } from './dto/categoria/atualiza-categoria.dto';
import { CadastrarCategoriaDto } from './dto/categoria/cadastrar-categoria.dto';
import { ListarStatusDto } from './dto/listar-status.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastra(body: CadastrarCategoriaDto, jwt: string) {
    try {
      const busca = await this.prisma.categoria.findFirst({
        where: { DESCRICAO: body.DESCRICAO },
      });
      if (busca) {
        throw new HttpException(
          'Categoria já cadastrada',
          HttpStatus.AMBIGUOUS,
        );
      }

      const cadastra = await this.prisma.categoria.create({
        data: { DESCRICAO: body.DESCRICAO },
      });
      return cadastra;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async atualiza(body: AtualizarCategoriaDto, jwt: string) {
    try {
      const busca = await this.prisma.categoria.findFirst({
        where: { CODCAT: body.CODCAT },
      });
      if (!busca) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      const duplicidade = await this.prisma.categoria.findFirst({
        where: { DESCRICAO: body.DESCRICAO },
      });
      if (duplicidade) {
        if (duplicidade.CODCAT !== busca.CODCAT) {
          throw new HttpException(
            'Outra categoria já cadastrada com essa descrição',
            HttpStatus.AMBIGUOUS,
          );
        }
      }
      const atualiza = await this.prisma.categoria.update({
        where: { CODCAT: busca.CODCAT },
        data: { DESCRICAO: body.DESCRICAO, STATUS: body.STATUS },
      });
      return atualiza;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async buscar(body: BuscarCategoriaDto, jwt: string) {
    try {
      const busca = await this.prisma.categoria.findFirst({
        where: { CODCAT: body.CODCAT },
        include: { PRODUTOS: true },
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

  async listar(body: ListarStatusDto, jwt: string) {
    try {
      if (body.STATUS == 'true') {
        const lista = await this.prisma.categoria.findMany({
          where: { STATUS: true },
          include: { PRODUTOS: true },
        });
        return lista;
      } else if (body.STATUS == 'false') {
        const lista = await this.prisma.categoria.findMany({
          where: { STATUS: false },
          include: { PRODUTOS: true },
        });
        return lista;
      } else {
        const lista = await this.prisma.categoria.findMany({
          include: { PRODUTOS: true },
        });
        return lista;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
