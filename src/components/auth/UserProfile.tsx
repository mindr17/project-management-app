import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useForm } from "react-hook-form";
import s from "./auth.module.scss";
import { useRouter } from "next/router";
import { logout } from "../../store/thunk";
import { useEffect } from "react";
import { callReset } from "../../store/authSlice";
import Preloader from "../Preloader/Preloader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteUser, updateUser } from "../../store/profile/profileThunk";
import { setIsDelete } from "../../store/profile/profileSlice";

export interface IFormSignUp {
  name: string;
  login: string;
  password: string;
}

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { isError, isSuccess, message, user, token } = useAppSelector(
    (state) => state.auth
  );
  const { isLoading } = useAppSelector((state) => state.profile);
  const { isDelete } = useAppSelector((state) => state.profile);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignUp>({
    defaultValues: {
      name: user?.name || "",
      login: user?.login || "",
    },
  });

  useEffect(() => {
    if (isDelete) {
      dispatch(logout());
      dispatch(setIsDelete());
      router.push("/");
    }
  }, [isDelete]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(callReset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onSubmit = (formData: IFormSignUp) => {
    user &&
      console.log('user from', {
        formData,
        token,
        id: user._id,
      });

    user &&
      dispatch(
        updateUser({
          formData,
          token,
          id: user._id,
        })
      );

    // await dispatch(registerUser(formData));
    // const loginAndPass = { login: formData.login, password: formData.password };
    // await dispatch(login(loginAndPass));
    // reset();
  };

  const hendleDelete = () => {
    user && dispatch(deleteUser({ id: user._id, token }));
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
        <button className={s.btn}>Change</button>
      </form>
      <button
        onClick={hendleDelete}
        className={s.btn}
        style={{ background: "red" }}
      >
        Delete
      </button>
      <ToastContainer autoClose={false} />
      {/* <p className={s.signUpLink}>Already have an account? <strong><Link href={"/signin"}>Sign in</Link></strong></p> */}
    </>
  );
}
