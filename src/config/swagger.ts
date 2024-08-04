import { SwaggerOptions } from "swagger-ui-express";
import { Options } from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Blog Application Backend API",
    version: "1.0.0",
    description: `
        This repository contains the backend code for a full-stack
        blog posting and subscription platform. The backend is built 
        using Node.js, Express, and TypeScript, with Prisma for database
        interactions and Supabase for authentication and real-time features.
    `,
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "API server",
    },
  ],
};

const swaggerOptions: Options = {
  swaggerDefinition,
  apis: ["./src/api/**/*.ts"],
};

export default swaggerOptions;
