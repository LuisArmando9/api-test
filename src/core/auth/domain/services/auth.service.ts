
import { Injectable } from '@nestjs/common';
import { UserProductAction } from 'src/core/shared/enums/user.action.enum';
import { UserLogRepository } from 'src/core/shared/repositories/user.log.repository';
import { ProductDto } from 'src/products/infrestructure/dtos/product.dto';
import { ProductRepository } from 'src/products/infrestructure/repositories/product.repository';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SearchProductDto } from 'src/products/infrestructure/dtos/search.product.dto';
import { UserRepository } from '../../infrestructure/repositories/auth.repository';
import {  UserDto } from '../../infrestructure/dto/user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }

    async insert(dto: UserDto) {
        return this.userRepository.insert(dto)
    }
    
    async login(dto: UserDto) {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) throw new NotFoundException("User not found");
        if (!user.isValidPassword(dto.password))  throw new NotFoundException("Invalid password");
        return {
            jwtToken: this.jwtService.sign({
                email: user.email,
                id:user.id
            })
        }
    }


    

}