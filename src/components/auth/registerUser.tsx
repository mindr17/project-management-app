import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";

import s from "./auth.module.scss";
import { useRouter } from "next/router";
import { registerUser } from "../../store/thunk";
import { useEffect } from "react";
import { callReset } from "../../store/sliceAuth";
import Preloader from "../preloader/Preloader";

interface IFormSignUp {
  name: string;
  login: string;
  password: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, user } = useAppSelector(
    (state) => state.auth
  );
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignUp>();

  useEffect(() => {
    if (isError) {
      console.log("error message", message); // TO DO
    }
    if (isSuccess || user) {
      router.push("/login");
    }
    dispatch(callReset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onSubmit = (formData: IFormSignUp) => {
    dispatch(registerUser(formData));
    reset();
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((formData) => {
          onSubmit(formData);
        })}
      >
        <input
          type="text"
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
          placeholder="Enter your name"
        />

        <div className={s.errorForm}>{errors.name?.message}</div>

        <input
          type="text"
          {...register("login", {
            required: "Please enter login",
            minLength: {
              value: 3,
              message: "login must contain more than 3 letters",
            },
          })}
          placeholder="Enter your login"
        />
        <div className={s.errorForm}>{errors.login?.message}</div>

        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: {
              value: 5,
              message: "password must contain more than 5 characters",
            },
          })}
          placeholder="Enter your password"
        />
        <div className={s.errorForm}>{errors.password?.message}</div>

        <button>Register</button>
      </form>
      <Link href={"/login"}>login</Link>
    </>
  );
}