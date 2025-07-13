import React from 'react';
import { nasaClient } from '../api/nasaClient';
import fallbackImg from '../assets/nasa_fallback.jpg';
import { ModalAssetImage } from './ModalAssetImage';
import { ModalAssetVideo } from './ModalAssetVideo';

type Props = {
  imageSrc: string;
  imageTitle: string;
  imageDescription: string;
  imageId: string;
  type: string;
  onClose: () => void;
};

type State = {
  assetUrl: string;
};

export class ModalImage extends React.Component<Props, State> {
  onClose = this.props.onClose;

  constructor(props: Props) {
    super(props);
    this.state = {
      assetUrl: this.props.imageSrc,
    };
  }

  fetchOriginalAsset = async (): Promise<string> => {
    const asset = await nasaClient.getAsset(this.props.imageId);
    return (
      asset.original ||
      asset.medium ||
      asset.small ||
      this.props.imageSrc ||
      fallbackImg
    );
  };

  async componentDidMount(): Promise<void> {
    try {
      const assetUrl = await this.fetchOriginalAsset();
      this.setState({ assetUrl });
    } catch (e) {
      if (e instanceof Error) {
        throw e.message;
      }
    }
  }

  render() {
    const { type } = this.props;
    return (
      <div
        className="fixed inset-0 flex cursor-pointer items-center justify-center bg-black/90 backdrop-blur-md"
        onClick={this.onClose}
      >
        <div className="popup-fade-in flex max-h-[90vh] max-w-[90vw] cursor-pointer items-center">
          {type === 'image' ? (
            <ModalAssetImage
              imageSrc={this.state.assetUrl}
              imageAlt={this.props.imageTitle}
              imageTitle={this.props.imageTitle}
            />
          ) : (
            <ModalAssetVideo
              videoSrc={this.state.assetUrl}
              videoTitle={this.props.imageTitle}
            />
          )}
        </div>
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={this.onClose}
        >
          Close
        </button>
      </div>
    );
  }
}
