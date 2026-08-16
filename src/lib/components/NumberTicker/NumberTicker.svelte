<script lang="ts">
	import { twMerge } from 'tailwind-merge'
	import { onMount, untrack } from 'svelte'
	import type { NumberTickerProps } from './number-ticker.types.js'
	import { numberTickerVariants } from './number-ticker.variants.js'

	let {
		value,
		duration = 2000,
		decimals = 0,
		delay = 0,
		class: className,
		...restProps
	}: NumberTickerProps = $props()

	let styles = $derived(numberTickerVariants())

	let displayValue = $state(0)
	let isVisible = $state(false)
	let nodeRef = $state<HTMLSpanElement | null>(null)

	/**
	 * อ่าน value อย่างปลอดภัย — parent expression (เช่น overview.lowStock.length)
	 * อาจ throw ตอน nav/refresh ถ้า overview เป็น undefined
	 */
	const readSafeValue = (): number => {
		try {
			const n = Number(value)
			return Number.isFinite(n) ? n : 0
		} catch {
			return 0
		}
	}

	const easeOutExpo = (x: number): number => {
		return x === 1 ? 1 : 1 - 2 ** (-10 * x)
	}

	let animationFrame = 0
	let delayTimeout: ReturnType<typeof setTimeout> | undefined
	/** target ล่าสุดที่เริ่ม animate แล้ว — ใช้กัน re-start ซ้ำ */
	let lastAnimatedTarget: number | undefined

	const cancelRunning = () => {
		if (animationFrame) cancelAnimationFrame(animationFrame)
		animationFrame = 0
		if (delayTimeout !== undefined) {
			clearTimeout(delayTimeout)
			delayTimeout = undefined
		}
	}

	/**
	 * ใช้ targetSnapshot ใน rAF เท่านั้น — ห้ามอ่าน value prop ระหว่าง frame
	 * (การอ่าน value จะ re-evaluate expression ของ parent และอาจ throw)
	 */
	const startAnimation = (from: number, targetSnapshot: number, withDelay: boolean) => {
		cancelRunning()
		lastAnimatedTarget = targetSnapshot

		const run = () => {
			let startTime: number | null = null
			const animate = (timestamp: number) => {
				if (!startTime) startTime = timestamp
				const progress = timestamp - startTime

				if (progress < duration) {
					const percentage = progress / duration
					const easedProgress = easeOutExpo(percentage)
					displayValue = from + (targetSnapshot - from) * easedProgress
					animationFrame = requestAnimationFrame(animate)
				} else {
					displayValue = targetSnapshot
					animationFrame = 0
				}
			}
			animationFrame = requestAnimationFrame(animate)
		}

		if (withDelay && delay > 0) {
			delayTimeout = setTimeout(run, delay)
		} else {
			run()
		}
	}

	onMount(() => {
		if (!nodeRef) return

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !isVisible) {
					isVisible = true
					// snapshot ตอนเริ่ม intersection เท่านั้น
					startAnimation(0, readSafeValue(), true)
				}
			},
			{ threshold: 0.1 }
		)

		observer.observe(nodeRef)

		return () => {
			observer.disconnect()
			cancelRunning()
		}
	})

	// value เปลี่ยนหลัง visible → re-animate จาก display ปัจจุบันไป target ใหม่
	$effect(() => {
		const nextTarget = readSafeValue()
		if (!isVisible) return
		if (lastAnimatedTarget === nextTarget) return

		// untrack เพื่อไม่ให้ effect ไล่ตามทุก frame ของ displayValue
		const from = untrack(() => displayValue)
		startAnimation(from, nextTarget, false)
	})

	let formattedValue = $derived(
		new Intl.NumberFormat('en-US', {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}).format(displayValue)
	)
</script>

<span
	bind:this={nodeRef}
	class={twMerge(styles.base() as string, className)}
	{...restProps}
>
	{formattedValue}
</span>
