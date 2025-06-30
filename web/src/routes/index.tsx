import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Monaco from "~/components/Monaco";

export default component$(() => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Monaco
        monaco={{
          value: `console.log("Hello, Qwik!")`,
          
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
