<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Manufacturer;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\RedirectResponse;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class ProductController extends Controller
{
    public function index()
    {
        $categories = Category::all();

        // Correctly join the products with categories and manufacturers
        $products = Product::join('categories', 'products.categoryID', '=', 'categories.categoryID')
            ->join('manufacturers', 'products.manufacturerID', '=', 'manufacturers.manufacturerID')
            ->select(
                'products.*',
                'categories.categoryName as categoryName', // Use the correct column name
                'manufacturers.manufacturerName as manufacturerName' // Use the correct column name
            )->where('products.isDeleted', '=', false)
            ->orderBy('products.updated_at', 'desc') // Sort by updated_at
            ->latest()->get();

        // Pass the data to the Inertia.js component
        return Inertia::render('Products/Index', [
            'products' => $products,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        $manufacturers = Manufacturer::all();
        $categories = Category::all();

        return Inertia::render('Products/Partials/Create', [
            'manufacturers' => $manufacturers,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {

        // Validate the incoming request
        $request->validate([
            'name' => 'required',
            'model' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'imageURL' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048',
            'categoryID' => 'required|exists:categories,categoryID',
            'manufacturerID' => 'required|exists:manufacturers,manufacturerID',
        ]);

        // Retrieve the category name using the categoryID
        $category = Category::find($request->categoryID);
        $categoryName = $category->categoryName;

        // Generate a unique name for the image based on the product name and current time
        $imageName = $request->name . '_' . time() . '.' . $request->file('imageURL')->getClientOriginalExtension();

        // Store the image in a subdirectory named after the category
        $imagePath = $request->file('imageURL')->storeAs('images/' . $categoryName, $imageName, 'public');

        // Store the relative path in the database
        $imageURL = Storage::url($imagePath);

        // Create a new product with the image URL
        Product::create([
            'name' => $request->name,
            'model' => $request->model,
            'description' => $request->description,
            'price' => $request->price,
            'imageURL' => $imageURL,
            'categoryID' => $request->categoryID,
            'manufacturerID' => $request->manufacturerID,
        ]);

        // return redirect()->route('products.index');

    }

    public function edit(Product $product): Response
    {
        $manufacturers = Manufacturer::all();
        $categories = Category::all();

        return Inertia::render('Products/Partials/Edit', [
            'product' => $product,
            'manufacturers' => $manufacturers,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Product $product)
    {
        // Validation
        $request->validate([
            'name' => 'required',
            'model' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'imageURL' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            'categoryID' => 'required|exists:categories,categoryID',
            'manufacturerID' => 'required|exists:manufacturers,manufacturerID',
        ]);

        // Retrieve the category name using the categoryID
        $category = Category::find($request->categoryID);
        $categoryName = $category->categoryName;

        // Handle the image update only if a new image is uploaded
        if ($request->hasFile('imageURL')) {
            // Delete the old image if it exists
            if ($product->imageURL) {
                // Extract the correct relative path from the stored URL
                $imagePath = str_replace('storage/', '', $product->imageURL);

                // Delete the image from storage
                Storage::disk('public')->delete($imagePath);
            }

            // Store the new image and get its path
            $imageName = $request->name . '_' . time() . '.' . $request->file('imageURL')->getClientOriginalExtension();

            $imagePath = $request->file('imageURL')->storeAs('images/' . $categoryName, $imageName, 'public');

            // Store the relative path in the database
            $imageURL = Storage::url($imagePath);

            // Update the product's image
            $product->update(['imageURL' => $imageURL]);
        } else {
            // Handle the case where only the category is updated but the image remains the same
            if ($request->categoryID != $product->categoryID) {

                // Extract the current image path
                $currentImagePath = str_replace('storage/', '', $product->imageURL);

                // Generate a new path for the image based on the new category
                $newImagePath = 'images/' . $categoryName . '/' . basename($currentImagePath);

                // Move the image to the new category folder
                Storage::disk('public')->move($currentImagePath, $newImagePath);

                // Update the imageURL in the database
                $newImageURL = Storage::url($newImagePath);
                $product->update(['imageURL' => $newImageURL]);
            }
        }

        // Update the product's other fields
        $product->update($request->only(['name', 'model', 'description', 'price', 'categoryID', 'manufacturerID']));
    }

    public function isDeleted(Product $product): RedirectResponse
    {
        $product->update(['isDeleted' => true]);

        return Redirect::route('products.index');
    }

    public function archives()
    {
        $categories = Category::all();

        // Correctly join the products with categories and manufacturers
        $products = Product::join('categories', 'products.categoryID', '=', 'categories.categoryID')
            ->join('manufacturers', 'products.manufacturerID', '=', 'manufacturers.manufacturerID')
            ->select(
                'products.*',
                'categories.categoryName as categoryName', // Use the correct column name
                'manufacturers.manufacturerName as manufacturerName' // Use the correct column name
            )
            ->where('products.isDeleted', '=', true)
            ->orderBy('products.updated_at', 'desc') // Sort by updated_at
            ->latest()->get();

        // Pass the data to the Inertia.js component
        return Inertia::render('Products/Partials/Archives', [
            'products' => $products,
            'categories' => $categories
        ]);
    }

    public function restore(Product $product): RedirectResponse
    {
        $product->update(['isDeleted' => false]);

        return Redirect::route('products.archives');
    }

    public function destroy(Product $product): RedirectResponse
    {
        // Check if the image exists and delete it
        if ($product->imageURL) {
            // Extract the correct relative path from the stored URL
            $imagePath = str_replace('storage/', '', $product->imageURL);

            // Delete the image from storage
            Storage::disk('public')->delete($imagePath);
        }

        // Delete the product
        $product->delete();

        return Redirect::route('products.archives');
    }
}
