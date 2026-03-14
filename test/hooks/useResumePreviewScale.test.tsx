import { act, render, screen, waitFor } from '@testing-library/react'
import { renderHook } from '@testing-library/react'
import { useResumePreviewScale } from '../../src/hooks/useResumePreviewScale'

type ResizeObserverCallbackType = ConstructorParameters<typeof ResizeObserver>[0]

describe('useResumePreviewScale', () => {
    const originalClientWidthDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'clientWidth')

    let mockClientWidth = 0
    let resizeCallback: ResizeObserverCallbackType | null = null
    let observeMock: jest.Mock
    let disconnectMock: jest.Mock

    beforeEach(() => {
        observeMock = jest.fn()
        disconnectMock = jest.fn()
        resizeCallback = null
        mockClientWidth = 0

        class MockResizeObserver {
            constructor(callback: ResizeObserverCallbackType) {
                resizeCallback = callback
            }

            observe = observeMock
            disconnect = disconnectMock
        }

        Object.defineProperty(globalThis, 'ResizeObserver', {
            configurable: true,
            writable: true,
            value: MockResizeObserver,
        })

        Object.defineProperty(HTMLElement.prototype, 'clientWidth', {
            configurable: true,
            get() {
                return mockClientWidth
            },
        })
    })

    afterEach(() => {
        jest.restoreAllMocks()

        if (originalClientWidthDescriptor) {
            Object.defineProperty(HTMLElement.prototype, 'clientWidth', originalClientWidthDescriptor)
        }
    })

    test('returns defaults when viewport ref is not attached', () => {
        const { result } = renderHook(() => useResumePreviewScale())

        expect(result.current.pageScale).toBe(1)
        expect(result.current.scaledPageWidth).toBe(794)
        expect(result.current.scaledPageHeight).toBe(1123)
        expect(observeMock).not.toHaveBeenCalled()
    })

    test('computes scaled values from viewport width minus horizontal padding', async () => {
        mockClientWidth = 700

        jest.spyOn(window, 'getComputedStyle').mockReturnValue({
            paddingLeft: '20px',
            paddingRight: '20px',
        } as CSSStyleDeclaration)

        function TestComponent() {
            const { viewportRef, pageScale, scaledPageWidth, scaledPageHeight } = useResumePreviewScale()

            return (
                <>
                    <div data-testid="viewport" ref={viewportRef} />
                    <output data-testid="scale">{pageScale}</output>
                    <output data-testid="width">{scaledPageWidth}</output>
                    <output data-testid="height">{scaledPageHeight}</output>
                </>
            )
        }

        render(<TestComponent />)

        await waitFor(() => {
            expect(screen.getByTestId('scale')).toHaveTextContent(String(660 / 794))
        })

        expect(screen.getByTestId('width')).toHaveTextContent('660')
        expect(screen.getByTestId('height')).toHaveTextContent(String((1123 * 660) / 794))
        expect(observeMock).toHaveBeenCalledTimes(1)
        expect(resizeCallback).not.toBeNull()
    })

    test('updates scale when ResizeObserver callback runs and caps scale at 1', async () => {
        mockClientWidth = 700

        jest.spyOn(window, 'getComputedStyle').mockReturnValue({
            paddingLeft: '20px',
            paddingRight: '20px',
        } as CSSStyleDeclaration)

        function TestComponent() {
            const { viewportRef, pageScale, scaledPageWidth } = useResumePreviewScale()

            return (
                <>
                    <div data-testid="viewport" ref={viewportRef} />
                    <output data-testid="scale">{pageScale}</output>
                    <output data-testid="width">{scaledPageWidth}</output>
                </>
            )
        }

        render(<TestComponent />)

        await waitFor(() => {
            expect(screen.getByTestId('width')).toHaveTextContent('660')
        })

        mockClientWidth = 1200

        act(() => {
            resizeCallback?.([] as ResizeObserverEntry[], {} as ResizeObserver)
        })

        await waitFor(() => {
            expect(screen.getByTestId('scale')).toHaveTextContent('1')
        })

        expect(screen.getByTestId('width')).toHaveTextContent('794')
    })

    test('disconnects resize observer on unmount', () => {
        mockClientWidth = 700

        jest.spyOn(window, 'getComputedStyle').mockReturnValue({
            paddingLeft: '0px',
            paddingRight: '0px',
        } as CSSStyleDeclaration)

        function TestComponent() {
            const { viewportRef } = useResumePreviewScale()

            return <div ref={viewportRef} />
        }

        const { unmount } = render(<TestComponent />)

        unmount()

        expect(disconnectMock).toHaveBeenCalledTimes(1)
    })
})