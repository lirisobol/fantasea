import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setFiltersMaxPrice, setFiltersMinPrice } from '../../store/slices/filters';

export function PriceRangeFilter(): JSX.Element {
    const dispatch = useAppDispatch();
    const minPriceRedux = useAppSelector(state => state.filters.minPrice * 10); // Assuming Redux stores it as multiples of 10
    const maxPriceRedux = useAppSelector(state => state.filters.maxPrice * 10);

    const [minPrice, setMinPrice] = useState(minPriceRedux);
    const [maxPrice, setMaxPrice] = useState(maxPriceRedux);

    useEffect(() => {
        setMinPrice(minPriceRedux);
        setMaxPrice(maxPriceRedux);
    }, [minPriceRedux, maxPriceRedux]);

    const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMinPrice = Math.min(Number(event.target.value), maxPrice - 10);
        dispatch(setFiltersMinPrice(newMinPrice / 10));
        setMinPrice(newMinPrice);
    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxPrice = Math.max(Number(event.target.value), minPrice + 10);
        dispatch(setFiltersMaxPrice(newMaxPrice / 10));
        setMaxPrice(newMaxPrice);
    };

  return (
    <div className="price-range-filter flex gap-10 border rounded-lg p-2">
        <div className='flex w-full flex-col'>
            <div className='flex w-full justify-between'>
                <label htmlFor="max-price" className='text-xs'>Minimum</label>
                <span className='text-xs'>{minPrice / 10}</span>
            </div>
            <div>
                <input
                  type="range"
                  min="35"
                  max="160"
                  value={minPrice.toString()}
                  onChange={handleMinPriceChange}
                  className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent dark:bg-neutral-300"
                    id="max-price"
                />
            </div>

            <div className="flex w-full justify-between px-2 text-xs">
                <span>3.5</span>
                <span>16.0</span>
            </div>
        </div>


        <div className='flex w-full flex-col'>
            <div className='flex w-full justify-between'>
                <label htmlFor="max-price" className='text-xs'>Maximum</label>
                <span className='text-xs'>{maxPrice / 10}</span>
            </div>
            <div>
                <input
                  type="range"
                  min="35"
                  max="160"
                  value={maxPrice.toString()}
                  onChange={handleMaxPriceChange}
                  className="transparent h-[4px] w-full cursor-pointer appearance-none border-transparent dark:bg-neutral-300"
                    id="max-price"
                />
            </div>

            <div className="flex w-full justify-between px-2 text-xs">
                <span>3.5</span>
                <span>16.0</span>
            </div>
        </div>
    </div>
  );
}
