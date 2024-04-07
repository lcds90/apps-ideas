<script setup lang="ts">
	import SplitType from 'split-type';
	interface Props {
		title: string;
		textColor: string
	}

	const animateTextLetters = () => {
		if (!elHeading.value) return;
		const textClass =
			'char bg-clip-text from-emerald-300 to-green-900 bg-stone-400 bg-gradient-to-tr text-transparent bg-gradient-to-t text-transparent';
		SplitType.create(elHeading.value, {
			charClass: textClass,
			tagName: 'span',
		});
		const tl = useGsap.timeline({ defaults: { duration: 1 } });
		tl.from(elHeading.value.querySelectorAll('.char'), {
			y: 25,
			stagger: 0.05,
			delay: 0.2,
			duration: 0.5,
			background: 'rgba(255,255,255, .015)',
			ease: 'bounce.in',
		});
		tl.play();
	};

	const animateTextBright = () => {
		const tl = useGsap.timeline({ defaults: { duration: 0.8 } });

		tl.from(elHeading.value, { opacity: 0 });
		tl.to(elHeading.value, {
			textShadow: '0 0 0 rgba(255, 255, 255, 0.25)',
		});
		tl.to(elHeading.value, {
			textShadow: '0 0 5000px rgba(255, 255, 255, 0.015)',
		});
		tl.to(
			elHeading.value,
			{
				textShadow: '0 0 500px rgba(255, 255, 255, 0)',
			},
			'-=1'
		);

		tl.play();
	};

	const animate = () => {
		if (!elHeading.value) return;
		animateTextBright();
		animateTextLetters();
	};

	const elHeading = ref<HTMLHeadingElement | null>(null);
	onMounted(() => {
		animate();
	});

	defineProps<Props>();
</script>

<template>
	<h1
		class="mb-8 ml-0 text-4xl font-bold text-white sm:text-6xl"
		@dblclick="animate"
	>
		<span
			ref="elHeading"
			class="bg-clip-text bg-gradient-to-t text-transparent"
			:class="{ 'from-emerald-300 to-green-900': textColor }"
			>{{ title }}</span
		>
	</h1>
</template>

<style scoped>
	.char {
		transform: translateY(115px);
		transition: transform 0.5s;
	}
</style>
