import axios from "axios";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setToken } from "../../store/sliceAuth";
import { BASE_URL } from "../server/server";

export default function SignIn() {
  const dispatch = useAppDispatch();
  // const { token, password, responsesAuth } = useAppSelector(
  //   (state) => state.auth
  // );

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");

  const hendleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const hendlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const hendleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createToken();
    setLogin("");
    setPass("");
    console.log("SignIn redy");
  };

  const createToken = () => {
    axios({
      method: "post",
      url: `${BASE_URL}/signin`,
      data: {
        login: login,
        password: pass,
      },
    }).then((response) => {
      dispatch(setToken(response.data.token));
    });
  };

  return (
    <>
      <form onSubmit={(e) => hendleSubmit(e)}>
        <input
          type="text"
          placeholder="login"
          value={login}
          onChange={(e) => {
            hendleLogin(e);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={pass}
          onChange={(e) => {
            hendlePassword(e);
          }}
        />
        <button>Login</button>
      </form>
      <Link href={"/register"}>Register</Link>
    </>
  );
}
