import neutralFarmland from '../../../images/Neutral-Farmland-Hex.png'
import neutralField from '../../../images/Neutral-Field-Hex.png'
import neutralMountain from '../../../images/Neutral-Mountain-Hex.png'
import springFarmland from '../../../images/Green-Farmland-Hex.png'
import springField from '../../../images/Green-Field-Hex.png'
import springMountain from '../../../images/Green-Mountain-Hex.png'
import summerFarmland from '../../../images/Red-Farmland-Hex.png'
import summerField from '../../../images/Red-Field-Hex.png'
import summerMountain from '../../../images/Red-Mountain-Hex.png'
import autumnFarmland from '../../../images/Grey-Farmland-Hex.png'
import autumnField from '../../../images/Grey-Field-Hex.png'
import autumnMountain from '../../../images/Grey-Mountain-Hex.png'
import winterFarmland from '../../../images/Blue-Farmland-Hex.png'
import winterField from '../../../images/Blue-Field-Hex.png'
import winterMountain from '../../../images/Blue-Mountain-Hex.png'
import water from '../../../images/Water-Hex.png'
import empty from '../../../images/Empty-Hex.png'


export const setTerritoryBackground = (territory) => {
    let background

    if (territory.controlledBy.season === 'spring') { //green
        switch (territory.type) {
            case 'farmland' :
                background = springFarmland
                break
            case 'field' :
                background = springField
                break
            case 'mountain' :
                background = springMountain
                break
            default :
                background = empty
        }
    } else if (territory.controlledBy.season === 'summer') { //red
        switch (territory.type) {
            case 'farmland' :
                background = summerFarmland
                break
            case 'field' :
                background = summerField
                break
            case 'mountain' :
                background = summerMountain
                break
            default :
                background = empty
        }
    } else if (territory.controlledBy.season === 'autumn') { //grey
        switch (territory.type) {
            case 'farmland' :
                background = autumnFarmland
                break
            case 'field' :
                background = autumnField
                break
            case 'mountain' :
                background = autumnMountain
                break
            default :
                background = empty
        }
    } else if (territory.controlledBy.season === 'winter') { //blue
        switch (territory.type) {
            case 'farmland' :
                background = winterFarmland
                break
            case 'field' :
                background = winterField
                break
            case 'mountain' :
                background = winterMountain
                break
            default :
                background = empty
        }
    } else { //orange
        switch (territory.type) {
            case 'farmland' :
                background = neutralFarmland
                break
            case 'field' :
                background = neutralField
                break
            case 'water' :
                background = water
                break
            case 'mountain' :
                background = neutralMountain
                break
            default :
                background = empty
        }
    }
    
    return background

}