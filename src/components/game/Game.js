import React, {useEffect, useState} from 'react'
import GameBoard from './game-board/GameBoard'
import ActionMenu from './ActionMenu'
import { socket } from '../../apiConfig'

const Game = (props) => {

    const {user, statusArray, setStatusArray, gameObject} = props
    const [clickedTerritory, setClickedTerritory] = useState(null)
    const [playerState, setPlayerState] = useState('wait')
    const [userPlayerObject, setUserPlayerObject] = useState({})
    const [advancingTerritory, setAdvancingTerritory] = useState(null)
    const [territoriesWithConfirmedCommands, setTerritoriesWithConfirmedCommands] = useState([])
    
    const statusDisplay = statusArray.map((item, index) => (        
        <span key={index}>{item}<br/></span>                             
    ))

    //initial placement function
    useEffect(() => {
        if (clickedTerritory && gameObject.placementOrder.length > 0){
            socket.emit('initialUnitPlacement', clickedTerritory._id, userPlayerObject._id, gameObject._id)
            setClickedTerritory(null)
        }
    }, [clickedTerritory])
    

    useEffect(()=> {
        if (gameObject?.command) {
            setPlayerState('selectTerritory')
        }
    }, [gameObject])

    //check for win and death
    useEffect(() => {
        //find preists
        let myPriests = 0
        let theirPriests = 0
        gameObject?.territories.forEach(territory => {
            if (territory.priests) {
                if (territory.controlledBy === userPlayerObject._id) {
                    myPriests += territory.priests
                } else {
                    theirPriests += territory.priests
                }
            }            
        })
        if (theirPriests && !myPriests){
            socket.emit('iDied', user, (response) => {
                let newStatArray = statusArray.slice()
                newStatArray.unshift(response.message)
                setStatusArray(newStatArray)
            })
        } else if (myPriests && !theirPriests) {
            socket.emit('iWon', user)
        }

    }, gameObject)

    useEffect(() => {
        if (playerState === 'selectTerritory' && clickedTerritory) {
            setPlayerState('selectCommand')
        }
    }, [clickedTerritory])

    return (
        <div className='game'>

            <div className='gameLeft'>
                <GameBoard
                    user={user}
                    gameObject={gameObject}
                    clickedTerritory={clickedTerritory}
                    setClickedTerritory={setClickedTerritory}
                    playerState={playerState}
                    setPlayerState={setPlayerState}
                    userPlayerObject={userPlayerObject}
                    setUserPlayerObject={setUserPlayerObject}
                    advancingTerritory={advancingTerritory}
                    territoriesWithConfirmedCommands={territoriesWithConfirmedCommands}
                />
                <div className='statusBar'>
                    <p>
                        {statusDisplay}
                    </p>
                    
                </div>
            </div>
            
            <ActionMenu
                user={user}
                clickedTerritory={clickedTerritory}
                setClickedTerritory={setClickedTerritory}
                playerState={playerState}
                setPlayerState={setPlayerState}
                advancingTerritory={advancingTerritory}
                setAdvancingTerritory={setAdvancingTerritory}
                setTerritoriesWithConfirmedCommands={setTerritoriesWithConfirmedCommands}
                userPlayerObject={userPlayerObject}
            />
            
        </div>
    )
}

export default Game
