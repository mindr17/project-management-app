import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import s from "./auth.module.scss";
import { useRouter } from "next/router";
import { login, registerUser } from "../../store/thunk";
import { useEffect } from "react";
import { callReset, ResponsesAuth, setUser } from "../../store/sliceAuth";
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
    const lsUser =
      localStorage.getItem("user") &&
      (JSON.parse(localStorage.getItem("user") || "") as ResponsesAuth | null);
      lsUser && dispatch(setUser(lsUser));
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      router.push("/");
    }
    dispatch(callReset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onSubmit = async (formData: IFormSignUp) => {
    await dispatch(registerUser(formData));
    const loginAndPass = { login: formData.login, password: formData.password };
    await dispatch(login(loginAndPass));
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
          <label className={s.label} htmlFor="name">name</label>
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
          <label className={s.label} htmlFor="login">Login</label>
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
          <label className={s.label} htmlFor="password">Password</label>
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
      <ToastContainer autoClose={false} />
      <p className={s.signUpLink}>Already have an account? <strong><Link href={"/signin"}>Sign in</Link></strong></p>
    </>
  );
}
