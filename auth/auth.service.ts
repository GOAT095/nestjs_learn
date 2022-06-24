import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
    )
    {}
    async signUp(AuthCredentialsDto: AuthCredentialsDto) : Promise<void>
    {
        return this.userRepository.singUp(AuthCredentialsDto);
    }
    async signIn(authcredentialsDto: AuthCredentialsDto){
        const username = await this.userRepository.validateUserPassword(authcredentialsDto);
        if (!username)
            return new UnauthorizedException('Invalid credentials');
        // console.log(res);
    }
}
