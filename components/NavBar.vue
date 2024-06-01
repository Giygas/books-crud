<script setup lang="ts">
  import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
</script>

<template>
  <div class="flex flex-row justify-end p-5">
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
