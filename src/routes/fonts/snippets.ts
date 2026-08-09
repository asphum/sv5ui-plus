import type { DocSectionSnippetOverrides } from '$internal/docs/code-block.js'

export const sectionSnippets: DocSectionSnippetOverrides = {
    'Default Preset':
        `<script lang="ts">
 import 'sv5ui-plus/theme.css';
 import { Fonts } from 'sv5ui-plus';
<` +
        `/script>

<Fonts />`,
    'Google Provider':
        `<script lang="ts">
 import 'sv5ui-plus/theme.css';
 import { Fonts } from 'sv5ui-plus';
 import type { FontDefinition } from 'sv5ui-plus';

 const families: FontDefinition[] = [
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
  { name: 'JetBrains Mono', variable: '--font-mono-family', weights: [400, 500, 700] }
 ];
<` +
        `/script>

<Fonts families={families} />

<div class="space-y-2">
 <h3 class="font-heading text-2xl font-semibold">Poppins heading</h3>
 <p>Inter body copy is mapped to \`--font-sans-family\`.</p>
 <p class="font-mono text-sm">const provider = 'google';</p>
</div>`,
    'Local Provider': `<Fonts
 families={[
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [
    { src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 },
    { src: '/fonts/Sarabun-Bold.woff2', format: 'woff2', weight: 700 }
   ]
  }
 ]}
/>`,
    'Local Font Setup':
        `<script lang="ts">
 import 'sv5ui-plus/theme.css';
 import { Fonts } from 'sv5ui-plus';

 let { children } = $props();
<` +
        `/script>

<Fonts
 families={[
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [
    { src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 },
    { src: '/fonts/Sarabun-Medium.woff2', format: 'woff2', weight: 500 },
    { src: '/fonts/Sarabun-Bold.woff2', format: 'woff2', weight: 700 }
   ]
  }
 ]}
/>

<main class="font-sarabun">
 {@render children?.()}
</main>`,
    'Mixed Providers': `<Fonts
 families={[
  { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
  { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
  {
   provider: 'local',
   name: 'Sarabun',
   variable: '--font-sarabun-family',
   sources: [{ src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 }]
  }
 ]}
/>`,
    'Using Global Config': `import { defineSV5UIPlusConfig } from 'sv5ui-plus';

defineSV5UIPlusConfig({
 fonts: {
  families: [
   { name: 'Inter', variable: '--font-sans-family', weights: [400, 500, 600, 700] },
   { name: 'Poppins', variable: '--font-heading-family', weights: [600, 700] },
   {
    provider: 'local',
    name: 'Sarabun',
    variable: '--font-sarabun-family',
    sources: [
     { src: '/fonts/Sarabun-Regular.woff2', format: 'woff2', weight: 400 },
     { src: '/fonts/Sarabun-Bold.woff2', format: 'woff2', weight: 700 }
    ]
   }
  ]
 }
});`,
    'Disable Defaults': `import { defineSV5UIPlusConfig } from 'sv5ui-plus';

defineSV5UIPlusConfig({
 fonts: false
});`,
    'API Reference': `import type {
 FontDefinition,
 FontsOptions,
 LocalFontSource
} from 'sv5ui-plus';

const source: LocalFontSource = {
 src: '/fonts/Sarabun-Regular.woff2',
 format: 'woff2',
 weight: 400,
 style: 'normal'
};

const families: FontDefinition[] = [
 {
  provider: 'local',
  name: 'Sarabun',
  variable: '--font-sarabun-family',
  sources: [source]
 }
];

const options: FontsOptions = {
 families,
 display: 'swap',
 preconnect: true
};`
}
