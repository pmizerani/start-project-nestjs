import {Table, AutoIncrement, Column, Model, ForeignKey, BelongsTo, PrimaryKey} from 'sequelize-typescript';
import {Usuario} from './usuario.entity';
import {ApiModelProperty} from '@nestjs/swagger';

@Table({tableName: 'usuario_contato'})
export class UsuarioContato extends Model<UsuarioContato> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Usuario)
    @Column
    id_usuario: number;

    @ApiModelProperty({type: String})
    @Column descricao: string;

    @BelongsTo(() => Usuario, {onUpdate: 'cascade', onDelete: 'cascade'})
    Usuario;

}
