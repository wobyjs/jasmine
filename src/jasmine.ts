import { render } from "voby"

const test2 = document.createElement("div")
export function renderHook<R>(fn: (...args: any) => R) {
    let fnReturn: R
    const Test = () => {
        fnReturn = fn()
    }
    let dispose = render(Test as any, test2)
    return {
        result: { get current() :R { return fnReturn } },
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

export function mockSetInterval() {
    spyOn(globalThis, 'setInterval')
}

export function mockClearInterval() {
    spyOn(globalThis, 'clearInterval')
}
const ftick = (fn: ReturnType<typeof spyOn>, spyFunction: ReturnType<typeof spyOn>) =>(ms: number) => {
    if (!fn.calls.any()) {
        return
    }

    const callback = fn.calls.mostRecent().args[0] as Function
    const milli = fn.calls.mostRecent().args[1] as number
    for(let ids of spyFunction.calls.all()){
        if(fn.calls.mostRecent().returnValue as any !== ids.args[0]){
            break
        }
        else{
            return
        }
    }
        if (ms >= milli) {
            for (let i = 0; i < ms / milli ; i++) {
                callback()
            }
        }

}
export function installInterval() {
    const clearInterval = spyOn(globalThis, 'clearInterval') 
    const fn = spyOn(globalThis, 'setInterval').and.returnValues( Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any)
    const tick = ftick(fn, clearInterval) 
    return { tick }
}
export function installTimer() {
    const clearTimeout = spyOn(globalThis, 'clearTimeout') 
    const fn = spyOn(globalThis, 'setTimeout').and.returnValues( Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any)
    const tick = ftick(fn, clearTimeout) 
    return { tick }
}

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