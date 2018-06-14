import {Controller, Get, Post, Body, UseGuards} from '@nestjs/common';
import {ApiUseTags, ApiBearerAuth, ApiResponse, ApiOperation} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './service/auth.service';
import {AuthDto} from './dto/auth.dto';

@ApiBearerAuth()
@ApiUseTags('nfse')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('token')
    @ApiOperation({title: 'Create token'})
    @ApiResponse({status: 200, description: 'The token has been successfully created.',})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    async createToken(@Body() authDto: AuthDto): Promise<any> {
        return await this.authService.createToken(authDto);
    }

    @Get('data')
    @ApiOperation({title: 'Buscar tudo'})
    @ApiResponse({status: 200, description: 'Buscou tudo',})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @UseGuards(AuthGuard('jwt'))
    findAll() {
        return 'Sucesso';
    }
}
