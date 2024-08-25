import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import Table from '@/Components/Table'
import SecondaryButton from '@/Components/SecondaryButton'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import swal2 from 'sweetalert2'
import { useState, useEffect } from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Archives({ auth, products, categories }) {
    const [search, setSearch] = useState('')
    const [filteredTasks, setFilteredTasks] = useState(products)
    const [selectedCategoryName, setSelectedCategoryName] = useState('All')

    const categoryOptions = categories.map((category) => ({
        value: category.categoryName,
        label: category.categoryName,
    }))

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
    }

    const handleSelectCategory = (e) => {
        setSelectedCategoryName(e.target.value)
    }

    useEffect(() => {
        let filtered = products

        if (selectedCategoryName !== 'All') {
            filtered = filtered.filter((product) => product.categoryName === selectedCategoryName)
        }

        // Filter by search term
        if (search.trim() !== '') {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase()),
            )
        }

        setFilteredTasks(filtered)
    }, [search, selectedCategoryName, products])

    const columns = [
        {
            header: 'Image',
            accessor: 'imageURL',
            render: (product) => (
                <img src={product.imageURL} alt={product.name} className="w-10 h-10 " />
            ),
        },
        {
            header: 'Name',
            accessor: 'name',
        },
        {
            header: 'Model',
            accessor: 'model',
        },
        {
            header: 'Description',
            accessor: 'description',
        },
        {
            header: 'Price',
            accessor: 'price',
        },
        {
            header: 'Category',
            accessor: 'categoryName',
        },
        {
            header: 'Manufacturer',
            accessor: 'manufacturerName',
        },
    ]

    const handleRestore = (id) => {
        router.patch(route('products.restore', id), {
            preserveScroll: true,
            preserveState: true,
        })
        toast.success('Product restored successfully')
    }

    const handlePermanentDelete = (id) => {
        swal2
            .fire({
                title: 'Are you sure?',
                text: 'This product will be deleted permanently!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, keep it',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.delete(route('products.destroy', id), {
                        preserveScroll: true,
                        preserveState: true,
                    })
                    swal2.fire('Deleted!', 'Your product has been deleted.', 'success')
                }
            })
    }

    const actions = (product) => (
        <>
            {/* <ArrowPathIcon
                className="h-5 w-5 text-blue-400 hover:text-blue-700 cursor-pointer"

            /> */}
            <SecondaryButton
                className="text-blue-400 mx-2 hover:text-blue-700 cursor-pointer border-blue-700 focus:outline-none"
                onClick={() => {
                    handleRestore(product.productID)
                }}
            >
                restore
            </SecondaryButton>
            <SecondaryButton
                className=" text-red-400 mx-2 hover:text-red-700 cursor-pointer border-red-700 focus:outline-none"
                onClick={() => {
                    handlePermanentDelete(product.productID)
                }}
            >
                Delete
            </SecondaryButton>
            {/* <TrashIcon
                className="h-5 w-5 ml-3 text-red-400 hover:text-red-700 cursor-pointer"
                onClick={() => {
                    handlePermanentDelete(product.productID)
                }}
            /> */}
        </>
    )

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Archives
                </h2>
            }
        >
            <Head title="Archives" />

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="flex flex-col p-12 ">
                <div className="flex justify-between py-10">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Archives List
                        </h2>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            List of all archived products.
                        </p>
                    </header>
                    <div className="flex">
                        <TextInput
                            id="search"
                            className="block w-64 mx-3"
                            placeholder="Search tasks..."
                            autoComplete="search"
                            value={search}
                            onChange={(e) => {
                                handleSearch(e)
                            }}
                        />
                        <SelectInput
                            id="categoryID"
                            label="All"
                            className="block w-32"
                            onChange={(e) => {
                                handleSelectCategory(e)
                            }}
                            options={categoryOptions}
                        />
                    </div>
                </div>
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <Table
                                columns={columns}
                                data={filteredTasks}
                                emptyMessage="No Products found."
                                actions={actions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
