import { combineReducers, createStore } from 'redux'

const board = (state = { columns: [] }, action ) => {
  switch (action.type) {
  case 'ADD_COLUMN': {
    const { columnId } = action.payload
    return { columns: [...state.columns, columnId] }
  }
  case 'MOVE_COLUMN': {
    const { oldColumnIndex, newColumnIndex } = action.payload
    const newColumns = Array.from(state.columns)
    const [removedColumn] = newColumns.splice(oldColumnIndex, 1)
    newColumns.splice(newColumnIndex, 0, removedColumn)
    return { columns: newColumns }
  }
  case 'DELETE_COLUMN': {
    const { columnId } = action.payload
    const filterDeleted = tmpColumnId => tmpColumnId !== columnId
    const newColumns = state.columns.filter(filterDeleted)
    return { columns: newColumns }
  }
  default:
    return state
  }
}

const columnsById = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_COLUMN': {
    const { columnId, columnTitle } = action.payload
    return {
      ...state,
      [columnId]: { _id: columnId, title: columnTitle, cards: [] }
    }
  }
  case 'CHANGE_COLUMN_TITLE': {
    const { columnId, columnTitle } = action.payload
    return {
      ...state,
      [columnId]: { ...state[columnId], title: columnTitle }
    }
  }
  case 'DELETE_COLUMN': {
    const { columnId } = action.payload
    const newState = { ...state }
    delete newState[columnId]
    return newState
  }
  case 'ADD_CARD': {
    const { columnId, cardId } = action.payload
    return {
      ...state,
      [columnId]: { ...state[columnId], cards: [...state[columnId].cards, cardId] }
    }
  }
  case 'MOVE_CARD': {
    const {
      oldCardIndex,
      newCardIndex,
      sourcecolumnId,
      destcolumnId
    } = action.payload
    if (sourcecolumnId === destcolumnId) {
      const newCards = Array.from(state[sourcecolumnId].cards)
      const [removedCard] = newCards.splice(oldCardIndex, 1)
      newCards.splice(newCardIndex, 0, removedCard)
      return {
        ...state,
        [sourcecolumnId]: { ...state[sourcecolumnId], cards: newCards }
      }
    }
    const sourceCards = Array.from(state[sourcecolumnId].cards)
    const [removedCard] = sourceCards.splice(oldCardIndex, 1)
    const destinationCards = Array.from(state[destcolumnId].cards)
    destinationCards.splice(newCardIndex, 0, removedCard)
    return {
      ...state,
      [sourcecolumnId]: { ...state[sourcecolumnId], cards: sourceCards }
    }
  }
  case 'DELETE_CARD': {
    const { cardId: deletedCardId, columnId } = action.payload
    const filterDeleted = cardId => cardId !== deletedCardId
    return {
      ...state,
      [columnId]: {
        ...state[columnId],
        cards: state[columnId].cards.filter(filterDeleted)
      }
    }
  }
  default:
    return state
  }
}
const cardsById = (state = {}, action) => {
  switch (action.type) {
  case 'ADD_CARD': {
    const { cardText, cardId } = action.payload
    return { ...state, [cardId]: { text: cardText, _id: cardId } }
  }
  case 'CHANGE_CARD_TEXT': {
    const { cardContent, cardText, cardId } = action.payload
    return { ...state, [cardId]: { ...state[cardId], text: cardText, content: cardContent } }
  }
  case 'DELETE_CARD':{
    const { cardId } = action.payload
    // Create a copy of the state object excluding the card with the specified id
    const newState = { ...state }
    delete newState[cardId]
    return newState}
  case 'DELETE_LIST': {
    const { cards: cardIds } = action.payload
    return Object.keys(state)
      .filter(cardId => !cardIds.includes(cardId))
      .reduce(
        (newState, cardId) => ({ ...newState, [cardId]: state[cardId] }),
        {}
      )
  }
  default:
    return state
  }
}
const reducers = combineReducers({
  board,
  columnsById,
  cardsById
})

const store = createStore(reducers)
export default store