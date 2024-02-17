import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from './services/prisma.service';
import { AuthController } from './routes/auth/auth.controller';
import { AuthService } from './routes/auth/auth.service';
import { ProdutoService } from './routes/produtos/produto.service';
import { CategoriaService } from './routes/produtos/categoria.service';
import { ProdutosController } from './routes/produtos/produto.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController, ProdutosController],
  providers: [
    AppService,
    PrismaService,
    JwtService,
    AuthService,
    ProdutoService,
    CategoriaService,
  ],
})
export class AppModule {}
