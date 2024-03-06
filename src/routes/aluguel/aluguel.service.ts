import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CadastrarAluguelDto } from './dto/cadastrar-aluguel.dto';
import { AtualizarAluguelDto } from './dto/atualizar-aluguel.dto';
import { BuscarAluguelDto } from './dto/buscar-aluguel.dto';
import { ListarStatusDto } from './dto/listar-status.dto';
import { ClienteDto } from './dto/cliente.dto';
import { FaturarDto } from './dto/faturar-aluguel.dto';

@Injectable()
export class AluguelService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastra(body: CadastrarAluguelDto, jwt: string) {
    try {
      const produto = await this.prisma.produto.findFirst({
        where: { CODPROD: body.CODPROD },
      });
      if (!produto) {
        throw new HttpException('Produto não encontrada', HttpStatus.NOT_FOUND);
      }

      const aluguel = await this.prisma.aluguel.findFirst({
        where: {
          CODPROD: body.CODPROD,
          STATUS: 1,
        },
      });
      if (aluguel) {
        throw new HttpException(
          'Produto com aluguel em andamento.',
          HttpStatus.CONFLICT,
        );
      }

      const cliente = await this.prisma.cliente.findFirst({
        where: { NOME: body.CLIENTE.toUpperCase() },
      });

      if (cliente) {
        const codcli = await this.prisma.cliente.update({
          where: { CODCLI: cliente.CODCLI },
          data: { CONTATO: body.CONTATO },
        });

        const cadastra = await this.prisma.aluguel.create({
          data: {
            CODPROD: body.CODPROD,
            CODCLI: codcli.CODCLI,
            DATAINICIO: body.DATAINICIO,
            DATAFINAL: body.DATAFINAL,
            ENDERECO: body.ENDERECO,
            PRECOINICIAL: body.PRECOINICIAL,
          },
        });
        await this.prisma.produto.update({
          where: { CODPROD: produto.CODPROD },
          data: { STATUS: 0 },
        });
        return cadastra;
      } else {
        const codcli = await this.prisma.cliente.create({
          data: { NOME: body.CLIENTE.toUpperCase(), CONTATO: body.CONTATO },
        });

        const cadastra = await this.prisma.aluguel.create({
          data: {
            CODPROD: body.CODPROD,
            CODCLI: codcli.CODCLI,
            DATAINICIO: body.DATAINICIO,
            DATAFINAL: body.DATAFINAL,
            ENDERECO: body.ENDERECO,
            PRECOINICIAL: body.PRECOINICIAL,
          },
        });
        await this.prisma.produto.update({
          where: { CODPROD: produto.CODPROD },
          data: { STATUS: 0 },
        });
        return cadastra;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async atualiza(body: AtualizarAluguelDto, jwt: string) {
    try {
      const busca = await this.prisma.aluguel.findFirst({
        where: { CODALU: body.CODALU },
      });
      if (!busca) {
        throw new HttpException('Aluguel não encontrado', HttpStatus.NOT_FOUND);
      }

      if (body.CONTATO) {
        await this.prisma.cliente.update({
          where: { CODCLI: busca.CODCLI },
          data: { CONTATO: body.CONTATO },
        });
      }

      const atualiza = await this.prisma.aluguel.update({
        where: { CODALU: busca.CODALU },
        data: {
          DATAINICIO: body.DATAINICIO,
          DATAFINAL: body.DATAFINAL,
          ENDERECO: body.ENDERECO,
          PRECOINICIAL: body.PRECOINICIAL,
        },
      });
      return atualiza;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async deletar(body: BuscarAluguelDto, jwt: string) {
    try {
      const busca = await this.prisma.aluguel.findFirst({
        where: { CODALU: body.CODALU },
      });
      if (!busca) {
        throw new HttpException('Aluguel não encontrada', HttpStatus.NOT_FOUND);
      }

      const deletar = await this.prisma.aluguel.delete({
        where: { CODALU: body.CODALU },
      });

      return deletar;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async buscar(body: BuscarAluguelDto, jwt: string) {
    try {
      const busca = await this.prisma.aluguel.findFirst({
        where: { CODALU: body.CODALU },
        include: { PRODUTO: true, CLIENTE: true },
      });
      if (!busca) {
        throw new HttpException('Aluguel não encontrada', HttpStatus.NOT_FOUND);
      }

      return busca;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async listar(body: ListarStatusDto, jwt: string) {
    try {
      if (body.STATUS == 'true') {
        const alugueis = await this.prisma.aluguel.findMany({
          where: { STATUS: 1 },
          include: { PRODUTO: true, CLIENTE: true },
        });
        if (!alugueis) {
          throw new HttpException(
            'Categoria não encontrada',
            HttpStatus.NOT_FOUND,
          );
        }

        return alugueis;
      } else if (body.STATUS == 'false') {
        const alugueis = await this.prisma.aluguel.findMany({
          where: { STATUS: 0 },
          include: { PRODUTO: true, CLIENTE: true },
        });
        if (!alugueis) {
          throw new HttpException(
            'Categoria não encontrada',
            HttpStatus.NOT_FOUND,
          );
        }

        return alugueis;
      }

      const alugueis = await this.prisma.aluguel.findMany({
        where: {},
        include: { PRODUTO: true, CLIENTE: true },
      });
      if (!alugueis) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      return alugueis;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async faturar(body: FaturarDto, jwt: string) {
    try {
      const busca = await this.prisma.aluguel.findFirst({
        where: { CODALU: body.CODALU },
      });
      if (!busca) {
        throw new HttpException('Aluguel não encontrada', HttpStatus.NOT_FOUND);
      }

      const atualiza = await this.prisma.aluguel.update({
        where: { CODALU: busca.CODALU },
        data: {
          STATUS: 0,
        },
      });

      await this.prisma.produto.update({
        where: { CODPROD: busca.CODPROD },
        data: { STATUS: 1 },
      });

      const cadastra = await this.prisma.faturado.create({
        data: {
          CODALU: body.CODALU,
          PRECOFINAL: body.PRECOFINAL,
          DATAFATURADO: body.DATAFATURADO,
        },
      });
      return cadastra;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async buscarFaturado(body: any, jwt: string) {
    try {
      const faturado = await this.prisma.faturado.findFirst({
        where: { CODFAT: body.CODFAT },
        include: { ALUGUEL: { include: { PRODUTO: true, CLIENTE: true } } },
      });

      if (!faturado) {
        throw new HttpException(
          'Faturado não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }
      return faturado;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async listarFaturado(body: any, jwt: string) {
    try {
      if (body.INICIO || body.FIM) {
        const dataInicioBody = new Date(body.INICIO);
        dataInicioBody.setHours(0, 0, 0, 0);
        const dataFimBody = new Date(body.FIM);
        dataFimBody.setHours(23, 59, 59, 999);

        const faturados = await this.prisma.faturado.findMany({
          where: { DATAFATURADO: { gte: dataInicioBody, lte: dataFimBody } },
          include: { ALUGUEL: { include: { PRODUTO: true, CLIENTE: true } } },
        });
        return faturados;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async cadUpCliente(body: ClienteDto, jwt: string) {
    try {
      const busca = await this.prisma.cliente.findFirst({
        where: { NOME: body.CLIENTE },
      });
      if (busca) {
        const update = await this.prisma.cliente.update({
          where: { CODCLI: busca.CODCLI },
          data: { NOME: body.CLIENTE, CONTATO: body.CONTATO },
        });
      }

      const cadastra = await this.prisma.cliente.create({
        data: { NOME: body.CLIENTE, CONTATO: body.CONTATO },
      });
      return cadastra;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async listarCliente(body: any, jwt: string) {
    try {
      const cliente = await this.prisma.cliente.findMany({
        where: {},
        include: { ALUGUEIS: true },
      });
      if (!cliente) {
        throw new HttpException(
          'Categoria não encontrada',
          HttpStatus.NOT_FOUND,
        );
      }

      return cliente;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
