import 'reflect-metadata';

import { ApolloService } from '@backend/apollo/apollo.service';
import Container, { Service } from 'typedi';

@Service()
class Server {
  constructor(private apolloService: ApolloService) {}

  async initialize() {
    await this.apolloService.initialize();
  }
}

const server = Container.get(Server);
server.initialize();
