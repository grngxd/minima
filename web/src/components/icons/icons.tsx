import { QwikIntrinsicElements } from "@builder.io/qwik";

export const MinimaLogo = (props: QwikIntrinsicElements["svg"], key: string) => (
    <svg width="1em" height="1em" viewBox="0 0 92 98" fill="none" xmlns="http://www.w3.org/2000/svg" {...props} key={key}>
        <path d="M46 49L1.33018 3.39956C0.0902503 2.1338 0.987008 0 2.75889 0L89.2411 0C91.013 0 91.9097 2.1338 90.6698 3.39956L46 49L90.6698 94.6004C91.9097 95.8662 91.013 98 89.2411 98L2.75889 98C0.987008 98 0.0902503 95.8662 1.33018 94.6004L46 49Z" fill="currentColor"/>
    </svg>
);


export function MynauiMinimizeSolid(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props} key={key}><path fill="currentColor" d="M10.5 3.02A.75.75 0 1 0 9 3c-.04 2.84-.275 4.098-1.089 4.91c-.813.815-2.07 1.05-4.911 1.091a.75.75 0 1 0 .02 1.499c2.737-.04 4.643-.22 5.951-1.528S10.46 5.758 10.5 3.021M3.02 13.51a.75.75 0 0 0-.02 1.5c2.842.04 4.099.274 4.912 1.088c.814.814 1.048 2.071 1.09 4.913a.75.75 0 1 0 1.499-.022c-.04-2.737-.22-4.643-1.528-5.951s-3.214-1.489-5.951-1.528M15.01 2.999a.75.75 0 0 0-1.5.022c.04 2.737.22 4.643 1.528 5.951s3.214 1.488 5.951 1.528a.75.75 0 1 0 .022-1.5c-2.842-.041-4.099-.275-4.913-1.089c-.813-.813-1.047-2.07-1.088-4.912m6 12.011a.75.75 0 1 0-.02-1.5c-2.738.04-4.644.22-5.952 1.528s-1.489 3.214-1.528 5.951a.75.75 0 0 0 1.5.022c.04-2.842.274-4.099 1.088-4.913c.814-.813 2.071-1.047 4.913-1.088" /></svg>
  )
}


export function MynauiMaximize(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props} key={key}><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.4 21c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C3 17.96 3 16.84 3 14.6m18 0c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748C17.96 21 16.84 21 14.6 21m0-18c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748C21 6.04 21 7.16 21 9.4M9.4 3c-2.24 0-3.36 0-4.216.436a4 4 0 0 0-1.748 1.748C3 6.04 3 7.16 3 9.4" /></svg>
  )
}


export function MynauiXSolid(props: QwikIntrinsicElements['svg'], key: string) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props} key={key}><path fill="currentColor" d="M6.707 5.293a1 1 0 0 0-1.414 1.414L10.586 12l-5.293 5.293a1 1 0 1 0 1.414 1.414L12 13.414l5.293 5.293a1 1 0 0 0 1.414-1.414L13.414 12l5.293-5.293a1 1 0 0 0-1.414-1.414L12 10.586z" /></svg>
  )
}