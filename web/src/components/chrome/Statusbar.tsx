import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return (
        <div class="w-full h-8 px-2 flex items-center justify-between sticky">
            <div class="flex items-center gap-3 text-sm">
                <span>
                    v0.1.0
                </span>
            </div>
            <div class="flex items-center gap-3 text-sm">
                <span>
                    Javascript (JSX)
                </span>
                <span>
                    1:1 {/* lines:col */}
                </span>
            </div>
        </div>
    )
})