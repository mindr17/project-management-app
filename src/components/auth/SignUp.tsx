import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import s from "./auth.module.scss";
import { useRouter } from "next/router";
import { login, registerUser } from "../../store/auth/authThunk";
import { useEffect, useState } from "react";
import {
  callReset,
  ResponsesAuth,
  setToken,
  setUser,
} from "../../store/auth/sliceAuth";
import Preloader from "../Preloader/Preloader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IFormSignUp {
  name: string;
  login: string;
  password: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user, token } =
    useAppSelector((state) => state.auth);
  const router = useRouter();
  const defaultFile = { login: "", password: "" };
  const [loginAndPass, setLoginAndPass] = useState(defaultFile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignUp>();

  useEffect(() => {
    const lsUser =
      localStorage.getItem("user") &&
      (JSON.parse(localStorage.getItem("user") || "") as ResponsesAuth | null);
    if (lsUser && !user) {
      dispatch(setUser(lsUser));
    }

    const lsToken =
      localStorage.getItem("token") &&
      (JSON.parse(localStorage.getItem("token") || "") as string | null);
    if (lsToken && !token) {
      dispatch(setToken(lsToken));
    }
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(callReset());
    }

    if (isSuccess) {
      dispatch(callReset());
      if (!token) {
        dispatch(login(loginAndPass));
      }
    }

    if (user && token) {
      router.push("/");
    }
    setLoginAndPass(defaultFile);
  }, [token, isError, user]);

  const onSubmit = (formData: IFormSignUp) => {
    const { login, password } = formData;
    setLoginAndPass({ login, password });
    dispatch(registerUser(formData));
    reset();
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        className={s.form}
        onSubmit={handleSubmit((formData) => {
          onSubmit(formData);
        })}
      >
        <section>
          <label className={s.label} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            className={s.input}
            {...register("name", {
              required: "Please enter name",
              minLength: {
                value: 3,
                message: "name must contain more than 3 letters",
              },
              pattern: {
                value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/u,
                message: "name must be alphabetic",
              },
            })}
          />
          <div className={s.errorForm}>{errors.name?.message}</div>
        </section>
        <section>
          <label className={s.label} htmlFor="login">
            Login
          </label>
          <input
            id="login"
            type="text"
            className={s.input}
            {...register("login", {
              required: "Please enter login",
              minLength: {
                value: 3,
                message: "login must contain more than 3 letters",
              },
            })}
          />
          <div className={s.errorForm}>{errors.login?.message}</div>
        </section>
        <section>
          <label className={s.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className={s.input}
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 5,
                message: "password must contain more than 5 characters",
              },
            })}
          />
          <div className={s.errorForm}>{errors.password?.message}</div>
        </section>
        <button className={s.btn}>Register</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={false}
        style={{ fontSize: "2rem" }}
      />
      <p className={s.signUpLink}>
        Already have an account?{" "}
        <strong>
          <Link href={"/signin"}>Sign in</Link>
        </strong>
      </p>
    </>
  );
}
