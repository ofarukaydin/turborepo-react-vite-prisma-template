import { ContactRepository } from '@backend/contacts/contacts.repository';
import { Contact } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class ContactsService {
  constructor(private readonly contactRepository: ContactRepository) {}

  async create(firstname: string, lastname: string, number: string) {
    return this.contactRepository.create(firstname, lastname, number);
  }

  async deleteById(id: string) {
    return this.contactRepository.deleteById(id);
  }

  async updateById(id: string, fields: Partial<Omit<Contact, 'id'>>) {
    return this.contactRepository.updateById(id, fields);
  }

  async getById(id: string) {
    return this.contactRepository.getById(id);
  }

  async getAll() {
    return this.contactRepository.getAll();
  }

  async searchByLastName(lastname: string) {
    return this.contactRepository.searchByLastName(lastname);
  }
}
