import React, { useState, useEffect} from 'react'
import CSS from 'csstype';
import Tile from './Tile';
import { Players, loc } from './types';

interface Props {
  n: number,
  notify: Function,
  restart: boolean
}

const TicTacToe:React.FC<Props> = ({n, notify, restart}) => {

  console.log(n)
  
  const getGridState = (n: number) => {
    let t = [] as any
    for (let i = 0; i < n; i++) {
      t.push(Array(n).fill(Players.Default))
    }
    console.log(t)
    return t;
  }
  
  const [grid, setGrid] = useState( getGridState(n) )
  const [playerState, setPlayerState] = useState(Players.P1);
  const [moves, setMoves] = useState(n*n - 1)

  const gridStyle: CSS.Properties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${n},1fr)`
  }

  const checkGameState = (id: loc):string => {
    // set win states for vertical, horizontal, diagonal, anti diagonal
    let {v, h, d, ad} = {v: true, h: true, d: true, ad: true}
    for (let i= 0; i < n; i++) {
      for (let j = 0; j < n; j++){
        if (j === id.j && grid[i][j] != playerState) h = false
        if (i === id.i && grid[i][j] != playerState) v = false
        if (i === j && grid[i][j] != playerState) d = false
        if (i+j === n-1 && grid[i][j] != playerState) ad = false
      }
    }

    if (v || h || d || ad) {
      return `Win for Player ${playerState}!`;
    }

    if (!moves) {
      return "StaleMate :(";
    }

    return ''
  }

  const handleTileClick = (id: loc) => {
    
    setMoves(moves => moves -1)

    console.log(id)
    let temp_grid = [...grid]
    temp_grid[id.i][id.j] = playerState
    setGrid([...temp_grid])

    //check game state
    let res: string = checkGameState(id);
    if (res.length)
      notify(res)  
    //flip player state
    setPlayerState(playerState === Players.P1 ? Players.P2 : Players.P1)

  }

  useEffect(() => {
    setGrid( getGridState(n) )
    setMoves(n*n - 1)
    setPlayerState(Players.P1)
  }, [n, restart])

  return (
    <div style={gridStyle}>
      {
        grid.map( (x: any, i: any) => {
          return x.map( (y: any, j: any) => (
            <Tile value={y} id={{i, j}} key={(i+1)*(i+j)} markTile={handleTileClick} />        
          ))
        })
      }
    </div>
  )
}

export default TicTacToe
