import React from 'react';

type Props = {
  onSearch: (input: string) => void;
};
type State = {
  input: string;
  inputHistory: string[];
};

export class SearchField extends React.Component<Props, State> {
  private inputRef = React.createRef<HTMLInputElement>();
  onSearch = this.props.onSearch;
  constructor(props: Props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.state = {
      input: '',
      inputHistory: [],
    };
  }

  componentDidMount(): void {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
    window.addEventListener('focus', this.handleInputAutoFocus);
    // this.loadHistory();
  }

  componentWillUnmount(): void {
    window.removeEventListener('focus', this.handleInputAutoFocus);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ input: e.target.value });

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('dispatch SEARCH_QUERY');
      this.onSearch(this.state.input);
      this.setState({ input: '' });
    }
  };

  handleInputClick = () => {
    console.log('dispatch SEARCH_ITEM');
    this.onSearch(this.state.input);
    this.setState({ input: '' });
  };

  handleInputAutoFocus = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  render() {
    return (
      <div className="flex min-w-1/2">
        <input
          ref={this.inputRef}
          className="w-full border-amber-50 bg-gray-900 px-2 py-1 focus:border-transparent focus:outline-none"
          type="text"
          placeholder="Search..."
          value={this.state.input}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        <button
          className="cursor-pointer bg-gray-950 px-2 py-1 hover:bg-gray-800"
          onClick={this.handleInputClick}
        >
          Search
        </button>
      </div>
    );
  }
}
