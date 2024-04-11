<script setup lang="ts">
	import { usePasswordGeneratorStore } from '../store';
	const store = usePasswordGeneratorStore();
	const { form } = storeToRefs(store);
</script>

<template>
	<form id="form-generator" @submit.prevent="store.generateNewPassoword">
		<div class="mb-6">
			<label
				for="quantity"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Quantidade de senhas ({{ form.quantity }})</label
			>
			<input
				v-model="form.quantity"
				type="number"
				id="quantity"
				aria-describedby="helper-text-explanation"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			/>
		</div>

		<div class="mb-6">
			<label
				for="length"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Tamanho da senha ({{ form.range }})</label
			>
			<input
				id="length"
				type="range"
				max="50"
				min="6"
				v-model="form.range"
				class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
			/>
		</div>

		<section class="flex gap-4">
			<article class="flex items-start mb-6">
				<div class="flex items-center h-5">
					<input
						id="uppercase"
						type="checkbox"
						v-model="form.include.uppercase"
						class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					/>
				</div>
				<label
					for="uppercase"
					class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Include uppercase letters
				</label>
			</article>

			<article class="flex items-start mb-6">
				<div class="flex items-center h-5">
					<input
						id="lowercase"
						type="checkbox"
						v-model="form.include.lowercase"
						class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					/>
				</div>
				<label
					for="lowercase"
					class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Include lowercase letters
				</label>
			</article>

			<article class="flex items-start mb-6">
				<div class="flex items-center h-5">
					<input
						id="numbers"
						type="checkbox"
						v-model="form.include.numbers"
						class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					/>
				</div>
				<label
					for="numbers"
					class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Include numbers
				</label>
			</article>

			<article class="flex items-start mb-6">
				<div class="flex items-center h-5">
					<input
						id="symbols"
						type="checkbox"
						v-model="form.include.symbols"
						class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					/>
				</div>
				<label
					for="symbols"
					class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>
					Include symbols
				</label>
			</article>
		</section>
		<button
			type="submit"
			id="submit"
			:disabled="store.isFormInvalid"
			:class="{
				'dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300':
					!store.isFormInvalid,
				'dark:bg-slate-600 cursor-not-allowed': store.isFormInvalid,
			}"
			class="text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
		>
			Gerar senha
		</button>
		<span
			v-if="store.isFormInvalid"
			class="font-semibold text-yellow-200 text-xs ml-2"
			>É necessário selecionar ao menos uma opção</span
		>
	</form>
</template>
