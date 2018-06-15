import * as jwt from 'jsonwebtoken';
import {Inject, Injectable} from '@nestjs/common';
import {JwtPayload} from '../interface/jwt-payload.interface';
import {AuthDto} from '../dto/auth.dto';
import {Helper} from '../../app.helper';
import {Usuario} from '../../usuario/entity/usuario.entity';

@Injectable()
export class AuthService {

    constructor(
        @Inject('UsuarioRepository') private readonly usuarioRepository: typeof Usuario,
        private readonly helper: Helper
    ) {}

    /**
     * createToken
     * @param {AuthDto} authDto
     * @returns {Promise<any>}
     */
    async createToken(authDto: AuthDto) {

        const senhaEncriptada = this.helper.encrypt(authDto.senha);
        const usuario = await this.usuarioRepository.findOne({where: {email: authDto.email, senha: senhaEncriptada}});

        if (!usuario) return false;

        const user: JwtPayload = {nome: usuario.nome, email: authDto.email, senha: authDto.senha};
        const expiresIn = 86400; //TODO tempo de expiracao 86400 = 1 dia
        const accessToken = jwt.sign(user, 'secretKey', {expiresIn}); //TODO trocar secretKey -- mesma do arquivo jwt.strategy.ts
        return {
            expiresIn,
            accessToken,
        };

    }//end createToken

    /**
     * validateUser
     * @param {JwtPayload} payload
     * @returns {Promise<any>}
     */
    async validateUser(payload: JwtPayload): Promise<any> {

        const senhaEncriptada = this.helper.encrypt(payload.senha);
        const usuario = await this.usuarioRepository.findOne({where: {email: payload.email, senha: senhaEncriptada}});
        if (!usuario) return false;
        else return true;

    }//end validateUser

}
