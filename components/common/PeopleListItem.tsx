import {
  Box,
  Card,
  CardProps,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  MenuItemProps,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  MenuOpen,
  MoreHorizRounded,
  MoreVertRounded,
} from '@mui/icons-material';
import CurrencyWrapper from './CurrencyWrapper';
import AvatarWithFallBack from './AvatarWithFallBack';
import { getCurrencyColor } from '../../utils';
import { MouseEventHandler, useRef, useState } from 'react';

interface IPropsPeopleListItem {
  name: string;
  balance: number | string;
  id?: string | number;
  selected?: boolean;
  onClick?: CardProps['onClick'];
  onActionBtnClick?: IconButtonProps['onClick'];
  onCheck?: IconButtonProps['onClick'];
  menuItems?: {
    label: string;
    onClick: MenuItemProps['onClick'];
  }[];
}

const PeopleListItem = ({
  name,
  balance,
  id,
  selected,
  onClick,
  onActionBtnClick,
  onCheck,
  menuItems,
}: IPropsPeopleListItem) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    onActionBtnClick?.(event);
    if (Array.isArray(menuItems) && menuItems.length > 0)
      setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const stopDefault =
    (fn: IconButtonProps['onClick'] | CardProps['onClick']) =>
    (...args: any[]) => {
      const e = args?.[0];
      if (!e || !fn) return;

      e.preventDefault();
      e.stopPropagation();

      (fn as Function)?.apply(null, args);
    };

  return (
    <>
      <Card
        sx={{
          p: '1rem',
          overflow: 'auto',
          border: '1px solid transparent',
          borderRadius: '0.5rem',
          '&:hover': {
            borderColor: '#aaa',
          },
        }}
        onClick={onClick}
      >
        <Stack direction="row" spacing="1rem">
          <IconButton onClick={stopDefault(onCheck)} sx={{ p: 0 }}>
            <AvatarWithFallBack name={name} selected={selected} />
          </IconButton>
          <Stack
            direction="row"
            flexWrap="wrap"
            alignItems="center"
            justifyContent="space-between"
            gap="0.5rem"
            flex={1}
          >
            <Box>
              <Typography
                fontWeight="500"
                component="h2"
                textOverflow="ellipsis"
              >
                {name}
              </Typography>
              {id && (
                <Typography component="p" color="#555" fontSize="0.8rem">
                  {id}
                </Typography>
              )}
            </Box>

            <Box fontSize="1rem" color={getCurrencyColor(balance)}>
              <CurrencyWrapper>{balance}</CurrencyWrapper>
            </Box>
          </Stack>
          <Stack justifyContent="center">
            <IconButton onClick={stopDefault(handleMenuOpen)}>
              <MoreVertRounded />
            </IconButton>
          </Stack>
        </Stack>
      </Card>

      <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
        {menuItems?.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default PeopleListItem;
