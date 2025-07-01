import { $, component$, Slot, useOnDocument } from '@builder.io/qwik';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Statusbar from '~/components/chrome/Statusbar';
import Titlebar from '~/components/chrome/Titlebar';
import { useKeyboardShortcut } from '~/hooks/keyboard';

export default component$(() => {
    useOnDocument("DOMContentLoaded", $(() => AOS.init()))

    useKeyboardShortcut(
        [
            ["Control", "k"],
            ["Control", "t"]
        ], 
        $((event: KeyboardEvent) => {
            console.log("open command pallete");
        }), {
            inOrder: true,
            preventDefault: true,
            held: false
        }
    );

    return (
        <div class="w-full h-full flex flex-col">
            <Titlebar />
            <Slot />
            <Statusbar />
        </div>
    );
});