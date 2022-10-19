import { Stack } from "@mui/material";

import { AddContact } from "@/components/contacts/add-contact";
import { ContactList } from "@/components/contacts/contact-list";
import { ContactSearch } from "@/components/contacts/contact-search";
import { Logo } from "@/components/contacts/logo";

export const ContactContainer = (): JSX.Element => {
  return (
    <Stack spacing={2}>
      <Logo />
      <AddContact />
      <ContactSearch />
      <ContactList />
    </Stack>
  );
};
