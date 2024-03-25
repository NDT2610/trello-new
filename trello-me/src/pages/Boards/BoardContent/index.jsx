
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import { DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLLUMN',
  CARD:'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const sensor = useSensors(pointerSensor)

  const [orderedColumns, setOrderedColumn] = useState([])
  const [activeDrgagItemId, setActiveDrgagItemId] = useState(null)
  const [activeDrgagItemIdType, setActiveDrgagItemIdType] = useState(null)
  const [activeDrgagItemIdData, setActiveDrgagItemIdData] = useState(null)
  const [oldColumn, setOldColumn] = useState(null)
  useEffect(() => {
    setOrderedColumn(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragEnd = (event) => {
    // console.log('handleOnDragEnd', event)
    const { active, over } = event
    if (!over || !active) return
    if (activeDrgagItemIdType === ACTIVE_DRAG_ITEM_TYPE.CARD) {

      const { id: activeDraggingCardId, data: { current : activeDraggingCardData } } = active
      const { id: overCardId } = over
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if ( !activeColumn || !overColumn ) return

      if ( oldColumn._id !== overColumn._id) {
        setOrderedColumn(prevColumns => {
          const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

          let newCardIndex
          const isBelowOverItem =
          active.react &&
          active.react.current &&
          active.react.current.translated &&
          active.react.current.translated.top >
          over.react.top + over.react.height

          const modifier = isBelowOverItem ? 1 : 0

          newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.lenght + 1

          const nextColumns = cloneDeep(prevColumns)
          const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
          const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)


          if (nextActiveColumn) {

            nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

            nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
          }

          if (nextOverColumn) {
            nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

            nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, { ...activeDraggingCardData, columnId: nextOverColumn._id })

            nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
          }

          return nextColumns
        })

      } else {
        const oldCardIndex = oldColumn?.cards?.findIndex(c => c._id === activeDrgagItemId)

        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const orderedCard = arrayMove(oldColumn?.cards, oldCardIndex, newCardIndex)

        setOrderedColumn(prevColumns => {

          const nextColumns = cloneDeep(prevColumns)

          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          targetColumn.cards = orderedCard
          targetColumn.cardOrderIds = orderedCard.map(card => card._id)

          return nextColumns
        })
      }
    }


    if (activeDrgagItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id)
    {
      const oldIndex = orderedColumns.findIndex(c => c._id === active.id )

      const newIndex = orderedColumns.findIndex(c => c._id === over.id )

      const newItems = arrayMove(orderedColumns, oldIndex, newIndex)
      // use for call API
      //const newItemsIds = newItems.map(c => c._id)

      setOrderedColumn(newItems)
    }
    setActiveDrgagItemId(null)
    setActiveDrgagItemIdType(null)
    setActiveDrgagItemIdData(null)
    setOldColumn(null)
  }
  const handleDragStart = (event) => {
    setActiveDrgagItemId(event?.active?.id)
    setActiveDrgagItemIdType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD :
        ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDrgagItemIdData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumn(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    if (activeDrgagItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = event
    if (!over || !active) return

    const { id: activeDraggingCardId, data: { current : activeDraggingCardData } } = active
    const { id: overCardId } = over
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if ( !activeColumn || !overColumn ) return

    if ( activeColumn._id !== overColumn._id ) {
      setOrderedColumn(prevColumns => {
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        let newCardIndex
        const isBelowOverItem =
        active.react &&
        active.react.current &&
        active.react.current.translated &&
        active.react.current.translated.top >
        over.react.top + over.react.height

        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.lenght + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)


        if (nextActiveColumn) {

          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if (nextOverColumn) {
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }
  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ stypes: { active : { opacity: '0.5 ' } } })
  }
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensor}
      collisionDetection={closestCorners}
    >
      <Box sx = {{
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDrgagItemIdType) && null}
          {(activeDrgagItemIdType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDrgagItemIdData}/>}
          {(activeDrgagItemIdType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDrgagItemIdData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent