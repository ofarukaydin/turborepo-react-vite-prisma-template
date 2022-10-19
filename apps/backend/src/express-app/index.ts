import { ConfigService } from '@backend/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { Service } from 'typedi';

@Service()
export class ExpressService {
  public app: Express;
  constructor(private configService: ConfigService) {
    this.app = express();
    this.initializeMiddlewares();
    this.setHeadersForApolloStudio();
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      cors({
        origin: [
          this.configService.frontendUrl,
          this.configService.apolloStudioUrl,
        ],
      }),
    );
  }

  setHeadersForApolloStudio() {
    this.app.set('trust proxy', this.configService.env !== 'production');
    this.app.set('Access-Control-Allow-Credentials', true);
  }
}
