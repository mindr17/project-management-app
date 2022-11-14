import axios from "axios";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { setResponsesAuth } from "../../store/sliceAuth";
import { BASE_URL } from "../server/server";

export default function SignUp() {
  const dispatch = useAppDispatch();

  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const createUser = () => {
    axios({
      method: "post",
      url: `${BASE_URL}/signup`,
      data: {
        name: name,
        login: login,
        password: pass,
      },
    }).then(function (response) {
      dispatch(setResponsesAuth(response.data));
    });
  };

  const hendleLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const hendlePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };

  const hendleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const hendleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser();
    setLogin("");
    setPass("");
    setName("");
  };

  return (
    <>
      <form onSubmit={(e) => hendleSubmit(e)}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => {
            hendleName(e);
          }}
        />
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
        <button>Sign Up</button>
      </form>
      <Link href={"/login"}>login</Link>
    </>
  );
}
