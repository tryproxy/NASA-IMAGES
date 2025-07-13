import React from 'react';

type Props = {
  imageSrc: string;
  imageAlt: string;
  imageTitle: string;
};
export class ModalAssetImage extends React.Component<Props> {
  render() {
    return (
      <div
        className="flex max-w-[80vw] cursor-default flex-col items-center justify-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="max-h-[80vh] max-w-full rounded-sm object-contain object-right"
          src={this.props.imageSrc}
          alt={this.props.imageTitle}
        />
        <p className="mt-2 flex items-center text-sm text-amber-50">
          {this.props.imageTitle}
        </p>
      </div>
    );
  }
}
