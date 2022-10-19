import { ContactsResolver } from '@backend/contacts/contacts.resolver';
import { PrismaService } from '@backend/prisma/prisma.service';
import { BuildSchemaOptions } from 'type-graphql';
import Container, { Service } from 'typedi';

@Service()
export class ApolloServerConfig {
  constructor(private prismaService: PrismaService) {}

  public apolloServerConfig = {
    context: this.buildContext(),
    debug: true,
    introspection: true,
  };

  public schemaOptions: BuildSchemaOptions = {
    resolvers: [ContactsResolver],
    container: Container,
  };

  buildContext() {
    return () => ({
      prisma: this.prismaService,
    });
  }
}
