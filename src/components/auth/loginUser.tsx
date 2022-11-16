import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import { login } from "../../store/thunk";
import { callReset } from "../../store/sliceAuth";
import { useEffect } from "react";
import Preloader from "../preloader/Preloader";
import s from "./auth.module.scss";

interface IFormSignIn {
  login: string;
  password: string;
}

export default function SignIn() {
  const dispatch = useAppDispatch();
  const { isError, isLoading, isSuccess, message, token } = useAppSelector(
    (state) => state.auth
  );  
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignIn>();

  useEffect(() => {
    if (isError) {
      console.log("error message", message);
    }
    if (isSuccess || token) {
      router.push("/");
    }
    dispatch(callReset());
  }, [token, isError, isSuccess, message, router, dispatch]);

  const onSubmit = (dataSignIn: IFormSignIn) => {
    dispatch(login(dataSignIn));
    reset();
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit((dataSignIn) => {
          onSubmit(dataSignIn);
        })}
      >
        <input
          type="text"
          {...register("login", {
            required: "Please enter login",
            minLength: {
              value: 3,
              message: "login must contain more than 3 letters",
            },
          })}
          placeholder="login"
        />
        <div className={s.errorForm}>{errors.login?.message}</div>

        <input
          type="password"
          placeholder="password"
          {...register("password", {
            required: "Please enter password",
            minLength: {
              value: 5,
              message: "password must contain more than 5 characters",
            },
          })}
        />
        <div className={s.errorForm}>{errors.password?.message}</div>
        <button>Login</button>
      </form>
      <Link href={"/register"}>Register</Link>
    </>
  );
}
