import React from 'react';

type Props = {
  text: string;
  onClick: () => void;
};

export class ErrorButton extends React.Component<Props> {
  onClick = this.props.onClick;

  render() {
    return (
      <button
        className="fixed right-4 bottom-4 h-10 w-50 cursor-pointer rounded-sm bg-gray-200/40 px-1 py-1 text-center font-bold text-gray-900 hover:bg-gray-300"
        onClick={this.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}
