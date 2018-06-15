import {IsString} from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class AuthDto {

    @ApiModelProperty({type: String})
    @IsString()
    readonly email: string;

    @ApiModelProperty({type: String})
    @IsString()
    readonly senha: string;

}