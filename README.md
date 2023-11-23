# Açıklama

**createSlice=** bize `global state` alanı tanımlar. `name` ,`initalState` , `reducer` ve `extraReducer` parametreleri alarak yönetim ortamını oluşturur.

```javascript
import {createSlice } from "@reduxjs/toolkit";
  const userSlice = createSlice({
    name: '',
    initialState : {}
    reducers: {

    },
    extraReducers: () => {

  }});

```

**configureStore=** ise bir `reducer` parametresi ile beraber oluşturulan `global statelerimizi` dışarıya aktarmaya yarar. genel olarak `store` diye adlandırılır

```javascript
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./usersSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
export default store;
```

**Provider=** ise ismindende anlaşılacagı gibi saglayıcıdır. `configureStore` ile dışarı aktardıgımız `global statelere` ulaşmak istedigimiz alanları kavrayarak bize erişim imkanı tanır.

```javascript

export default store
  import store from "@/store"
import { Provider } from "react-redux"
export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}
```

**useSelector=** bir `global state` ulaşma yani read alanıdır burda sadece `createSlice` ile oluşturulan `reducer` okuma imkanı tanır.

**useDispatch=** ise bizim `global state` üzerinde aksiyona gecmemize yarayan bir `global state'i` belirli bir aksiyona göre degistirmemize yarar

```javascript
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "@/store/usersSlice";
export default function Navbar() {
const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
   const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logOutUser())
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

    {
      user ? (
        <Button color="inherit" onClick={handleLogout}> Log out</Button>
      ): (
        <Button
        onClick={() => router.push("/login")}
         color="inherit">
        Login</Button>
      )
    }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

```

**createAsyncThunk=** api isteklerini `redux toolkit` ile gerceklestirmemize yarayan `asenkron` calısan bir fonksiyondur
**reducer=**  `global statede` `senkron` sekilde gerceklestimrek istedigimiz fonksiyonları yazdıgımız yerdir

```javascript
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isLoggedIn: false,
    isSignIn: false,
    signUser: null,
    error: null,
}
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          'https://reqres.in/api/login',
          userData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  );

export const sigInUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          'https://reqres.in/api/register',
          userData
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  );

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      logOutUser: (state) => {
        state.user = null;
        state.isLoggedIn = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isLoggedIn = true;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload || 'Giris Yapilamadi';
        }).addCase(sigInUser.fulfilled, (state,action) =>{
            state.signUser = action.payload,
            state.isSignIn= true
        })
    },
  });
  
  export const { logOutUser } = userSlice.actions;
  export default userSlice.reducer; 
```


