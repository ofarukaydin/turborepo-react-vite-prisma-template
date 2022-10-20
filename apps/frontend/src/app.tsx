import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClientProvider } from "@tanstack/react-query";

import { ContactContainer } from "@/components/contacts/container";
import { queryClient } from "@/utils/react-query-client";
import { SearchContextWrapper } from "@/utils/search-value.context";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchContextWrapper>
        <CssBaseline />
        <Container
          sx={{
            backgroundColor: "rgb(246,246,246)",
            padding: 4,
          }}
        >
          <ContactContainer />
        </Container>
      </SearchContextWrapper>
    </QueryClientProvider>
  );
}
