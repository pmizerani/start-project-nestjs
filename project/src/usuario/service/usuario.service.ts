import {Injectable, Inject} from '@nestjs/common';
import {CreateUsuarioDto} from '../dto/create-usuario.dto';
import {Usuario} from '../entity/usuario.entity';
import {UsuarioContato} from '../entity/usuario_contato.entity';
import {Helper} from '../../app.helper';
import {Filter} from '../../interface/filter.interface';

@Injectable()
export class UsuarioService {

    constructor(
        @Inject('UsuarioRepository') private readonly usuarioRepository: typeof Usuario,
        private readonly helper: Helper,
    ) {}

    /**
     * create
     * @param {CreateUsuarioDto} createUsuarioDto
     * @returns {Promise<Usuario>}
     */
    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {

        createUsuarioDto.senha = this.helper.encrypt(createUsuarioDto.senha);
        return await Usuario.create(createUsuarioDto, {include: [UsuarioContato]});

    }//end create

    /**
     * update
     * @param id
     * @param {CreateUsuarioDto} createUsuarioDto
     * @returns {Promise<Usuario>}
     */
    async update(id: Number, createUsuarioDto: CreateUsuarioDto): Promise<any> {

        createUsuarioDto.senha = this.helper.encrypt(createUsuarioDto.senha);
        return await Usuario.update(createUsuarioDto, { returning: true, where: { id } });

    }//end update

    /**
     * findOne
     * @param id
     * @returns {Promise<Usuario>}
     */
    async findOne(id: Number): Promise<Usuario> {

        return await Usuario.findOne({
            where: {
                id: parseInt(id.toString())
            },
            include: [
                { model: UsuarioContato }
            ]
        });

    }//end findOne

    /**
     * remove
     * @param id
     * @returns {Promise<any>}
     */
    async remove(id: Number): Promise<any> {

        return await Usuario.destroy({
            where: {
                id: parseInt(id.toString())
            }
        });

    }//end remove

    /**
     * findAll
     * @param {Filter} filter
     * @returns {Promise<Usuario[]>}
     */
    async findAll(filter: Filter): Promise<Usuario[]> {

        console.log(filter)
        console.log(filter.fields) 
        console.log(JSON.parse(filter.fields[0]).nome)

        // return this.usuarioRepository.sequelize.query('select * from usuario', { type: this.usuarioRepository.sequelize.QueryTypes.SELECT});
        return await this.usuarioRepository.findAll<Usuario>({include: [UsuarioContato]});

    }//end findAll

}
