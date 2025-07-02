import React from 'react';
import { SearchField } from './SearchField';

class App extends React.Component {
  render() {
    return (
      <div className="flex h-screen w-screen flex-col items-center bg-slate-700 p-4 text-amber-50">
        <SearchField />
      </div>
    );
  }
}

export default App;
