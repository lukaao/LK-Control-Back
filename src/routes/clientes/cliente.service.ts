import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { ClienteDto } from './dto/cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(body: ClienteDto, jwt: string) {
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

  async listar(body: any, jwt: string) {
    try {
      const cliente = await this.prisma.cliente.findMany({
        where: {},
        include: { ALUGUEIS: { include: { PRODUTO: true } } },
      });

      return cliente;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
