import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './services/prisma.service';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, AuthController],
  providers: [AppService, PrismaService, JwtService, AuthService],
})
export class AppModule {}
