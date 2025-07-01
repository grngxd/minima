import { component$ } from "@builder.io/qwik";
import { MinimaLogo, MynauiMaximize, MynauiMinimizeSolid, MynauiXSolid } from "../icons/icons";

export default component$(() => {
    return (
        <div class="z-[99999999999] w-full h-8 bg-white px-2 flex items-center justify-between sticky">
            <div class="text-sm flex items-center gap-1">
                <MinimaLogo class="text-xs" />
                <span class="font-semibold">minima</span>
            </div>
            {/* <div> search </div> */}
            <div class="text-sm flex items-center gap-4 h-full">
                <MynauiMinimizeSolid class="h-4 w-4"/>
                <MynauiMaximize class="h-4 w-4"/>
                <MynauiXSolid class="h-4 w-4"/>    
            </div> 
        </div>
    )
})