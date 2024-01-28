import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Fade,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { Category, ICategory } from './common/Category';
import {
  AddRounded,
  DeleteForeverRounded,
  DeleteRounded,
} from '@mui/icons-material';
import { getColorFromString } from '../utils';
import { HOLD_DELAY } from '../constants';

interface ICategoryCustom extends ICategory {
  selected?: boolean;
}

const ManageCategories = () => {
  const [categories, setCategories] = useState<ICategoryCustom[]>([]);
  const [showPopup, setShowPopup] = useState<'confirm' | 'add' | 'edit' | null>(
    null
  );
  const [newCategories, setNewCategories] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editCategoryValue, setEditCategoryValue] = useState<string>('');
  let clickTime = Date.now();
  let mouseOnHold = false;

  useEffect(() => {
    setCategories([
      { id: '32434', title: 'Travel' },
      { id: '8216324123', title: 'Bills' },
      { id: '821653243432423', title: 'Entertainment' },
      { id: '82165312312234324', title: 'Food' },
      { id: '8123123', title: 'Transportation' },
    ]);
  }, []);

  const handleUp =
    (id: string): MouseEventHandler =>
    () => {
      if (Date.now() - clickTime > HOLD_DELAY) return;

      setCategories((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, selected: !item.selected } : item
        )
      );

      mouseOnHold = false;
    };

  const handleDown =
    (id: string): MouseEventHandler =>
    () => {
      clickTime = Date.now();
      mouseOnHold = true;

      setTimeout(() => {
        if (!mouseOnHold) return;

        setShowPopup('edit');
        setEditId(id);
      }, HOLD_DELAY);
    };

  const clearAndClose = () => {
    setShowPopup(null);
    setNewCategories([]);
    setEditId(null);
    setEditCategoryValue('');
  };

  const handleEdit = () => {
    if (!editCategoryValue || !editId) return;

    setCategories((prev) =>
      prev.map((item) =>
        item.id === editId ? { ...item, title: editCategoryValue } : item
      )
    );

    clearAndClose();
  };

  const handleDelete = () => {
    setCategories((prev) => prev.filter((item) => !item.selected));
    clearAndClose();
  };

  const handleAdd = () => {
    if (newCategories?.length > 0) {
      const newCategories_ = newCategories.map((category) => ({
        title: category,
        id: Math.random().toString().substring(2),
      }));

      setCategories((prev) => [...prev, ...newCategories_]);
    }

    clearAndClose();
  };

  const isAnyCategorySelected = categories.some(
    (category) => category.selected
  );

  return (
    <Container sx={{ p: '1rem' }}>
      {/* title */}
      <Box sx={{ mt: '2rem', mb: '1rem' }}>
        <Typography
          component={'h2'}
          sx={{ fontWeight: 500, fontSize: '1.2rem' }}
        >
          Manage Categories
        </Typography>
      </Box>

      {/* listing */}
      <Stack direction="row" flexWrap="wrap" gap={'0.5rem'}>
        {categories.map((category) => (
          <Category
            key={category.id}
            sx={{
              animationDelay: !category.selected
                ? Math.random() + 's'
                : 'unset',
              textDecoration: category.selected ? 'line-through' : 'unset',
              ...(category.selected
                ? { color: '#555', borderColor: '#555' }
                : {}),
            }}
            data={category}
            className={
              isAnyCategorySelected && !category.selected ? 'shake-element' : ''
            }
            outlined={category.selected}
            onMouseUp={handleUp(category.id)}
            onMouseDown={handleDown(category.id)}
          />
        ))}

        <Category
          data={{ title: 'Add More', id: 'new' }}
          outlined
          sx={{ color: '#333', borderColor: '#333' }}
          onClick={() => setShowPopup('add')}
          icon={<AddRounded />}
        />
      </Stack>

      {/* FAB */}
      <Fade in={isAnyCategorySelected}>
        <Fab
          color="error"
          sx={(theme) => ({
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            [theme.breakpoints.up('sm')]: {
              bottom: '3rem',
              right: '3rem',
            },
          })}
          onClick={() => setShowPopup('confirm')}
        >
          <DeleteRounded />
        </Fab>
      </Fade>

      {/* add */}
      <Dialog fullWidth open={showPopup === 'add'} onClose={clearAndClose}>
        <DialogTitle>Add More</DialogTitle>
        <DialogContent sx={{ my: '1rem' }}>
          <Autocomplete
            multiple
            options={[]}
            size="small"
            freeSolo
            renderInput={(params) => (
              <TextField
                placeholder="Type and press enter to add multiple values"
                label="Categories"
                margin="dense"
                {...params}
              />
            )}
            value={newCategories}
            onChange={(e, value) => setNewCategories(value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose}>Cancel</Button>
          <Button disabled={newCategories.length === 0} onClick={handleAdd}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* edit */}
      <Dialog fullWidth open={showPopup === 'edit'} onClose={clearAndClose}>
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent sx={{ my: '1rem' }}>
          <TextField
            size="small"
            label="New Value"
            margin="dense"
            fullWidth
            value={editCategoryValue}
            onChange={(e) => setEditCategoryValue(e.currentTarget.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose}>Cancel</Button>
          <Button disabled={!!editCategoryValue} onClick={handleEdit}>
            Done
          </Button>
        </DialogActions>
      </Dialog>

      {/* delete */}
      <Dialog fullWidth open={showPopup === 'confirm'} onClose={clearAndClose}>
        <DialogTitle>Are you Sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You will be deleting selected categories
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearAndClose}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageCategories;
