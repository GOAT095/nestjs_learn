import { Body, Controller, Injectable, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService : AuthService,

        
    ){}
    @Post('/signup')
    async signup(@Body(ValidationPipe)authCredentialsDto: AuthCredentialsDto) : Promise<void>{
        // console.log(authCredentialsDto);
        return await this.authService.signUp(authCredentialsDto);
       
    }
    @Post('/signin')
    async singin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) : Promise<{accessToken : string}>
    {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User){
        console.log(user);
    }
}
