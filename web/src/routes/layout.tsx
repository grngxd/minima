import { $, component$, Slot, useOnDocument } from '@builder.io/qwik';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default component$(() => {
    useOnDocument("DOMContentLoaded", $(() => AOS.init()))
    return (
        <Slot />
    );
});