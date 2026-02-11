<script lang="ts">
    import { projects } from '$lib/data/projects';
</script>

<section class="max-w-narrow mx-auto px-6 md:px-8 pt-6 md:pt-16 pb-20 md:pb-28">
    <h1 class="tracking-hero  text-3xl sm:text-6xl md:text-7xl lg:text-[76px] font-grotesk font-bold">
        <span class="block">Product Engineer.</span>
        <span class="block mt-3">Systems Thinker.</span>
        <span class="block mt-3">Occasional Worldbuilder.</span>
    </h1>

    <div class="mt-10 md:mt-12 flex flex-wrap gap-4">
        <a
            href="mailto:hello@hugofvs.com"
            class="target text-lightSlate dark:text-darkSlate py-3 md:py-3.5 text-base md:text-lg font-medium inline-flex items-center justify-center border-0"
        >
            <span class="text relative select-none shiny synthetic-hover:text-highlight">Get in touch</span>
        </a>
    </div>
</section>

<section class="max-w-narrow mx-auto px-6 md:px-8 pb-28 md:pb-36">
    <h2 class="font-ui text-xs uppercase tracking-widest text-lightSlate/40 dark:text-darkSlate/40 mb-8">
        Projects
    </h2>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {#each projects as project}
            <li>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="target group flex flex-col rounded-2xl overflow-hidden border border-lightSlate/[0.07] dark:border-darkSlate/[0.07] synthetic-hover:border-lightSlate/20 dark:synthetic-hover:border-darkSlate/20 transition-colors duration-200"
                >
                    <!-- Image -->
                    <div class="aspect-[3/2] overflow-hidden bg-lightSlate/[0.04] dark:bg-darkSlate/[0.04]">
                        <img
                            src={project.image}
                            alt={project.name}
                            class="w-full h-full object-cover transition-transform duration-500 synthetic-hover:scale-[1.03]"
                        />
                    </div>

                    <!-- Content -->
                    <div class="flex items-start justify-between gap-4 px-5 py-4">
                        <div class="min-w-0">
                            <span class="text relative select-none block font-grotesk text-base font-medium text-lightSlate dark:text-darkSlate synthetic-hover:text-highlight transition-colors duration-200 truncate">
                                {project.name}
                            </span>
                            <p class="font-ui text-sm text-lightSlate/50 dark:text-darkSlate/50 mt-0.5 line-clamp-2 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        <div class="flex flex-col items-end shrink-0 gap-1 pt-0.5">
                            <span class="text relative select-none font-ui text-sm text-lightSlate/30 dark:text-darkSlate/30 synthetic-hover:text-highlight transition-colors duration-200">
                                ↗
                            </span>
                            <span class="font-ui text-xs tabular-nums text-lightSlate/30 dark:text-darkSlate/30">
                                {project.year}
                            </span>
                        </div>
                    </div>
                </a>
            </li>
        {/each}
    </ul>
</section>
