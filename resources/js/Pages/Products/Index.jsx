import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import Table from '@/Components/Table'
import Modal from '@/Components/Modal'
import swal2 from 'sweetalert2'
import SecondaryButton from '@/Components/SecondaryButton'
import SelectInput from '@/Components/SelectInput'
import TextInput from '@/Components/TextInput'
import { useEffect, useState } from 'react'

export default function Index({ auth, products, categories }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalImageURL, setModalImageURL] = useState('')
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
            filtered = filtered.filter(
                (product) => product.categoryName === selectedCategoryName
            );
        }

        // Filter by search term
        if (search.trim() !== '') {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredTasks(filtered)
    }, [search, selectedCategoryName, products])

    const openModal = (imageURL) => {
        setModalImageURL(imageURL)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const columns = [
        {
            header: 'Image',
            accessor: 'imageURL',
            render: (product) => (
                <img
                    onClick={() => openModal(product.imageURL)}
                    src={product.imageURL}
                    alt={product.name}
                    className="w-10 h-10 cursor-pointer"
                />
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

    const handleArchive = (id) => {
        swal2
            .fire({
                title: 'Are you sure?',
                text: 'This product will be archived!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, archive it!',
                cancelButtonText: 'No, keep it',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    router.patch(route('products.isDeleted', id), {
                        preserveScroll: true,
                        preserveState: true,
                    })
                }
            })
    }

    const actions = (product) => (
        <>
            <Link href={route('products.edit', product.productID)}>
                <SecondaryButton className="text-blue-400  mx-2 hover:text-blue-700 cursor-pointer border-blue-700 hover:border-blue-700 focus:outline-none">
                    Edit
                </SecondaryButton>
            </Link>
            <SecondaryButton
                className="text-orange-400 mx-2 hover:text-orange-700 cursor-pointer border-orange-700 hover:border-orange-700 focus:outline-none"
                onClick={() => {
                    handleArchive(product.productID)
                }}
            >
                Archive
            </SecondaryButton>
        </>
    )

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Products" />

            <div className="flex flex-col p-12 ">
                <div className="flex justify-between py-10">
                    <div className="flex ">
                        <TextInput
                            id="search"
                            className="flex w-64 mr-10"
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
                    <Link href={route('products.create')}>
                        <SecondaryButton className="text-green-400 border-green-400 hover:text-green-700 hover:border-green-700 focus:outline-none">
                            Create Product
                        </SecondaryButton>
                    </Link>
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
            <Modal show={isModalOpen} onClose={closeModal} maxWidth="md">
                <div className="p-4">
                    <header>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            Product Image
                        </h2>
                    </header>
                    <img src={modalImageURL} alt="Product" className="w-full h-auto" />
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}
