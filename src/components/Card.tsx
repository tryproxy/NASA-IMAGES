import React from 'react';
import { ModalImage } from './ModalAsset';
import { type NasaItem } from '../api/nasaClient';
import fallbackImage from '../assets/nasa_fallback.jpg';

type Props = {
  item: NasaItem;
};

type State = {
  isZoomedModelOpen: boolean;
};

export class Card extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isZoomedModelOpen: false,
    };
  }

  handleModalClose = () => this.setState({ isZoomedModelOpen: false });

  render() {
    const { item } = this.props;
    return (
      <div>
        <img
          className="aspect-square w-full cursor-pointer rounded object-cover"
          src={item.thumbnailUrl}
          alt={item.title}
          title={item.description}
          onClick={() => this.setState({ isZoomedModelOpen: true })}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />

        <p className="mt-2 truncate text-sm font-medium">{item.title}</p>
        {this.state.isZoomedModelOpen && (
          <ModalImage
            imageId={item.nasa_id}
            imageSrc={item.thumbnailUrl || ''}
            imageTitle={item.description}
            type={item.media_type || ''}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
