"use client";

import { motion } from "motion/react";

export default function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Administrator Registration",
      description:
        "Authorized administrators register military personnel with their official credentials.",
    },
    {
      number: 2,
      title: "Secure Login",
      description:
        "Personnel log in using their credentials through our secure authentication system.",
    },
    {
      number: 3,
      title: "Access Content",
      description:
        "Browse and stream training materials, videos, and resources from our comprehensive library.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full py-12 md:py-24 lg:py-34 scroll-mt-16"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform is designed to be simple for all Philippine Army
              personnel.
            </p>
          </div>
        </div>

        <div className="mx-auto grid place-items-center items-center py-12">
          <div className="flex flex-col justify-center space-y-4 max-w-160">
            <ul className="grid gap-6">
              {steps.map((step) => (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 1,
                      ease: "easeInOut",
                      delay: step.number * 0.2,
                    },
                  }}
                  key={step.number}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
