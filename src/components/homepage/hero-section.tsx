import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-22 2xl:py-42">
      <div className="container mx-auto px-4 md:px-20 2xl:px-36">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The Virtual Training Ground
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                A dedicated learning platform for Philippine Army, providing
                video streaming, exams, and performance tracking.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild>
                <Link href="/login">
                  Access Platform <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>

          <div className="aspect-video overflow-hidden pointer-events-none rounded-xl">
            <iframe
              src="https://www.youtube.com/embed/ZK-rNEhJIDs?si=0bgTaUgxr7hGdMc6&controls=0&autoplay=1&mute=1&loop=1&playlist=ZK-rNEhJIDs"
              allow="autoplay; encrypted-media;"
              className="h-full w-full"
              style={{
                width: "300%",
                height: "100%",
                marginLeft: "-100%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
