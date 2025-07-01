import { implicit$FirstArg, QRL, useSignal, useStore, useTask$, useVisibleTask$ } from '@builder.io/qwik';

type Subscriber<T> = (value: T) => void;

export class Atom<T> {
  private value: T;
  private subscribers: Set<Subscriber<T>> = new Set();
  private updating = false;

  constructor(initialValue: T) {
    this.value = initialValue;
  }

  get() {
    return this.value;
  }

  set(newValue: T) {
    if (this.updating) return;
    
    this.updating = true;
    this.value = newValue;
    this.subscribers.forEach(sub => sub(newValue));
    this.updating = false;
  }

  subscribe(callback: Subscriber<T>) {
    this.subscribers.add(callback);
    return () => {
      this.subscribers.delete(callback);
    };
  }
}

export function atom<T>(initialValue: T): Atom<T> {
    return new Atom<T>(initialValue);
}

export function useAtomQrl<T>(qrl: QRL<Atom<T>>) {
    const store = useStore<{
        value: T;
    }>({
        value: qrl.resolved?.get() as T
    }, {
        deep: true,
        reactive: true
    });

    const updating = useSignal(false)
    
    // store -> atom
    useTask$(async ({ track }) => {
        track(() => store.value);
        if (updating.value) return;

        updating.value = true;
        const atom = await qrl.resolve()
        atom.set({ ...store.value });
        updating.value = false;
    })

    // atom -> store
    useVisibleTask$(async () => {
        const atom = await qrl.resolve();
        const unsubscribe = atom.subscribe((value) => {
            if (updating.value) return;
            updating.value = true;
            store.value = value;
            updating.value = false;
        });

        return () => {
            unsubscribe();
        };
    });
    
    return store;
}

export const useAtom$ = implicit$FirstArg(useAtomQrl);