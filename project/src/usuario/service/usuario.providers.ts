import { Usuario } from '../entity/usuario.entity';

export const usuarioProviders = [
  {
    provide: 'UsuarioRepository',
    useValue: Usuario,
  },
];
