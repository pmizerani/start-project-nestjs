import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {UsuarioContato} from './usuario_contato.entity';

@Table({tableName: 'usuario'})
export class Usuario extends Model<Usuario> {

    @Column nome: string;

    @Column email: string;

    @Column senha: string;

    @HasMany(() => UsuarioContato)
    usuario_contato: UsuarioContato;

}
