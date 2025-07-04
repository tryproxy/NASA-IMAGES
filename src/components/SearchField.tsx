import React from 'react';

type Props = {
  onSearch: (input: string) => void;
  searchResults: string[];
  onRemoveDropdownResult: (idx: number | string) => void;
};
type State = {
  input: string;
  hovered: string;
  isDropdownOpened: boolean;
};

export class SearchField extends React.Component<Props, State> {
  private inputRef = React.createRef<HTMLInputElement>();
  private dropdownRef = React.createRef<HTMLUListElement>();

  onSearch = this.props.onSearch;
  onRemoveResultDropdown = this.props.onRemoveDropdownResult;

  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      hovered: 'Search...',
      isDropdownOpened: false,
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
      this.setState({ isDropdownOpened: false });
    }
  };

  handleSearchInputClick = () => {
    console.log('dispatch SEARCH_ITEM');
    this.onSearch(this.state.input);
    this.setState({ isDropdownOpened: false });
  };

  handleInputAutoFocus = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handleDropdownClick = () => {
    if (!this.state.isDropdownOpened) {
      this.setState({ isDropdownOpened: true });
    }
  };

  handleDropdownBlur = () => {
    setTimeout(() => {
      const focusedEl = document.activeElement as Element | null;
      if (
        this.dropdownRef.current &&
        focusedEl &&
        this.dropdownRef.current.contains(focusedEl)
      ) {
        return;
      }
      this.setState({ isDropdownOpened: false, hovered: 'Search...' });
    }, 100);
  };

  handleSearchAutocompleteClick = (e: React.MouseEvent<HTMLLIElement>) => {
    console.log('dispatch SEARCH_ITEM');
    this.setState(
      {
        input: e.currentTarget.innerText,
        isDropdownOpened: false,
      },
      () => this.onSearch(this.state.input)
    );
  };

  handleMouseOver = (e: React.MouseEvent<HTMLLIElement>) => {
    this.setState({
      input: '',
      hovered: e.currentTarget.innerText,
    });
  };

  render() {
    return (
      <div className="min-w-2/3">
        <div className="relative">
          <div className="flex">
            <input
              ref={this.inputRef}
              className="w-full border-amber-50 bg-gray-900 px-2 py-1 focus:border-transparent focus:outline-none"
              type="text"
              placeholder={this.state.hovered}
              value={this.state.input}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
              onClick={this.handleDropdownClick}
              onBlur={this.handleDropdownBlur}
            />
            <button
              className="cursor-pointer bg-gray-950 px-2 py-1 hover:bg-gray-800"
              onClick={this.handleSearchInputClick}
            >
              Search
            </button>
          </div>

          {this.state.isDropdownOpened && (
            <ul className="absolute w-full bg-gray-900" ref={this.dropdownRef}>
              {this.props.searchResults.map((result, idx) => (
                <div
                  className="flex cursor-default items-center justify-between px-2 py-1 hover:bg-gray-800"
                  key={idx}
                >
                  <li
                    key={idx}
                    tabIndex={-1}
                    className="w-full"
                    onMouseOver={this.handleMouseOver}
                    onClick={this.handleSearchAutocompleteClick}
                  >
                    {result}
                  </li>
                  <button
                    onBlur={this.handleDropdownBlur}
                    onClick={() => this.onRemoveResultDropdown(idx)}
                    className="ml-2 cursor-pointer"
                  >
                    [X]
                  </button>
                </div>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
