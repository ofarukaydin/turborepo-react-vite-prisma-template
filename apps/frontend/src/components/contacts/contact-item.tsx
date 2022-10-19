import { Icon, IconButton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { EditContactItem } from "@/components/contacts/edit-item";
import { useDeleteContactByIdMutation } from "@/graphql/generated";
import { gqlClient } from "@/utils/graphql-client";

type Props = {
  id: string;
  firstname: string;
  lastname: string;
  number: string;
};

export const ContactItem = ({
  id,
  firstname,
  lastname,
  number,
}: Props): JSX.Element => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteContactByIdMutation(gqlClient, {
    onSuccess: () => queryClient.invalidateQueries(["GetAllContacts"]),
  });
  const [isEditing, setIsEditing] = useState(false);

  async function onDelete() {
    await mutateAsync({
      deleteContactByIdId: id,
    });
  }

  function onClose() {
    setIsEditing(false);
  }

  function onEdit() {
    setIsEditing(true);
  }

  return isEditing ? (
    <EditContactItem
      id={id}
      firstname={firstname}
      lastname={lastname}
      number={number}
      onClose={onClose}
    />
  ) : (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Stack direction="column" spacing={1}>
        <Typography variant="h5">
          {firstname} {lastname}
        </Typography>
        <Stack direction="row" color="#ABAFB5" spacing={1} alignItems="center">
          <Icon sx={{ fontSize: 13 }}>phone</Icon>
          <span>{number}</span>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="edit" onClick={onEdit}>
          <Icon>edit</Icon>
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          <Icon>delete</Icon>
        </IconButton>
      </Stack>
    </Stack>
  );
};
