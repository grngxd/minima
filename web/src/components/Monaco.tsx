import { $, component$, isBrowser, QwikIntrinsicElements, useOnDocument, useSignal } from '@builder.io/qwik';

export interface MonacoEditorProps {
    value: string;
    language: string;
    theme: string;
}

export default component$((props: QwikIntrinsicElements["div"] & { monaco: Partial<MonacoEditorProps> }) => {
    const { monaco, ...divProps } = props;
    const containerRef = useSignal<HTMLDivElement>();

    useOnDocument("DOMContentLoaded", $(async () => {
        if (!isBrowser) return;
        const m = await import("monaco-editor");
        m.editor.create(containerRef.value!, {
            value: monaco.value || '',
            language: monaco.language || 'javascript',
            theme: monaco.theme || 'vs-dark',
            automaticLayout: true,
        });
    }));

    return (
        <div
            ref={containerRef}
            {...divProps}
        />
    );
});