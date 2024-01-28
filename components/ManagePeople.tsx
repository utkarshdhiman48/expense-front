import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Fade,
  Stack,
  TextField,
} from '@mui/material';
import PeopleListItem from './common/PeopleListItem';
import { AddRounded, DeleteRounded } from '@mui/icons-material';
import { ChangeEventHandler, useState } from 'react';
import AvatarWithFallBack from './common/AvatarWithFallBack';

interface IPerson {
  name: string;
  balance: number | string;
  id: string;
  selected?: boolean;
}

const emptyPerson: IPerson = {
  name: '',
  balance: '',
  id: '',
};

const ManagePeople = () => {
  const [showPopup, setShowPopup] = useState<'add' | 'settle' | ''>('');
  const [currentUser, setCurrentuser] = useState<IPerson>(emptyPerson);
  const [people, setPeople] = useState([
    {
      name: 'Utkarsh Dhiman',
      balance: 2000,
      id: 'utkarshdhiman48@gmail.com',
      selected: false,
    },
  ]);

  const handleUserChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCurrentuser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const someCategoryIsSelected = people.some((people) => people.selected);

  const clearAndClose = () => {
    setShowPopup('');
    setCurrentuser({ ...emptyPerson });
  };

  const handleAddUser = () => {
    setPeople((prev) => [
      ...prev,
      { ...currentUser, balance: 0, selected: false },
    ]);

    clearAndClose();
  };

  return (
    <Container sx={{ p: '1rem' }}>
      <Stack spacing="0.5rem">
        {people.map((item) => (
          <PeopleListItem
            name={item.name}
            balance={item.balance}
            id={item.id}
            key={item.id}
            selected={item.selected}
            onClick={console.log}
            onCheck={() =>
              setPeople((prev) =>
                prev.map((person) =>
                  person.id === item.id
                    ? { ...item, selected: !item.selected }
                    : item
                )
              )
            }
          />
        ))}
      </Stack>

      {/* FAB */}
      <Fade in>
        <Fab
          color={someCategoryIsSelected ? 'error' : 'primary'}
          sx={(theme) => ({
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            [theme.breakpoints.up('sm')]: {
              bottom: '3rem',
              right: '3rem',
            },
          })}
          onClick={() =>
            setShowPopup(someCategoryIsSelected ? 'settle' : 'add')
          }
          variant={someCategoryIsSelected ? 'extended' : 'circular'}
        >
          {someCategoryIsSelected ? 'Settle Up' : <AddRounded />}
        </Fab>
      </Fade>

      {/* add */}
      <Dialog
        fullWidth
        open={showPopup === 'add'}
        onClose={() => setShowPopup('')}
      >
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent sx={{ my: '1rem' }}>
          <Stack alignItems="center" mt={'1rem'} mb={'2rem'}>
            <AvatarWithFallBack
              name=""
              sx={{
                width: '5rem',
                height: '5rem',
              }}
            />
          </Stack>
          <Stack spacing="1rem">
            <TextField
              name="name"
              label="Name"
              value={currentUser.name}
              onChange={handleUserChange}
              margin="dense"
              size="small"
            />
            <TextField
              name="id"
              label="Id"
              value={currentUser.id}
              onChange={handleUserChange}
              margin="dense"
              size="small"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose}>Cancel</Button>
          <Button onClick={handleAddUser}>Done</Button>
        </DialogActions>
      </Dialog>

      {/* edit */}
      <Dialog
        fullWidth
        open={showPopup === 'settle'}
        onClose={() => setShowPopup('')}
      >
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent sx={{ my: '1rem' }}>
          <TextField size="small" label="New Value" margin="dense" fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose}>Cancel</Button>
          <Button>Done</Button>
        </DialogActions>
      </Dialog>

      {/* delete */}
      {/* <Dialog fullWidth open={showPopup === 'confirm'} onClose={()=>setShowPopup('')}>
        <DialogTitle>Are you Sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be deleting selected categories
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setShowPopup('')}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog> */}
    </Container>
  );
};

export default ManagePeople;
