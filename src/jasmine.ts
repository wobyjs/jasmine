import { render } from "voby"

const test2 = document.createElement("div")
export function renderHook<R>(fn: (...args: any) => R) {
    let fnReturn: R
    const Test = () => {
        fnReturn = fn()
    }
    let dispose = render(Test as any, test2)
    return {
        result: { get current(): R { return fnReturn } },
        rerender: function () {
            dispose = render(Test as any, test2)
        },
        unmount: function () {
            dispose()

        }
    }
}

export function act<T extends (...args: any) => any>(fn: T) {
    fn()
}

export const test = it
export const jest = {
    fn: jasmine.createSpy,
    resetAllMocks: () => { },
    clearAllMocks: () => { }
}

// export function mockSetInterval() {
//     spyOn(globalThis, 'setInterval')
// }

// export function mockClearInterval() {
//     spyOn(globalThis, 'clearInterval')
// }

// const ftick = (setSpyFunction: jasmine.Spy,
//     clearSpyFunction: jasmine.Spy,
//     dateSpyFunction: jasmine.Spy,
//     now: {current: number},
//     fn?: (id: number) => void) => (ms: number) => {
//         const setSpyCalls = setSpyFunction.calls
//         const clearSpyCalls = clearSpyFunction.calls
//         //ftick must tick both in ms and date format, 
//         const dateTick = (ms: number) => { 
//             const i = now.current = now.current + ms 
//             dateSpyFunction.and.returnValues(i, i+1, i+2, i+3, i+4, i+5) 
//         }

//         if (!setSpyCalls.any()) {
//             return
//         }   
//         const callback = setSpyCalls.all().map(c => c.args[0] as Function)
//         callback.forEach((c)=>{if(!c.startTime){c.startTime=now.current}})

//         const milli = setSpyCalls.all().map(ms => ms.args[1] as number)
//         const dispose = clearSpyCalls.all().map(id => //checks whether the timeout id is removed
//             setSpyCalls.all().some(s => s.returnValue as any === id.args[0])
//         )
//         callback.forEach((c, i) => {
//             if (!dispose[i]) {
//                 if ((now.current - c.startTime ) >= milli[i] ) {
//                     for (let i = 0; i < ms / milli[i]; i++) {
//                         callback[i]()
//                     }
//                     if(fn){
//                         fn(setSpyCalls.all()[i].returnValue)
//                     }
//                 }
//                 else{
//                    now.current += ms
//                 }
//             }
//         })
//         dateTick(ms)

//     }
// export function installInterval() {
//     const setSpy = spyOn(globalThis, 'setInterval').and.returnValues(Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any)
//     const clearSpy = spyOn(globalThis, 'clearInterval')
//     let now = {current: Date.now()} 
//     const dateSpy = spyOn(Date, 'now').and.returnValues(now.current, now.current+1, now.current+2, now.current+3, now.current+4)
//     const tick = ftick(setSpy, clearSpy, dateSpy, now)
//     return { tick }
// }
// export function installTimeout() {
//     const setSpy = spyOn(globalThis, 'setTimeout').and.returnValues(Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any)
//     const clearSpy = spyOn(globalThis, 'clearTimeout')
//     let now = {current: Date.now()} 
//     const dateSpy = spyOn(Date, 'now').and.returnValues(now.current, now.current+1, now.current+2, now.current+3, now.current+4)
//     const tick = ftick(setSpy, clearSpy, dateSpy, now, () => globalThis.clearTimeout)
//     return { tick }
// }

export const fireEvent = {
    click: <T extends HTMLElement>(e: T) => {
        e.dispatchEvent(new MouseEvent('click'))
    },
    keyDown: <T extends HTMLElement>(e: T) => {
        e.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }));
    },
    mouseEnter: <T extends HTMLElement>(e: T) => {
        e.dispatchEvent(new MouseEvent('mouseenter'));
    },
    mouseLeave: <T extends HTMLElement>(e: T) => {
        e.dispatchEvent(new MouseEvent('mouseleave'));
    },

}