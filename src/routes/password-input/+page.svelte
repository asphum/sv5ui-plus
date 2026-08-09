<script lang="ts">
    import { PasswordInput, Separator } from '$lib/compat.js'

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
    const colors = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'info', 'surface'] as const
    const variants = ['outline', 'soft', 'subtle', 'ghost'] as const

    let pwdBasic = $state('')
    let pwdStrength = $state('')
    let pwdIconStar = $state('')
    let pwdIconShield = $state('')
    let pwdIconLock = $state('')
    let pwdIconCircle = $state('')
    let pwdMaskStar = $state('')
    let pwdMaskHeart = $state('')
    let pwdMaskLock = $state('')
    let pwdCustomFn = $state('')
    let pwdBind = $state('')

    function customStrengthFn(pwd: string): number {
        if (!pwd) return -1
        // Example: require at least 12 chars for "Strong"
        if (pwd.length >= 12 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd) && /[^A-Za-z0-9]/.test(pwd)) return 4
        if (pwd.length >= 10 && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) return 3
        if (pwd.length >= 8) return 2
        if (pwd.length >= 4) return 1
        return 0
    }
</script>

<div class="space-y-10">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold text-on-surface">PasswordInput</h1>
        <p class="text-on-surface-variant">
            A secure password field with a built-in visibility toggle, optional strength meter, and
            full support for sizes, colors, and variants. Extends
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">Input</code>
            — all Input props are forwarded.
        </p>
    </div>

    <!-- ==================== USAGE ==================== -->
    <section class="space-y-4">
        <h2 id="Usage" class="text-lg font-semibold text-on-surface">
            <a href="#Usage" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Usage
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Drop-in replacement for a password
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">input</code>
            — adds an eye toggle button. Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">bind:value</code>
            for two-way binding.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput bind:value={pwdBasic} placeholder="Enter your password" />
        </div>
    </section>

    <!-- ==================== STRENGTH METER ==================== -->
    <section class="space-y-4">
        <h2 id="Strength-Meter" class="text-lg font-semibold text-on-surface">
            <a href="#Strength-Meter" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Strength Meter
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Set
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">showStrength</code>
            to display a colour-coded 4-segment bar below the input.
            The built-in heuristic checks length, case, digits, and symbols.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput bind:value={pwdStrength} showStrength placeholder="Create a strong password" />
        </div>
    </section>

    <!-- ==================== SEGMENT ICON ==================== -->
    <section class="space-y-4">
        <h2 id="Segment-Icon" class="text-lg font-semibold text-on-surface">
            <a href="#Segment-Icon" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Segment Icon
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">segmentIcon</code>
            to replace the default filled bars with any Iconify icon. The icons are coloured by strength level.
        </p>
        <div class="flex flex-wrap gap-6">
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">lucide:star</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdIconStar} showStrength segmentIcon="lucide:star" placeholder="Password" />
                </div>
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">lucide:shield</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdIconShield} showStrength segmentIcon="lucide:shield" placeholder="Password" />
                </div>
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">lucide:lock</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdIconLock} showStrength segmentIcon="lucide:lock" placeholder="Password" />
                </div>
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">lucide:circle</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdIconCircle} showStrength segmentIcon="lucide:circle" placeholder="Password" />
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== MASK CHARACTER ==================== -->
    <section class="space-y-4">
        <h2 id="Mask-Character" class="text-lg font-semibold text-on-surface">
            <a href="#Mask-Character" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Mask Character
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">maskChar</code>
            to customize the masked bullet symbol while maintaining full native selection, focus caret alignment, and accessibility.
        </p>
        <div class="flex flex-wrap gap-6">
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">Star (✦)</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdMaskStar} maskChar="✦" placeholder="Password" />
                </div>
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">Heart (♥)</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdMaskHeart} maskChar="♥" placeholder="Password" />
                </div>
            </div>
            <div class="space-y-1">
                <p class="text-xs text-on-surface-variant">Asterisk (*)</p>
                <div class="rounded-lg border border-outline-variant bg-surface-container-high p-4 w-64">
                    <PasswordInput bind:value={pwdMaskLock} maskChar="*" placeholder="Password" />
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== CUSTOM STRENGTH FUNCTION ==================== -->
    <section class="space-y-4">
        <h2 id="Custom-Strength" class="text-lg font-semibold text-on-surface">
            <a href="#Custom-Strength" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Custom Strength
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Provide a
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">strengthFn</code>
            returning <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">0–4</code>
            to override the built-in heuristic with your own logic. Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">strengthLabels</code>
            to customize the displayed text.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 max-w-sm">
            <PasswordInput
                bind:value={pwdCustomFn}
                showStrength
                strengthFn={customStrengthFn}
                strengthLabels={['Too Short', 'Weak', 'Moderate', 'Good', 'Excellent']}
                placeholder="Requires 12+ chars, uppercase, digit & symbol"
            />
        </div>
    </section>

    <!-- ==================== SIZE ==================== -->
    <section class="space-y-4">
        <h2 id="Size" class="text-lg font-semibold text-on-surface">
            <a href="#Size" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Size
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">size</code>
            to control the field dimensions, text size, toggle icon size, and strength meter segment size.
        </p>
        <div class="flex flex-wrap items-end gap-4">
            {#each sizes as size (size)}
                <div class="space-y-1 w-48">
                    <p class="text-xs text-on-surface-variant">{size}</p>
                    <PasswordInput {size} placeholder="Password" />
                </div>
            {/each}
        </div>
    </section>

    <!-- ==================== COLOR ==================== -->
    <section class="space-y-4">
        <h2 id="Color" class="text-lg font-semibold text-on-surface">
            <a href="#Color" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Color
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">color</code>
            to set the focus ring color of both the input and the toggle button.
        </p>
        <div class="flex flex-wrap gap-4">
            {#each colors as color (color)}
                <div class="space-y-1 w-48">
                    <p class="text-xs text-on-surface-variant capitalize">{color}</p>
                    <PasswordInput {color} placeholder="Password" />
                </div>
            {/each}
        </div>
    </section>

    <!-- ==================== VARIANT ==================== -->
    <section class="space-y-4">
        <h2 id="Variant" class="text-lg font-semibold text-on-surface">
            <a href="#Variant" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Variant
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">variant</code>
            to change the input's visual style. Mirrors the
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">Input</code>
            component's variants.
        </p>
        <div class="flex flex-wrap gap-4">
            {#each variants as variant (variant)}
                <div class="space-y-1 w-48">
                    <p class="text-xs text-on-surface-variant capitalize">{variant}</p>
                    <PasswordInput {variant} placeholder="Password" />
                </div>
            {/each}
        </div>
    </section>

    <!-- ==================== HIGHLIGHT ==================== -->
    <section class="space-y-4">
        <h2 id="Highlight" class="text-lg font-semibold text-on-surface">
            <a href="#Highlight" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Highlight
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">highlight</code>
            to permanently show the ring — useful for manual error states.
            Automatically enabled when inside a
            <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">FormField</code>
            with an error.
        </p>
        <div class="flex flex-wrap gap-4">
            <div class="space-y-1 w-48">
                <p class="text-xs text-on-surface-variant">error highlight</p>
                <PasswordInput color="error" highlight placeholder="Password" />
            </div>
            <div class="space-y-1 w-48">
                <p class="text-xs text-on-surface-variant">warning highlight</p>
                <PasswordInput color="warning" highlight placeholder="Password" />
            </div>
        </div>
    </section>

    <!-- ==================== DISABLED ==================== -->
    <section class="space-y-4">
        <h2 id="Disabled" class="text-lg font-semibold text-on-surface">
            <a href="#Disabled" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Disabled
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">disabled</code>
            to prevent any interaction.
        </p>
        <div class="flex flex-wrap gap-4">
            <PasswordInput disabled placeholder="Disabled" />
            <PasswordInput disabled value="secret-value" />
        </div>
    </section>

    <Separator />

    <!-- ==================== REAL WORLD EXAMPLES ==================== -->
    <section class="space-y-4">
        <h2 id="Real-World-Examples" class="text-lg font-semibold text-on-surface">
            <a href="#Real-World-Examples" class="group relative inline-flex items-center hover:underline focus:outline-none focus-visible:underline w-fit">
                <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                Real World Examples
            </a>
        </h2>

        <div class="space-y-6">
            <!-- Sign-up form -->
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Sign-up form with strength meter</p>
                <div class="max-w-xs space-y-3 rounded-lg border border-outline-variant bg-surface-container-low p-4">
                    <PasswordInput
                        bind:value={pwdBind}
                        showStrength
                        segmentIcon="lucide:shield"
                        placeholder="Create password"
                        strengthLabels={['Very Weak', 'Weak', 'Fair', 'Good', 'Strong']}
                    />
                    <PasswordInput placeholder="Confirm password" />
                </div>
            </div>

            <!-- Custom toggle icons -->
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Custom toggle icons</p>
                <div class="max-w-xs">
                    <PasswordInput
                        showIcon="lucide:eye-off"
                        hideIcon="lucide:eye"
                        showLabel="Reveal password"
                        hideLabel="Conceal password"
                        placeholder="Custom eye icons"
                    />
                </div>
            </div>

            <!-- Error state -->
            <div>
                <p class="mb-2 text-xs text-on-surface-variant">Error state</p>
                <div class="space-y-1 max-w-xs">
                    <PasswordInput color="error" highlight placeholder="Password" />
                    <p class="text-xs text-error">Password does not meet the requirements.</p>
                </div>
            </div>
        </div>
    </section>
</div>
