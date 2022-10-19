import { Container } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ContactContainer } from "@/components/contacts/container";
import { SearchContextWrapper } from "@/utils/search-value.context";

const queryClient = new QueryClient();

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
