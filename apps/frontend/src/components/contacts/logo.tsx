import { Icon, Stack, Typography } from "@mui/material";

export const Logo = (): JSX.Element => {
  return (
    <Stack
      justifyContent="center"
      direction="row"
      spacing={4}
      alignItems="center"
    >
      <Icon
        sx={{
          fontSize: 60,
        }}
      >
        contact_phone
      </Icon>
      <Typography variant="h3">Phone Book App</Typography>
    </Stack>
  );
};
