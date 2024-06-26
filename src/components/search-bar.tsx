"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "./ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { useEffect } from "react"

interface Props {
  rootUrl: string
}

const formSchema = z.object({
  search: z.string().min(0).max(50),
})

export default function SearchBar({ rootUrl }: Props) {
  const router = useRouter()
  const query = useSearchParams()
  const search = query.get("search")

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: search || "",
    },
  })

  useEffect(() => {
    form.setValue("search", search || "")
  }, [search, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Filter by keywords (typescript, next.js, etc)"
                  className={"w-[550px]"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className={"flex gap-2 items-center"}>
          {"Search"}
          <SearchIcon />
        </Button>

        {search && <Button onClick={resetSearch}>{"Clear"}</Button>}
      </form>
    </Form>
  )

  function resetSearch() {
    form.setValue("search", "")
    router.push(rootUrl)
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.search) {
      router.push(`${rootUrl}?search=${values.search}`)
    } else {
      resetSearch()
    }
  }
}
