import React from 'react'
import Slide from '@material-ui/core/Slide';
import './DependentButton.css'


const DependentButton = ({ creatingTrip, submitRoute, rejectRoute, adding, editing, adDisable, submitDisable, addNewPoint }) => {
    let dependentButton = null
    if (creatingTrip){
        dependentButton = (
            <div className="type-button-container dependent-button-container">
                <button onClick={submitRoute}
                        className='dependent-buttons accept-button'
                        disabled={submitDisable}
                >
                    Submit trip
                </button>
                <button
                    onClick={rejectRoute}
                    className='dependent-buttons reject-button'
                >
                    Reject trip
                </button>
            </div>
        )
    } else if ( !adding && !editing ){
        dependentButton = (
            <Slide direction="up" in={!adDisable} mountOnEnter unmountOnExit>
                <button
                    className='type-button add-smart-button'
                    onClick={addNewPoint}
                    disabled={adDisable}
                >
                    New quick trip
                </button>
            </Slide>
        )
    }
    return (
         dependentButton
    )
}

export default DependentButton

