import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entities';
import { ConfigModule } from '@nestjs/config';
import { Category } from './users/entities/categories.entities';
import { SubItem } from './users/entities/subitem.entities';
import { Fields } from './users/entities/fields.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'containers-us-west-81.railway.app',
      port: 7455,
      username: 'root',
      password: 'RmhHW1rVzE2OGIPAxFSn',
      database: 'railway',
      synchronize: false,
      entities: [User, Category, SubItem, Fields],
    }),
    UsersModule,
    ConfigModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
