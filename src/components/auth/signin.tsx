import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../hooks/hooks";
import { setResponsesAuth, setToken } from "../../store/sliceAuth";
import { BASE_URL } from "../server/server";
import { useForm } from "react-hook-form";

interface IFormSignIn {
  login: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormSignIn>();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const createToken = (data: IFormSignIn) => {
    axios({
      method: "post",
      url: `${BASE_URL}/signin`,
      data: data,
    }).then((response) => {
      dispatch(setToken(response.data.token));
    });
  };

  const onSubmit = (data: IFormSignIn) => {
    createToken(data);
    dispatch(setResponsesAuth(data));
    reset();
    router.push("/");
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
          placeholder="password"
          {...register("password", {
            required: "Please enter password",
            minLength: {
              value: 5,
              message: "password must contain more than 5 characters",
            },
          })}
        />
        <p style={{ color: "red", margin: "0" }}>{errors.password?.message}</p>
        <button>Login</button>
      </form>

      <Link href={"/register"}>Register</Link>
    </>
  );
}
