import update from 'immutability-helper'
import { useCallback, useEffect, useState } from 'react'
import { useDrop } from 'react-dnd'
import { DraggableBox } from './DraggableBox.jsx'
import { ItemTypes } from './ItemTypes.jsx'
import { snapToGrid as doSnapToGrid } from './snapToGrid.jsx'
const styles = {
  width: "100%",
  height: 600,
  border: '1px solid #D9D9D9',
  borderRadius:"5px",
  position: 'relative',
}
export const Container = ({ snapToGrid, setCoord }) => {
  const [boxes, setBoxes] = useState({
    a: { top: 20, left: 80, title: 'Firma' }
  })

  useEffect(() => {
    console.log(boxes.a.top, boxes.a.left)
    setCoord({y:boxes.a.top,x:boxes.a.left})
  },[boxes])

  const moveBox = useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset()
        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        if (snapToGrid) {
          ;[left, top] = doSnapToGrid(left, top)
        }
        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )
  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
      ))}
    </div>
  )
}
