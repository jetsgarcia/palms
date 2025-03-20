import Link from "next/link";
import { Button } from "../ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Dedicated to the Philippine Army
            </h2>
            <p className="text-muted-foreground md:text-xl">
              Our platform is designed exclusively for the Philippine Army to
              provide secure access to training materials and resources. We are
              committed to supporting the professional development of our
              military personnel.
            </p>
            <Button asChild>
              <Link href="/">Contact Support</Link>
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-xl font-bold">Unmatched Reliability </h3>
              <p className="text-muted-foreground">
                Our platform uses cloud servers so that you can access your
                training materials anytime, anywhere. We ensure that our
                platform is always available for you.
              </p>
            </div>
            <div className="rounded-lg border bg-background p-6">
              <h3 className="text-xl font-bold">Designed for Military Use</h3>
              <p className="text-muted-foreground">
                The platform is optimized for military training needs, with
                features specifically designed for the Philippine Army&apos;s
                requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
