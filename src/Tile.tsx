import React from 'react'
import CSS from 'csstype';
import Card from 'react-bootstrap/Card';
import { Players, loc } from './types';

interface Props {
  value: string,
  id: loc,
  markTile: Function
}

const Tile: React.FC<Props> = ({ value, id, markTile }) => {

  const TileStyle: CSS.Properties = {

    width: '100px',
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const handleClick = (e: React.MouseEvent) => {
    if (value == Players.Default)
      markTile(id)
  }
  return (
    <Card>
      <Card.Body>
        <div onClick={handleClick} style={TileStyle}>
          {value}
        </div>
      </Card.Body>
    </Card>
  )
}

export default Tile
