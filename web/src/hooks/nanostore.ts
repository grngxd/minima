import { implicit$FirstArg, QRL, useSignal, useTask$, useVisibleTask$ } from '@builder.io/qwik';
import type { WritableAtom } from 'nanostores';

export function useNanostoreQrl<T>(
  qrl: QRL<WritableAtom<T>>,
) {
    const signal = useSignal<T>(qrl.resolved?.get() as T);
    const updatingFromStore = useSignal(false);

    // store -> signal
    useTask$(async ({ track, cleanup }) => {
        const store = await qrl.resolve();
        track(() => {});
        
        const u = store.subscribe((newValue) => {
            updatingFromStore.value = true;
            if (newValue !== signal.value) {
                signal.value = newValue;
            }
            updatingFromStore.value = false;
        });
        
        cleanup(() => {
            u();
        });
    });

    // store -> signal (in the browser)
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ track, cleanup }) => {
        const store = await qrl.resolve();
        track(() => {});
        
        const u = store.subscribe((newValue) => {
            updatingFromStore.value = true;
            if (newValue !== signal.value) {
                signal.value = newValue;
            }
            updatingFromStore.value = false;
        });
        
        cleanup(() => {
            u();
        });
    });

    // signal -> store
    useTask$(async ({ track }) => {
        const store = await qrl.resolve();
        const value = track(signal);
        if (!updatingFromStore.value) {
            console.log('updating store with:', value, "because signal changed");
            store.set(value);
        }
    });

    return signal;
}

export const useNanostore$ = implicit$FirstArg(useNanostoreQrl);