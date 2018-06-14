import {Sequelize} from 'sequelize-typescript';
import {Usuario} from '../usuario/entity/usuario.entity';
import {UsuarioContato} from '../usuario/entity/usuario_contato.entity';
import {ConfigService} from '../config/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

export const databaseProviders = [
    {
        provide: 'SequelizeToken',
        useFactory: async () => {
            const sequelize = new Sequelize({
                operatorsAliases: false,
                dialect: 'mysql',
                host: configService.config.MYSQL_HOST,
                port: configService.config.MYSQL_PORT,
                username: configService.config.MYSQL_USER,
                password: configService.config.MYSQL_PASS,
                database: configService.config.MYSQL_DATABASE,
            });
            sequelize.addModels([Usuario, UsuarioContato]); //TODO passar as entidades aqui
            await sequelize.sync();
            return sequelize;
        },
    },
];