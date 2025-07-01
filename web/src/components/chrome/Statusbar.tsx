import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div class="w-full h-8 px-2 flex items-center justify-between sticky">
            <div>
                <span class="text-sm">
                    v0.1.0
                </span>
            </div>
            <div>
                <span class="text-sm">
                    Javascript (JSX)
                </span>
            </div>
        </div>
    )
})