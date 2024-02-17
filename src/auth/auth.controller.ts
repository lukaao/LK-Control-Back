import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RecuperarSenhaDto } from './dto/recuperar-senha.dto';
import { TrocarSenhaDto } from './dto/trocar-senha.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
  @Post('recuperar')
  recuperarSenha(@Body() body: RecuperarSenhaDto) {
    return this.authService.recuperarSenha(body);
  }
  @Post('trocar')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  trocarSenha(@Req() request: Request, @Body() body: TrocarSenhaDto) {
    const token = request.headers.authorization.split(' ')[1];
    return this.authService.trocarSenha(body, token);
  }
}
