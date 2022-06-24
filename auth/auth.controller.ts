import { Body, Controller, Injectable, Post, ValidationPipe } from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

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
    async singin(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto)
    {
        return this.authService.signIn(authCredentialsDto);
    }
}
