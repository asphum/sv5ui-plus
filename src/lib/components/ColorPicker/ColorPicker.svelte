<script lang="ts">
    import { twMerge } from 'tailwind-merge'
    import { Popover } from 'sv5ui'
    import { Input } from 'sv5ui'
    import { Icon } from 'sv5ui'
    import type { ColorPickerProps } from './color-picker.types.js'
    import { colorPickerVariants } from './color-picker.variants.js'

    let {
        value = $bindable('#000000'),
        placeholder = 'Select color',
        swatches = [
            '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', 
            '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', 
            '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#ffffff', 
            '#94a3b8', '#000000'
        ],
        disabled = false,
        class: className,
        ...restProps
    }: ColorPickerProps = $props()

    const styles = $derived(colorPickerVariants())
    
    // Validate hex
    let hexInput = $state(value)
    
    $effect(() => {
        hexInput = value
    })
    
    function handleHexInput(e: Event) {
        const target = e.target as HTMLInputElement
        let val = target.value
        
        if (!val.startsWith('#')) {
            val = '#' + val
        }
        
        hexInput = val
        
        // Basic hex validation regex (3, 4, 6, or 8 digits)
        if (/^#([A-Fa-f0-9]{3,4}){1,2}$/.test(val)) {
            value = val
        }
    }
    
    function setSwatch(swatch: string) {
        value = swatch
        hexInput = swatch
    }
</script>

<div class={twMerge(styles.base(), className)} {...restProps}>
    <Popover>
        {#snippet children({ open })}
            <div 
                class={styles.trigger()}
                aria-disabled={disabled}
            >
                <div 
                    class={styles.colorIndicator()} 
                    style="background-color: {value || '#000'};"
                ></div>
                <span class="truncate flex-1 text-left text-on-surface">
                    {value || placeholder}
                </span>
                <Icon name="lucide:chevron-down" class="text-on-surface-variant w-4 h-4" />
            </div>
        {/snippet}

        {#snippet content()}
            <div class={styles.content()}>
                <div class={styles.hexInputWrapper()}>
                    <span class="text-sm font-medium">Hex</span>
                    <Input 
                        value={hexInput} 
                        oninput={handleHexInput} 
                        class="h-8 font-mono text-xs" 
                    />
                </div>
                
                <div class={styles.swatchGrid()}>
                    {#each swatches as swatch}
                        <button
                            type="button"
                            class={styles.swatch()}
                            style="background-color: {swatch};"
                            title={swatch}
                            aria-label={`Select color ${swatch}`}
                            onclick={() => setSwatch(swatch)}
                        ></button>
                    {/each}
                </div>
                
                <div class="pt-2 border-t border-outline-variant flex flex-col gap-1">
                    <span class="text-xs text-on-surface-variant mb-1">Custom Color</span>
                    <!-- Native color picker wrapper -->
                    <label class="cursor-pointer relative overflow-hidden rounded-md border border-outline-variant w-full h-8 flex items-center justify-center bg-surface-container hover:bg-surface-container-high transition-colors">
                        <span class="text-xs font-medium z-10 pointer-events-none mix-blend-difference text-white">Pick Custom</span>
                        <input 
                            type="color" 
                            bind:value
                            class="absolute inset-0 opacity-0 w-full h-full cursor-pointer scale-150"
                        />
                    </label>
                </div>
            </div>
        {/snippet}
    </Popover>
</div>
