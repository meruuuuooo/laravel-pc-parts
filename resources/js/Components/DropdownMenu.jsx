import { useState } from 'react'
import { Link } from '@inertiajs/react'

const DropdownMenu = ({ buttonText, menuItems }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [buttonTextTitle, setButtonTextTitle] = useState(buttonText)

    const toggleDropdown = () => setIsOpen(!isOpen)

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className="dropdown-toggle dropdown-indicator btn btn-outline-light bg-blue-gray-900 border border-gray-300 text-white py-2 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
            >
                {buttonTextTitle || 'Options'}
            </button>
            {isOpen && (
                <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white shadow-lg z-20">
                    <ul className="py-1 text-sm text-gray-700">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    preserveScroll
                                    href={item.href || '#'}
                                    className="block px-4 py-2 hover:bg-gray-300"
                                    onClick={e => {
                                        e.preventDefault()
                                        setButtonTextTitle(item.label)
                                        item.onClick && item.onClick()
                                        setIsOpen(false)
                                    }}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DropdownMenu
