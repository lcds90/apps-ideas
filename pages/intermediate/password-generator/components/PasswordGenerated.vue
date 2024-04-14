<script setup lang="ts">
	import { usePasswordGeneratorStore } from '../store';
	import SplitType from 'split-type';

	const store = usePasswordGeneratorStore();
	const { getPasswords } = storeToRefs(store);

	const onEnter = () => {
		useGsap.from('#table-passwords', {
			opacity: 0,
			y: -15,
			ease: 'bounce',
			duration: 2,
		});
	};

	const onFirstenter = () => {
		useGsap.from('#waiting', {
			opacity: 0,
			y: -15,
			ease: 'bounce',
			duration: 2,
		});
		SplitType.create('#waiting p', {
			tagName: 'span',
			charClass: 'waiting-password-char',
		});
		const tlText = useGsap.timeline({
			yoyo: true,
			defaults: { duration: 1.5, delay: 2, ease: 'bounce.in' },
		});
		tlText.from(document.querySelectorAll('.waiting-password-char'), {
			rotate: 360,
			stagger: 0.75,
		});
		tlText.play();

		const tl = useGsap.timeline({
			yoyo: true,
			repeat: -1,
			defaults: { duration: 0.5, ease: 'bounce' },
			paused: true,
		});
		tl.to('#waiting p', { x: -20 });
		tl.to('#waiting p', { x: 20 });
		tl.to('#waiting p', { x: 0 });
		tl.to('#waiting p', { x: 0, duration: 2 });
		tl.to('#waiting p', { y: -20, duration: 0.15 });
		tl.to('#waiting p', { y: 20, duration: 0.15 });
		tl.to('#waiting p', { y: 0, duration: 5 });
		tl.to('#waiting p', { rotate: 360, scale: 0, duration: 2, ease: 'sine' });
		tlText.eventCallback('onComplete', () => {
			tl.play();
		});
	};

	const tlBounce = useGsap.timeline({
		yoyo: true,
		repeat: -1,
		defaults: { duration: 0.15, ease: 'sine' },
	});
	const bounceEnter = () => {
		if (getPasswords.value.length) return;
		tlBounce.to('#container-password', { rotate: -1 });
		tlBounce.to('#container-password', { rotate: 1 });
		tlBounce.to('#container-password', { rotate: 0 });
		tlBounce.play();
	};

	const bounceOut = () => {
		tlBounce.pause();
		useGsap.set('#container-password', { rotate: 0 });
	};

	onMounted(() => {
		onFirstenter();
	});
</script>

<template>
	<div
		@mouseenter="bounceEnter"
		@mouseout="bounceOut"
		class="max-h-96"
		:class="{
			'overflow-y-auto': getPasswords.length,
			'overflow-y-hidden grid items-center': !getPasswords.length,
		}"
		id="container-password"
	>
		<transition
			:css="false"
			@enter="onEnter"
			@appear="onEnter"
			v-if="getPasswords.length"
			appear
		>
			<the-table
				id="table-passwords"
				:data="getPasswords"
				class="shadow-md"
			>
				<template #slot-Força="{ data }">
					<span
						:class="{
							'text-green-700': data > 0.5,
							'text-red-700': data < 0.5,
							'text-yellow-500': data === 0.5,
						}"
						class="transition-colors"
					>
						{{ data }}
					</span>
				</template>

				<template #slot-Copiar="{ data }">
					<the-copy-cliboard
						class="w-20"
						:value-to-copy="data"
					/>
				</template>
			</the-table>
		</transition>

		<div
			v-else
			id="waiting"
			class="flex items-center justify-center bg-gray-700 h-24 rounded-3xl shadow-sm"
		>
			<div class="text-center">
				<p class="text-5xl font-thin font-mono text-gray-100">Aguardando ✨</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.c-height {
		height: 50vh;
		overflow-y: auto;
	}
</style>
