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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entities_1 = require("./entities/user.entities");
const bcrypt = require("bcrypt");
const code_access_token_services_1 = require("../code/code-access-token.services");
const categories_entities_1 = require("./entities/categories.entities");
const subitem_entities_1 = require("./entities/subitem.entities");
const fields_entities_1 = require("./entities/fields.entities");
let UsersService = exports.UsersService = class UsersService {
    constructor(userRepository, codeGeneratorAccessTokenService, categoryRepository, subItemRepository, FieldsRepository) {
        this.userRepository = userRepository;
        this.codeGeneratorAccessTokenService = codeGeneratorAccessTokenService;
        this.categoryRepository = categoryRepository;
        this.subItemRepository = subItemRepository;
        this.FieldsRepository = FieldsRepository;
    }
    async registerUser(user) {
        console.log(user);
        const existingUserEmail = await this.userRepository.findOne({
            where: { gmail: user.gmail },
        });
        if (existingUserEmail) {
            return new common_1.HttpException('Gmail already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        const newUser = this.userRepository.create(user);
        this.userRepository.save(newUser);
        return new common_1.HttpException('Register Succesfull', 200);
    }
    async loginUser(user) {
        try {
            const UserAuth = await this.userRepository.findOne({
                where: {
                    gmail: user.gmail,
                },
            });
            if (UserAuth) {
                const AccessToken = this.codeGeneratorAccessTokenService.generateAccessToken();
                UserAuth.AccessToken = AccessToken;
                await this.userRepository.save(UserAuth);
                const passwordMatch = await bcrypt.compare(user.password, UserAuth.password);
                if (passwordMatch) {
                    if (UserAuth.IsAdmin === true) {
                        return new common_1.HttpException({
                            Message: 'Successfully logged in',
                            AccessToken: AccessToken,
                            Rol: 'Admin',
                        }, 200);
                    }
                    else {
                        return new common_1.HttpException({
                            Message: 'Successfully logged in',
                            AccessToken: AccessToken,
                            Rol: 'User',
                        }, 200);
                    }
                }
                else {
                    return new common_1.HttpException('The password is incorrect', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            else {
                return new common_1.HttpException('The gmail does not exist', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            console.error(error);
            throw new common_1.HttpException('An error occurred', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async SaveCategory(category) {
        const existingCategory = await this.categoryRepository.findOne({
            where: { category: category.category },
        });
        if (existingCategory) {
            throw new common_1.HttpException('La categoria ya existe', 400);
        }
        const newCategory = this.categoryRepository.create(category);
        await this.categoryRepository.save(newCategory);
        throw new common_1.HttpException('Succesfull Create Category', 200);
    }
    async subitem(subitem) {
        const existingCategory = await this.categoryRepository.findOne({
            where: { category: subitem.category },
        });
        if (existingCategory) {
            const existingSubItem = await this.subItemRepository.findOne({
                where: { subitem: subitem.subitem },
            });
            if (existingSubItem) {
                throw new common_1.HttpException(`El subítem '${subitem.subitem}' ya existe`, 400);
            }
            const newsubItem = this.subItemRepository.create({
                subitem: subitem.subitem,
                category: existingCategory,
            });
            this.subItemRepository.save(newsubItem);
            throw new common_1.HttpException('SubItem created succesfull', 200);
        }
    }
    async GetAllCategoryAndSubitems() {
        const categories = await this.categoryRepository.find();
        const formattedCategories = await Promise.all(categories.map(async (category) => {
            const subItems = await this.subItemRepository.find({
                where: { category },
            });
            const subItemNames = subItems.map((subItem) => subItem.subitem);
            return { name: category.category, subItems: subItemNames };
        }));
        return { categories: formattedCategories };
    }
    async logout(AccessToken) {
        const UserFound = await this.userRepository.findOne({
            where: {
                AccessToken: AccessToken,
            },
        });
        if (UserFound) {
            UserFound.AccessToken = '';
            await this.userRepository.save(UserFound);
            throw new common_1.HttpException('Logout succesfull', 200);
        }
    }
    async getsubitem(categoryIndex, subIndex, fields) {
        console.log(categoryIndex, subIndex);
        const fieldsvalue = fields.map((field) => field.value);
        const FieldsExisting = await this.FieldsRepository.findOne({
            where: {
                value: (0, typeorm_2.In)(fieldsvalue),
            },
        });
        if (FieldsExisting) {
            try {
                await this.FieldsRepository.save(fields);
                return 'Datos actualizados exitosamente';
            }
            catch (error) {
                console.error('Error al actualizar los datos:', error);
                throw new Error('Error al actualizar los datos');
            }
        }
        else {
            const newFields = fields.map((field) => {
                const newField = new fields_entities_1.Fields();
                newField.id = field.id;
                newField.CategoryIndex = categoryIndex;
                newField.subIndex = subIndex;
                newField.type = field.type;
                newField.top = field.top;
                newField.left = field.left;
                newField.value = field.value;
                newField.width = field.width;
                return newField;
            });
            try {
                await this.FieldsRepository.save(newFields);
                return 'Datos guardados exitosamente';
            }
            catch (error) {
                console.error('Error al guardar los datos:', error);
                throw new Error('Error al guardar los datos');
            }
        }
    }
    async GetAllFields(categoryIndex, subindex) {
        console.log(categoryIndex, subindex);
        const fields = await this.FieldsRepository.find({
            where: {
                CategoryIndex: categoryIndex,
                subIndex: subindex,
            },
        });
        console.log(fields);
        return fields;
    }
};
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entities_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(categories_entities_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(subitem_entities_1.SubItem)),
    __param(4, (0, typeorm_1.InjectRepository)(fields_entities_1.Fields)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        code_access_token_services_1.CodeGeneratorAccessTokenService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map