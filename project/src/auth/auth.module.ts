import {Module} from '@nestjs/common';
import {AuthService} from './service/auth.service';
import {JwtStrategy} from './jwt.strategy';
import {AuthController} from './auth.controller';
import {Helper} from '../app.helper';
import {UsuarioProviders} from '../usuario/service/usuario.providers';
import {UsuarioService} from '../usuario/service/usuario.service';
import {DatabaseModule} from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, Helper, UsuarioService, ...UsuarioProviders],
})
export class AuthModule {
}
