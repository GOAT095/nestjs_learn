import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

async singUp(autcredentialsDto : AuthCredentialsDto) : Promise<void>
{
    const {username, password} = autcredentialsDto;


    let user  = new User();
    user.username = username;
    user.password = password;
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
}