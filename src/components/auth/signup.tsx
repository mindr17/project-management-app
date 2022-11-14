import axios from "axios";
import Link from "next/link";
import { useAppDispatch } from "../../hooks/hooks";
import { setResponsesAuth } from "../../store/sliceAuth";
import { BASE_URL } from "../server/server";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

interface IFormSignUp {
  name: string;
  login: string;
  password: string;
}

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignUp>();

  const createUser = (data: IFormSignUp) => {
    axios({
      method: "post",
      url: `${BASE_URL}/signup`,
      data: data,
    }).then(function (response) {
      dispatch(setResponsesAuth(response.data));
    });
  };

  const onSubmit = (data: IFormSignUp) => {
    createUser(data);
    dispatch(setResponsesAuth(data));
    reset();
    router.push("/login");
  };

  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
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
          placeholder="name"
        />

        <p style={{ color: "red", margin: "0" }}>{errors.name?.message}</p>

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

        <p style={{ color: "red", margin: "0" }}>{errors.login?.message}</p>

        <input
          type="password"
          {...register("password", {
            required: "Please enter password",
            minLength: {
              value: 5,
              message: "password must contain more than 5 characters",
            },
          })}
          placeholder="password"
        />

        <p style={{ color: "red", margin: "0" }}>{errors.password?.message}</p>

        <button>Sign Up</button>
      </form>

      <Link href={"/login"}>login</Link>
    </>
  );
}
