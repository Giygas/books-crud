<script setup lang="ts">
  import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"

  const route = useRoute()

  let bookId: number | undefined
  let showDelete: boolean

  if (route.params.id) {
    bookId = Number(route.params.id)
    showDelete = true
  }

  watch(
    () => route.name,
    () => {
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
  <NavigationMenu
    :key="route.fullPath"
    class="flex flex-row justify-end p-5 w-full max-w-full gap-5"
  >
    <NavigationMenuList class="w-full min-w-full flex flex-row justify-between">
      <NavigationMenuItem class="mr-auto ml-12">
        <DeleteBookButton v-if="showDelete" :book-id="bookId as number" />
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
          All books
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink
          href="/library"
          class="text-primary-foreground bg-primary hover:text-primary hover:bg-primary-foreground"
          :class="navigationMenuTriggerStyle()"
        >
          My Library
        </NavigationMenuLink>
      </NavigationMenuItem>

      <NavigationMenuItem>
        <NavigationMenuLink>
          <ThemeButton />
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>

<style>
  nav > div {
    width: 100%;
  }
</style>
