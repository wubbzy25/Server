import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entities';
import { CodeGeneratorAccessTokenService } from 'src/code/code-access-token.services';
import { Category } from './entities/categories.entities';
import { SubItem } from './entities/subitem.entities';
import { Fields } from './entities/fields.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Category, SubItem, Fields]), // Asegúrate de incluir el repositorio Category en los features
  ],
  providers: [UsersService, CodeGeneratorAccessTokenService],
  controllers: [UsersController],
})
export class UsersModule {}
