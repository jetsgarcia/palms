"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              exit={{ opacity: 0, x: -20 }}
              className="text-3xl font-bold tracking-tighter mb-1 md:text-4xl/tight"
            >
              Dedicated to the Philippine Army
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 1, ease: "easeInOut", delay: 0.3 },
              }}
              className="text-muted-foreground mb-4"
            >
              Our platform is designed exclusively for the Philippine Army to
              provide secure access to training materials and resources. We are
              committed to supporting the professional development of our
              military personnel.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: "easeInOut", delay: 0.6 },
              }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Button asChild>
                <Link href="/">Contact Support</Link>
              </Button>
            </motion.div>
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
