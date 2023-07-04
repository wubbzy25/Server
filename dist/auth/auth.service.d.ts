import { HttpException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entities';
import { Repository } from 'typeorm';
export declare class AuthService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    private readonly apiKeyService;
    validateApiKey(AccessToken: string): Promise<boolean | HttpException>;
}
