import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateUsuarioDto} from './dto/create-usuario.dto';
import {UsuarioService} from './service/usuario.service';
import {Usuario} from './entity/usuario.entity';
import {AuthGuard} from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {
    }

    @Post()
    @ApiOperation({title: 'Criar usuario'})
    @ApiResponse({status: 200, description: 'The user has been successfully created.'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        await this.usuarioService.create(createUsuarioDto);
    }

    @Get()
    @ApiOperation({title: 'Buscar Todos'})
    @ApiResponse({status: 200, description: 'Buscou todos'})
    @ApiResponse({status: 403, description: 'Forbidden.'})
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<Usuario[]> {
        return await this.usuarioService.findAll();
    }
}
