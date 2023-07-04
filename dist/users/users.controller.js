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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const create_categories_dto_1 = require("./dto/create-categories.dto");
let UsersController = exports.UsersController = class UsersController {
    constructor(usersServices) {
        this.usersServices = usersServices;
    }
    Loginuser(user) {
        return this.usersServices.loginUser(user);
    }
    Registeruser(user) {
        return this.usersServices.registerUser(user);
    }
    Logout(AccessToken) {
        return this.usersServices.logout(AccessToken);
    }
    async createCategory(category) {
        await this.usersServices.SaveCategory(category);
    }
    async createSubitem(subitem) {
        console.log(subitem);
        await this.usersServices.subitem(subitem);
    }
    async getAllCategoriesAndSubitems() {
        return this.usersServices.GetAllCategoryAndSubitems();
    }
    async getsubitem(categoryIndex, subIndex, fields) {
        return this.usersServices.getsubitem(categoryIndex, subIndex, fields);
    }
    GetAllFields(categoryIndex, subindex) {
        return this.usersServices.GetAllFields(categoryIndex, subindex);
    }
};
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "Loginuser", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "Registeruser", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Headers)('AccessToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "Logout", null);
__decorate([
    (0, common_1.Post)('category/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categories_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Post)('subitem/save'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categories_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createSubitem", null);
__decorate([
    (0, common_1.Get)('GetCategoryAndSubitems'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllCategoriesAndSubitems", null);
__decorate([
    (0, common_1.Post)('subitem'),
    __param(0, (0, common_1.Body)('categoryIndex')),
    __param(1, (0, common_1.Body)('subIndex')),
    __param(2, (0, common_1.Body)('fields')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Array]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getsubitem", null);
__decorate([
    (0, common_1.Post)('GetAllFields'),
    __param(0, (0, common_1.Body)('categoryIndex')),
    __param(1, (0, common_1.Body)('subindex')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "GetAllFields", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map