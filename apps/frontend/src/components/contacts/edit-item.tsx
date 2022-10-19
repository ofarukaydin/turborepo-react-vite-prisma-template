import { Icon, IconButton, Stack, TextField } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useUpdateContactByIdMutationMutation } from "@/graphql/generated";
import { gqlClient } from "@/utils/graphql-client";

type Props = {
  id: string;
  firstname: string;
  lastname: string;
  number: string;
  onClose: () => void;
};

export const EditContactItem = (props: Props): JSX.Element => {
  const [firstName, setFirstName] = useState(props.firstname);
  const [lastName, setLastName] = useState(props.lastname);
  const [number, setNumber] = useState(props.number);

  const queryClient = useQueryClient();
  const { mutateAsync } = useUpdateContactByIdMutationMutation(gqlClient, {
    onSuccess: () => queryClient.invalidateQueries(["GetAllContacts"]),
  });

  async function onComplete() {
    await mutateAsync({
      contactInfo: {
        id: props.id,
        firstname: firstName,
        lastname: lastName,
        number,
      },
    });
    props.onClose();
  }

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={4}>
        <TextField
          required
          id="firstname"
          label="First name"
          value={firstName}
          variant="standard"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          required
          id="lastname"
          label="Last name"
          value={lastName}
          variant="standard"
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          required
          id="number"
          label="Number"
          type="number"
          value={number}
          variant="standard"
          onChange={(e) => setNumber(e.target.value)}
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="cancel" onClick={props.onClose}>
          <Icon>cancel</Icon>
        </IconButton>
        <IconButton aria-label="success" onClick={onComplete}>
          <Icon>done</Icon>
        </IconButton>
      </Stack>
    </Stack>
  );
};
