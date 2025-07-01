import { component$ } from "@builder.io/qwik";
import { useAtom$ } from "~/hooks/atom";
import { editorState } from "../editor/CodeMirror";

export default component$(() => {
    const atom = useAtom$(editorState);

    return (
        <div class="w-full h-8 px-4 bg-white flex items-center justify-between sticky">
            <div class="flex items-center gap-3 text-sm">
                <span>
                    v0.1.0
                </span>
            </div>
            <div class="flex items-center gap-4 text-sm">
                <span>
                    CRLF
                </span>
                <span>
                    Javascript (JSX)
                </span>
                <span>
                    {atom.value.line}:{atom.value.col} {atom.value.amountSelected > 0 && `(${atom.value.amountSelected} selected)`}
                </span>
            </div>
        </div>
    )
})