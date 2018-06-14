import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {UsuarioContato} from './usuario_contato.entity';

@Table({tableName: 'usuario'})
export class Usuario extends Model<Usuario> {

    @Column name: string;

    @Column age: number;

    @Column breed: string;

    @HasMany(() => UsuarioContato)
    usuario_contato: UsuarioContato;

}
