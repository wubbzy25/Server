import { HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import { CodeGeneratorAccessTokenService } from 'src/code/code-access-token.services';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { Category } from './entities/categories.entities';
import { SubItem } from './entities/subitem.entities';
import { Fields } from './entities/fields.entities';
export declare class UsersService {
    private userRepository;
    private readonly codeGeneratorAccessTokenService;
    private categoryRepository;
    private readonly subItemRepository;
    private readonly FieldsRepository;
    constructor(userRepository: Repository<User>, codeGeneratorAccessTokenService: CodeGeneratorAccessTokenService, categoryRepository: Repository<Category>, subItemRepository: Repository<SubItem>, FieldsRepository: Repository<Fields>);
    registerUser(user: CreateUserDto): Promise<HttpException>;
    loginUser(user: CreateUserDto): Promise<HttpException>;
    SaveCategory(category: CreateCategoryDto): Promise<void>;
    subitem(subitem: CreateCategoryDto): Promise<void>;
    GetAllCategoryAndSubitems(): Promise<{
        categories: {
            name: string;
            subItems: string[];
        }[];
    }>;
    logout(AccessToken: string): Promise<void>;
    getsubitem(categoryIndex: number, subIndex: number, fields: any[]): Promise<"Datos actualizados exitosamente" | "Datos guardados exitosamente">;
    GetAllFields(categoryIndex: number, subindex: number): Promise<Fields[]>;
}
