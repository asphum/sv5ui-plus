<script lang="ts">
    import { ChatBubble, ChatMessage, ChatInput, Avatar, Button } from '$lib/compat.js'
    
    let messageText = $state('')
</script>

<div class="space-y-8">
    <div class="space-y-2">
        <h1 class="text-2xl font-bold">Chat</h1>
        <p class="text-on-surface-variant">
            A comprehensive set of components to build chat interfaces, including bubbles, messages, and inputs.
        </p>
    </div>

    <!-- Usage -->
    <section class="space-y-3">
        <h2 id="Usage" class="text-lg font-semibold">
<a href="#Usage" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Usage
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Combine <code class="rounded bg-surface-container-highest px-1">ChatBubble</code>, <code class="rounded bg-surface-container-highest px-1">ChatMessage</code>, and <code class="rounded bg-surface-container-highest px-1">ChatInput</code> to create conversational UI.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex justify-center">
            <div class="w-full max-w-md h-[400px] flex flex-col bg-surface border border-outline-variant rounded-lg overflow-hidden">
                <div class="flex-1 p-4 overflow-y-auto space-y-4">
                    <ChatBubble position="start" name="Obi-Wan" time="12:00">
                        {#snippet avatar()}
                            <Avatar src="https://i.pravatar.cc/150?img=11" alt="Obi" />
                        {/snippet}
                        <ChatMessage>Hello there!</ChatMessage>
                    </ChatBubble>
                    
                    <ChatBubble position="end" name="Grievous" time="12:01">
                        {#snippet avatar()}
                            <Avatar src="https://i.pravatar.cc/150?img=12" alt="Grievous" />
                        {/snippet}
                        <ChatMessage variant="primary">General Kenobi.</ChatMessage>
                        <ChatMessage variant="primary">You are a bold one.</ChatMessage>
                    </ChatBubble>
                </div>
                
                <div class="p-3 border-t border-outline-variant bg-surface-50 dark:bg-surface-900">
                    <ChatInput bind:value={messageText} placeholder="Type a message...">
                        {#snippet trailing()}
                            <Button icon="lucide:send" size="sm" color="primary" square disabled={!messageText} />
                        {/snippet}
                    </ChatInput>
                </div>
            </div>
        </div>
    </section>

    <!-- Variants -->
    <section class="space-y-3">
        <h2 id="Message-Variants" class="text-lg font-semibold">
<a href="#Message-Variants" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Message Variants
                    </a>
</h2>
        <p class="text-sm text-on-surface-variant">
            Use the <code class="rounded bg-surface-container-highest px-1">variant</code> prop on <code class="rounded bg-surface-container-highest px-1">ChatMessage</code> to change its appearance.
        </p>
        <div class="rounded-lg bg-surface-container-high p-4 flex flex-col gap-2 max-w-md">
            <ChatBubble position="start">
                <ChatMessage variant="surface">Surface (Default)</ChatMessage>
                <ChatMessage variant="primary">Primary</ChatMessage>
                <ChatMessage variant="outline">Outline</ChatMessage>
            </ChatBubble>
        </div>
    </section>
</div>
