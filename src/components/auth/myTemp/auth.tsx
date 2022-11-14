import axios from "axios";
// import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
// // import { setResponsesAuth, setToken } from "../../../store/sliceAuth";

// type ResponsesAuth = {
//   id: string;
//   name: string;
//   login: string;
// };

// const BASE_URL = "http://localhost:4000";

// const getDataFromInput = {
//   name: "test9",
//   login: "test9",
//   password: "test",
// };

// const getDataFromStore = {
//   login: "test9",
//   password: "test",
// };

// export default function Auth() {
//   const dispatch = useAppDispatch();
//   const { token, password, responsesAuth } = useAppSelector(
//     (state) => state.auth
//   );

//   const createUser = () => {
//     axios({
//       method: "post",
//       url: `${BASE_URL}/signup`,
//       data: getDataFromInput,
//     }).then(function (response) {
//       dispatch(setResponsesAuth(response.data));
//     });
//   };
//   const signIn = () => {
//     axios({
//       method: "post",
//       url: `${BASE_URL}/signin`,
//       data: getDataFromStore,
//     }).then(function (response) {
//       console.log("response", response);

//       dispatch(setToken(response.data.token));
//     });
//   };

//   const getAllUsers = () => {
//     axios
//       .get(`${BASE_URL}/users`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(function (response) {
//         console.log("getAllUsers: ", response.data);
//       });
//   };

//   const deleteUser = () => {
//     axios
//       .delete(`${BASE_URL}/users/${responsesAuth.id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then(function (response) {
//         console.log("delete:", response);
//       });
//   };

//   console.log("responsesAuth: ", responsesAuth);
//   console.log("token: ", token);

//   return (
//     <>
//       <button onClick={() => createUser()}>create User</button>
//       <button onClick={() => signIn()}>signIn</button>
//       <button onClick={() => deleteUser()}>Delet User</button>
//       <button onClick={() => getAllUsers()}>get All Users</button>

//     </>
//   );
// }
