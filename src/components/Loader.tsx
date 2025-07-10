import React from 'react';

export class Loader extends React.Component<Record<string, never>> {
  render() {
    return (
      <div className="absolute top-10 flex gap-2">
        <p className="flex">Fetching [images.nasa.gov]</p>
        <span className="loader left-0 inline-flex h-3 w-3"></span>
      </div>
    );
  }
}
