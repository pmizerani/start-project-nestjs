import {Injectable, Inject} from '@nestjs/common';
import {CreateUsuarioDto} from '../dto/create-usuario.dto';
import {Usuario} from '../entity/usuario.entity';
import {UsuarioContato} from '../entity/usuario_contato.entity';

@Injectable()
export class UsuarioService {
    constructor(
        @Inject('UsuarioRepository') private readonly usuarioRepository: typeof Usuario,
    ) {}

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
        //Inclui o modelo da tabela filho para inserir automatico
        return await Usuario.create(createUsuarioDto, {include: [UsuarioContato]});
    }

    async findAll(): Promise<Usuario[]> {

        // return this.usuarioRepository.sequelize.query('select * from usuario', { type: this.usuarioRepository.sequelize.QueryTypes.SELECT});
        return await this.usuarioRepository.findAll<Usuario>({ include: [UsuarioContato]});
    }
}
