"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
const setupSwagger = (app, appName, serverUrls) => {
    const configBuilder = new swagger_1.DocumentBuilder()
        .setTitle(`${appName} Documentation Swagger`)
        .setDescription(`${appName} Description`)
        .setVersion("1.0")
        .addServer("/", "Local machine")
        .addBearerAuth();
    if (serverUrls) {
        serverUrls.forEach((url) => configBuilder.addServer(url));
    }
    const config = configBuilder.build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("swagger", app, document, {
        explorer: true,
        swaggerOptions: {
            customSiteTitle: `${appName} API Documentation`,
            persistAuthorization: true,
            displayRequestDuration: true,
            docExpansion: "list",
        },
    });
};
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map