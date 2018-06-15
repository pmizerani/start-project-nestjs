import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from './service/auth.service';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtPayload} from './interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secretKey', //TODO trocar secretKey -- mesma do arquivo auth.service.ts
        });
    }

    /**
     * validate
     * @param {JwtPayload} payload
     * @param {Function} done
     * @returns {Promise<any>}
     */
    async validate(payload: JwtPayload, done: Function) {

        const user = await this.authService.validateUser(payload);
        if (!user) {
            return done(new UnauthorizedException(), false);
        }
        done(null, user);

    }//end validate
}
