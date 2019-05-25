import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'
import Zoom from '@material-ui/core/Zoom'


const styles = theme => ({
    smartRoute: {
        background: '#ff9800',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 40,
        padding: 0,
        width: 250,
        '&:focus': {
            outline: 'none',
        },
    },
    iconButton: {
        padding: 0,
        color: '#fff',
        '&:focus': {
            outline: 'none'
        }
    },
    label: {
        textTransform: 'capitalize'
    },
})


class SmartRoute extends Component {
    state = {
        editing: false,
        timeout: null,
    }

    startTouch = 0;

    touchStart = () => {
        const timeout = setTimeout(() => this.setState(prevSate => ({editing: !prevSate.editing})), 700)
        this.setState({ timeout })
        this.startTouch = Date.now()
    }

    touchEnd = () => {
        if (Date.now() - this.startTouch < 700) {
            this.props.handleRoute(this.props.item)
            clearTimeout(this.state.timeout)
        }
    }
    contextMenuDisable = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    render(){
        const { classes } = this.props
        const { item, handleEdit, handleDelete, index } = this.props
        const { editing } = this.state
        const transitionDelay = 50*index + 'ms'
        return(
            <>

                {editing &&
                <IconButton
                    onClick={() => handleDelete(item.userPointId)}
                    className={classes.iconButton}
                    aria-label="Delete">
                    <DeleteIcon/>
                </IconButton>
                }
                    <Zoom in={true} style={{transitionDelay}}>
                <Button
                        onContextMenu={this.contextMenuDisable}
                        onTouchStart={this.touchStart}
                        onTouchEnd={this.touchEnd}
                        variant="contained"
                        color="primary"
                        className={classes.smartRoute}
                        classes={{ label: classes.label }}
                >
                    {item.userPointName}
                </Button>
                    </Zoom>
                {editing &&
                <IconButton
                    onClick={() => handleEdit(item)}
                    className={classes.iconButton}
                    aria-label="Edit">
                    <EditIcon/>
                </IconButton>
                }

            </>
        )
    }

}

export default withStyles(styles)(SmartRoute)