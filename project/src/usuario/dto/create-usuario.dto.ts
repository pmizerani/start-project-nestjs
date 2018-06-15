import {IsString, IsInt} from 'class-validator';
import {ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import {UsuarioContato} from '../entity/usuario_contato.entity';

export class CreateUsuarioDto {

    @ApiModelProperty({type: String})
    @IsString()
    readonly nome: string;

    @ApiModelProperty({ type: String })
    @IsString()
    readonly email: string;

    @ApiModelProperty({ type: String })
    @IsString()
    public senha: string;

    @ApiModelProperty({ type: UsuarioContato, isArray: true })
    readonly usuario_contato: UsuarioContato[]

}
