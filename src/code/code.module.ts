import { Module } from '@nestjs/common';
import { CodeGeneratorAccessTokenService } from './code-access-token.services';
import { User } from 'src/users/entities/user.entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CodeGeneratorAccessTokenService],
})
export class CodeModule {}
