import React, { useState } from 'react';
import Checkbox from '@/Components/Checkbox';

export default function Table({ columns, data, actions, emptyMessage }) {
    const [selectedItems, setSelectedItems] = useState([]);

    // const handleCheckboxChange = (id) => {
    //     setSelectedItems((prevSelectedItems) =>
    //         prevSelectedItems.includes(id)
    //             ? prevSelectedItems.filter((itemId) => itemId !== id)
    //             : [...prevSelectedItems, id]
    //     );
    // };

    // const isItemSelected = (id) => selectedItems.includes(id);

    // const handleSelectAllChange = () => {
    //     if (selectedItems.length === data.length) {
    //         setSelectedItems([]);
    //     } else {
    //         setSelectedItems(data.map((item) => item.productID));
    //     }
    // };

    return (
        <table className="table-auto divide-y-4 w-full">
            <thead>
                <tr>
                    {/* Checkbox column header */}
                    {/* <th className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
                        <Checkbox
                            checked={selectedItems.length === data.length}
                            onChange={handleSelectAllChange}
                        />
                    </th> */}

                    {columns.map((column) => (
                        <th
                            key={column.header}
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                            {column.header}
                        </th>
                    ))}

                    {actions && (
                        <th
                            scope="col"
                            className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase"
                        >
                            Action
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className="divide-gray-200 divide-y-2">
                {data.length === 0 ? (
                    <tr>
                        <td
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500"
                            colSpan={columns.length + (actions ? 2 : 1)} // Adjusted colspan for the checkbox
                        >
                            {emptyMessage || 'No data found.'}
                        </td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.productID}>
                            {/* Checkbox column */}
                            {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                <Checkbox
                                    checked={isItemSelected(item.productID)}
                                    onChange={() => handleCheckboxChange(item.productID)}
                                />
                            </td> */}

                            {columns.map((column) => (
                                <td
                                    key={column.header}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                                >
                                    {column.render ? column.render(item) : item[column.accessor]}
                                </td>
                            ))}

                            {actions && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    {actions(item)}
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
