<script setup lang="ts">
import type { TheProjectProps } from '~/types/Props'

	const form = reactive({
		range: 0,
	});

	const project = reactive<TheProjectProps>({
		title: 'Gerador de senhas',
		description:
			'Este gerador de senhas permite criar senhas fortes e personalizadas de acordo com necessidades do usuário.',
		tier: 2,
		stories: [
			{
				id: 1,
				description:
					'Seleção de tamanho: O usuário deve poder selecionar o comprimento da senha gerada.',
				done: false,
			},
			{
				id: 2,
				description: `Inclusão de caracteres: O usuário deve poder escolher entre incluir ou não os seguintes tipos de caracteres na senha:<br>
				Incluir letras maiúsculas (A-Z)<br>
				Incluir letras minúsculas (a-z)<br>
				Incluir números (0-9)<br>
				Incluir símbolos (!@#$%* e outros)<br>
				`,
				done: false,
			},
			{
				id: 3,
				description: 'Gerar senha: Ao clicar no botão "Gerar senha", o usuário deve ver uma senha criada de acordo com as opções selecionadas.',
				done: false
			},
			{
				id: 4,
				description: 'Copiar para a área de transferência: O usuário deve ter a opção de copiar a senha gerada para a área de transferência clicando no botão "Copiar para a área de transferência".',
				done: false
			}
		],
	});
</script>

<template>
	<the-project
		:title="project.title"
		:description="project.description"
		:tier="2"
		:stories="project.stories"
	/>
	<the-title
		text-color="from-emerald-300 to-green-900"
		title="Gerador de senhas"
	/>
	<form>
		<div class="mb-6">
			<label
				for="default-range"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Tamanho da senha</label
			>
			<input
				id="default-range"
				type="range"
				max="30"
				min="7"
				v-model="form.range"
				class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
			/>
		</div>
		<div class="mb-6">
			<label
				for="confirm_password"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Confirm password</label
			>
			<input
				type="password"
				id="confirm_password"
				class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
				placeholder="•••••••••"
				required
			/>
		</div>
		<div class="flex items-start mb-6">
			<div class="flex items-center h-5">
				<input
					id="remember"
					type="checkbox"
					value=""
					class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
					required
				/>
			</div>
			<label
				for="remember"
				class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
				>I agree with the
				<a
					href="#"
					class="text-blue-600 hover:underline dark:text-blue-500"
					>terms and conditions</a
				>.</label
			>
		</div>
		<button
			type="submit"
			class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		>
			Submit
		</button>
	</form>
</template>
