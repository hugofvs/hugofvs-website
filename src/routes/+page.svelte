<script lang="ts">
    import { projects } from "$lib/data/projects";
    import { spotlight } from "$lib/utils/spotlight";
</script>

<section
    class="min-h-[80svh] flex flex-col justify-start max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-20 pb-16"
>
    <h1
        class="tracking-hero text-5xl leading-[1.2] sm:text-6xl md:text-7xl lg:text-[85px] xl:text-[96px] font-grotesk font-bold"
    >
        <span class="block">Software Engineer.</span>
        <span class="block mt-3">Systems Thinker.</span>
        <span class="block mt-3">Occasional Worldbuilder.</span>
    </h1>
</section>

<section id="projects" class="max-w-7xl mx-auto px-6 md:px-8 pb-28 md:pb-36">
    <h2 class="font-ui text-xs uppercase tracking-widest text-highlight dark:text-shine mb-8">
        Projects
    </h2>

    {#if projects.length === 1}
        {@const project = projects[0]}
        <a
            use:spotlight
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            class="project-card group relative flex flex-col sm:flex-row rounded-2xl overflow-hidden border border-shine/[0.2] dark:border-shine/[0.12] hover:border-shine/[0.45] dark:hover:border-shine/[0.3] transition-colors duration-200"
        >
            <div class="spotlight" aria-hidden="true"></div>

            <!-- Image -->
            <div
                class="relative aspect-[3/2] sm:w-2/5 shrink-0 overflow-hidden bg-shine/[0.06] dark:bg-shine/[0.08]"
            >
                <img
                    src={project.image}
                    alt={project.name}
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
            </div>

            <!-- Content -->
            <div
                class="relative flex flex-col justify-between gap-6 px-7 py-6 sm:py-8"
            >
                <div>
                    <span
                        class="block font-grotesk text-xl md:text-2xl font-medium text-lightSlate dark:text-darkSlate group-hover:text-highlight transition-colors duration-200"
                    >
                        {project.name}
                    </span>
                    <p
                        class="font-ui text-base text-lightSlate/80 dark:text-darkSlate/80 mt-2 leading-relaxed"
                    >
                        {project.description}
                    </p>
                </div>

                <div class="flex items-center justify-between">
                    <span
                        class="font-ui text-xs tabular-nums text-lightSlate/60 dark:text-darkSlate/60"
                    >
                        {project.year}
                    </span>
                    <span
                        class="font-ui text-sm text-lightSlate/60 dark:text-darkSlate/60 group-hover:text-highlight transition-colors duration-200"
                    >
                        {project.urlLabel} ↗
                    </span>
                </div>
            </div>
        </a>
    {:else}
        <ul
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
        >
            {#each projects as project}
                <li>
                    <a
                        use:spotlight
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-card group relative flex flex-col h-full rounded-2xl overflow-hidden border border-shine/[0.2] dark:border-shine/[0.12] hover:border-shine/[0.45] dark:hover:border-shine/[0.3] transition-colors duration-200"
                    >
                        <div class="spotlight" aria-hidden="true"></div>

                        <!-- Image -->
                        <div
                            class="relative aspect-[3/2] overflow-hidden bg-shine/[0.06] dark:bg-shine/[0.08]"
                        >
                            <img
                                src={project.image}
                                alt={project.name}
                                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                        </div>

                        <!-- Content -->
                        <div class="relative flex flex-col flex-1 px-5 py-4">
                            <div class="flex-1">
                                <span
                                    class="block font-grotesk text-base font-medium text-lightSlate dark:text-darkSlate group-hover:text-highlight transition-colors duration-200"
                                >
                                    {project.name}
                                </span>
                                <p
                                    class="font-ui text-sm text-lightSlate/80 dark:text-darkSlate/80 mt-1 leading-relaxed"
                                >
                                    {project.description}
                                </p>
                            </div>

                            <div class="flex items-center justify-between mt-4">
                                <span
                                    class="font-ui text-xs tabular-nums text-lightSlate/60 dark:text-darkSlate/60"
                                >
                                    {project.year}
                                </span>
                                <span
                                    class="font-ui text-sm text-lightSlate/60 dark:text-darkSlate/60 group-hover:text-highlight transition-colors duration-200"
                                >
                                    {project.urlLabel} ↗
                                </span>
                            </div>
                        </div>
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</section>

<section class="max-w-7xl mx-auto px-6 md:px-8 pb-10 md:pb-10">
    <div
        class="gap-4 pt-8 md:pt-10 border-t border-lightSlate/[0.07] dark:border-darkSlate/[0.07]"
    >
        <a
            href="mailto:hello@hugofvs.com"
            class="target text-lightSlate dark:text-darkSlate inline-flex"
        >
            <span
                class="text relative select-none font-grotesk text-xl md:text-2xl font-medium shiny synthetic-hover:text-highlight"
            >
                Get in touch.
            </span>
        </a>
    </div>
</section>
