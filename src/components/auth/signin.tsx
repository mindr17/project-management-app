import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setToken } from "../../store/sliceAuth";
import { BASE_URL } from "../server/server";

export default function SignIn() {
  const dispatch = useAppDispatch();
  // const router = useRouter();
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

  const hendleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createToken();

    setLogin("");
    setPass("");
    router.push("/");
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
