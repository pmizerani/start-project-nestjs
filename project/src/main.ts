import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from './config/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

/**
 * bootstrap
 * @returns {Promise<void>}
 */
async function bootstrap() {

    const app = await NestFactory.create(ApplicationModule);

    const options = new DocumentBuilder()
        .setTitle('Start Project NestJS')
        .setDescription('API de exemplo')
        .setVersion('1.0')
        .addTag('API')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    await app.listen(configService.config.PORT);

}

bootstrap();
