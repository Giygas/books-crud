<script setup lang="ts">
  import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

  const route = useRoute()

  let bookId: number | undefined = undefined
  let showDelete: boolean = false

  watch(
    () => route.name,
    () => {
      console.log("route", route)
      if (route.params.id) {
        bookId = Number(route.params.id)
        showDelete = true
      } else {
        bookId = undefined
        showDelete = false
      }
    }
  )
</script>

<template>
  <div :key="route.fullPath" class="flex flex-row justify-end p-5">
    <DeleteBookButton
      v-if="showDelete"
      :book-id="bookId as number"
      class="mr-auto ml-12 hover:bg-red-950"
    />
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem class="flex flex-row gap-5">
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            All books
          </NavigationMenuLink>
          <NavigationMenuLink
            href="/library"
            class="text-primary-foreground bg-primary hover:text-primary hover:bg-primary-foreground"
            :class="navigationMenuTriggerStyle()"
          >
            My Library
          </NavigationMenuLink>
          <NavigationMenuLink>
            <ThemeButton />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
