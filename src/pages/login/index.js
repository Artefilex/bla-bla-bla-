import { Button, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import Link from "next/link";
import { loginShema } from "@/helpers/validation";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: "",
    },
    validationSchema: loginShema,
    onSubmit: async (values) => {},
  });

  return (
    <Container
      sx={{
        width: "600px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          onBlur={formik.handleBlur}
        />
        <TextField
          fullWidth
          id="username"
          name="username"
          label="User Name"
          value={formik.values.username}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          onBlur={formik.handleBlur}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          margin="normal"
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          onBlur={formik.handleBlur}
          type="password"
        />
     
        <Button color="primary" variant="contained" fullWidth type="submit"> Login </Button>
        <Link href={"/sign-up"}> Hala üye olmadın mı   </Link>
      </form>
    </Container>
  );
}
