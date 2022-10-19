import { Contact } from '@prisma/client';
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateContactInput implements Partial<Contact> {
  @Field()
  firstname!: string;

  @Field()
  lastname!: string;

  @Field()
  number!: string;
}
