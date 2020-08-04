import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default class CropTest extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    src: null,
    crop: {
      aspect: 660 / 600,
      width: 660,
      height: 600,
      unit: "px",

      // x: (window.innerWidth - window.innerWidth) / 2,
      // y: (window.innerWidth - window.innerWidth) / 2,
    },
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.aspect) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      // this.props.setCroppedImg(croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    console.log(image.naturalWidth);
    console.log(image.width);

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    // alert(crop.height);
    // alert(image.height);
    ctx.drawImage(
      image,
      (image.width - crop.width) / 2,
      (image.height - crop.height) / 2,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }

        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.props.setCroppedImg(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const picture = this.props.picture;
    const { crop, croppedImageUrl, src } = this.state;
    const screenWidth = window.innerWidth;

    return (
      <div className="App" style={{}}>
        <ReactCrop
          style={{ height: 0 }}
          locked={true}
          src={picture}
          crop={crop}
          ruleOfThirds
          onImageLoaded={this.onImageLoaded}
          onComplete={this.onCropComplete}
          onChange={this.onCropChange}
        />

        {croppedImageUrl && (
          <img
            alt="Crop"
            style={{
              maxWidth: "100%",
            }}
            src={croppedImageUrl}
          />
        )}
      </div>
    );
  }
}
