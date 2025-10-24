# NestJS 11 + TypeScript Template

Enterprise-grade Node.js framework with TypeScript, dependency injection, and modular architecture.

## Initialization

```bash
npm i -g @nestjs/cli
nest new . --package-manager npm --strict
```

## What's Included

- ✅ NestJS 11 framework
- ✅ TypeScript strict mode
- ✅ Dependency injection
- ✅ Modular architecture
- ✅ Testing setup (Jest)
- ✅ ESLint & Prettier

## Project Structure

```
nestjs-project/
├── src/
│   ├── modules/
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.module.ts
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   └── auth/
│   ├── common/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── pipes/
│   ├── config/
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## Development Commands

```bash
npm run start        # Start application
npm run start:dev    # Start with watch mode (hot reload)
npm run start:debug  # Start in debug mode
npm run build        # Build for production
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Generate coverage report
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

## Environment Variables

Create `.env`:
```env
# Application
PORT=3000
NODE_ENV=development
API_PREFIX=api/v1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=mydb

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1d

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug
```

## Recommended Packages

### Database (Prisma)
```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

### Database (TypeORM - Alternative)
```bash
npm install @nestjs/typeorm typeorm pg
```

### Configuration
```bash
npm install @nestjs/config
```

### Validation
```bash
npm install class-validator class-transformer
```

### Authentication
```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install -D @types/passport-jwt
```

### Swagger/OpenAPI
```bash
npm install @nestjs/swagger swagger-ui-express
```

### Caching
```bash
npm install @nestjs/cache-manager cache-manager
```

### Rate Limiting
```bash
npm install @nestjs/throttler
```

## Module Example

```bash
nest generate module users
nest generate controller users
nest generate service users
```

```typescript
// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
```

```typescript
// src/modules/users/users.controller.ts
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
```

## DTO with Validation

```typescript
// src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  @MinLength(8)
  password: string;
}
```

Enable validation in `main.ts`:
```typescript
import { ValidationPipe } from '@nestjs/common';

app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
}));
```

## Swagger Setup

```typescript
// src/main.ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('The API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);
```

Access at: `http://localhost:3000/api/docs`

## Prisma Setup

```bash
npm install @prisma/client
npm install -D prisma
npx prisma init
```

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```bash
npx prisma migrate dev --name init
npx prisma generate
```

```typescript
// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
```

## JWT Authentication

```typescript
// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

## Testing

```typescript
// src/modules/users/users.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of users', async () => {
    expect(await controller.findAll()).toEqual([]);
  });
});
```

## Deployment

### Docker
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

### PM2
```bash
npm install -g pm2
pm2 start dist/main.js --name api
```

## Best Practices

1. **Modular Architecture** - One module per feature
2. **Dependency Injection** - Use NestJS DI system
3. **DTOs** - Always validate input with class-validator
4. **Exception Filters** - Handle errors consistently
5. **Guards** - Protect routes with authorization guards
6. **Interceptors** - Transform responses, add logging
7. **Pipes** - Transform and validate data
8. **Testing** - Unit and E2E tests for all modules

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [NestJS Fundamentals](https://docs.nestjs.com/fundamentals)
- [Prisma with NestJS](https://docs.nestjs.com/recipes/prisma)
- [Testing in NestJS](https://docs.nestjs.com/fundamentals/testing)
