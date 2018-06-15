import {Module} from '@nestjs/common';
import {UsuarioController} from './usuario.controller';
import {UsuarioService} from './service/usuario.service';
import {UsuarioProviders} from './service/usuario.providers';
import {DatabaseModule} from '../database/database.module';
import {Helper} from '../app.helper';

@Module({
    imports: [DatabaseModule],
    controllers: [UsuarioController],
    providers: [UsuarioService, ...UsuarioProviders, Helper],
})
export class UsuarioModule {
}
