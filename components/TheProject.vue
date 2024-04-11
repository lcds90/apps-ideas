<script setup lang="ts">
	import type { TheProjectProps } from '~/types/Props';

	const props = defineProps<TheProjectProps>();
	const tier = computed(() => {
		return {
			1: { label: 'Fácil', class: 'bg-green-100 text-green-700' },
			2: { label: 'Intermediário', class: 'bg-yellow-100 text-yellow-700' },
			3: { label: 'Avançado', class: 'bg-red-100 text-red-700' },
		}[props.tier];
	});
	const generateDescriptionWithTitle = (text: string) => {
		const texts = text.split(':');

		return {
			label: texts.length ? texts[0] : text,
			caption: texts.length ? texts[1] : text,
		};
	};

	const isOpen = ref(false);
</script>

<template>
	<section>
		<button
			@click="isOpen = !isOpen"
			class="absolute-position inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
		>
			<span
				class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0"
			>
				Sobre o projeto 🚀
			</span>
		</button>
		<div class="modal-position">
			<the-modal
				:title="title"
				:has-footer="false"
				:has-close-in-header="false"
				v-if="isOpen"
			>
				<template #header>
					<header class="flex flex-col justify-between p-4">
						<div class="flex mt-2 items-baseline gap-x-4">
							<h2 class="text-xl font-semibold text-gray-300">
								{{ title }}
							</h2>
							<span
								:class="[
									'inline-flex px-2 py-0.15 rounded-full text-xs font-medium',
									tier.class,
								]"
							>
								{{ tier.label }}
							</span>
						</div>

						<em class="mt-2 text-xs text-gray-400">{{ description }}</em>
					</header>
				</template>
				<template #default>
					<article>
						<h2 class="bg-gradient-to-l from-emerald-700 to-green-500 p-2 text-white rounded-md shadow-md mb-4 w-36 text-center self-center">User stories</h2>
						<ul>
							<li v-for="story in stories">
								<div class="flex">
									<div class="flex items-center h-5">
										<input
											:id="String(story.id)"
											aria-describedby="helper-checkbox-text"
											type="checkbox"
											v-model="story.done"
											class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
										/>
									</div>
									<div class="ms-2 text-sm">
										<label
											:for="String(story.id)"
											class="font-medium text-gray-900 dark:text-gray-300"
											>{{ generateDescriptionWithTitle(story.description).label }}</label
										>
										<p
											id="helper-checkbox-text"
											class="text-xs font-normal text-gray-500 dark:text-gray-300"
										>
											{{ generateDescriptionWithTitle(story.description).caption }}
										</p>
									</div>
								</div>
							</li>
						</ul>
					</article>
				</template>
			</the-modal>
		</div>
	</section>
</template>

<style scoped>
	.absolute-position {
		position: fixed;
		top: 15px;
		left: 15px;
	}

	.modal-position {
		position: absolute;
		z-index: 9999;
		top: 70px;
		left: 13px;
	}
</style>
