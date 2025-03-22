import Image from "next/image";
import PhilippineArmyLogo from "@/assets/images/army_logo_3000x3000.png";
import LoginForm from "@/app/login/_components/login-form";

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <div className="w-[40%] bg-darkGreen-500 grid place-items-center">
        <div className="text-white text-center flex flex-col gap-4">
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
      <div className="w-[60%] mt-0 grid justify-normal place-items-center">
        <div className="w-[60%]">
          <div className="mb-4 grid gap-2">
            <p className="block text-3xl font-bold">Login</p>
            <p className="block text-xl">Enter your credentials to continue</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
