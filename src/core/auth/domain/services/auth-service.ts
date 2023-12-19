
import { Injectable } from '@nestjs/common';
import { UserProductAction } from 'src/core/shared/enums/user-action-enum';
import { UserLogRepository } from 'src/core/shared/repositories/user-log-repository';
import { ProductDto } from 'src/products/infrestructure/dtos/product-dto';
import { ProductRepository } from 'src/products/infrestructure/repositories/product-repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search-product-dto';
import { UserRepository } from '../../infrestructure/repositories/auth-repository';
import {  UserDto } from '../../infrestructure/dto/user-dto';
import { JwtService } from '@nestjs/jwt';
import { InvalidPasswordException, UserNotFoundException } from '../exceptions/user-exceptions';


@Injectable()
export class AuthService {
    constructor(
        private user_repository: UserRepository,
        private jwt_service: JwtService
    ) { }

    async insert(dto: UserDto) {
        return this.user_repository.insert(dto)
    }
    
    async login(dto: UserDto) {
        const user = await this.user_repository.findByEmail(dto.email);
        if (!user) throw new UserNotFoundException();
        if (!user.isValidPassword(dto.password))  throw new InvalidPasswordException();
        return {
            jwtToken: this.jwt_service.sign({
                email: user.email,
                id:user.id
            })
        }
    }


    

}