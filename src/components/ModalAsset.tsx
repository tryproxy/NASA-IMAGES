import React from 'react';
import { nasaClient } from '../api/nasaClient';
import fallbackImg from '../assets/nasa_fallback.jpg';

type Props = {
  imageSrc: string;
  imageTitle: string;
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
        className="fixed inset-0 flex cursor-pointer items-center justify-center bg-black/90"
        onClick={this.onClose}
      >
        <div className="flex max-h-[90vh] max-w-[90vw] cursor-pointer flex-col items-center">
          {type === 'image' ? (
            <img
              onClick={(e) => e.stopPropagation()}
              src={this.state.assetUrl}
              alt={this.props.imageTitle}
              className="h-[80vh] cursor-default rounded-sm object-cover"
            />
          ) : (
            <video src={this.state.assetUrl} controls></video>
          )}
          <p
            className="mt-2 cursor-default overflow-auto text-sm text-amber-50"
            onClick={(e) => e.stopPropagation()}
          >
            {this.props.imageTitle}
          </p>
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
