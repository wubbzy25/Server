"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const multer = require("multer");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    app.enableCors();
    app.use(multer({
        limits: {
            fileSize: 100 * 1024 * 1024,
        },
    }).any());
    await app.listen(Number(port));
}
bootstrap();
//# sourceMappingURL=main.js.map