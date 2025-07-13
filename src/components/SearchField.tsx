import React from 'react';
import { searchTips } from '../constants';

type Props = {
  onSearch: (input: string) => void;
  searchQueries: string[];
  onRemoveDropdownResult: (idx: number | string) => void;
};
type State = {
  input: string;
  hovered: string;
  isDropdownOpened: boolean;
};

const searchPlaceholder =
  searchTips[Math.floor(Math.random() * searchTips.length)];

export class SearchField extends React.Component<Props, State> {
  private inputRef = React.createRef<HTMLInputElement>();
  private dropdownRef = React.createRef<HTMLUListElement>();

  onSearch = this.props.onSearch;
  onRemoveResultDropdown = this.props.onRemoveDropdownResult;

  constructor(props: Props) {
    super(props);
    this.state = {
      input: '',
      hovered: searchPlaceholder,
      isDropdownOpened: false,
    };
  }

  componentDidMount(): void {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
    window.addEventListener('focus', this.handleInputAutoFocus);
  }

  componentWillUnmount(): void {
    window.removeEventListener('focus', this.handleInputAutoFocus);
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({ input: e.target.value });

  handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && this.state.input.length > 0) {
      this.onSearch(this.state.input);
      this.setState({ isDropdownOpened: false });
    }
  };

  handleSearchInputClick = () => {
    if (this.state.input.length > 0) {
      this.onSearch(this.state.input);
      this.setState({ isDropdownOpened: false });
    }
  };

  handleInputAutoFocus = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handleDropdownClick = () => {
    if (!this.state.isDropdownOpened && this.props.searchQueries.length > 0) {
      this.setState({ isDropdownOpened: true });
    }
  };

  handleDropdownBlur = () => {
    setTimeout(() => {
      const focusedEl = document.activeElement as Element | null;
      if (
        focusedEl &&
        this.dropdownRef.current &&
        this.dropdownRef.current.contains(focusedEl)
      ) {
        return;
      }
      this.setState({ isDropdownOpened: false, hovered: searchPlaceholder });
    }, 100);
  };

  handleSearchAutocompleteClick = (e: React.MouseEvent<HTMLLIElement>) => {
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
      <div className="mt-2 w-full max-w-screen-xl rounded-sm border border-transparent bg-gray-950 p-2">
        <div className="relative w-full">
          <div className="flex gap-2">
            <input
              ref={this.inputRef}
              className="w-full rounded-sm border border-amber-50/20 bg-gray-950 px-4 py-2 text-sm text-amber-50 focus:outline-none"
              type="text"
              placeholder={
                this.props.searchQueries.length > 0
                  ? this.state.hovered
                  : searchPlaceholder
              }
              value={this.state.input}
              onChange={this.handleInputChange}
              onKeyDown={this.handleInputKeyDown}
              onClick={this.handleDropdownClick}
              onBlur={this.handleDropdownBlur}
            />
            <button
              className="cursor-pointer rounded-sm bg-amber-50 px-4 py-2 text-sm font-bold text-black transition hover:bg-white"
              onClick={this.handleSearchInputClick}
            >
              Search
            </button>
          </div>

          {this.state.isDropdownOpened && (
            <ul
              className="absolute mt-1 w-full rounded-sm border border-gray-700 bg-black/30 backdrop-blur-md"
              ref={this.dropdownRef}
            >
              {this.props.searchQueries.map((result, idx) => (
                <div
                  className="flex cursor-default items-center justify-between px-2 py-1 hover:bg-white/10"
                  key={idx}
                >
                  <li
                    key={idx}
                    tabIndex={-1}
                    className="flex w-full px-2 py-2 text-sm"
                    onMouseOver={this.handleMouseOver}
                    onClick={this.handleSearchAutocompleteClick}
                  >
                    <span className="w-full cursor-pointer">{result}</span>
                  </li>
                  <button
                    className="ml-2 cursor-pointer text-lg text-red-200/30 hover:text-red-200"
                    onBlur={this.handleDropdownBlur}
                    onClick={() => this.onRemoveResultDropdown(idx)}
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
