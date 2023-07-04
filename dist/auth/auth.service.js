"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entities_1 = require("../users/entities/user.entities");
const typeorm_2 = require("typeorm");
let AuthService = exports.AuthService = class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async validateApiKey(AccessToken) {
        try {
            const AccessTokenFound = await this.userRepository.findOne({
                where: {
                    AccessToken: AccessToken,
                },
            });
            if (AccessTokenFound) {
                return this.apiKeyService === AccessTokenFound;
            }
            else {
                return new common_1.HttpException('AccessToken Invalid or Token already expired', 400);
            }
        }
        catch {
            return new common_1.HttpException('AccessToken Invalid or Token already expired', 400);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entities_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map