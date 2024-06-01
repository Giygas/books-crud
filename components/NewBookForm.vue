<script setup lang="ts">
  import { h } from "vue"
  import { useForm } from "vee-validate"
  import { toTypedSchema } from "@vee-validate/zod"
  import { Button } from "@/components/ui/button"
  import { AutoForm } from "@/components/ui/auto-form"
  import { toast } from "vue-sonner"
  import { z } from "zod"

  const schema = z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(2, { message: "The title must have at least 2 characters" }),
    autors: z.string({ required_error: "Author is required" }),
    publicationYear: z
      .number({
        required_error: "The publication year is required",
        invalid_type_error: "The year must be a number",
      })
      .min(4, { message: "Year must be 4 digits" })
      .max(4, { message: "Year must be 4 digits" })
      .positive("Year must be a positive number")
      .int("Year must be an integer"),
    isbn: z
      .number({
        invalid_type_error: "The ISBN must be a number",
        required_error: "The ISBN is required",
      })
      .int("The ISBN must be an integer")
      .min(10, { message: "The ISBN must have at least 10 digits" })
      .max(13, { message: "The ISBN must have at max 13 digits" }),
    coverURL: z.string({
      required_error: "The cover URL is required",
    }),
    openLibraryKey: z
      .string({
        required_error: "The Open Library key is required",
      })
      .describe("Open Library works key in the format: /works/######"),
  })

  console.log(schema)

  const form = useForm({
    validationSchema: toTypedSchema(schema),
  })

  function onSubmit(values: Record<string, unknown>) {
    toast({
      title: "You submitted the following values:",
      description: h(
        "pre",
        { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
        h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
      ),
    })
  }

  // <!--  -->
</script>

<template>
  <AutoForm
    class="w-2/3 space-y-6"
    :schema="schema"
    :form="form"
    :field-config="{
      openLibraryKey: {
        label: 'Open Library key',
        inputProps: {
          placeholder: 'Ex: /works/OL20600W',
        },
      },
      coverURL: {
        inputProps: {
          placeholder: 'Ex: https://covers.openlibrary.org/b/id/12717083-L.jpg',
        },
      },
      isbn: {
        inputProps: {
          type: 'text',
        },
      },
      publicationYear: {
        inputProps: {
          type: 'text',
        },
      },
    }"
    @submit="onSubmit"
  >
    <Button type="submit"> Submit </Button>
  </AutoForm>
</template>
