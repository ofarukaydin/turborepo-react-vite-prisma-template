import { ApolloServerConfig } from '@backend/apollo/apollo-config';
import { ConfigService } from '@backend/config';
import { ExpressService } from '@backend/express-app';
import { AppError } from '@backend/utils/error';
import { ApolloServer, ExpressContext, Config } from 'apollo-server-express';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { Service } from 'typedi';

type InitializeOptions = {
  schemaOptions: BuildSchemaOptions;
  apolloServerConfig: Omit<Config, 'schema'>;
};

@Service()
export class ApolloService {
  private _apolloServer?: ApolloServer<ExpressContext>;

  constructor(
    private expressService: ExpressService,
    private configService: ConfigService,
    private apolloServerConfig: ApolloServerConfig,
  ) {}

  async initializeApolloServerInstance({
    apolloServerConfig,
    schemaOptions,
  }: InitializeOptions) {
    const schema = await buildSchema(schemaOptions);

    this._apolloServer = new ApolloServer({
      schema,
      ...apolloServerConfig,
    });
  }

  async initialize() {
    await this.initializeApolloServerInstance(this.apolloServerConfig);
    await this.apolloServer.start();

    this.apolloServer.applyMiddleware({
      app: this.expressService.app,
    });

    this.expressService.app.listen(this.configService.port, () => {
      console.log(
        `Server started on port ${this.configService.port} (${this.configService.env})`,
      );
    });
  }

  get apolloServer() {
    if (!this._apolloServer) {
      throw new AppError({ message: 'No apollo server instance created' });
    }
    return this._apolloServer;
  }
}
