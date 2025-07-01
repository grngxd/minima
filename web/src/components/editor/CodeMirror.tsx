import { component$, isBrowser, QwikIntrinsicElements, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { javascript } from '@codemirror/lang-javascript';
import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { basicSetup } from "codemirror";

export type EditorProps = {
    value: string;
    language: string;
    theme: string;
}

export default component$((props: QwikIntrinsicElements["div"] & { editor: Partial<EditorProps> }) => {
    const { editor: e, ...p } = props;
    const container = useSignal<HTMLDivElement>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async () => {
        if (!isBrowser || !container.value) return;
        
        const editor = new EditorView({
            parent: container.value,
            state: EditorState.create({
                extensions: [
                    basicSetup,
                    javascript({ jsx: true })
                ],
                doc: e.value || '',
            }),
        })
        
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