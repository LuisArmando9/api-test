import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserLogEntity } from 'src/core/shared/entities/action-user-log.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserEntity } from './infrestructure/entities/user-entity';
import { AuthController } from './infrestructure/controllers/auth-controller';
import { AuthService } from './domain/services/auth-service';
import { UserRepository } from './infrestructure/repositories/auth-repository';
import { CreateUserHandler } from './application/command/handlers/create-user-handler';
import { LoginQueryHandler } from './application/query/handler/login-handler-query';
import { JwtModule } from '@nestjs/jwt';
import { CONFIG_NAME, ConfigVars, Vars } from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './domain/strategies/auth-jwt-strategy';
const commands = [
    CreateUserHandler
];
const queries = [
    LoginQueryHandler
]

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule.register( { defaultStrategy: 'jwt', session: true } ),
    JwtModule.registerAsync( {
      useFactory: ( vars: ConfigVars ) => ( {
        secret: vars.jwt.password,
        signOptions: { expiresIn: '120m' },
      } ),
      inject: [Vars.KEY ],
    } ),
  ],
  controllers: [AuthController],
  providers: [
    AuthStrategy,
    AuthService,
    UserRepository,
    CommandBus,
    QueryBus,
    ...commands,
    ...queries,
],
})
export class AuthModule  implements OnModuleInit {
    constructor(private readonly command$: CommandBus, private readonly query$: QueryBus) {}
  
    onModuleInit(): any {
      this.command$.register(commands);
      this.query$.register(queries);
    }
  }
  