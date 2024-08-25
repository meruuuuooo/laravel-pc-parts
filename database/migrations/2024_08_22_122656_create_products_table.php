<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('productID'); // Primary Key
            $table->string('name');
            $table->string('model');
            $table->text('description');
            $table->decimal('price', 8, 2); //
            $table->string('imageURL');
            $table->boolean('isFeatured')->default(false);
            $table->boolean('isDeleted')->default(false);
            $table->unsignedBigInteger('categoryID'); // Foreign Key
            $table->unsignedBigInteger('manufacturerID'); // Foreign Key
            $table->timestamps();

            // Foreign Key Constraints
            $table->foreign('categoryID')->references('categoryID')->on('categories')->onDelete('cascade');
            $table->foreign('manufacturerID')->references('manufacturerID')->on('manufacturers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
