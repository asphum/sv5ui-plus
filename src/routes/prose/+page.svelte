<script lang="ts">
    import { Prose } from '$lib/compat.js'
    
    const sampleHtml = `
        <h1>Introducing SV5UI Plus</h1>
        <p>SV5UI Plus is a beautiful, highly customizable UI component library for Svelte 5. It provides a solid foundation for your next web application.</p>
        <h2 id="Key-Features">
<a href="#Key-Features" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Key Features
                    </a>
</h2>
        <ul>
            <li>Built with Tailwind CSS</li>
            <li>Fully typesafe</li>
            <li>Accessible and responsive</li>
        </ul>
        <blockquote>The best UI library I have ever used! - <em>A Happy Developer</em></blockquote>
        <pre><code>npm install sv5ui-plus</code></pre>
        <p>For more information, visit our <a href="#">documentation</a>.</p>
    `
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Prose</h1>
        <p class="text-on-surface-variant">
            A typography wrapper to easily style Markdown or raw HTML content.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 id="Usage-with-Raw-HTML" class="text-lg font-semibold">
<a href="#Usage-with-Raw-HTML" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Usage with Raw HTML
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Pass a string of HTML to the <code class="rounded bg-surface-container-highest px-1">html</code> prop. It will automatically apply beautiful typography styles.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-2xl bg-surface p-8 border border-outline-variant rounded-lg">
                <Prose html={sampleHtml} />
            </div>
        </div>
    </section>

    <!-- Slot Usage -->
    <section class="space-y-3">
        <h2 id="Usage-with-Svelte-Content" class="text-lg font-semibold">
<a href="#Usage-with-Svelte-Content" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Usage with Svelte Content
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            You can also wrap standard Svelte elements inside <code class="rounded bg-surface-container-highest px-1">Prose</code> to apply styles.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-2xl bg-surface p-8 border border-outline-variant rounded-lg">
                <Prose size="sm">
                    <h2 id="Smaller-Size-Prose">
<a href="#Smaller-Size-Prose" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Smaller Size Prose
                    </a>
</h2>
                    <p>By using <code class="px-1 py-0.5 rounded bg-surface-container">size="sm"</code>, the typography scales down appropriately.</p>
                    <hr />
                    <table>
                        <thead>
                            <tr>
                                <th>Component</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Prose</td>
                                <td>Done</td>
                            </tr>
                            <tr>
                                <td>Other</td>
                                <td>In Progress</td>
                            </tr>
                        </tbody>
                    </table>
                </Prose>
            </div>
        </div>
    </section>
</div>
