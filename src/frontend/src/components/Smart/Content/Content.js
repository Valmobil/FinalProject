import React from 'react'
import SmartRoute from "../SmartRoute/SmartRoute";
import Map from "../../Map/Map";
import LiveSearch from "../../LiveSearch/LiveSearch";

const windowWidth = window.innerWidth <= 380 ? window.innerWidth : 380

const Content = (props) => {
    const {adding, editing, creatingTrip, userPoints, handleInput, editClose, setValue, setTargetCoordinates, value,
        name, id, rejectEdit, handleDelete, handleEdit, handleRoute} = props
    let placesList = null
    if (adding){
        placesList = (
            <div style={{width: '100%', marginTop: 70}}>
                <span>add new favorite point</span>
                <LiveSearch
                    name={name}
                    handleInput={handleInput}
                    editClose={() => editClose(null)}
                    setCoordinates={setTargetCoordinates}
                    setValue={setValue}
                    method='post'
                    url='/api/points/'
                    data={{ pointSearchText: value }}
                    value={value}
                    rejectEdit={rejectEdit}
                />
                <Map/>
            </div>
        )
    } else if (editing) {
        placesList = (
            <div style={{width: '100%', marginTop: 70}}>
                <span>edit this favorite point</span>
                <LiveSearch
                    name={name}
                    handleInput={handleInput}
                    editClose={() => editClose(editing)}
                    setCoordinates={setTargetCoordinates}
                    setValue={setValue}
                    method='post'
                    url='/api/points/'
                    data={{pointSearchText: value}}
                    value={value}
                    rejectEdit={rejectEdit}
                />
                <Map/>
            </div>
        )
    }
    else placesList = userPoints.map((item, index) => {
            let output = null
            if (creatingTrip) {
                output = (
                    item.userPointName !== '<no point>' && item.userPointId === id &&
                    <div key={item.userPointId} style={style.fullContainer}>
                        <span>you have chosen the route:</span>
                        <Map
                            height={250}
                            showSmartRoute={true}
                        />
                    </div>
                )
            } else {
                output = (
                    item.userPointName !== '<no point>' &&
                    <div key={item.userPointId} style={style.smartContainer}>
                        <SmartRoute
                            item={item}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                            handleRoute={handleRoute}
                            index={index}
                        />
                    </div>
                )
            }
            return output
        })

    return (
        placesList
    )
}

const style = {
    smartContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20
    },
    fullContainer: {
        display: 'flex',
        flexDirection: 'column',
        // justifyContent: 'space-around',
        width: windowWidth,
        marginTop: 20
    }
}

export default Content