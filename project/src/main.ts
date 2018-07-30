import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from './config/config.service';
import {AppLogger} from './app.logger';
import * as fs from 'fs';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

/**
 * bootstrap
 * @returns {Promise<void>}
 */
async function bootstrap() {

    const app = await NestFactory.create(ApplicationModule, {
        logger: new AppLogger(),
    });

    if (!process.env.NODE_ENV || ('development' === process.env.NODE_ENV || 'test' === process.env.NODE_ENV)) {
        const options = new DocumentBuilder()
            .setTitle('Start Project NestJS')
            .setDescription('API de exemplo')
            .setVersion('1.0')
            .addTag('API')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);
    }

    //Criar pastas padrão
    if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

    app.enableCors();
    await app.listen(configService.config.PORT);

}

bootstrap();
