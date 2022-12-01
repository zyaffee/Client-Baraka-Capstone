import React, {useEffect, useState} from 'react'
import HexMap from './HexMap'


const placeholderTerritories = []
for (let i=0; i<37; i++){
    let landType
    if (i%5 === 0) {
        landType = 'water'
    } else if (i%4 === 0) {
        landType = 'farmland'  
    } else if (i % 3 === 0) {
        landType = 'mountain'
    } else {
        landType = 'field'
    }
    placeholderTerritories.push({
        number: i,
        type: landType
    })
}

const GameBoard = (props) => {

    const {user, gameObject, clickedTerritory, setClickedTerritory, userPlayerObject, setUserPlayerObject, playerState, advancingTerritory, territoriesWithConfirmedCommands, hexWidth} = props

    
    const [clickableBoard, setClickableBoard] = useState(false)


    useEffect(() => {
        //find the player object that belongs to the user
        if (gameObject) {
                    gameObject.players.forEach(player => {
                        if (player.user._id === user._id) {
                            setUserPlayerObject(player)
                        }
                    })
                }
    }, [gameObject])

    
    useEffect(() => {
        if (gameObject && userPlayerObject &&((gameObject.command) || gameObject.placementOrder[0] === userPlayerObject.season)) {            
            setClickableBoard(true)
        } else {
            setClickableBoard(false)
        }
    }, [userPlayerObject])

      


    let territories = gameObject ? 
        <HexMap
                territories={gameObject.territories}
                hexWidth={hexWidth}
                clickedTerritory={clickedTerritory}
                setClickedTerritory={setClickedTerritory}
                clickableBoard={clickableBoard}
                userPlayerObject={userPlayerObject}
                gameObject={gameObject}
                playerState={playerState}
                advancingTerritory={advancingTerritory}
                territoriesWithConfirmedCommands={territoriesWithConfirmedCommands}
        /> 
        : 
        (<h1>Waiting for game board....</h1>)


    return (
        <>
            {territories}
        </>        
    )
}


export default GameBoard