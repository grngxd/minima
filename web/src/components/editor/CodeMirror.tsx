import { component$, isBrowser, QwikIntrinsicElements, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { indentUnit } from "@codemirror/language";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap, placeholder } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { atom, useAtom$ } from "~/hooks/atom";

export type EditorProps = {
    value: string;
    language: string;
    theme: string;
}

export const editorState = atom({
    file: "",
    line: 1,
    col: 1,
    amountSelected: 0
});

export default component$((props: QwikIntrinsicElements["div"] & { editor: Partial<EditorProps> }) => {
    const { editor: e, ...p } = props;
    const container = useSignal<HTMLDivElement>();
    
    const state = useAtom$(editorState);

    useVisibleTask$(async () => {
        if (!isBrowser || !container.value) return;
        
        const updateListener = EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                state.value.file = update.state.doc.toString();
            }
            
            if (update.selectionSet) {
                const selection = update.state.selection.main;
                const pos = selection.head;
                const line = update.state.doc.lineAt(pos);

                state.value.line = line.number;
                state.value.col = pos - line.from + 1;
                state.value.amountSelected = selection.to - selection.from;
            }
        });
        
        const editor = new EditorView({
            parent: container.value,
            state: EditorState.create({
                extensions: [
                    basicSetup,
                    placeholder("⌘ + K to open the command palette"),
                    keymap.of([indentWithTab]),
                    indentUnit.of("    "),
                    javascript({ jsx: true }),
                    updateListener
                ],
                doc: e?.value || "",
            }),
        });
        
        return () => {
            editor.destroy();
        };
    });

    return (
        <div
            ref={container}
            {...p}
        />
    );
});