type ItemWithId = {
    id: string
}

export function moveArrayItemById<TItem extends ItemWithId>(
    items: TItem[],
    itemId: string,
    direction: 'up' | 'down',
) {
    const currentIndex = items.findIndex((item) => item.id === itemId)

    if (currentIndex === -1) {
        return items
    }

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (targetIndex < 0 || targetIndex >= items.length) {
        return items
    }

    const nextItems = [...items]
    const [movedItem] = nextItems.splice(currentIndex, 1)
    nextItems.splice(targetIndex, 0, movedItem)

    return nextItems
}