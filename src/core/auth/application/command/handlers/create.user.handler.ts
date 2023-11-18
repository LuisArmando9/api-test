import { CommandHandler, ICommand, ICommandHandler, IQuery } from '@nestjs/cqrs';
import { CreateUserCommand } from '../implementation/create.user.command';
import { AuthService } from 'src/core/auth/domain/services/auth.service';


@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(private readonly authService: AuthService){}
    async execute(command: CreateUserCommand){
        return await this.authService.insert(command.dto)
    }
}