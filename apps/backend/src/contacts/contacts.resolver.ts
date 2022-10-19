import { CreateContactInput } from '@backend/contacts/dtos/create-contact-input.dto';
import { UpdateContactInput } from '@backend/contacts/dtos/update-contact-input.dto';
import { Contact } from '@generated/type-graphql';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';

import { ContactsService } from './contacts.service';

@Service()
@Resolver()
export class ContactsResolver {
  constructor(private contactsService: ContactsService) {}

  @Query(() => [Contact])
  async getAllContacts() {
    return await this.contactsService.getAll();
  }

  @Query(() => Contact)
  async getContactById(@Arg('id') id: string) {
    return this.contactsService.getById(id);
  }

  @Query(() => [Contact])
  async searchByLastName(@Arg('lastname') lastname: string) {
    return this.contactsService.searchByLastName(lastname);
  }

  @Mutation(() => Contact)
  async deleteContactById(@Arg('id') id: string) {
    return this.contactsService.deleteById(id);
  }

  @Mutation(() => Contact)
  async createContact(
    @Arg('contact') { firstname, lastname, number }: CreateContactInput,
  ) {
    return this.contactsService.create(firstname, lastname, number);
  }

  @Mutation(() => Contact)
  async updateContactById(
    @Arg('contactInfo') { id, ...fields }: UpdateContactInput,
  ) {
    return this.contactsService.updateById(id, fields);
  }
}
