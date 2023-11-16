import {
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
  } from '@mui/material';
  import axios from 'axios';
  import { useFormik } from 'formik';
  import { useRouter } from 'next/router';
  import { useEffect, useState } from 'react';
  import { BookSchema } from '@/helpers/validation';  
// import DeleteItem from '@/componets/DeleteItem';

const EditBook = () => {
    const router = useRouter();
    const { id } = router.query;

    const [loading, setLoading] = useState(false);
   
    const formik = useFormik({
      initialValues: {
        title: '',
        author: '',
        description: '',
        currency: '',
        price: '',
        imageUrl: '',
      },
      validationSchema: BookSchema,
      onSubmit: async (values) => {
        axios
        .put(`http://localhost:3001/books/${id}`, values)
        .then(() => {
          alert('Book updated successfully!');
          router.push('/');
        })
        .catch((error) => {
          alert('Failed to update book');
          console.log(error)
        });
      },
    });

    useEffect(() => {
      const fetchBookData = async () => {
        setLoading(true);
        try {
          const response = await new Promise((resolve, reject) => {
            setTimeout(() => {
              axios
                .get(`http://localhost:3001/books/${id}`)
                .then(resolve)
                .catch(reject);
            }, 2000);
          });
          formik.setValues(response.data);
      
        } catch (error) {
          console.error('Error!!!', error);
        }

        setLoading(false);
      };
      if (id) fetchBookData();
    },[id]);
  
    //   if (loading) {
    //     return <CircularProgress />;
  
    return (
      
      <Container>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            Edit Book
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                margin="normal"
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                onBlur={formik.handleBlur}
              />
              <TextField
                fullWidth
                id="author"
                name="author"
                label="Autor"
                value={formik.values.author}
                onChange={formik.handleChange}
                margin="normal"
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                onBlur={formik.handleBlur}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                margin="normal"
                multiline
                rows={4}
                error={
                  formik.touched.description && Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                onBlur={formik.handleBlur}
              />
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <FormControl fullWidth>
                  <InputLabel id="currency">Currency</InputLabel>
                  <Select
                    labelId="currency"
                    id="currency"
                    name="currency"
                    label="Currency"
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value="TRY">TRY</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="EUR">EUR</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  margin="normal"
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  onBlur={formik.handleBlur}
                />
              </Stack>
              <TextField
                fullWidth
                id="imageUrl"
                name="imageUrl"
                label="Image"
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                margin="normal"
                error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                helperText={formik.touched.imageUrl && formik.errors.imageUrl}
              />
              <Button color="primary" variant="contained" fullWidth type="submit">
                Update Book
              </Button>
            </form>
          </Typography>
        </Stack>
        {/* <Button color="primary" variant="contained" fullWidth onClick={handleDelete}  >
                Delete Book
              </Button> */}
          {/* <DeleteItem itemId={id} />     */}
      </Container>
    );
  };
  
  export default EditBook;