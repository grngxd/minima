import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div class="w-16 h-full px-2 flex flex-col items-center justify-between sticky">
            <div>
                <span class="text-sm">left side</span>
            </div>
            <div>
                <span class="text-sm">right side</span>
            </div>
        </div>
    )
})