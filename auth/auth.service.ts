import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtservice : JwtService,
    )
    {}
    async signUp(AuthCredentialsDto: AuthCredentialsDto) : Promise<void>
    {
        return this.userRepository.singUp(AuthCredentialsDto);
    }
    async signIn(authcredentialsDto: AuthCredentialsDto): Promise<{accessToken : string}>{
        const username = await this.userRepository.validateUserPassword(authcredentialsDto);
        if (!username)
            throw new UnauthorizedException('Invalid credentials');
        // console.log(res);

        //create payload for jwt token
        const payload : JwtPayload =  {username};
        //jwt token for user
        const accessToken = await this.jwtservice.sign(payload);
        return {accessToken};
    }
}
