import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from './entities/user.entities';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt = require('bcrypt');
import { CodeGeneratorAccessTokenService } from 'src/code/code-access-token.services';
import { CreateCategoryDto } from './dto/create-categories.dto';
import { Category } from './entities/categories.entities';
import { SubItem } from './entities/subitem.entities';
import { Fields } from './entities/fields.entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly codeGeneratorAccessTokenService: CodeGeneratorAccessTokenService,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(SubItem)
    private readonly subItemRepository: Repository<SubItem>,
    @InjectRepository(Fields)
    private readonly FieldsRepository: Repository<Fields>,
  ) {}

  // Registro de usuario
  async registerUser(user: CreateUserDto) {
    console.log(user);
    const existingUserEmail = await this.userRepository.findOne({
      where: { gmail: user.gmail },
    });

    if (existingUserEmail) {
      return new HttpException('Gmail already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const newUser = this.userRepository.create(user);
    this.userRepository.save(newUser);
    return new HttpException('Register Succesfull', 200);
  }

  async loginUser(user: CreateUserDto) {
    try {
      //realizar una consulta a la db
      const UserAuth = await this.userRepository.findOne({
        where: {
          gmail: user.gmail,
        },
      });

      //Verificar si encontro el gmail
      if (UserAuth) {
        const AccessToken =
          this.codeGeneratorAccessTokenService.generateAccessToken();
        UserAuth.AccessToken = AccessToken;
        await this.userRepository.save(UserAuth);
        //comparar la contraseña
        const passwordMatch = await bcrypt.compare(
          user.password,
          UserAuth.password,
        );

        //validar si es igual o no
        if (passwordMatch) {
          if (UserAuth.IsAdmin === true) {
            return new HttpException(
              {
                Message: 'Successfully logged in',
                AccessToken: AccessToken,
                Rol: 'Admin',
              },
              200,
            );
          } else {
            return new HttpException(
              {
                Message: 'Successfully logged in',
                AccessToken: AccessToken,
                Rol: 'User',
              },
              200,
            );
          }
        } else {
          return new HttpException(
            'The password is incorrect',
            HttpStatus.BAD_REQUEST,
          );
        }
        //no encontro el gmail
      } else {
        return new HttpException(
          'The gmail does not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.error(error);
      throw new HttpException('An error occurred', HttpStatus.BAD_REQUEST);
    }
  }
  async SaveCategory(category: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { category: category.category },
    });
    if (existingCategory) {
      throw new HttpException('La categoria ya existe', 400);
    }
    const newCategory = this.categoryRepository.create(category);
    await this.categoryRepository.save(newCategory);
    throw new HttpException('Succesfull Create Category', 200);
  }

  async subitem(subitem: CreateCategoryDto) {
    const existingCategory = await this.categoryRepository.findOne({
      where: { category: subitem.category },
    });
    if (existingCategory) {
      const existingSubItem = await this.subItemRepository.findOne({
        where: { subitem: subitem.subitem },
      });
      if (existingSubItem) {
        throw new HttpException(
          `El subítem '${subitem.subitem}' ya existe`,
          400,
        );
      }
      const newsubItem = this.subItemRepository.create({
        subitem: subitem.subitem,
        category: existingCategory,
      });

      this.subItemRepository.save(newsubItem);
      throw new HttpException('SubItem created succesfull', 200);
    }
  }

  async GetAllCategoryAndSubitems() {
    const categories = await this.categoryRepository.find();
    const formattedCategories = await Promise.all(
      categories.map(async (category) => {
        const subItems = await this.subItemRepository.find({
          where: { category },
        });
        const subItemNames = subItems.map((subItem) => subItem.subitem);
        return { name: category.category, subItems: subItemNames };
      }),
    );
    return { categories: formattedCategories };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async logout(AccessToken: string) {
    const UserFound = await this.userRepository.findOne({
      where: {
        AccessToken: AccessToken,
      },
    });
    if (UserFound) {
      UserFound.AccessToken = '';
      await this.userRepository.save(UserFound);
      throw new HttpException('Logout succesfull', 200);
    }
  }

  async getsubitem(categoryIndex: number, subIndex: number, fields: any[]) {
    console.log(categoryIndex, subIndex);
    const fieldsvalue = fields.map((field) => field.value);
    const FieldsExisting = await this.FieldsRepository.findOne({
      where: {
        value: In(fieldsvalue),
      },
    });

    if (FieldsExisting) {
      try {
        await this.FieldsRepository.save(fields);
        return 'Datos actualizados exitosamente';
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        throw new Error('Error al actualizar los datos');
      }
    } else {
      const newFields: Fields[] = fields.map((field) => {
        const newField = new Fields();
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
      } catch (error) {
        console.error('Error al guardar los datos:', error);
        throw new Error('Error al guardar los datos');
      }
    }
  }

  async GetAllFields(categoryIndex: number, subindex: number) {
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
}
