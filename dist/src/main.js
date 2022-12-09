"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const passport = require("passport");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { bodyParser: true });
    const PORT = process.env.PORT || 7777;
    app.enableCors({
        origin: [
            'https://animated-taiyaki-a533ea.netlify.app',
            'http://localhost:3000',
        ],
        credentials: true,
    });
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(PORT, () => console.log(`${PORT} started`));
}
bootstrap();
//# sourceMappingURL=main.js.map