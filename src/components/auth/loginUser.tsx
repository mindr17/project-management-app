import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import { getUserById, login } from "../../store/thunk";
import { callReset } from "../../store/sliceAuth";
import { useEffect } from "react";
import Preloader from "../preloader/Preloader";
import s from "./auth.module.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseJwt } from "../utilities/parseJwt";

interface IFormSignIn {
  login: string;
  password: string;
}
interface IParseToken {
  userId: string;
  iat: number;
  login: string;
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
      toast.error(message);
    }
    if (isSuccess || token) {
      router.push("/");
    }

    dispatch(callReset());
  }, [token, isError, isSuccess, message, router, dispatch]);

  const onSubmit = (formData: IFormSignIn) => {
    dispatch(login(formData));
    reset();
  };

  useEffect(() => {
    if (token) {
      const parseToken: IParseToken = parseJwt(token);
      const idAndToken = { id: parseToken.userId, token: token };
      dispatch(getUserById(idAndToken));
    }
  }, [token]);

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
      <ToastContainer autoClose={false} />
      <Link href={"/register"}>Register</Link>
    </>
  );
}
