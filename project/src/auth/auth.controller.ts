import {Controller, Post, Body, Res, HttpStatus} from '@nestjs/common';
import {ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation} from '@nestjs/swagger';
import {AuthService} from './service/auth.service';
import {AuthDto} from './dto/auth.dto';

@ApiBearerAuth()
@ApiUseTags('API')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    /**
     * createToken
     * @param res
     * @param {AuthDto} authDto
     * @returns {Promise<any>}
     */
    @Post('login')
    @ApiOperation({title: 'Login'})
    @ApiResponse({status: 200, description: 'Login efetuado com sucesso.',})
    @ApiResponse({status: 401, description: 'Não autorizado.'})
    async createToken(@Res() res, @Body() authDto: AuthDto): Promise<any> {

        try {

            const resultado = <any> await this.authService.createToken(authDto);

            if (!resultado) {
                return res.status(HttpStatus.UNAUTHORIZED).json({
                    'statusCode': 401,
                    'error': 'Unauthorized'
                });
            }

            return res.status(HttpStatus.OK).json(resultado);

        } catch (err) {

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);

        }

    }//end createToken

}
