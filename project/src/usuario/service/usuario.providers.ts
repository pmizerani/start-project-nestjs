import { Usuario } from '../entity/usuario.entity';

export const UsuarioProviders = [
  {
    provide: 'UsuarioRepository',
    useValue: Usuario,
  },
];
