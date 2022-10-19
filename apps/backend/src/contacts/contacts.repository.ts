import { PrismaService } from '@backend/prisma/prisma.service';
import { Contact } from '@prisma/client';
import { Service } from 'typedi';

interface ContactRepositoryContract {
  create: (
    firstname: string,
    lastname: string,
    number: string,
  ) => Promise<Contact>;
  updateById: (
    id: Contact['id'],
    fields: Partial<Omit<Contact, 'id'>>,
  ) => Promise<Contact>;
  deleteById: (id: string) => Promise<Contact>;
  getAll: () => Promise<Contact[]>;
  getById: (id: string) => Promise<Contact | null>;
  searchByLastName: (lastname: string) => Promise<Contact[]>;
}

@Service()
export class ContactRepository implements ContactRepositoryContract {
  constructor(private prisma: PrismaService) {}

  async searchByLastName(lastname: string) {
    return this.prisma.contact.findMany({
      where: {
        lastname: {
          startsWith: lastname,
        },
      },
    });
  }

  async deleteById(id: string) {
    return this.prisma.contact.delete({
      where: { id },
    });
  }

  async updateById(id: string, data: Partial<Omit<Contact, 'id'>>) {
    return this.prisma.contact.update({
      where: { id },
      data,
    });
  }

  async create(firstname: string, lastname: string, number: string) {
    const user = await this.prisma.contact.create({
      data: {
        firstname,
        lastname,
        number,
      },
    });

    return user;
  }

  async getById(id: string) {
    return this.prisma.contact.findFirst({
      where: { id },
    });
  }

  async getAll() {
    return this.prisma.contact.findMany();
  }
}
