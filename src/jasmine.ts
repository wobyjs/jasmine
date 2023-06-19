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

export function mockSetInterval() {
    spyOn(globalThis, 'setInterval')
}

export function mockClearInterval() {
    spyOn(globalThis, 'clearInterval')
}

const ftick = (setSpyFunction: ReturnType<typeof spyOn>, clearSpyFunction: ReturnType<typeof spyOn>, fn?: () => void) => (ms: number) => {
    const setSpyCalls = setSpyFunction.calls
    const clearSpyCalls = clearSpyFunction.calls
    if (!setSpyCalls.any()) {
        return
    }

    const callback = setSpyCalls.mostRecent().args[0] as Function
    const milli = setSpyCalls.mostRecent().args[1] as number
    const dispose = clearSpyCalls.all().some(id => //checks whether the timeout id is removed
        setSpyCalls.mostRecent().returnValue as any === id.args[0]
    )
    if (!dispose) {
        if (ms >= milli) {
            for (let i = 0; i < ms / milli; i++) {
                callback()
            }
            fn?.()
        }
    }
}
export function installInterval() {
    const setSpy = spyOn(globalThis, 'setInterval').and.returnValues(Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any)
    const clearSpy = spyOn(globalThis, 'clearInterval')
    const tick = ftick(setSpy, clearSpy)
    return { tick }
}
export function installTimeout() {
    const setSpy = spyOn(globalThis, 'setTimeout').and.returnValues(Math.floor(Math.random() * 1000) as any, Math.floor(Math.random() * 1000) as any)
    const clearSpy = spyOn(globalThis, 'clearTimeout')
    const tick = ftick(setSpy, clearSpy, () => globalThis.clearTimeout(setSpy.calls.mostRecent().returnValue)
    )
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