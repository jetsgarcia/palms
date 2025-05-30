import Image from "next/image";
import PhilippineArmyLogo from "@/assets/images/army_logo_3000x3000.png";
import LoginForm from "./_components/login-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { X } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="w-[40%] grid place-items-center relative">
        <div className="absolute inset-0 bg-darkGreen-500 z-0">
          <BackgroundBeams />
        </div>
        <div className="text-white text-center flex flex-col gap-4 relative z-10">
          <Image
            className="m-auto"
            src={PhilippineArmyLogo}
            alt="Philippine Army Logo"
            width={175}
            height={175}
          />
          <h1 className="text-xl">Philippine Army</h1>
          <p className="text-3xl font-extrabold">Combined Arms Center</p>
        </div>
      </div>
      <div className="w-[60%] mt-0 p-10">
        <div className="w-full flex flex-col h-full">
          <div className="flex justify-end">
            <Link
              href={"/"}
              className="p-1 rounded-md hover:text-darkGreen-500 hover:bg-muted transition-colors duration-200"
            >
              <X />
            </Link>
          </div>
          <div className="w-full grow flex items-center justify-center m-auto">
            <div className="w-[60%]">
              <div className="mb-4 grid gap-2">
                <p className="block text-3xl font-bold">Login</p>
                <p className="block text-xl">
                  Enter your credentials to continue
                </p>
              </div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
