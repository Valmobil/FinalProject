import {  } from './mails'
//***********************

export const deleteLetter = (emails, itemList) => dispatch => {

    const {mailList, active, checkboxesArray} = emails
    dispatch({type: LETTER_SHOWN, payload: false})
    dispatch(setDelay(500))
    dispatch({type: DRAWER_OPEN, payload: false})
    const newCurrentList = mailList[active].slice().filter(letter => !itemList.some(element => element.id === letter.id))
    if (active === 'received') {
        dispatch(setUnRead(newCurrentList))
    }
    if (active !== 'deleted') {
        let newDeleted = mailList['deleted'].slice()
        itemList.forEach(item => item.checked = false)
        newDeleted = newDeleted.concat(itemList)
        dispatch({type: LETTER_LIST, payload: {...mailList, [active]: newCurrentList, 'deleted': newDeleted}})
        dispatch({type: TEXT_SHOW, payload: 0})
    } else {
        dispatch({type: LETTER_LIST, payload: {...mailList, [active]: newCurrentList}})
        dispatch({type: TEXT_SHOW, payload: 0})
    }
    if (itemList.length === 1 && checkboxesArray[active].some(element => element.id === itemList[0].id)) {
        checkboxesArray[active].splice(checkboxesArray[active].indexOf(itemList[0]), 1)
        dispatch({type: CHECKBOXES_HANDLE, payload: checkboxesArray})
    }
    dispatch({type: GROUP_CHECK, payload: false})
}
//***********************
