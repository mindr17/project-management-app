import { createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../components/server/server';
import axios from "axios";

// const getDataFromInput = {
//     name: "test14",
//     login: "test14",
//     password: "test",
// };

// export const fetchAuth = createAsyncThunk(
//     'auth/fetchAuth',
//     async function (_, { rejectWithValue }) {
//         console.log('ok', _);
//         const response = await fetch(`${BASE_URL}/signup`, {
//             method: "post",
//             body: JSON.stringify(getDataFromInput)
//         });
//         if (!response.ok) {
//             return rejectWithValue('Server Error!');
//         }
//         const data = await response.json();
//         console.log('data', data);

//         return data.results;

//     }
// );
// export const fetchAuth = createAsyncThunk(
//     'auth/fetchAuth',
//     async function (_, { rejectWithValue }) {
//         const response = axios({
//             method: "post",
//             url: `${BASE_URL}/signup`,
//             data: {
//                 /*    name: name,
//                    login: login,
//                    password: pass, */
//             },
//         })
//         /* .then(function (response) {
//         dispatch(setResponsesAuth(response.data));
//       }); */
//         if (!response.ok) {
//             return rejectWithValue('Server Error!');
//         }
//         const dataAuth = await response.json();
//         console.log(dataAuth.results);

//         return dataAuth.results;
//     }
// );

// async function (_, { rejectWithValue }) {
//     const response = await fetch(`${BASE_URL}`);
//     if (!response.ok) {
//       return rejectWithValue('Server Error!');
//     }
//     const data: IData = await response.json();
//     return data.results;
//   }
