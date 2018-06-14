import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt-payload.interface';
import {AuthDto} from '../dto/auth.dto';

@Injectable()
export class AuthService {
  async createToken(authDto: AuthDto) {
    console.log(authDto)
    const user: JwtPayload = { email: authDto.email, senha: authDto.senha };
    const expiresIn = 3600; //TODO tempo de expiracao
    const accessToken = jwt.sign(user, 'secretKey', { expiresIn }); //TODO trocar secretKey
    return {
      expiresIn,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    // put some validation logic here
    // for example query user by id/email/username
    console.log('payload: ', payload)
    //TODO criar metodo de valiacao aqui
    if ('phelipe@jmv.com' === payload.email && '321' === payload.senha) return true;
    else return false;
  }
}
