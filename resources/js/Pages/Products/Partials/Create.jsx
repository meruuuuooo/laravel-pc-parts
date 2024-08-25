import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import SelectInput from '@/Components/SelectInput'
import PrimaryButton from '@/Components/PrimaryButton'
import TextArea from '@/Components/TextArea'
import { Head, useForm } from '@inertiajs/react'
import { Transition } from '@headlessui/react'



export default function Create({ auth, manufacturers, categories }) {
    const { data, setData, post, errors, processing, recentlySuccessful, reset } = useForm({
        name: '',
        model: '',
        description: '',
        price: 0,
        imageURL: '',
        categoryID: '',
        manufacturerID: '',
    })

    const manufacturerOptions = manufacturers.map((manufacturer) => ({
        value: manufacturer.manufacturerID,
        label: manufacturer.manufacturerName,
    }))

    const categoryOptions = categories.map((category) => ({
        value: category.categoryID,
        label: category.categoryName,
    }))

    const handleFormSubmition = (e) => {
        e.preventDefault()

        post(route('products.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
            },
        })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="Create" />


            <div className="py-5">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-12 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="w-3/5">
                            <header className="pb-2">
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Create Product
                                </h2>
                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Fill in the form below to create a new product.
                                </p>
                            </header>
                            <form onSubmit={handleFormSubmition}>
                                <div className="">
                                    <div className="py-3">
                                        <InputLabel htmlFor="name" value="name" />

                                        <TextInput
                                            id="name"
                                            className="mt-1 block w-full"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            required
                                            isFocused
                                            autoComplete="name"
                                        />

                                        <InputError className="mt-2" message={errors.name} />
                                    </div>
                                    <div className="py-3">
                                        <InputLabel htmlFor="model" value="model" />

                                        <TextInput
                                            id="model"
                                            className="mt-1 block w-full"
                                            value={data.model}
                                            onChange={(e) => setData('model', e.target.value)}
                                            required
                                            autoComplete="model"
                                        />

                                        <InputError className="mt-2" message={errors.model} />
                                    </div>
                                    <div className="py-3">
                                        <InputLabel htmlFor="description" value="description" />

                                        <TextArea
                                            id="description"
                                            className="mt-1 block w-full"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            required
                                            autoComplete="description"
                                        />

                                        <InputError className="mt-2" message={errors.description} />
                                    </div>
                                    <div className="py-3">
                                        <InputLabel htmlFor="price" value="price" />

                                        <TextInput
                                            id="price"
                                            className="mt-1 block w-full"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            required
                                            type="number"
                                            autoComplete="price"
                                        />

                                        <InputError className="mt-2" message={errors.price} />
                                    </div>
                                    <div className="py-3">
                                        <InputLabel htmlFor="imageURL" value="imageURL" />

                                        <TextInput
                                            id="imageURL"
                                            className="mt-1 block w-full"
                                            onChange={(e) => setData('imageURL', e.target.files[0])}
                                            type="file"
                                            autoComplete="imageURL"
                                        />

                                        <InputError className="mt-2" message={errors.imageURL} />
                                    </div>
                                    <div className="py-3">
                                        <InputLabel htmlFor="categoryID" value="categoryID" />

                                        <SelectInput
                                            id="categoryID"
                                            className="mt-1 block w-full"
                                            value={data.categoryID}
                                            onChange={(e) => setData('categoryID', e.target.value)}
                                            options={categoryOptions}
                                            required
                                        />

                                        <InputError className="mt-2" message={errors.categoryID} />
                                    </div>
                                    <div className="py-3">
                                        <InputLabel
                                            htmlFor="manufacturerID"
                                            value="manufacturerID"
                                        />

                                        <SelectInput
                                            id="manufacturerID"
                                            className="mt-1 block w-full"
                                            value={data.manufacturerID}
                                            onChange={(e) =>
                                                setData('manufacturerID', e.target.value)
                                            }
                                            options={manufacturerOptions}
                                            required
                                        />

                                        <InputError
                                            className="mt-2"
                                            message={errors.manufacturerID}
                                        />
                                    </div>
                                </div>
                                <div className="flex items-center py-3 gap-4">
                                    <PrimaryButton disabled={processing}>Create</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-900">Created.</p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
