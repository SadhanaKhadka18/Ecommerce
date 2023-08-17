document.getElementById('AddProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const productId = document.getElementById('productId').value;
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productStock = parseInt(document.getElementById('productStock').value);
    const productImage = document.getElementById('productImage').value;

    const formData = {
        id: productId,
        name: productName,
        price: productPrice,
        stock: productStock,
        description: productDescription,
        imageName: productImage,
    };
//  console.log(formData)
    try {
        const response = await fetch('http://localhost:3000/admin/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Product added successfully!');
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
    } catch (error) {
        alert('An error occurred while adding the product.');
        console.error(error);
    }
});
