<script setup lang="ts">
	interface Props {
		valueToCopy: any;
	}
	const props = defineProps<Props>();
	const { valueToCopy } = toRefs(props);
	const hasCopied = ref(false);
	const copy = () => {
		copyToClipboard(valueToCopy.value);
		hasCopied.value = true;

		setTimeout(() => {
			hasCopied.value = false;
		}, 2000);
	};
</script>

<template>
	<button
		@click="copy"
		class="text-gray-900 dark:text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
	>
		<span
			id="success-message"
			class="inline-flex items-center"
			v-if="hasCopied"
		>
			<svg
				class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 16 12"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M1 5.917 5.724 10.5 15 1.5"
				/>
			</svg>
			<span class="text-xs font-semibold text-blue-700 dark:text-blue-500"
				>Copied</span
			>
		</span>
		<span
			id="default-message"
			v-else
			class="inline-flex items-center"
		>
			<svg
				class="w-3 h-3 me-1.5"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				viewBox="0 0 18 20"
			>
				<path
					d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
				/>
			</svg>
			<slot>
				<span class="text-xs font-semibold">Copy</span>
			</slot>
		</span>
	</button>
</template>
