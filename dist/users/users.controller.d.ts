import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateCategoryDto } from './dto/create-categories.dto';
export declare class UsersController {
    private usersServices;
    constructor(usersServices: UsersService);
    Loginuser(user: CreateUserDto): Promise<import("@nestjs/common").HttpException>;
    Registeruser(user: CreateUserDto): Promise<import("@nestjs/common").HttpException>;
    Logout(AccessToken: string): Promise<void>;
    createCategory(category: CreateCategoryDto): Promise<void>;
    createSubitem(subitem: CreateCategoryDto): Promise<void>;
    getAllCategoriesAndSubitems(): Promise<{
        categories: {
            name: string;
            subItems: string[];
        }[];
    }>;
    getsubitem(categoryIndex: number, subIndex: number, fields: any[]): Promise<"Datos actualizados exitosamente" | "Datos guardados exitosamente">;
    GetAllFields(categoryIndex: number, subindex: number): Promise<import("./entities/fields.entities").Fields[]>;
}
