import { Link } from "react-router";

export default function HomePage() {
  return (
    <div>
        <nav className="flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/checkout">Checkout</Link>
        </nav>
    </div>
  )
}
