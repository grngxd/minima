import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import CodeMirror from "~/components/editor/CodeMirror";

export default component$(() => {
  return (
    <div class="w-full h-full flex flex-col">
      <CodeMirror
        editor={{
            value: `
import React from 'react';

type AppState = {
  count: number;
};

export default function App() {
  const [state, setState] = React.useState<AppState>({ count: 0 });

  return (
  <div style={{ textAlign: 'center', marginTop: 40 }}>
    <h1>Hello, TypeScript + React!</h1>
    <p>Count: {state.count}</p>
    <button onClick={() => setState({ count: state.count + 1 })}>
    Increment
    </button>
    <button onClick={() => setState({ count: state.count - 1 })} style={{ marginLeft: 8 }}>
    Decrement
    </button>
  </div>
  );
}
          `.trim(),
        }}
        class="w-full h-full flex-grow"
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
