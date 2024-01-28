import { Avatar, AvatarProps } from '@mui/material';
import { getColorFromString } from '../../utils';
import { CheckRounded, PersonRounded } from '@mui/icons-material';

interface IPropsAvatarWithFallBack {
  name: string;
  selected?: boolean;
  sx?: AvatarProps['sx'];
}

const AvatarWithFallBack = ({
  name,
  selected,
  sx,
}: IPropsAvatarWithFallBack) => {
  const trimmedName = name?.trim?.();

  return (
    <Avatar
      sx={{
        background: getColorFromString(trimmedName, {
          lightness: selected ? 30 : 65,
          saturation: selected ? 0 : 80,
          gradient: true,
        }),
        width: '3rem',
        height: '3rem',
        ...sx,
      }}
    >
      {selected && <CheckRounded />}
      {!selected && (
        <>
          {trimmedName?.length > 0 && trimmedName[0]}
          {(!trimmedName || trimmedName?.length == 0) && <PersonRounded />}
        </>
      )}
    </Avatar>
  );
};

export default AvatarWithFallBack;
