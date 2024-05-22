export default defineEventHandler(async (event) => {
  // handle POST requests for the 'api/books' endpoint
  const body = await readBody(event)

  console.log(body)
  console.log("Before return")

  return { reponse: body }
})
