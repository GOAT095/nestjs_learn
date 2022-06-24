import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt"

@EntityRepository(User)
export class UserRepository extends Repository<User>{

async singUp(autcredentialsDto : AuthCredentialsDto) : Promise<void>
{
    const {username, password} = autcredentialsDto;

    const salt = await bcrypt.genSalt();
    // console.log(salt);
    let user  = new User();
    user.username = username;
    user.salt = salt;
    let pass = this.hashPassword(password, salt);
    user.password = (await pass).toString();
    // console.log(user.password);
    try{
    await user.save();}
    catch(error)
    {
        if (error.code === '23505')//dup username
            throw new ConflictException('Username already exists');
        else
            throw new InternalServerErrorException();
    }
    //above is better than making 2 request to the database !
    return ;
}

async validateUserPassword(authcredentialsDto: AuthCredentialsDto): Promise<string>{
    const {username, password} = authcredentialsDto;
    const user = await this.findOne({username});
    // console.log(username);
    if(user && await user.validatePassword(password))
    {
        return user.username;
    }
    return null;
}

private async hashPassword(password: string, salt: string): Promise<string>
{
    return bcrypt.hash(password, salt);
}
}