"use client";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import toast from "react-hot-toast";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useStyleRegistry } from "styled-jsx";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/users");
    }
  }, [session.status, router]);

  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => setIsLoading(false));
    } else {
      signIn("credentials", { ...data, redirect: false })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials");
          }
          if (callback?.ok && !callback.error) {
            toast.success("Logged in");
            router.push("/users");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials");
        } else {
          toast.success("Logged in");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="pb-4 text-center text-3xl font-bold tracking-tight text-gray-900">
        {variant === "LOGIN"
          ? "Sign in to your account"
          : "Create a new account"}
      </h2>
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === "REGISTER" && (
            <Input
              id="name"
              label="Name"
              errors={errors}
              disabled={isLoading}
              {...register("name", { required: true })}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            errors={errors}
            disabled={isLoading}
            {...register("email", { required: true })}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            errors={errors}
            disabled={isLoading}
            {...register("password", { required: true })}
          />
          <div className="">
            <Button fullWidth type="submit" disabled={isLoading}>
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        {/* <div className="mt-6">
          <div className="relative">
            <div className="absolute border-t border-gray-300 w-full"></div>
            <div className="bg-white px-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-500">
              Or continue with
            </div>
          </div>
        </div> */}
        {/* <div className="mt-10 flex flex-col gap-3">
          <AuthSocialButton
            onClick={() => socialAction("github")}
            icon={BsGithub}
          >
            Github
          </AuthSocialButton>
          <AuthSocialButton
            onClick={() => socialAction("google")}
            icon={BsGoogle}
          >
            Google
          </AuthSocialButton>
        </div> */}
        <div className="flex gap-2 justify-center items-center text-sm mt-6 px-2 text-gray-500">
          <div className="">
            {variant === "LOGIN"
              ? "New to Messenger ?"
              : "Already have an account"}
          </div>
          <div className="underline cursor-pointer" onClick={toggleVariant}>
            {variant === "LOGIN" ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthForm;
