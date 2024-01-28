import {
  Filter1,
  FilterAltRounded,
  FilterListRounded,
  FilterRounded,
  SearchRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  InputBase,
  OutlinedInput,
  OutlinedInputProps,
  Stack,
  TextField,
} from '@mui/material';

interface IPropsSearchFilter {
  hide?: {
    search?: boolean;
    filter?: boolean;
  };
  search: string;
  handleSearch: OutlinedInputProps['onChange'];
}

const SearchFilter = ({
  hide = { search: true, filter: true },
  search,
  handleSearch,
}: IPropsSearchFilter) => {
  return (
    <Stack direction="row" spacing="0.5rem" py="1rem">
      {hide.search && (
        <OutlinedInput
          size="small"
          fullWidth
          startAdornment={
            <SearchRounded htmlColor="#888" sx={{ marginRight: '0.5rem' }} />
          }
          sx={{ borderRadius: '0.5rem' }}
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      )}
      {hide.filter && (
        <Button size="small" variant="outlined" sx={{ borderRadius: '0.5rem' }}>
          <FilterListRounded sx={{ marginRight: '0.5rem' }} />
          Filter
        </Button>
      )}
    </Stack>
  );
};

export default SearchFilter;
