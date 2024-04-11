<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
console.log(
    router.getRoutes()
);

const links = computed(() => router.getRoutes()
    .filter(({ name }) => !name?.toString().includes('component'))
    .map(({ path, name }) => ({ path, name }))
);

</script>

<template>
    Bem vindo ao projeto de ideias!
    <router-link
        v-for="link in links"
    :to="link.path">{{ link.name }}</router-link>
</template>