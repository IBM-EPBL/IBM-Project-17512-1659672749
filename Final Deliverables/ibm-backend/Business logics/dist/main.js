"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
const helmet_1 = require("helmet");
const express_1 = require("express");
const redis = require("ioredis");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'https://fijo.vercel.app',
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use(compression());
    app.use((0, helmet_1.default)());
    app.use((0, express_1.json)({ limit: '3mb' }));
    const R = new redis('redis://:b4722ca688d24027a33b0f649208bc8d@eu1-aware-tuna-35243.upstash.io:35243');
    global.Publisher = R;
    global.Subscriber = R.duplicate();
    global.Subscriber.subscribe('get-parsed-data');
    await app.listen(process.env.PORT || 8000);
}
bootstrap();
//# sourceMappingURL=main.js.map