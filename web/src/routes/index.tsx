import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import CodeMirror from "~/components/editor/CodeMirror";

export default component$(() => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
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
        style={{ height: "100%", width: "100%" }}
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
