import Link from "next/link";
import Navigation from "./navigation";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b px-4 bg-background">
      <div className="container mx-auto flex h-16 items-center space-x-4 justify-between">
        <div className="flex gap-4 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-2xl tracking-wide">
              PALMS
            </span>
          </Link>
          <Navigation />
        </div>
        <Button size="lg" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </div>
    </header>
  );
}
