<script setup lang="ts">
  import { useForm, type FormContext } from "vee-validate"
  import { toTypedSchema } from "@vee-validate/zod"
  import { Button } from "@/components/ui/button"
  import { AutoForm } from "@/components/ui/auto-form"
  import { z } from "zod"
  import { useMessageData } from "~/lib/store"
  import type { Book } from "~/server/database/schema"

  const props = defineProps<{
    bookId: number | undefined
  }>()

  const isUpdatePage = props.bookId ? true : false

  // Use the global messageData object for sending messages through the app
  const messageData = useMessageData()

  const schema = z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(2, { message: "The title must have at least 2 characters" }),
    author: z.string({ required_error: "Author is required" }),
    publicationYear: z.coerce
      .number({
        required_error: "The publication year is required",
        invalid_type_error: "The year must be a number",
      })
      .int("Year must be an integer")
      .min(0, { message: "Minimun year is 0" })
      .max(2100, { message: "The maximum year is 2100" })
      .positive("Year must be a positive number"),
    isbn: z.coerce
      .number({
        invalid_type_error: "The ISBN must be a number",
        required_error: "The ISBN is required",
      })
      .int("The ISBN must be an integer")
      .gte(1000000000, { message: "The ISBN must have at least 10 digits" })
      .lte(9999999999999, { message: "The ISBN must have at max 13 digits" })
      .nullable()
      .optional(),
    coverURL: z.string({
      required_error: "The cover URL is required",
    }),
    openLibraryKey: z
      .string({
        required_error: "The Open Library key is required",
      })
      .describe("Open Library works key in the format: /works/######"),
  })

  let form: FormContext
  let book: Book

  if (isUpdatePage) {
    const { data } = await useFetch<Book>(`/api/books/${props.bookId}`)

    book = data.value as Book

    form = useForm({
      validationSchema: toTypedSchema(schema),
      initialValues: { ...book },
    })
  } else {
    form = useForm({
      validationSchema: toTypedSchema(schema),
    })
  }

  //@ts-expect-error if I put z.infer<typeof schema> as the data type it doesn't work
  async function onSubmit(data) {
    const validatedBook = schema.parse(data)

    try {
      let query
      if (isUpdatePage && book?.id) {
        query = await $fetch(`/api/books/${book.id}`, {
          method: "PUT",
          body: {
            ...validatedBook,
          },
        })
      } else {
        query = await $fetch("/api/books", {
          method: "POST",
          body: {
            ...validatedBook,
          },
        })
      }

      if (query !== null && typeof query.message === "string") {
        // Send the message to the toast
        messageData.value = {
          success: query.success,
          message: query.message,
        }
      }
    } catch (e) {
      messageData.value = {
        success: false,
        error: true,
        message: String(e),
      }
    }
  }
</script>

<template>
  <AutoForm
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
    <Button v-if="isUpdatePage" type="submit" class="mt-5 w-full">
      Update
    </Button>
    <Button v-if="!isUpdatePage" type="submit" class="mt-5 w-full">
      Submit
    </Button>
  </AutoForm>
</template>
