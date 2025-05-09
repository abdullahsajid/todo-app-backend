import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [
    UsersModule,
    TodoModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'your_very_secure_jwt_secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers:[AuthController],
  providers: [AuthService,JwtStrategy],
  exports: [AuthService,JwtStrategy, PassportModule],
})
export class AuthModule {}
