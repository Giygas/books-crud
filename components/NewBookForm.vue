<script setup lang="ts">
  import { useForm } from "vee-validate"
  import { toTypedSchema } from "@vee-validate/zod"
  import { Button } from "@/components/ui/button"
  import { AutoForm } from "@/components/ui/auto-form"
  import { z } from "zod"
  import { useMessageData } from "~/lib/store"

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
      .lte(9999999999999, { message: "The ISBN must have at max 13 digits" }),
    coverURL: z.string({
      required_error: "The cover URL is required",
    }),
    openLibraryKey: z
      .string({
        required_error: "The Open Library key is required",
      })
      .describe("Open Library works key in the format: /works/######"),
  })

  const form = useForm({
    validationSchema: toTypedSchema(schema),
  })

  const messageData = useMessageData()

  //@ts-expect-error if I put z.infer<typeof schema> as the type it doesn't work
  async function onSubmit(data) {
    const validatedBook = schema.parse(data)

    try {
      const query = await $fetch("/api/books", {
        method: "post",
        body: {
          ...validatedBook,
        },
      })

      console.log("API RESPONSE")
      console.log(query)

      if (query !== null && typeof query.message === "string") {
        const response = query

        console.log("Response")
        console.log(response)
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

    // const { data: apiReponse } = await useFetch("/api/books", {
    //   method: "post",
    //   body: {
    //     ...validatedBook,
    //   },
    // })

    // console.log("API RESPONSE")
    // console.log(apiReponse)

    // if (
    //   apiReponse.value !== null &&
    //   typeof apiReponse.value.message === "string"
    // ) {
    //   const response = apiReponse

    //   console.log("Response")
    //   console.log(response)
    //   messageData.value = {
    //     success: apiReponse.value.success,
    //     message: apiReponse.value.message,
    //   }
    // }
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
    <Button type="submit" class="mt-5 w-full"> Submit </Button>
  </AutoForm>
</template>
