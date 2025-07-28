"use client";

import { useEffect } from "react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";
import ImageLogo from "@/assets/image/logosvg2.svg";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCookie, StorageUser } from "@/utils/Cookies/cookies";
import { signIn } from "@/store/api/auth/authAcion";

type LoginFormProps = ComponentProps<"div">

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export function LoginForm({ className, ...props }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    dispatch(signIn(data));
  };


  useEffect(() => {
    const token = getCookie<string>("token");
    const user = getCookie<StorageUser>("user");
    const isEmployee = getCookie<boolean>("isEmployee");

    if (token && user && isEmployee) {
      router.replace("/");
    }
  }, [router]);


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="https://www.ijdcreatives.com/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex items-center justify-center rounded-md">
                <Image alt="logo-image" src={ImageLogo} height={70} width={70} />
              </div>
              <span className="sr-only text-gray-800">IJD MO.</span>
            </Link>
            <h1 className="text-xl font-bold text-gray-300">Welcome To IJD Movie.</h1>
            <div className="text-center text-sm text-gray-300">
              Don&apos;t have an account?{" "}
              <Link href="#" className="underline underline-offset-4 text-gray-300">
                Sign up
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid gap-3 text-gray-300">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-3 text-gray-300">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Button type="submit" className="w-full bg-black" disabled={isLoading}>
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </div>
          </div>

          <div className="mt-4 text-center text-sm text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>

      <div className="text-center text-xs text-balance text-gray-300 *:[a]:underline *:[a]:underline-offset-4 *:[a]:hover:text-primary">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
