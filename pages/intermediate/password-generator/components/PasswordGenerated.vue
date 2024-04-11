<script setup lang="ts">
	import { usePasswordGeneratorStore } from '../store';
	const store = usePasswordGeneratorStore();
	const { getPasswords } = storeToRefs(store);
</script>

<template>
	<div class="h-96 overflow-y-auto shadow-md">
		<the-table
			v-if="getPasswords.length"
			:data="getPasswords"
		>
			<template #slot-strenght="{ data }">
				<span
					:class="{
						'text-green-700': data > 0.5,
						'text-red-700': data < 0.5,
						'text-yellow-500': data === 0.5,
					}"
				>
					{{ data }}
				</span>
			</template>

			<template #slot-copy="{ data }">
				<the-copy-cliboard
					class="w-20"
					:value-to-copy="data"
				/>
			</template>
		</the-table>
	</div>
</template>

<style scoped>
	.c-height {
		height: 50vh;
		overflow-y: auto;
	}
</style>
