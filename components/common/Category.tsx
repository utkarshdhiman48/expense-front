import { Chip, ChipProps } from '@mui/material';
import { getColorFromString } from '../../utils';
export interface ICategory {
  title: string;
  id: string;
}

interface IPropsCategory extends ChipProps {
  data: ICategory;
  outlined?: boolean;
  sx: ChipProps['sx'];
}

export function Category({
  data,
  outlined,
  sx,
  ...rest
}: IPropsCategory): JSX.Element {
  return (
    <Chip
      size="small"
      label={data.title}
      sx={{
        background: outlined
          ? 'initial'
          : getColorFromString(data.title, { gradient: true }),
        borderColor: outlined ? getColorFromString(data.title) : 'initial',
        color: outlined ? getColorFromString(data.title) : 'initial',
        ...sx,
      }}
      variant={outlined ? 'outlined' : 'filled'}
      {...rest}
    />
  );
}
