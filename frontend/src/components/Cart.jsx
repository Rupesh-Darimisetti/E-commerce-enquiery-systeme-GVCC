import CartListView from './CartListView'
import CartSummary from './CartSummary'
import Header from './Header'

import CartContext from '../context/CartContext'
import EmptyCartView from './EmptyCartView'


const Cart = () => (
    <CartContext.Consumer>
        {value => {
            const { cartList, removeAllCartItems } = value
            const showEmptyView = cartList.length === 0

            return (
                <>
                    <Header />
                    <div className="cart-container">
                        {showEmptyView ? (
                            <EmptyCartView />
                        ) : (
                            <div className="cart-content-container">
                                <h1 className="cart-heading">My Cart</h1>

                                {/* TODO: Add your code for Cart Summary here */}
                                <button
                                    type="button"
                                    className="remove-all-btn"
                                    onClick={removeAllCartItems}
                                >
                                    Remove All
                                </button>
                                <CartListView />
                                <CartSummary />
                            </div>
                        )}
                    </div>
                </>
            )
        }}
    </CartContext.Consumer>
)
export default Cart
