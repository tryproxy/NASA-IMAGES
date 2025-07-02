import React from 'react';
import { LOCAL_STORAGE_KEY } from '../constannts';

type Props = Record<string, unknown>;
type State = { input: string; inputHistory: string[] };

export class SearchField extends React.Component<Props, State> {
  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
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
    this.loadHistory();
  }

  componentWillUnmount(): void {
    window.removeEventListener('focus', this.handleInputAutoFocus);
  }

  loadHistory = () => {
    const searchHistory = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (searchHistory) {
      try {
        const parsedSearchHistory = JSON.parse(searchHistory) as string[];
        console.log(parsedSearchHistory, 'SEARCH HISTORY');
        this.setState({ inputHistory: parsedSearchHistory });
      } catch (e) {
        if (e instanceof Error) {
          throw e.message;
        }
      }
    }
  };

  saveHistory = (query: string) => {
    this.setState(
      (prev) => ({
        inputHistory: [...prev.inputHistory, query.trim()],
      }),
      () =>
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(this.state.inputHistory)
        )
    );
  };

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ input: e.target.value });

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('dispatch SEARCH_QUERY');
      this.saveHistory(this.state.input);
      this.setState({ input: '' });
    }
  };

  handleInputClick = () => {
    console.log('dispatch SEARCH_ITEM');
    this.saveHistory(this.state.input);
    this.setState({ input: '' });
  };

  handleInputAutoFocus = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  render() {
    return (
      <div className="flex">
        <input
          ref={this.inputRef}
          className="w-full border-amber-50 bg-gray-950 px-2 py-1 focus:border-transparent focus:outline-none"
          type="text"
          placeholder="Search..."
          value={this.state.input}
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputKeyDown}
        />
        <button
          className="cursor-pointer bg-gray-950 px-2 py-1 hover:bg-gray-900"
          onClick={this.handleInputClick}
        >
          Search
        </button>

        <pre>{JSON.stringify(this.state.inputHistory)}</pre>
      </div>
    );
  }
}
