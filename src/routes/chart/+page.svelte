<script lang="ts">
    import { Chart } from '$lib/compat.js'
    import type { ApexOptions } from 'apexcharts'
    
    // 1. Bar Chart (Basic)
    const barOptions: ApexOptions = {
        chart: { type: 'bar', height: 320, toolbar: { show: false } },
        series: [{ name: 'Sales', data: [30, 40, 45, 50, 49, 60] }],
        xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
        colors: ['var(--color-primary)'],
        plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } }
    }

    // 2. Area Chart (Smooth Curve + Gradient)
    const areaOptions: ApexOptions = {
        chart: { type: 'area', height: 320, toolbar: { show: false } },
        series: [{ name: 'Active Users', data: [65, 59, 80, 81, 56, 55, 40] }],
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
        stroke: { curve: 'smooth', width: 3 },
        fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] } },
        colors: ['var(--color-secondary)']
    }

    // 3. Donut Chart (Proportions)
    const donutOptions: ApexOptions = {
        chart: { type: 'donut', height: 320 },
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
        colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-tertiary)', 'var(--color-warning)'],
        plotOptions: { pie: { donut: { size: '65%' } } },
        stroke: { show: true, colors: ['transparent'], width: 2 }
    }

    // 4. Stacked Column Chart (Composition over time)
    const stackedOptions: ApexOptions = {
        chart: { type: 'bar', height: 320, stacked: true, toolbar: { show: false } },
        series: [
            { name: 'Product A', data: [44, 55, 41, 67, 22, 43] },
            { name: 'Product B', data: [13, 23, 20, 8, 13, 27] },
            { name: 'Product C', data: [11, 17, 15, 15, 21, 14] }
        ],
        xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'] },
        colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-tertiary)'],
        plotOptions: { bar: { borderRadius: 4 } },
        fill: { opacity: 1 },
        legend: { position: 'top', horizontalAlign: 'right' }
    }

    // 5. Mixed Chart (Line + Column for Multi-metric)
    const mixedOptions: ApexOptions = {
        chart: { height: 320, type: 'line', toolbar: { show: false } },
        series: [
            { name: 'Revenue', type: 'column', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
            { name: 'Profit Margin', type: 'line', data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43] }
        ],
        stroke: { width: [0, 4], curve: 'smooth' },
        colors: ['var(--color-surface-container-highest)', 'var(--color-primary)'],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
        xaxis: { type: 'category' }
    }

    // 6. Radar Chart (Multi-dimensional Analysis)
    const radarOptions: ApexOptions = {
        chart: { type: 'radar', height: 350, toolbar: { show: false } },
        series: [{ name: 'Series 1', data: [80, 50, 30, 40, 100, 20] }],
        labels: ['Design', 'Development', 'Marketing', 'Sales', 'Support', 'IT'],
        colors: ['var(--color-primary)'],
        stroke: { width: 2 },
        fill: { opacity: 0.2 },
        markers: { size: 4, hover: { size: 6 } }
    }

    // 7. Radial Bar (Gauge/Score)
    const radialOptions: ApexOptions = {
        chart: { type: 'radialBar', height: 350 },
        series: [76],
        colors: ['var(--color-success)'],
        plotOptions: {
            radialBar: {
                hollow: { size: '65%' },
                dataLabels: {
                    name: { offsetY: -10, color: 'var(--color-on-surface-variant)', fontSize: '13px' },
                    value: { color: 'var(--color-on-surface)', fontSize: '30px', show: true }
                }
            }
        },
        labels: ['Performance']
    }
</script>

<div class="space-y-12">
    <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Chart</h1>
        <p class="text-lg text-on-surface-variant max-w-3xl">
            A beautiful, fully interactive charting wrapper built on top of <code class="rounded bg-surface-container-highest px-1.5 py-0.5">ApexCharts</code>. Extremely flexible to cover any data visualization use case you need.
        </p>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <!-- Bar Chart -->
        <section class="space-y-3">
            <h2 id="Bar-Chart" class="text-xl font-semibold">
<a href="#Bar-Chart" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Bar Chart
                    </a>
</h2>
            <p class="text-sm text-on-surface-variant">Simple comparisons with rounded corners.</p>
            <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm">
                <Chart options={barOptions} />
            </div>
        </section>

        <!-- Area Chart -->
        <section class="space-y-3">
            <h2 id="Area-Chart" class="text-xl font-semibold">
<a href="#Area-Chart" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Area Chart
                    </a>
</h2>
            <p class="text-sm text-on-surface-variant">Smooth curves with beautiful gradients for trends.</p>
            <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm">
                <Chart options={areaOptions} />
            </div>
        </section>

        <!-- Stacked Column Chart -->
        <section class="space-y-3">
            <h2 id="Stacked-Column-Chart" class="text-xl font-semibold">
<a href="#Stacked-Column-Chart" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Stacked Column Chart
                    </a>
</h2>
            <p class="text-sm text-on-surface-variant">Perfect for visualizing composition and parts-to-whole over time.</p>
            <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm">
                <Chart options={stackedOptions} />
            </div>
        </section>

        <!-- Mixed Chart -->
        <section class="space-y-3">
            <h2 id="Mixed-Chart-Line--Column" class="text-xl font-semibold">
<a href="#Mixed-Chart-Line--Column" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Mixed Chart (Line + Column)
                    </a>
</h2>
            <p class="text-sm text-on-surface-variant">Combine different types to compare multiple metrics (e.g. Revenue vs Margin).</p>
            <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm">
                <Chart options={mixedOptions} />
            </div>
        </section>

        <!-- Donut Chart -->
        <section class="space-y-3">
            <h2 id="Donut-Chart" class="text-xl font-semibold">
<a href="#Donut-Chart" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Donut Chart
                    </a>
</h2>
            <p class="text-sm text-on-surface-variant">Clear proportional breakdown with hover expansions.</p>
            <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm flex items-center justify-center">
                <div class="w-full max-w-[320px]">
                    <Chart options={donutOptions} />
                </div>
            </div>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 col-span-1 xl:col-span-2">
            <!-- Radar Chart -->
            <section class="space-y-3">
                <h2 id="Radar-Chart" class="text-xl font-semibold">
<a href="#Radar-Chart" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Radar Chart
                    </a>
</h2>
                <p class="text-sm text-on-surface-variant">Analyze multiple variables simultaneously.</p>
                <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm flex items-center justify-center">
                    <Chart options={radarOptions} />
                </div>
            </section>

            <!-- Radial Bar -->
            <section class="space-y-3">
                <h2 id="Radial-Bar-Gauge" class="text-xl font-semibold">
<a href="#Radial-Bar-Gauge" class="group relative inline-flex items-center no-underline hover:underline focus:outline-none focus-visible:underline w-fit">
                        <span class="absolute -left-5 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 text-primary/60 font-normal text-base leading-none" aria-hidden="true">#</span>
                        Radial Bar Gauge
                    </a>
</h2>
                <p class="text-sm text-on-surface-variant">Ideal for scorecards and KPI dashboard indicators.</p>
                <div class="rounded-xl bg-surface-container-low border border-outline-variant/60 p-6 shadow-sm flex items-center justify-center">
                    <Chart options={radialOptions} />
                </div>
            </section>
        </div>

    </div>
</div>
