<script lang="ts">
    import "../app.css";
    import { onMount } from "svelte";
    import { afterNavigate } from '$app/navigation';
    import { page } from '$app/stores';
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'
    import { initLightRayCanvas } from '$lib/utils/lightRayCanvas';
	import { Cursor } from '$lib/utils/cursor';
	import { initTheme, setupThemeToggle } from '$lib/utils/theme';
	import gsap from 'gsap';

	let prefersReducedMotion = false;

	let canvas: HTMLCanvasElement;
	let cursorElement: HTMLDivElement;
	let cursor: Cursor | null = null;

	// Custom transition that combines fade with blur
	function fadeBlur(node: HTMLElement, { duration = 250 }) {
		return {
			duration,
			css: (t: number) => {
				const opacity = t;
				const blur = (1 - t) * 4; // 4px max blur
				return `
					opacity: ${opacity};
					filter: blur(${blur}px);
				`;
			}
		};
	}

	onMount(() => {
		// Check for reduced motion preference
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Initialize theme
		initTheme();

		// Initialize light ray canvas
		const getColorUniform = (): [number, number, number, number] => {
			const isDark = document.documentElement.classList.contains('dark');
			return isDark ? [1.0, 1.0, 1.0, 1.0] : [0.9608, 0.6509, 0.1373, 1.0];
		};

		const lightRay = initLightRayCanvas(canvas, getColorUniform);

		// Initialize cursor
		cursor = new Cursor(cursorElement);

		// Setup theme toggle
		setupThemeToggle((isDark) => {
			lightRay.updateColor(isDark ? [1.0, 1.0, 1.0, 1.0] : [0.9608, 0.6509, 0.1373, 1.0]);
		});

		// Animate shiny text if motion is not reduced
		if (!prefersReducedMotion) {
			gsap.fromTo(
				'.shiny',
				{ backgroundPosition: '120% 0%' },
				{
					backgroundPosition: '-220% 0%',
					duration: 1,
					repeat: -1,
					repeatDelay: 2,
					ease: 'power1.inOut'
				}
			);
		}

		return () => {
			lightRay.destroy();
		};
	});

	// Refresh cursor targets after navigation
	afterNavigate(() => {
		if (cursor) {
			cursor.refreshTargets();
		}
	});
</script>

<canvas bind:this={canvas} id="light-ray-canvas" class="w-full h-full"></canvas>
<div bind:this={cursorElement} class="cursor" id="cursor"></div>

<Header />
<main>
	{#key $page.url.pathname}
		<div in:fadeBlur={{ duration: prefersReducedMotion ? 0 : 250 }}>
			<slot />
		</div>
	{/key}
</main>
<Footer />
