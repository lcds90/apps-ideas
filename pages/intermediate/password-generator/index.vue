<script setup lang="ts">
	import type { TheProjectProps } from '~/types/Props';
	import PasswordGenerator from './components/PasswordGenerator.vue';
	import PasswordGenerated from './components/PasswordGenerated.vue';

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
				done: true,
			},
			{
				id: 2,
				description: `Inclusão de caracteres: O usuário deve poder escolher entre incluir ou não os seguintes tipos de caracteres na senha:<br>
				Incluir letras maiúsculas (A-Z)<br>
				Incluir letras minúsculas (a-z)<br>
				Incluir números (0-9)<br>
				Incluir símbolos (!@#$%* e outros)<br>
				`,
				done: true,
			},
			{
				id: 3,
				description:
					'Gerar senha: Ao clicar no botão "Gerar senha", o usuário deve ver uma senha criada de acordo com as opções selecionadas.',
				done: true,
			},
			{
				id: 4,
				description:
					'Copiar para a área de transferência: O usuário deve ter a opção de copiar a senha gerada para a área de transferência clicando no botão "Copiar para a área de transferência".',
				done: true,
			},
			{
				id: 5,
				description:
					'Força da senha: O usuário pode visualizar a força da senha',
				done: true,
			},
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
	<div class="grid grid-cols-2 gap-4">
		<password-generator />
		<password-generated />
	</div>
</template>
