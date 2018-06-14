import {NestFactory} from '@nestjs/core';
import {ApplicationModule} from './app.module';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {ConfigService} from './config/config.service';

const configService = new ConfigService(`${process.env.NODE_ENV ? process.env.NODE_ENV : 'development'}.env`);

async function bootstrap() {

    const app = await NestFactory.create(ApplicationModule);

    const options = new DocumentBuilder()
        .setTitle('API NFSE')
        .setDescription('API para geração de nota fiscal de serviços eletrônica')
        .setVersion('1.0')
        .addTag('nfse')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    app.enableCors();
    await app.listen(configService.config.PORT);

}

bootstrap();
