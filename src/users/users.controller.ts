import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CreateCategoryDto } from './dto/create-categories.dto';
//ruta principal (http://localhost:4000/)
@Controller()
export class UsersController {
  //definimos la clase userService
  constructor(private usersServices: UsersService) {}
  //ruta (http://localhost:4000/login)
  @Post('login')
  Loginuser(@Body() user: CreateUserDto) {
    return this.usersServices.loginUser(user);
  }
  @Post('register')
  Registeruser(@Body() user: CreateUserDto) {
    return this.usersServices.registerUser(user);
  }
  @Post('logout')
  Logout(@Headers('AccessToken') AccessToken: string) {
    return this.usersServices.logout(AccessToken);
  }
  @Post('category/save')
  async createCategory(@Body() category: CreateCategoryDto) {
    await this.usersServices.SaveCategory(category);
  }
  @Post('subitem/save')
  async createSubitem(@Body() subitem: CreateCategoryDto) {
    console.log(subitem);
    await this.usersServices.subitem(subitem);
  }
  @Get('GetCategoryAndSubitems')
  async getAllCategoriesAndSubitems() {
    return this.usersServices.GetAllCategoryAndSubitems();
  }

  @Post('subitem')
  async getsubitem(
    @Body('categoryIndex') categoryIndex: number,
    @Body('subIndex') subIndex: number,
    @Body('fields') fields: any[],
  ) {
    return this.usersServices.getsubitem(categoryIndex, subIndex, fields);
  }

  @Post('GetAllFields')
  GetAllFields(
    @Body('categoryIndex') categoryIndex: number,
    @Body('subindex') subindex: number,
  ) {
    return this.usersServices.GetAllFields(categoryIndex, subindex);
  }
}
