"use client";

import { useForm } from "react-hook-form";
import { startTransition, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { loginSchema } from "@/schemas/loginSchema";
import { z } from "zod";
import { login } from "@/app/(routes)/login/_actions/login";

export default function LoginForm() {
  const [loginError, setLoginError] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    startTransition(() => {
      login(data)
        .then((response) => {
          if (response?.error) {
            setLoginError(response.error);
          }
        })
        .catch((e) => setLoginError(e.error))
        .finally(() => setIsSubmitting(false));
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@domain.com"
                  {...field}
                  onChange={(e) => {
                    setLoginError("");
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription className="sr-only">
                The email you use for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="mb-6">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={passwordVisibility ? "text" : "password"}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    {...field}
                    onChange={(e) => {
                      setLoginError("");
                      field.onChange(e);
                    }}
                  />
                  <button
                    onClick={() => setPasswordVisibility((current) => !current)}
                    type="button"
                    className="opacity-50 absolute inset-y-0 right-2 hover:opacity-80 cursor-pointer"
                  >
                    {passwordVisibility ? (
                      <Eye className="h-5" />
                    ) : (
                      <EyeOff className="h-5" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormDescription className="sr-only">
                The email you use for your account.
              </FormDescription>
              <FormMessage>{loginError}</FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full font-semibold cursor-pointer"
          disabled={isSubmitting}
        >
          Log in
        </Button>
      </form>
    </Form>
  );
}
