import { $, component$, Slot, useOnDocument } from '@builder.io/qwik';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Statusbar from '~/components/chrome/Statusbar';
import Titlebar from '~/components/chrome/Titlebar';
import CommandPalette from '~/components/editor/CommandPalette';

export default component$(() => {
    useOnDocument("DOMContentLoaded", $(() => AOS.init()))

    return (
        <>
            <CommandPalette />
            <div class="w-full h-full flex flex-col">
                <Titlebar />
                <Slot />
                <Statusbar />
            </div>
        </>
    );
});