import React from 'react';

type Props = {
  imageSrc: string;
  imageTitle: string;
  onClose: () => void;
};

export class ModalImage extends React.Component<Props> {
  onClose = this.props.onClose;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className="fixed inset-0 flex cursor-pointer items-center justify-center bg-black/90"
        onClick={this.onClose}
      >
        <div className="flex max-h-[90vh] max-w-[90vw] cursor-pointer flex-col items-center">
          <img
            onClick={(e) => e.stopPropagation()}
            src={this.props.imageSrc}
            alt={this.props.imageTitle}
            className="max-h-[80vh] cursor-default rounded-sm object-cover"
          />
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
