import React from 'react';
import { useDispatch } from 'react-redux';
import {setSearchValue} from '../../redux/slices/filterSlice';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';

const Search: React.FC = () => {
   const dispatch = useDispatch();
   const [value, setValue] = React.useState('');
   const inputRef = React.useRef<HTMLInputElement>(null);

   const updateSearchValue = React.useCallback(
      debounce((str: string) => {
         dispatch(setSearchValue(str));
      }, 1000),
      [],
   );

   const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
      updateSearchValue(event.target.value);
   };

   const onClickClear = (event: React.MouseEvent<SVGSVGElement>) => {
      dispatch(setSearchValue(''));
      setValue('');
      inputRef.current?.focus();
   };

   return (
      <div className={styles.root}>
         <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"/></svg>
         
         <input ref={inputRef} value={value} onChange={onChangeInput} className={styles.input} placeholder="Поиск пиццы" />

         {value && (<svg onClick={onClickClear} className={styles.closeIcon} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="25px" height="25px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>)}
         {/* searchValue && - условный рендер - условие, по которому иконка выводится, если в searchValue что-то есть */}
      </div>
   )
};

export default Search;