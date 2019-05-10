import React, { Component } from 'react'
import {connect} from 'react-redux'
import { setUserPhoto} from '../../../actions/userCreators'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import './Photo.css'


const styles = {
    bigAvatar: {
        margin: 10,
        width: 130,
        height: 130,
        paddingTop: 20
    },
    acceptButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#008000',
        height: 30,
        padding: 0,
        width: '47%'
    },
    rejectButton: {
        borderRadius: 3,
        background: '#fff',
        color: '#FC2847',
        height: 30,
        padding: 0,
        width: '47%'
    },
    label: {
        textTransform: 'capitalize'
    },
}

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif'

class Photo extends Component {

    constructor(props){
        super(props)
        this.state = {
            file: null,
            imgSrc: null,
            base64: '',
        };
        this.cropper = React.createRef();
}

    handleFile = (e) => {
        const file = e.target.files[0]
        const img = new Image();
        img.src = window.URL.createObjectURL( file );
        img.onload = () => {
            this.setState({file})
        }
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({imgSrc: reader.result})
        }, false)
        if (file) reader.readAsDataURL(file);
    }


    saveImage = () => {
        this.rejectImage()
        this.props.setPhoto(this.state.base64)
    }

    rejectImage = () => {
        this.setState({
            file: null,
            imgSrc: null,
        })
    }

    crop(){
        this.setState({base64: this.cropper.current.getCroppedCanvas().toDataURL()})
    }



    render(){
        const { classes } = this.props
        let conditionalInput = this.state.imgSrc === null ?
            <>
                <label className='photo-input-label'>
                    <input type="file"
                           name="fileUpload"
                           className='photo-input'
                           accept={acceptedFileTypes}
                           onChange={this.handleFile}
                    />
                    Choose file
                </label>

            </>
            :
            <>
                <Cropper
                    ref={this.cropper}
                    src={this.state.imgSrc}
                    style={{height: 300, width: '100%'}}
                    aspectRatio={3 / 4}
                    guides={false}
                    crop={this.crop.bind(this)} />


                <div className="image-choose-button-container">
                    <Button onClick={this.saveImage}
                            classes={{
                                root: classes.acceptButton,
                                label: classes.label
                            }}
                    >
                        Accept
                    </Button>
                    <Button onClick={this.rejectImage}
                            classes={{
                                root: classes.rejectButton,
                                label: classes.label
                            }}
                    >
                        Reject
                    </Button>
                </div>
            </>
        return (

            conditionalInput

        )
    }
}
Photo.propTypes = {
    classes: PropTypes.object.isRequired
}



const mapDispatchToProps = (dispatch) => {
    return {
        setUserPhoto: (image) => dispatch(setUserPhoto(image))
    }
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(Photo))