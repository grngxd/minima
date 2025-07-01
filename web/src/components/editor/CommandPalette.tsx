import { $, component$, useOnDocument, useSignal } from "@builder.io/qwik";
import { useKeyboardShortcut } from "~/hooks/keyboard";

export default component$(() => {
    const open = useSignal(false);
    const input = useSignal<HTMLInputElement>();

    useKeyboardShortcut(
        [
            ["Control", "k"],
            ["Control", "t"]
        ],
        $(() => {
            open.value = true;
            if (input.value) {
                input.value.value = "";
                input.value.focus();
            }
        }),
        {
            inOrder: true,
            preventDefault: true,
            held: false
        }
    );
    
    useOnDocument(
        "keydown",
        $((event: KeyboardEvent) => {
            if (event.key === "Escape" && open.value) {
                open.value = false;
            }
        })
    );
    
    useOnDocument(
        "click",
        $((event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (open.value && input.value && 
                !input.value.contains(target) && 
                !target.closest('.command-palette')) {
                open.value = false;
            }
        })
    );

    const commands = useSignal([
        {
            name: "Open File...",
            action: $(() => console.log("Open File"))
        },
        {
            name: "Module Manager",
            action: $(() => console.log("Module Manager"))
        },
        {
            name: "Zen Mode",
            action: $(() => console.log("Zen Mode"))
        },
        {
            name: "Settings",
            action: $(() => console.log("Settings"))
        },
    ])

    return (
        <div class={`fixed inset-0 z-50 backdrop-blur-sm transition-opacity duration-150 ease-in-out text-gray-800 ${open.value ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div class="absolute inset-0 bg-black/50" onClick$={() => open.value = false}></div>
            <div class="command-palette relative flex items-start justify-center pt-[20vh]">
                <div class="bg-white w-[32rem] rounded-xl shadow-xl overflow-hidden">
                    <input 
                        ref={input}
                        type="text"
                        class="w-full bg-transparent text-gray-800 p-4 text-lg border-b border-gray-200 outline-none"
                        placeholder="Type a command..."
                    />
                    <div class="p-2 max-h-34 overflow-auto">
                        {
                            commands.value.map((cmd) => (
                                <div
                                    class="p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                                    key={cmd.name}
                                    onClick$={async () => {
                                        (await cmd.action.resolve())();
                                        open.value = false;
                                    }}
                                >
                                    {cmd.name}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});