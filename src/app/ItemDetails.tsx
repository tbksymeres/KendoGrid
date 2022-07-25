import * as React from 'react';

import { getter } from '@progress/kendo-react-common';
import {
    Grid,
    GridColumn as Column,
    GridSelectionChangeEvent,
    GridKeyDownEvent,
    getSelectedState,
    getSelectedStateFromKeyDown,
} from '@progress/kendo-react-grid';

import products from './products.json';
import { Product } from './interfaces';

const DATA_ITEM_KEY = 'ProductID';
const SELECTED_FIELD = 'selected';
const idGetter = getter(DATA_ITEM_KEY);

export const ItemDetails = () => {
    const [selectedState, setSelectedState] = React.useState<{
        [id: string]: boolean | number[];
    }>({});

    const [data, setData] = React.useState<Product[]>(
        products.map((dataItem: Product) =>
            Object.assign({ selected: false }, dataItem)
        )
    );

    const onSelectionChange = (event: GridSelectionChangeEvent) => {
        const newSelectedState = getSelectedState({
            event,
            selectedState: selectedState,
            dataItemKey: DATA_ITEM_KEY,
        });
        setSelectedState(newSelectedState);
    };
    const onKeyDown = (event: GridKeyDownEvent) => {
        const newSelectedState = getSelectedStateFromKeyDown({
            event,
            selectedState: selectedState,
            dataItemKey: DATA_ITEM_KEY,
        });
        setSelectedState(newSelectedState);
    };

    return (
        <Grid
            style={{ width: '60%', margin: '0 auto' }}
            data={data.map((item) => ({
                ...item,
                [SELECTED_FIELD]: selectedState[idGetter(item)],
            }))}
            dataItemKey={DATA_ITEM_KEY}
            selectedField={SELECTED_FIELD}
            selectable={{
                enabled: true,
                mode: 'single',
            }}
            navigatable={true}
            onSelectionChange={onSelectionChange}
            onKeyDown={onKeyDown}
        >
            <Column field="ProductName" title="Product Name" width="300px" />
            <Column field="UnitsInStock" title="Units In Stock" />
            <Column field="UnitsOnOrder" title="Units On Order" />
            <Column field="ReorderLevel" title="Reorder Level" />
        </Grid>
    );
};
