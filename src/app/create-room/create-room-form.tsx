"use client"

import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createRoomAction } from "./actions"

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
})

export default function CreateRoomForm() {
  const router = useRouter()
  const { toast } = useToast()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      githubRepo: "",
      tags: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Name"}</FormLabel>
              <FormControl>
                <Input placeholder={"Dev Finder!"} {...field} />
              </FormControl>
              <FormDescription>{"This is your public display name."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Description"}</FormLabel>
              <FormControl>
                <Input
                  placeholder={"I'm working on a side project, join me!"}
                  {...field}
                />
              </FormControl>
              <FormDescription>{"Describe your project..."}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Github Repo"}</FormLabel>
              <FormControl>
                <Input placeholder="https://www.github.com" {...field} />
              </FormControl>
              <FormDescription>
                {"Please put a link to the project you are working on."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Tags"}</FormLabel>
              <FormControl>
                <Input placeholder="Typescript, React, MaterialUI" {...field} />
              </FormControl>
              <FormDescription>
                {
                  "List your programming langues, frameworks, libraries, so people can find your content."
                }
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">{"Submit"}</Button>
      </form>
    </Form>
  )

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: invoke a server action to store details in DB
    const room = await createRoomAction(values)
    toast({
      title: "Room Created",
      description: "Your room was created successfully",
    })
    router.push(`/rooms/${room.id}`)
  }
}
