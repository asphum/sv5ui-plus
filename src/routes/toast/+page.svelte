<script lang="ts">
    import { toast, notify, confirmDialog, Toaster, Button, Icon, Card } from "$lib/index.js";
    import type { ToasterProps } from "$lib/components/Toast/toast.types.js";
    import AnimatedIcon from "$lib/components/Toast/internal/AnimatedIcon.svelte";
    import type { AnimatedIconType } from "$lib/components/Toast/internal/animated-icon.types.js";

    const ANIMATED_ICON_TYPES: AnimatedIconType[] = [
        "success",
        "error",
        "warning",
        "info",
        "question",
        "loading",
        "processing",
    ];

    let replayKey = $state(0);

    function replayAnimations() {
        replayKey++;
    }

    function showNotifySuccess() {
        notify.success("Operation successful", {
            description: "Your changes have been saved.",
        });
    }

    function showNotifyError() {
        notify.error("Something went wrong", {
            description: "Please try again or contact support.",
        });
    }

    function showNotifyWarning() {
        notify.warning("Please review", {
            description: "Some fields need your attention before continuing.",
        });
    }

    function showNotifyInfo() {
        notify.info("Did you know?", {
            description: "You can use notify.* for animated icons and promise helpers.",
        });
    }

    function showNotifyDefault() {
        notify.default("Default notification", {
            description: "A neutral toast without a semantic type.",
        });
    }

    function showNotifyLoading() {
        notify.loading("Loading data…", {
            description: "Fetching the latest records from the server.",
        });
    }

    function showNotifyProcessing() {
        notify.processing("Processing…", {
            description: "Your request is being handled in the background.",
        });
    }

    async function testNotifyPromise() {
        const myPromise = new Promise<{ name: string }>((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.3) resolve({ name: "Success" });
                else reject(new Error("Request failed"));
            }, 2000);
        });

        notify.promise(myPromise, {
            loading: "Saving changes…",
            success: "Changes saved successfully",
            error: "Failed to save changes",
        });
    }

    async function testConfirm() {
        const ok = await confirmDialog.show({
            title: "Save changes?",
            message: "Your edits will be applied immediately.",
            icon: "question",
            confirmText: "Save",
        });

        if (ok) {
            notify.success("Changes saved");
        }
    }

    async function testDelete() {
        const ok = await confirmDialog.delete({
            title: "Delete this item?",
            message: "This action is permanent and cannot be undone.",
        });

        if (ok) {
            notify.error("Item deleted");
        }
    }

    async function testSuccessAlert() {
        await confirmDialog.show({
            title: "Payment received",
            message: "Your transaction was completed successfully.",
            icon: "success",
            confirmText: "Got it",
            confirmColor: "success",
            showCancel: false,
        });
    }

    async function testWarningConfirm() {
        const ok = await confirmDialog.show({
            title: "Grant permission?",
            message: "This app wants to access your camera and microphone.",
            icon: "warning",
            confirmText: "Allow",
            confirmColor: "warning",
        });

        if (ok) {
            notify.warning("Permission granted");
        }
    }

    type Variant = NonNullable<ToasterProps["variant"]>;
    type Position = NonNullable<ToasterProps["position"]>;
    type Theme = NonNullable<ToasterProps["theme"]>;

    const variants: Variant[] = [
        "outline",
        "soft",
        "subtle",
        "solid",
        "accent",
    ];
    const positions: Position[] = [
        "top-left",
        "top-center",
        "top-right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
    ];
    const themes: Theme[] = ["light", "dark", "system"];
    const gaps = [8, 14, 24] as const;

    const toastOptionsReference = [
        {
            name: "description",
            type: "string",
            description: "Secondary text below the title.",
        },
        {
            name: "duration",
            type: "number",
            description: "Auto-dismiss delay in ms. Use Infinity to persist.",
        },
        {
            name: "dismissible",
            type: "boolean",
            description: "When false, persists and hides the close button.",
        },
        {
            name: "closeButton",
            type: "boolean",
            description:
                "Show close button on this toast (overrides Toaster default).",
        },
        {
            name: "id",
            type: "string",
            description: "Reuse to update or deduplicate an existing toast.",
        },
        {
            name: "color",
            type: "ToastColor",
            description:
                "Semantic color override (primary, success, error, …).",
        },
        {
            name: "icon",
            type: "string | Component | null",
            description: "Iconify name, custom component, or null to hide.",
        },
        {
            name: "avatar",
            type: "AvatarProps",
            description: "Avatar in the icon slot (takes priority over icon).",
        },
        {
            name: "action",
            type: "{ label, onClick }",
            description: "Primary action button.",
        },
        {
            name: "cancel",
            type: "{ label, onClick }",
            description: "Secondary cancel button.",
        },
        {
            name: "position",
            type: "ToastPosition",
            description: "Override Toaster position for this toast.",
        },
        {
            name: "class",
            type: "string",
            description: "Extra CSS class on the toast element.",
        },
    ] as const;

    const toasterPropsReference = [
        {
            name: "variant",
            type: "'outline' | 'soft' | …",
            description: "Visual style. Default: outline.",
        },
        {
            name: "position",
            type: "ToastPosition",
            description: "Screen position. Default: bottom-right.",
        },
        {
            name: "duration",
            type: "number",
            description: "Default auto-dismiss for all toasts.",
        },
        {
            name: "closeButton",
            type: "boolean",
            description: "Show close button on every toast by default.",
        },
        {
            name: "gap",
            type: "number",
            description: "Vertical spacing between stacked toasts in px.",
        },
        {
            name: "theme",
            type: "'light' | 'dark' | 'system'",
            description: "Toaster theme attribute for styling.",
        },
        {
            name: "reverseOrder",
            type: "boolean",
            description: "Reverse stack offset calculation.",
        },
        {
            name: "successIcon",
            type: "Snippet",
            description: "Global icon snippet for success toasts.",
        },
        {
            name: "errorIcon",
            type: "Snippet",
            description: "Global icon snippet for error toasts.",
        },
        {
            name: "warningIcon",
            type: "Snippet",
            description: "Global icon snippet for warning toasts.",
        },
        {
            name: "infoIcon",
            type: "Snippet",
            description: "Global icon snippet for info toasts.",
        },
    ] as const;

    const toastMethodsReference = [
        { name: "toast(message, opts?)", description: "Show a default toast." },
        {
            name: 'toast.success / .error / .warning / .info / .loading / .processing',
            description: 'Typed toasts with animated icons and semantic styling.'
        },
        {
            name: 'notify.*',
            description: 'Convenience API with animated icons, promise min-duration, and checkSuccess.'
        },
        {
            name: 'confirmDialog.show / .delete',
            description: 'Imperative confirmations — see Confirm Dialog docs. Requires <ConfirmDialog /> in layout.'
        },
        {
            name: "toast.promise(promise, msgs, opts?)",
            description: "Loading → success/error lifecycle.",
        },
        {
            name: "toast.dismiss(id?)",
            description: "Dismiss one toast by id, or all when id is omitted.",
        },
        {
            name: "toast.custom(component, opts?)",
            description: "Render a custom Svelte component as the toast body.",
        },
        {
            name: "toast.message(message, opts?)",
            description: "Alias for toast().",
        },
    ] as const;

    let activeVariant: Variant = $state("outline");
    let activePosition: Position = $state("bottom-right");
    let activeTheme: Theme = $state("light");
    let activeGap = $state(14);
    let showCloseButton = $state(true);

    let counter = $state(0);
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Toast</h1>
        <p class="text-on-surface-variant">
            Non-intrusive notification messages that appear temporarily. with
            Svelora semantic color theming.
        </p>
    </div>

    <!-- Notification Playground (notify + confirmDialog + Animated Icons) -->
    <section class="space-y-6">
        <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
            <Card class="space-y-4 p-4">
                <div class="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                    <div class="rounded-lg bg-primary/10 p-2">
                        <Icon name="lucide:bell" size="24" class="text-primary" />
                    </div>
                    <h2 class="text-xl font-bold">Toast</h2>
                </div>

                <div class="flex flex-col gap-3">
                    <div class="flex flex-wrap gap-2">
                        <Button
                            color="success"
                            variant="soft"
                            size="sm"
                            leadingIcon="lucide:check-circle"
                            label="Success"
                            onclick={showNotifySuccess}
                        />
                        <Button
                            color="error"
                            variant="soft"
                            size="sm"
                            leadingIcon="lucide:x-circle"
                            label="Error"
                            onclick={showNotifyError}
                        />
                        <Button
                            color="warning"
                            variant="soft"
                            size="sm"
                            leadingIcon="lucide:triangle-alert"
                            label="Warning"
                            onclick={showNotifyWarning}
                        />
                        <Button
                            color="info"
                            variant="soft"
                            size="sm"
                            leadingIcon="lucide:info"
                            label="Info"
                            onclick={showNotifyInfo}
                        />
                    </div>

                    <p class="text-center text-xs text-on-surface-variant">Advanced toasts</p>

                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            leadingIcon="lucide:loader-circle"
                            label="Promise"
                            onclick={testNotifyPromise}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            leadingIcon="lucide:message-square"
                            label="Default"
                            onclick={showNotifyDefault}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            leadingIcon="lucide:loader"
                            label="Loading"
                            onclick={showNotifyLoading}
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            leadingIcon="lucide:refresh-cw"
                            label="Processing"
                            onclick={showNotifyProcessing}
                        />
                    </div>
                </div>
            </Card>

            <Card class="space-y-4 p-4">
                <div class="flex items-center gap-3 border-b border-outline-variant/30 pb-4">
                    <div class="rounded-lg bg-secondary/10 p-2">
                        <Icon name="lucide:messages-square" size="24" class="text-secondary" />
                    </div>
                    <h2 class="text-xl font-bold">Dialog</h2>
                </div>

                <p class="text-sm text-on-surface-variant">
                    Use <code class="rounded bg-surface-container-high px-1">confirmDialog</code> for
                    imperative confirmations. A toast follows the outcome. See
                    <a href="/docs/components/confirm-dialog" class="text-primary underline">Confirm Dialog docs</a>.
                </p>

                <div class="grid grid-cols-2 gap-2">
                    <Button
                        color="secondary"
                        variant="soft"
                        size="sm"
                        leadingIcon="lucide:circle-help"
                        label="Confirm"
                        onclick={testConfirm}
                    />
                    <Button
                        color="error"
                        variant="soft"
                        size="sm"
                        leadingIcon="lucide:trash-2"
                        label="Delete"
                        onclick={testDelete}
                    />
                    <Button
                        color="success"
                        variant="soft"
                        size="sm"
                        leadingIcon="lucide:check"
                        label="Success alert"
                        onclick={testSuccessAlert}
                    />
                    <Button
                        color="warning"
                        variant="soft"
                        size="sm"
                        leadingIcon="lucide:shield-alert"
                        label="Warning choice"
                        onclick={testWarningConfirm}
                    />
                </div>
            </Card>
        </div>

        <section class="space-y-3">
            <div class="flex items-center justify-between border-b border-outline-variant/30 pb-4">
                <div class="flex items-center gap-3">
                    <div class="rounded-lg bg-tertiary/10 p-2">
                        <Icon name="lucide:sparkles" size="24" class="text-tertiary" />
                    </div>
                    <h2 class="text-2xl font-bold">Animated Icons</h2>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    leadingIcon="lucide:refresh-cw"
                    label="Replay all"
                    onclick={replayAnimations}
                />
            </div>

            {#key replayKey}
                <div
                    class="grid grid-cols-2 gap-3 rounded-xl border border-dashed border-outline-variant/40 bg-surface-container-high/50 p-6 sm:grid-cols-3 md:grid-cols-7"
                >
                    {#each ANIMATED_ICON_TYPES as type (type)}
                        <div class="group flex flex-col items-center gap-3">
                            <div
                                class="rounded-xl border border-outline-variant/30 bg-surface p-3 shadow-sm transition-transform duration-300 group-hover:scale-110"
                            >
                                <AnimatedIcon {type} size={80} forceMotion />
                            </div>
                            <span class="text-sm font-medium text-on-surface-variant">{type}</span>
                        </div>
                    {/each}
                </div>
            {/key}
        </section>

        <div
            class="flex items-start gap-3 rounded-xl border border-info/20 bg-info/10 p-4 text-info"
        >
            <Icon name="lucide:info" size="24" class="mt-0.5 shrink-0" />
            <div class="space-y-1">
                <p class="font-bold">Pro tip</p>
                <p class="text-sm text-on-surface-variant">
                    Use <code class="rounded bg-surface-container-high px-1">notify</code> for
                    animated icons, promise helpers, and consistent defaults. Pair with
                    <code class="rounded bg-surface-container-high px-1">confirmDialog</code> for
                    confirmations — see
                    <a href="/docs/components/confirm-dialog" class="text-primary underline">Confirm Dialog</a>
                    setup and
                    <code class="rounded bg-surface-container-high px-1">&lt;ConfirmDialog /&gt;</code>
                    in your root layout.
                </p>
            </div>
        </div>
    </section>

    <!-- Toaster Configuration -->
    <section class="space-y-3">
        <h2 id="Toaster-Configuration" class="text-lg font-semibold">
            <a
                href="#Toaster-Configuration"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Toaster Configuration
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Adjust the Toaster props to see how they affect all toasts.
        </p>
        <div class="space-y-4 rounded-lg bg-surface-container-high p-4">
            <!-- Variant -->
            <div class="space-y-1.5">
                <p class="text-sm font-medium">Variant</p>
                <div class="flex flex-wrap gap-2">
                    {#each variants as v (v)}
                        <Button
                            variant={activeVariant === v ? "solid" : "outline"}
                            size="xs"
                            onclick={() => (activeVariant = v)}
                        >
                            {v}
                        </Button>
                    {/each}
                </div>
            </div>

            <!-- Position -->
            <div class="space-y-1.5">
                <p class="text-sm font-medium">Position</p>
                <div class="flex flex-wrap gap-2">
                    {#each positions as p (p)}
                        <Button
                            variant={activePosition === p ? "solid" : "outline"}
                            size="xs"
                            onclick={() => (activePosition = p)}
                        >
                            {p}
                        </Button>
                    {/each}
                </div>
            </div>

            <!-- Toggles & layout -->
            <div class="flex flex-wrap gap-4">
                <label class="flex items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        bind:checked={showCloseButton}
                        class="accent-primary"
                    />
                    Close Button (global)
                </label>
            </div>

            <div class="space-y-1.5">
                <p class="text-sm font-medium">Theme</p>
                <div class="flex flex-wrap gap-2">
                    {#each themes as t (t)}
                        <Button
                            variant={activeTheme === t ? "solid" : "outline"}
                            size="xs"
                            onclick={() => (activeTheme = t)}
                        >
                            {t}
                        </Button>
                    {/each}
                </div>
            </div>

            <div class="space-y-1.5">
                <p class="text-sm font-medium">Gap</p>
                <div class="flex flex-wrap gap-2">
                    {#each gaps as g (g)}
                        <Button
                            variant={activeGap === g ? "solid" : "outline"}
                            size="xs"
                            onclick={() => (activeGap = g)}
                        >
                            {g}px
                        </Button>
                    {/each}
                </div>
            </div>
        </div>
    </section>

    <!-- Basic Usage -->
    <section class="space-y-3">
        <h2 id="Basic-Usage" class="text-lg font-semibold">
            <a
                href="#Basic-Usage"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Basic Usage
            </a>
        </h2>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => toast("This is a default toast")}
            >
                Default
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast("Title only toast — no description needed")}
            >
                Title Only
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast("Event has been created", {
                        description: "Monday, January 3rd at 6:00 PM",
                    })}
            >
                With Description
            </Button>
        </div>
    </section>

    <!-- Types -->
    <section class="space-y-3">
        <h2 id="Types" class="text-lg font-semibold">
            <a
                href="#Types"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Types
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Each type automatically maps to a semantic color from the theme.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                color="success"
                variant="soft"
                onclick={() =>
                    toast.success("Operation completed successfully")}
            >
                Success
            </Button>
            <Button
                color="error"
                variant="soft"
                onclick={() => toast.error("Something went wrong")}
            >
                Error
            </Button>
            <Button
                color="warning"
                variant="soft"
                onclick={() => toast.warning("Please review before proceeding")}
            >
                Warning
            </Button>
            <Button
                color="info"
                variant="soft"
                onclick={() => toast.info("Here is some useful information")}
            >
                Info
            </Button>
            <Button
                variant="soft"
                onclick={() => toast.loading('Loading data...')}
            >
                Loading
            </Button>
            <Button
                variant="soft"
                onclick={() => toast.processing('Processing data...')}
            >
                Processing
            </Button>
        </div>
    </section>

    <!-- Types with Description -->
    <section class="space-y-3">
        <h2 id="Types-with-Description" class="text-lg font-semibold">
            <a
                href="#Types-with-Description"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Types with Description
            </a>
        </h2>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                color="success"
                variant="soft"
                onclick={() =>
                    toast.success("Payment Successful", {
                        description:
                            "Your payment of $49.99 has been processed.",
                    })}
            >
                Success
            </Button>
            <Button
                color="error"
                variant="soft"
                onclick={() =>
                    toast.error("Upload Failed", {
                        description:
                            "The file exceeds the maximum size of 10MB.",
                    })}
            >
                Error
            </Button>
            <Button
                color="warning"
                variant="soft"
                onclick={() =>
                    toast.warning("Storage Almost Full", {
                        description: "You have used 90% of your storage quota.",
                    })}
            >
                Warning
            </Button>
            <Button
                color="info"
                variant="soft"
                onclick={() =>
                    toast.info("New Update Available", {
                        description: "Version 2.0 is ready to install.",
                    })}
            >
                Info
            </Button>
        </div>
    </section>

    <!-- Colors -->
    <section class="space-y-3">
        <h2 id="Colors" class="text-lg font-semibold">
            <a
                href="#Colors"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Colors
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >color</code
            >
            option to apply any semantic color, beyond the 4 built-in types.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                color="primary"
                variant="soft"
                onclick={() =>
                    toast("Primary notification", { color: "primary" })}
            >
                Primary
            </Button>
            <Button
                color="secondary"
                variant="soft"
                onclick={() =>
                    toast("Secondary notification", { color: "secondary" })}
            >
                Secondary
            </Button>
            <Button
                color="tertiary"
                variant="soft"
                onclick={() =>
                    toast("Tertiary notification", { color: "tertiary" })}
            >
                Tertiary
            </Button>
            <Button
                color="success"
                variant="soft"
                onclick={() =>
                    toast("Success notification", {
                        color: "success",
                        description:
                            "Same as toast.success() but via color option",
                    })}
            >
                Success
            </Button>
            <Button
                color="warning"
                variant="soft"
                onclick={() =>
                    toast("Warning notification", { color: "warning" })}
            >
                Warning
            </Button>
            <Button
                color="error"
                variant="soft"
                onclick={() => toast("Error notification", { color: "error" })}
            >
                Error
            </Button>
            <Button
                color="info"
                variant="soft"
                onclick={() => toast("Info notification", { color: "info" })}
            >
                Info
            </Button>
        </div>
    </section>

    <!-- Custom Icons -->
    <section class="space-y-3">
        <h2 id="Custom-Icons" class="text-lg font-semibold">
            <a
                href="#Custom-Icons"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Custom Icons
            </a>
        </h2>

        <!-- Global icons -->
        <div class="space-y-1.5">
            <p class="text-sm font-medium">Icon Overrides (Toaster snippets)</p>
            <p class="text-sm text-on-surface-variant">
                By default, typed toasts use animated SVG icons. Pass Toaster icon
                snippets below to override globally, or pass
                <code class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs">icon</code>
                per toast.
            </p>
            <div
                class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
            >
                <Button
                    variant="outline"
                    color="success"
                    onclick={() =>
                        toast.success("Deployed to production", {
                            description: 'Uses the default animated success icon.',
                        })}
                >
                    Success (global)
                </Button>
                <Button
                    variant="outline"
                    color="error"
                    onclick={() =>
                        toast.error("Build failed", {
                            description: 'Uses the default animated error icon.',
                        })}
                >
                    Error (global)
                </Button>
                <Button
                    variant="outline"
                    color="warning"
                    onclick={() =>
                        toast.warning("Disk usage at 92%", {
                            description: 'Uses the default animated warning icon.',
                        })}
                >
                    Warning (global)
                </Button>
                <Button
                    variant="outline"
                    color="info"
                    onclick={() =>
                        toast.info("Maintenance scheduled", {
                            description: 'Uses the default animated info icon.',
                        })}
                >
                    Info (global)
                </Button>
            </div>
        </div>

        <!-- Per-toast icon override -->
        <div class="space-y-1.5">
            <p class="text-sm font-medium">Per-toast Icon Override</p>
            <p class="text-sm text-on-surface-variant">
                Pass an Iconify icon name string, or
                <code
                    class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                    >null</code
                >
                to hide the icon.
            </p>
            <div
                class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
            >
                <Button
                    variant="outline"
                    onclick={() =>
                        toast("Rocket launched!", {
                            description: 'icon: "lucide:rocket"',
                            icon: "lucide:rocket",
                        })}
                >
                    Rocket
                </Button>
                <Button
                    variant="outline"
                    onclick={() =>
                        toast.success("Git push complete", {
                            description: 'icon: "lucide:git-branch"',
                            icon: "lucide:git-branch",
                        })}
                >
                    Git Branch
                </Button>
                <Button
                    variant="outline"
                    onclick={() =>
                        toast.warning("Battery low", {
                            description: 'icon: "lucide:battery-low"',
                            icon: "lucide:battery-low",
                        })}
                >
                    Battery
                </Button>
                <Button
                    variant="outline"
                    onclick={() =>
                        toast.error("Server offline", {
                            description: 'icon: "lucide:server-off"',
                            icon: "lucide:server-off",
                        })}
                >
                    Server
                </Button>
                <Button
                    variant="outline"
                    onclick={() =>
                        toast.success("No icon toast", {
                            description: "icon: null",
                            icon: null,
                        })}
                >
                    icon: null
                </Button>
            </div>
        </div>
    </section>

    <!-- Avatar -->
    <section class="space-y-3">
        <h2 id="Avatar" class="text-lg font-semibold">
            <a
                href="#Avatar"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Avatar
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >avatar</code
            >
            option to show an avatar in the icon slot.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() =>
                    toast("John commented on your post", {
                        description: '"Great article! Thanks for sharing."',
                        avatar: {
                            src: "https://i.pravatar.cc/150?img=1",
                            alt: "John",
                        },
                    })}
            >
                With Photo
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast.info("Jane sent you a message", {
                        description: '"Hey, are you free for a call?"',
                        avatar: {
                            src: "https://i.pravatar.cc/150?img=5",
                            alt: "Jane",
                        },
                    })}
            >
                Info + Avatar
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast("Alex invited you to a project", {
                        description: "Project: Svelora Design System",
                        avatar: { alt: "Alex" },
                        action: {
                            label: "Accept",
                            onClick: () => toast.success("Invitation accepted"),
                        },
                    })}
            >
                Initials + Action
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast.success("Team joined!", {
                        description: "You are now a member of the Design team.",
                        avatar: { icon: "lucide:users" },
                    })}
            >
                Icon Fallback
            </Button>
        </div>
    </section>

    <!-- Action & Cancel -->
    <section class="space-y-3">
        <h2 id="Action--Cancel" class="text-lg font-semibold">
            <a
                href="#Action--Cancel"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Action & Cancel
            </a>
        </h2>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() =>
                    toast("File deleted", {
                        action: {
                            label: "Undo",
                            onClick: () => toast.success("File restored"),
                        },
                    })}
            >
                Action Button
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast("Accept cookies?", {
                        action: {
                            label: "Accept",
                            onClick: () => toast.success("Cookies accepted"),
                        },
                        cancel: {
                            label: "Decline",
                            onClick: () => toast("Cookies declined"),
                        },
                    })}
            >
                Action + Cancel
            </Button>
            <Button
                variant="outline"
                color="info"
                onclick={() =>
                    toast.info("New version available", {
                        action: {
                            label: "Update Now",
                            onClick: () => toast.success("Updating..."),
                        },
                        cancel: {
                            label: "Later",
                            onClick: () => {},
                        },
                    })}
            >
                Info with Actions
            </Button>
            <Button
                variant="outline"
                color="error"
                onclick={() =>
                    toast.error("Delete this item?", {
                        description: "This action cannot be undone.",
                        action: {
                            label: "Delete",
                            onClick: () => toast.success("Item deleted"),
                        },
                        cancel: {
                            label: "Keep",
                            onClick: () => {},
                        },
                    })}
            >
                Error with Confirm
            </Button>
        </div>
    </section>

    <!-- Promise -->
    <section class="space-y-3">
        <h2 id="Promise" class="text-lg font-semibold">
            <a
                href="#Promise"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Promise
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Automatically transitions between loading, success, and error
            states.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => {
                    toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 2000)),
                        {
                            loading: "Saving changes...",
                            success: "Changes saved successfully!",
                            error: "Failed to save changes",
                        },
                    );
                }}
            >
                Save (Resolves)
            </Button>
            <Button
                variant="outline"
                color="error"
                onclick={() => {
                    toast.promise(
                        new Promise((_, reject) =>
                            setTimeout(
                                () => reject(new Error("timeout")),
                                2000,
                            ),
                        ),
                        {
                            loading: "Connecting to server...",
                            success: "Connected!",
                            error: "Connection failed",
                        },
                    );
                }}
            >
                Connect (Rejects)
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 3000)),
                        {
                            loading: "Uploading file (0%)...",
                            success: "File uploaded!",
                            error: "Upload failed",
                        },
                    );
                }}
            >
                Upload File
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 4000)),
                        {
                            loading: "Deploying to production...",
                            success: "Deployed! Live at https://example.com",
                            error: "Deploy failed — check CI logs",
                        },
                    );
                }}
            >
                Deploy
            </Button>
            <Button
                variant="outline"
                color="success"
                onclick={() => {
                    toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 2500)),
                        {
                            loading: "Publishing...",
                            success: "Published!",
                            error: "Publish failed",
                        },
                        { color: "success" },
                    );
                }}
            >
                Promise + color
            </Button>
        </div>
    </section>

    <!-- Close Button -->
    <section class="space-y-3">
        <h2 id="Close-Button" class="text-lg font-semibold">
            <a
                href="#Close-Button"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Close Button
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Enable globally via
            <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >&lt;Toaster closeButton /&gt;</code
            >
            or per toast with
            <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >closeButton: true</code
            >.
            <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >dismissible: false</code
            >
            always hides the close button.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() =>
                    toast("With close button", {
                        description: "closeButton: true on this toast",
                        closeButton: true,
                        duration: Infinity,
                    })}
            >
                Force close button
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast("No close button", {
                        description:
                            "closeButton: false overrides global toggle",
                        closeButton: false,
                        duration: Infinity,
                    })}
            >
                Hide close button
            </Button>
        </div>
    </section>

    <!-- Duration -->
    <section class="space-y-3">
        <h2 id="Custom-Duration" class="text-lg font-semibold">
            <a
                href="#Custom-Duration"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Custom Duration
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Control how long a toast stays visible before auto-dismiss.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => toast("Gone in a flash", { duration: 1000 })}
            >
                1 second
            </Button>
            <Button
                variant="outline"
                onclick={() => toast("Standard duration", { duration: 3000 })}
            >
                3 seconds
            </Button>
            <Button
                variant="outline"
                onclick={() => toast("Longer reading time", { duration: 8000 })}
            >
                8 seconds
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast("This toast will stay until dismissed", {
                        duration: Infinity,
                    })}
            >
                Persistent (Infinity)
            </Button>
        </div>
    </section>

    <!-- Update Existing Toast -->
    <section class="space-y-3">
        <h2 id="Update-Existing-Toast" class="text-lg font-semibold">
            <a
                href="#Update-Existing-Toast"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Update Existing Toast
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Reuse the same ID to update an existing toast in-place.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => {
                    const id = toast.loading("Uploading...", {
                        duration: Infinity,
                    });
                    setTimeout(
                        () => toast.success("Upload complete!", { id }),
                        2000,
                    );
                }}
            >
                Loading → Success
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    const id = toast.loading("Validating...", {
                        duration: Infinity,
                    });
                    setTimeout(
                        () => toast.error("Validation failed!", { id }),
                        2000,
                    );
                }}
            >
                Loading → Error
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    const id = toast("Step 1 of 3...", { duration: Infinity });
                    setTimeout(
                        () =>
                            toast("Step 2 of 3...", { id, duration: Infinity }),
                        1000,
                    );
                    setTimeout(
                        () =>
                            toast("Step 3 of 3...", { id, duration: Infinity }),
                        2000,
                    );
                    setTimeout(
                        () => toast.success("All steps complete!", { id }),
                        3000,
                    );
                }}
            >
                Multi-step Progress
            </Button>
        </div>
    </section>

    <!-- Deduplicated -->
    <section class="space-y-3">
        <h2 id="Deduplicated-Toasts" class="text-lg font-semibold">
            <a
                href="#Deduplicated-Toasts"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Deduplicated Toasts
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Pass the same <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >id</code
            >
            to prevent duplicate toasts. Clicking multiple times updates the existing
            toast instead of creating new ones.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() =>
                    toast("You have 3 new messages", {
                        id: "new-messages",
                        description: "Click again — no duplicate!",
                    })}
            >
                Same ID (click many times)
            </Button>
            <Button
                variant="outline"
                color="warning"
                onclick={() =>
                    toast.warning("Rate limit reached", {
                        id: "rate-limit",
                        description: "Try again in 30 seconds.",
                    })}
            >
                Rate Limit (deduplicated)
            </Button>
        </div>
    </section>

    <!-- Dismiss -->
    <section class="space-y-3">
        <h2 id="Programmatic-Dismiss" class="text-lg font-semibold">
            <a
                href="#Programmatic-Dismiss"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Programmatic Dismiss
            </a>
        </h2>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => {
                    const id = toast("Processing...", { duration: Infinity });
                    setTimeout(() => {
                        toast.dismiss(id);
                        toast.success("Done!");
                    }, 2000);
                }}
            >
                Auto Dismiss After 2s
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    toast("Toast 1", { duration: Infinity });
                    toast.success("Toast 2", { duration: Infinity });
                    toast.error("Toast 3", { duration: Infinity });
                }}
            >
                Create 3 Toasts
            </Button>
            <Button
                variant="outline"
                color="error"
                onclick={() => toast.dismiss()}
            >
                Dismiss All
            </Button>
        </div>
    </section>

    <!-- Stacking -->
    <section class="space-y-3">
        <h2 id="Stacking" class="text-lg font-semibold">
            <a
                href="#Stacking"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Stacking
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Fire multiple toasts to see them stack. Hover the toaster area to
            pause auto-dismiss timers while you read.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => {
                    counter++;
                    toast.success(`Notification #${counter}`, {
                        description: "Hover the toaster to pause dismissal.",
                    });
                }}
            >
                Add Toast (#{counter + 1})
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    toast.info("Info toast", { description: "First in stack" });
                    setTimeout(
                        () =>
                            toast.warning("Warning toast", {
                                description: "Second in stack",
                            }),
                        300,
                    );
                    setTimeout(
                        () =>
                            toast.error("Error toast", {
                                description: "Third in stack",
                            }),
                        600,
                    );
                }}
            >
                Fire 3 Different Types
            </Button>
        </div>
    </section>

    <!-- Non-dismissible -->
    <section class="space-y-3">
        <h2 id="Non-dismissible" class="text-lg font-semibold">
            <a
                href="#Non-dismissible"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Non-dismissible
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Keep a toast on screen until it is updated or dismissed
            programmatically. Use
            <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >dismissible: false</code
            >
            (hides close button + infinite duration) or
            <code
                class="rounded bg-surface-container-highest px-1.5 py-0.5 text-xs"
                >duration: Infinity</code
            >
            alone.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => {
                    const id = toast.warning("Processing payment...", {
                        description: "Please do not close this page.",
                        dismissible: false,
                        duration: Infinity,
                    });
                    setTimeout(() => {
                        toast.success("Payment complete!", { id });
                    }, 3000);
                }}
            >
                Non-dismissible (3s)
            </Button>
        </div>
    </section>

    <!-- All Types at Once (visual test) -->
    <section class="space-y-3">
        <h2 id="All-Types-at-Once" class="text-lg font-semibold">
            <a
                href="#All-Types-at-Once"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                All Types at Once
            </a>
        </h2>
        <p class="text-sm text-on-surface-variant">
            Fire every type simultaneously to visually compare styling.
        </p>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() => {
                    toast("Default toast", {
                        description: "Neutral surface styling",
                        duration: 10000,
                    });
                    toast.success("Success toast", {
                        description: "Operation successful",
                        duration: 10000,
                    });
                    toast.error("Error toast", {
                        description: "Something went wrong",
                        duration: 10000,
                    });
                    toast.warning("Warning toast", {
                        description: "Proceed with caution",
                        duration: 10000,
                    });
                    toast.info("Info toast", {
                        description: "Here is some context",
                        duration: 10000,
                    });
                    toast.loading("Loading toast", {
                        description: "Please wait...",
                        duration: 10000,
                    });
                }}
            >
                Fire All Types (10s)
            </Button>
        </div>
    </section>

    <!-- Real World Examples -->
    <section class="space-y-3">
        <h2 id="Real-World-Examples" class="text-lg font-semibold">
            <a
                href="#Real-World-Examples"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                Real World Examples
            </a>
        </h2>
        <div
            class="flex flex-wrap gap-3 rounded-lg bg-surface-container-high p-4"
        >
            <Button
                variant="outline"
                onclick={() =>
                    toast.success("Profile Updated", {
                        description: "Your profile changes have been saved.",
                    })}
            >
                Save Profile
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast.error("Permission Denied", {
                        description: "You do not have access to this resource.",
                        action: {
                            label: "Request Access",
                            onClick: () =>
                                toast.info("Access request sent to admin"),
                        },
                    })}
            >
                Access Denied
            </Button>
            <Button
                variant="outline"
                onclick={() =>
                    toast.warning("Session Expiring", {
                        description: "Your session will expire in 5 minutes.",
                        duration: 8000,
                        action: {
                            label: "Extend",
                            onClick: () =>
                                toast.success("Session extended by 30 minutes"),
                        },
                    })}
            >
                Session Warning
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    toast.promise(
                        new Promise((resolve) => setTimeout(resolve, 3000)),
                        {
                            loading: "Sending email...",
                            success: "Email sent to john@example.com",
                            error: "Failed to send email",
                        },
                    );
                }}
            >
                Send Email
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    const id = toast("Item moved to trash", {
                        action: {
                            label: "Undo",
                            onClick: () => toast.success("Item restored"),
                        },
                        cancel: {
                            label: "Delete permanently",
                            onClick: () => {
                                toast.dismiss(id);
                                toast.error("Item permanently deleted");
                            },
                        },
                    });
                }}
            >
                Move to Trash
            </Button>
            <Button
                variant="outline"
                onclick={() => {
                    toast.info("New comment on your post", {
                        description:
                            '"Great article! Thanks for sharing." — Jane',
                        action: {
                            label: "View",
                            onClick: () => toast("Opening post..."),
                        },
                    });
                }}
            >
                New Comment
            </Button>
        </div>
    </section>

    <!-- API Reference -->
    <section class="space-y-3">
        <h2 id="API-Reference" class="text-lg font-semibold">
            <a
                href="#API-Reference"
                class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit"
            >
                <span
                    class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none"
                    aria-hidden="true">#</span
                >
                API Reference
            </a>
        </h2>
        <div class="grid gap-4 lg:grid-cols-2">
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">toast() methods</h3>
                    <div class="space-y-3">
                        {#each toastMethodsReference as item (item.name)}
                            <div
                                class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0"
                            >
                                <p class="font-mono text-xs text-primary">
                                    {item.name}
                                </p>
                                <p class="mt-1 text-sm text-on-surface-variant">
                                    {item.description}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
            <Card class="border border-outline-variant/70">
                <div class="space-y-4">
                    <h3 class="text-base font-semibold">Toast options</h3>
                    <div class="space-y-3">
                        {#each toastOptionsReference as item (item.name)}
                            <div
                                class="border-b border-outline-variant/60 pb-3 last:border-b-0 last:pb-0"
                            >
                                <p
                                    class="font-mono text-xs text-on-surface-variant"
                                >
                                    {item.name}
                                </p>
                                <p class="mt-1 text-sm font-medium">
                                    {item.type}
                                </p>
                                <p class="mt-1 text-sm text-on-surface-variant">
                                    {item.description}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            </Card>
        </div>
        <Card class="border border-outline-variant/70">
            <div class="space-y-4">
                <h3 class="text-base font-semibold">Toaster props</h3>
                <div class="grid gap-3 md:grid-cols-2">
                    {#each toasterPropsReference as item (item.name)}
                        <div
                            class="rounded-xl border border-outline-variant/60 p-4"
                        >
                            <p
                                class="font-mono text-xs text-on-surface-variant"
                            >
                                {item.name}
                            </p>
                            <p class="mt-1 text-sm font-medium">{item.type}</p>
                            <p class="mt-1 text-sm text-on-surface-variant">
                                {item.description}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </Card>
    </section>
</div>

<!-- Dynamic Toaster with configurable props -->
<Toaster
    variant={activeVariant}
    position={activePosition}
    theme={activeTheme}
    gap={activeGap}
    closeButton={showCloseButton}
/>
