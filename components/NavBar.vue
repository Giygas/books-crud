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
  <div class="flex flex-row justify-end gap-24 p-5">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" :class="navigationMenuTriggerStyle()">
            All books
          </NavigationMenuLink>
          <NavigationMenuLink
            href="/library"
            class="text-primary-foreground bg-primary"
            :class="navigationMenuTriggerStyle()"
          >
            My Library
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </div>
</template>
