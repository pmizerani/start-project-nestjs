import {Module} from '@nestjs/common';
import {AuthModule} from './auth/auth.module';
import {UsuarioModule} from './usuario/usuario.module';

@Module({
    imports: [AuthModule, UsuarioModule],
})
export class ApplicationModule {
}
