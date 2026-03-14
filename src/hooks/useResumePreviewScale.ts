import { useEffect, useRef, useState } from 'react'

const A4_PAGE_WIDTH_PX = 794
const A4_PAGE_HEIGHT_PX = 1123

export function useResumePreviewScale() {
    const viewportRef = useRef<HTMLDivElement | null>(null)
    const [viewportWidth, setViewportWidth] = useState<number | null>(null)

    useEffect(() => {
        const viewportElement = viewportRef.current

        if (!viewportElement) {
            return
        }

        const updateViewportWidth = () => {
            const computedStyle = window.getComputedStyle(viewportElement)
            const horizontalPadding =
                Number.parseFloat(computedStyle.paddingLeft) + Number.parseFloat(computedStyle.paddingRight)
            const innerWidth = Math.max(0, viewportElement.clientWidth - horizontalPadding)

            setViewportWidth(innerWidth)
        }

        updateViewportWidth()

        const resizeObserver = new ResizeObserver(() => {
            updateViewportWidth()
        })

        resizeObserver.observe(viewportElement)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    const pageScale = viewportWidth
        ? Math.min(1, viewportWidth / A4_PAGE_WIDTH_PX)
        : 1

    return {
        viewportRef,
        pageScale,
        scaledPageWidth: A4_PAGE_WIDTH_PX * pageScale,
        scaledPageHeight: A4_PAGE_HEIGHT_PX * pageScale,
    }
}