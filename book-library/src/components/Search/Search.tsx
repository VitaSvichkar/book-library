import c from './search.module.css';
import { getType, setKeyword, setTypeQuery } from '../../features/searchSlice';
import { fetchBooks } from '../../features/fetchBooks';
import { useDispatch, useSelector } from 'react-redux';
import React, { FC, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { QueryTypes } from '../../types/searchSlice';
import { AppDispatch } from '../../app/store';

type SearchProps = {
  setIsLoading: (value: boolean) => void;
  setIsRequest: (value: boolean) => void;
  keyword: string;
};

export const Search: FC<SearchProps> = React.memo(
  ({ setIsLoading, setIsRequest, keyword }) => {
    const [words, setWords] = useState<{
      keyword: string;
      lastKeyword: string;
    }>({
      keyword: keyword,
      lastKeyword: '',
    });

    const type: QueryTypes = useSelector(getType);
    const dispatch: AppDispatch = useDispatch();

    function handleSetValue(e: React.ChangeEvent<HTMLInputElement>) {
      setWords((prev) => ({ ...prev, keyword: e.target.value }));
    }

    function handleSetSearchType(value: QueryTypes) {
      setWords((prev) => ({ ...prev, keyword: '', lastKeyword: '' }));
      dispatch(setTypeQuery(value));
    }

    useEffect(() => {
      setWords((prev) => ({ ...prev, keyword: keyword }));
    }, [keyword]);

    async function handleSetFetch(
      e: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
      const target = e.target as HTMLFormElement;
      const formData = new FormData(target);
      const currentType = formData.get('searchType') as QueryTypes;
      e.preventDefault();

      try {
        if (words.lastKeyword === words.keyword) {
          return;
        } else {
          setIsLoading(true);
          setWords((prev) => ({ ...prev, lastKeyword: prev.keyword }));
          await dispatch(fetchBooks(words.keyword, currentType));
          dispatch(setKeyword(words.keyword));
          dispatch(setTypeQuery(currentType));
          setIsRequest(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    function placeholderText(): string {
      switch (type) {
        case 'author':
          return 'e.g., John Fowles, Rowling';

        case 'category':
          return 'e.g., Fiction, History, Science';

        default:
          return 'e.g., Harry Potter, The Godfather';
      }
    }

    return (
      <>
        <form className={c.form} onSubmit={handleSetFetch}>
          <div className={c.wrapSelect}>
            <select
              name="searchType"
              value={type}
              className={c.select}
              onChange={(e) =>
                handleSetSearchType(e.target.value as QueryTypes)
              }
            >
              <option value="author">Search by author</option>
              <option value="title">Search by title</option>
              <option value="category">Search by category</option>
            </select>
          </div>

          <div className={c.search}>
            <input
              onChange={handleSetValue}
              maxLength={70}
              placeholder={placeholderText()}
              autoFocus
              value={words.keyword}
            />
            <button>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
      </>
    );
  }
);
