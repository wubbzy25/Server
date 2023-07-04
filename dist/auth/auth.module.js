"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const api_key_strategy_1 = require("./api-key.strategy");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const auth_middleware_1 = require("./auth.middleware");
const typeorm_1 = require("@nestjs/typeorm");
const user_entities_1 = require("../users/entities/user.entities");
const authenticated_middleware_1 = require("./authenticated.middleware");
const users_service_1 = require("../users/users.service");
const code_access_token_services_1 = require("../code/code-access-token.services");
let AuthModule = exports.AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(authenticated_middleware_1.AuthenticatedMiddleware).forRoutes('/login', '/register');
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('/main');
    }
};
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [passport_1.PassportModule, config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([user_entities_1.User])],
        providers: [
            auth_service_1.AuthService,
            api_key_strategy_1.ApiKeyStrategy,
            users_service_1.UsersService,
            code_access_token_services_1.CodeGeneratorAccessTokenService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map