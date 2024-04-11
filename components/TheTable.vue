<script setup lang="ts">
	interface Props {
		data: any[];
	}

	const props = defineProps<Props>();

	const columns = computed<string[]>(() => Object.keys(props.data?.[0]));
</script>

<template>
	<div class="relative overflow-x-auto">
		<table
			class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
		>
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
			>
				<tr>
					<th
						v-for="column in columns"
						scope="col"
						class="px-6 py-3"
					>
						{{ column }}
					</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="item in data"
					class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
				>
					<th
						v-for="key in Object.keys(item)"
						scope="row"
						class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
					>
						<slot
							:name="`slot-${key}`"
							:data="item[key]"
						>
							{{ item[key] }}
						</slot>
					</th>
				</tr>
			</tbody>
		</table>
	</div>
</template>
