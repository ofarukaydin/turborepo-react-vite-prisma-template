import { Divider, Stack, Typography } from "@mui/material";

import { ContactItem } from "@/components/contacts/contact-item";
import { useGetAllContactsQuery } from "@/graphql/generated";
import { gqlClient } from "@/utils/graphql-client";
import { useSearchContext } from "@/utils/search-value.context";

export const ContactList = (): JSX.Element => {
  const { data } = useGetAllContactsQuery(gqlClient);
  const { filter } = useSearchContext();

  const filteredValues = data?.getAllContacts.filter((contact) =>
    contact.lastname.toLocaleLowerCase().includes(filter)
  );

  const noItemFound =
    data?.getAllContacts.length && filteredValues?.length === 0;

  return (
    <Stack
      direction="column"
      divider={<Divider flexItem orientation="horizontal" />}
      spacing={2}
      border="1px solid #ABAFB5"
      padding={2}
      borderRadius={2}
    >
      {noItemFound && (
        <Typography variant="h4">Cannot find any contacts</Typography>
      )}
      {data?.getAllContacts.length ? (
        filteredValues?.map(({ id, firstname, lastname, number }) => (
          <ContactItem
            key={id}
            id={id}
            firstname={firstname}
            lastname={lastname}
            number={number}
          />
        ))
      ) : (
        <Typography variant="h4">
          No contacts to show yet. Please add some
        </Typography>
      )}
    </Stack>
  );
};
