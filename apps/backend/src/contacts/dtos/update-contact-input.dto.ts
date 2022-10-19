import { Contact } from '@prisma/client';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateContactInput implements Partial<Contact> {
  @Field()
  id!: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  number?: string;
}
