import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { CONFIG_NAME, ConfigVars, Vars } from "src/config";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserJwtPayload } from "../ïnterfaces/paylolad-jwt-interface";

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(Vars.KEY)
    private readonly vars:ConfigVars
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: vars.jwt.password,
    });
  }

  async validate(payload: IUserJwtPayload) {
    return {
      id: payload.id,
      username: payload.email,
    };
  }
}
