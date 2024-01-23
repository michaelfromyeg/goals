import "fastify";

declare module "fastify" {
  export interface FastifyInstance {
    config: {
      HOST: string;
      PORT: string;
      MONGODB_URI: string;
      FIREBASE_SERVICE_ACCOUNT: string;
      PHOTOS_DIR: string;
    };
    multer: {
      upload: any;
    };
  }
}
