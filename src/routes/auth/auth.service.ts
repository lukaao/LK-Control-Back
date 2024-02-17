import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { TokenDados } from 'src/types/token.dto';
import { TrocarSenhaDto } from './dto/trocar-senha.dto';
import { RecuperarSenhaDto } from './dto/recuperar-senha.dto';
import { decode } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async login(body: LoginDto) {
    try {
      const busca = await this.prisma.login.findFirst({});
      if (busca) {
        if (body.USUARIO === busca.USUARIO && body.SENHA === busca.SENHA) {
          const token = await this.assinaToken({
            USUARIO: body.USUARIO,
          });
          return { token };
        } else {
          throw new HttpException(
            'Usuario ou senha incorretos',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const primeiroUsu = await this.prisma.login.create({
        data: { USUARIO: body.USUARIO, SENHA: body.SENHA },
      });

      const token = await this.assinaToken({
        USUARIO: body.USUARIO,
      });
      return { token };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async recuperarSenha(body: RecuperarSenhaDto) {
    try {
      const busca = await this.prisma.login.findFirst({
        where: { USUARIO: body.USUARIO },
      });
      if (busca) {
        return busca;
      } else {
        throw new HttpException(
          'Usuario informado incorretamente',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async trocarSenha(body: TrocarSenhaDto, jwt: string) {
    try {
      const token: TokenDados = decode(jwt);
      const busca = await this.prisma.login.findFirst({
        where: { USUARIO: token.USUARIO },
      });
      if (busca) {
        return await this.prisma.login.update({
          where: { CODUSER: busca.CODUSER },
          data: {
            SENHA: body.SENHA,
          },
        });
      } else {
        throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async assinaToken(args: { USUARIO: string }) {
    const payload = args;
    return await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: 'freela',
    });
  }
}
