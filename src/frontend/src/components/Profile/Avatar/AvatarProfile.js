import React, { Component } from 'react'
import './AvatarProfile.css'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
// import Avatar from '@material-ui/core/Avatar'
// import Grid from '@material-ui/core/Grid'
// import IconAvatars from '../AvatarIconButton/AvatarIconButton'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { setPhoto} from '../../../actions/userCreators'
import {connect} from 'react-redux'

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

class AvatarProfile extends Component {

    state = {
        file: null,
        imgSrc: null,
        crop: {
            aspect: 3 / 4
        },
        pixelCrop: null,
        myImageSrc: '',
    };



    handleFile = (e) => {
        const file = e.target.files[0]
        const img = new Image();
        img.src = window.URL.createObjectURL( file );

        img.onload = () => {
            const width = img.naturalWidth
            const height = img.naturalHeight
            this.setState({pixelCrop: {x: 0, y: 0, width, height}, file})
        }

        // this.setState({file})
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.setState({imgSrc: reader.result})
        }, false)
        if (file) reader.readAsDataURL(file);
    }

    onCropChange = (crop, pixelCrop) => {
        this.setState({ crop, pixelCrop });
    }


    saveImage = (e) => {
        // e.preventDefault()
        const { file, pixelCrop } = this.state

        this.getCroppedImg(file, pixelCrop, 'userPhoto')
            .then(res => {
                // this.setState({myImageSrc: URL.createObjectURL(res)})
                this.props.setPhoto(res)
                this.rejectImage()
            })
            .catch(console.log)
    }

    rejectImage = () => {
        this.setState({
            file: null,
            imgSrc: null,
            crop: {
                aspect: 3 / 4
            },
            pixelCrop: null,
        })
    }


    getCroppedImg = (source, pixelCrop, fileName) => {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');
        let image = new Image();
        let binaryData = [];
        binaryData.push(source);
        image.src = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))

        // image.src = window.URL.createObjectURL(source);
        image.onload = () => {
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            // As Base64 string
            // const base64Image = canvas.toDataURL('image/jpeg');

            // As a blob
            this.setState({myImageSrc: canvas.toDataURL("image/jpeg")})

        }
        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                blob.name = fileName;
                resolve(blob);
            }, 'image/jpeg');
        });

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
                <div >
            <img src={this.state.myImageSrc} style={{height: 100}} alt=''/>
                </div>
            </>
            :
            <>
                <span className='crop-label'>You can crop the photo</span>
                <ReactCrop
                    src={this.state.imgSrc}
                    onChange={this.onCropChange}
                    crop={this.state.crop}
                />
                <div className="image-choose-button-container">
                    <Button onClick={this.saveImage}
                            classes={{
                                root: classes.acceptButton,
                                label: classes.label
                            }}
                    >
                        Submit
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

            // {/*// /!*<Grid container justify="center" alignItems="center">*!/*/}
            // {/*// /!*<Avatar alt="Remy Sharp" className={classes.bigAvatar} />*!/*/}
            //     {/*//     <IconAvatars/>*/}
            //     {/*// </Grid>*/}
        )
    }
}
AvatarProfile.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapDispatchToProps = (dispatch) => {
    return {
        setPhoto: (image) => dispatch(setPhoto(image))
    }
}
export default withStyles(styles)(connect(null, mapDispatchToProps)(AvatarProfile))