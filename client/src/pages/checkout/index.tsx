import { useState } from 'react';

const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 100,
        description: 'This is a great product.',
        quantity: 1,
    },
    {
        id: 2,
        name: 'Product 2',
        price: 200,
        description: 'This is another great product.',
        quantity: 2,
    },
];

export default function Checkout() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handlePlaceOrder = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch('http://localhost:8000/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: products.reduce((acc, product) => acc + product.price * product.quantity, 0),
                    paymentMethod: 'credit_card',
                }),
            });
            if (res.ok) {
                setMessage('Order placed successfully!');
            } else {
                setMessage('Failed to place order.');
            }
        } catch {
            setMessage('Error connecting to order service.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-blue-700">Checkout</h1>
                <div className="w-full">
                    {products.map((product) => (
                        <div key={product.id} className="flex items-center gap-4 p-4 border-b">
                            <div className="flex flex-col">
                                <h2 className="text-lg font-bold">{product.name}</h2>
                                <p className="text-gray-600">{product.description}</p>
                                <p className="text-green-600 font-semibold">${product.price.toFixed(2)}</p>
                                <p className="text-gray-500">Quantity: {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full mt-4">
                    <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                    <div className="p-4 border rounded-lg">
                        <p className="text-lg font-semibold">Total Items: {products.reduce((acc, product) => acc + product.quantity, 0)}</p>
                        <p className="text-xl font-bold mt-2">Total Price: ${products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}</p>
                    </div>
                </div>
                <button
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 w-full"
                    onClick={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? 'Paying...' : 'Pay'}
                </button>
                {message && <div className={`mt-6 text-center text-lg ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
            </div>
        </div>
    );
}
