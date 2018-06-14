import { Sequelize } from 'sequelize-typescript';
import {Usuario} from '../usuario/entity/usuario.entity';
import {UsuarioContato} from '../usuario/entity/usuario_contato.entity';

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                operatorsAliases: false,
                dialect: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'root',
                password: 'q1w2e3r4',
                database: 'nest',
            });
            sequelize.addModels([Usuario, UsuarioContato]); //TODO passar as entidades aqui
            await sequelize.sync();
            return sequelize;
        },
    },
];