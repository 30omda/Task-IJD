import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import ImageLogo from "@/assets/image/logosvg2.svg"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <Link
              href="https://www.ijdcreatives.com/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex items-center justify-center rounded-md">
                <Image alt='logo-image' src={ImageLogo} height={70} width={70} />
              </div>
              <span className="sr-only  text-gray-800">IJD MO.</span>
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
              <Label htmlFor="email ">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3 text-gray-300">
              <div className="flex items-center">
                <Label htmlFor="password text-gray-">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
            <div className="flex flex-col gap-3 ">
              <Button type="submit" className="w-full bg-black">
                Login
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
      <div className=" *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4 text-gray-300">
        By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
        and <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  )
}



