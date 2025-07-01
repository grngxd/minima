import { $, QRL, useOnDocument, useSignal } from "@builder.io/qwik";

type ShortcutOptions = {
    inOrder: boolean;
    preventDefault: boolean;
    held: boolean;
};

export const useKeyboardShortcut = (
    keys: string | string[] | string[][],
    callback: QRL<(event: KeyboardEvent) => void>,
    options: Partial<ShortcutOptions> = {
        inOrder: false,
        preventDefault: true,
        held: false,
    }
) => {
    const pressedKeysSignal = useSignal<Set<string>>(new Set<string>());
    const firedCombosSignal = useSignal<Set<string>>(new Set<string>());
    
    const { inOrder, preventDefault, held } = {
        inOrder: false,
        preventDefault: true,
        held: false,
        ...options,
    };

    const combos: string[][] = (() => {
        if (typeof keys === "string") {
            return [[keys.toLowerCase()]];
        }
        if (Array.isArray(keys) && keys.every((k) => typeof k === "string")) {
            return [(keys as string[]).map((k) => k.toLowerCase())];
        }
        return (keys as string[][]).map((sub) => sub.map((k) => k.toLowerCase()));
    })();

    const tryTrigger = $((combo: string[], event: KeyboardEvent) => {
        const comboKey = combo.join("+");
        if (preventDefault) event.preventDefault();

        if (held) {
            callback(event);
        } else {
            if (!firedCombosSignal.value.has(comboKey)) {
                const newFiredCombos = new Set(firedCombosSignal.value);
                newFiredCombos.add(comboKey);
                firedCombosSignal.value = newFiredCombos;
                callback(event);
            }
        }
    });

    // Handle keydown events
    const handleKeyDown = $((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const pressedKeys = pressedKeysSignal.value;
        
        const newPressedKeys = new Set(pressedKeys);
        newPressedKeys.add(key);
        pressedKeysSignal.value = newPressedKeys;

        const pressedArray = Array.from(newPressedKeys);

        for (const combo of combos) {
            let matched: boolean;
            if (inOrder) {
                matched = combo.length === pressedArray.length && 
                         combo.every((k, i) => pressedArray[i] === k);
            } else {
                matched = combo.length === pressedArray.length && 
                         combo.every((k) => newPressedKeys.has(k));
            }
            if (matched) {
                tryTrigger(combo, event);
                break;
            }
        }
    });

    const handleKeyUp = $((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        const pressedKeys = pressedKeysSignal.value;
        
        const newPressedKeys = new Set(pressedKeys);
        newPressedKeys.delete(key);
        pressedKeysSignal.value = newPressedKeys;
        
        if (!held) {

            const newFiredCombos = new Set<string>();
            
            for (const firedCombo of firedCombosSignal.value) {
                const comboKeys = firedCombo.split("+");
                if (!comboKeys.includes(key)) {
                    newFiredCombos.add(firedCombo);
                }
            }
            
            firedCombosSignal.value = newFiredCombos;
        } else if (newPressedKeys.size === 0) {
            firedCombosSignal.value = new Set<string>();
        }
    });

    const handleBlur = $(() => {
        pressedKeysSignal.value = new Set<string>();
        firedCombosSignal.value = new Set<string>();
    });

    useOnDocument("keydown", handleKeyDown);
    useOnDocument("keyup", handleKeyUp);
    useOnDocument("blur", handleBlur);
    useOnDocument("window:blur", handleBlur);
};