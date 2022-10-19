import { Icon, InputAdornment, TextField } from "@mui/material";
import debounce from "lodash.debounce";
import { useCallback, useEffect, useMemo } from "react";

import { useSearchContext } from "@/utils/search-value.context";

export const ContactSearch = (): JSX.Element => {
  const { setFilter } = useSearchContext();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilter(e.target.value);
    },
    [setFilter]
  );

  const debouncedResults = useMemo(() => {
    return debounce(onChange, 200);
  }, [onChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <TextField
      id="search_contacts"
      label="Search for contact by last name"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        ),
      }}
      onChange={debouncedResults}
    />
  );
};
