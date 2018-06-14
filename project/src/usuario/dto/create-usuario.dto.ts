import {IsString, IsInt} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {UsuarioContato} from '../entity/usuario_contato.entity';

export class CreateUsuarioDto {

    @ApiModelProperty({type: String})
    @IsString()
    readonly name: string;

    @ApiModelProperty({ type: Number })
    @IsInt()
    readonly age: number;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly breed: string;

    @ApiModelProperty({ type: UsuarioContato, isArray: true })
    readonly usuario_contato: UsuarioContato[]

}
