import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {ApiBearerAuth, ApiImplicitQuery, ApiOperation, ApiResponse, ApiUseTags} from '@nestjs/swagger';
import {CreateUsuarioDto} from './dto/create-usuario.dto';
import {UsuarioService} from './service/usuario.service';
import {Usuario} from './entity/usuario.entity';
import {AuthGuard} from '@nestjs/passport';
import {Filter} from '../interface/filter.interface';
import {array, number, string} from 'joi';

@ApiBearerAuth()
@ApiUseTags('usuario')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) {
    }

    /**
     * create
     * @param {CreateUsuarioDto} createUsuarioDto
     * @returns {Promise<void>}
     */
    @Post()
    @ApiOperation({title: 'Criar'})
    @ApiResponse({status: 200, description: 'Usuário criado com sucesso.'})
    @ApiResponse({status: 403, description: 'Permissão negada.'})
    @UseGuards(AuthGuard('jwt'))
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return await this.usuarioService.create(createUsuarioDto);
    }//end create

    /**
     * findAll
     * @returns {Promise<Usuario[]>}
     */
    @Get()
    @ApiImplicitQuery({name: 'orderByDirection', type: string, required: false})
    @ApiImplicitQuery({name: 'orderByColumn', type: string, required: false})
    @ApiImplicitQuery({name: 'offset', type: number, required: false})
    @ApiImplicitQuery({name: 'limit', type: number, required: false})
    @ApiImplicitQuery({name: 'fields', type: array, required: false, isArray: true, description: 'Exemplo [{"nome":"Nome"},{"email": "email@email.com"}]'})
    @ApiOperation({title: 'Buscar Todos'})
    @ApiResponse({status: 200, description: 'Busca realizada com sucesso.'})
    @ApiResponse({status: 403, description: 'Permissão negada.'})
    @UseGuards(AuthGuard('jwt'))
    async findAll(@Query() filter: Filter): Promise<Usuario[]> {
        return await this.usuarioService.findAll(filter);
    }//end findAll

    /**
     * findOne
     * @param id
     * @returns {Promise<void>}
     */
    @Get(':id')
    @ApiOperation({title: 'Buscar por ID'})
    @ApiResponse({status: 200, description: 'Busca realizada com sucesso.'})
    @ApiResponse({status: 403, description: 'Permissão negada.'})
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id: Number) {
        return await this.usuarioService.findOne(id);
    }//end findOne

    /**
     * update
     * @param id
     * @param {CreateUsuarioDto} createUsuarioDto
     * @returns {Promise<void>}
     */
    @Put(':id')
    @ApiOperation({title: 'Atualizar'})
    @ApiResponse({status: 200, description: 'Usuário atualizado com sucesso.'})
    @ApiResponse({status: 403, description: 'Permissão negada.'})
    @UseGuards(AuthGuard('jwt'))
    async update(@Param('id') id: Number, @Body() createUsuarioDto: CreateUsuarioDto) {
        return await this.usuarioService.update(id, createUsuarioDto);
    }//end update

    /**
     * remove
     * @param id
     * @returns {Promise<void>}
     */
    @Delete(':id')
    @ApiOperation({title: 'Excluir'})
    @ApiResponse({status: 200, description: 'Usuário excluído com sucesso.'})
    @ApiResponse({status: 403, description: 'Permissão negada.'})
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id') id: Number) {
        return await this.usuarioService.remove(id);
    }//end remove

}
