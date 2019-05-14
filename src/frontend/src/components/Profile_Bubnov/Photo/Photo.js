import React, { useState, useRef } from 'react'
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

const Photo = ({ classes, setPhoto, avatarShowToggle }) => {

    const [ imgSrc, setImgSrc] = useState(null)
    const [ base64, setBase64] = useState('')
    const cropper = useRef(null);

    const handleFile = (e) => {
        avatarShowToggle(false, true)
        const file = e.target.files[0]
        const img = new Image();
        img.src = window.URL.createObjectURL( file );
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            setImgSrc(reader.result)
        }, false)
        if (file) reader.readAsDataURL(file);
    }


    const saveImage = () => {
        rejectImage()
        setPhoto(base64)
        avatarShowToggle(false, false)
    }

    const rejectImage = () => setImgSrc(null)


    const crop = () => {
        setBase64(cropper.current.getCroppedCanvas().toDataURL())
    }

    let conditionalInput = imgSrc === null ?
            <>
                <label className='photo-input-label'>
                    <input type="file"
                           name="fileUpload"
                           className='photo-input'
                           accept={acceptedFileTypes}
                           onChange={handleFile}
                    />
                    Upload photo
                </label>

            </>
            :
            <>
                <Cropper
                    ref={cropper}
                    src={imgSrc}
                    style={{height: 300, width: '100%'}}
                    aspectRatio={3 / 4}
                    guides={false}
                    crop={crop}
                />
                <div className="image-choose-button-container">
                    <Button onClick={saveImage}
                            classes={{
                                root: classes.acceptButton,
                                label: classes.label
                            }}
                    >
                        Accept
                    </Button>
                    <Button onClick={rejectImage}
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


export default withStyles(styles)(Photo)