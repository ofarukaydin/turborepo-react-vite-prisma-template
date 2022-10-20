import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { useCreateContactMutation } from "@/graphql/generated";
import { gqlClient } from "@/utils/graphql-client";

export const AddContact = (): JSX.Element => {
  const [showAddContact, setShowAddContact] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const queryClient = useQueryClient();

  function resetState() {
    setFirstName("");
    setLastName("");
    setNumber("");
    setShowAddContact(false);
  }

  const { mutateAsync, isLoading } = useCreateContactMutation(gqlClient, {
    onError: resetState,
    onSuccess: () => queryClient.invalidateQueries(["GetAllContacts"]),
  });

  async function onAdd() {
    await mutateAsync({
      contact: {
        firstname: firstName,
        lastname: lastName,
        number: number,
      },
    });
    resetState();
  }

  return (
    <Stack spacing={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h4">Contacts</Typography>
        <Button onClick={() => setShowAddContact(true)}>Add Contact</Button>
      </Stack>
      <Modal
        open={showAddContact}
        aria-labelledby="add-contact-title"
        aria-describedby="add-contact-modal"
        onClose={resetState}
      >
        <Stack
          direction="column"
          spacing={2}
          border="1px solid #ABAFB5"
          borderRadius={2}
          padding={2}
          sx={modalStyle}
        >
          <Typography variant="h4">Add new contact</Typography>
          <Stack direction="column" spacing={2}>
            <TextField
              required
              id="firstname"
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              required
              id="lastname"
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              required
              id="number"
              label="Number"
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button aria-label="cancel" onClick={resetState}>
              Cancel
            </Button>
            <Button aria-label="success" disabled={isLoading} onClick={onAdd}>
              Add
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </Stack>
  );
};

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
