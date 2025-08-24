import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserOrders, cancelOrder } from '../../services/orderAPI';
import '../css/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getUserOrders();
        console.log('Orders API response:', data);
        console.log('Orders data type:', typeof data);
        console.log('Orders data keys:', Object.keys(data || {}));
        
        // Handle different response structures
        if (data && data.orders) {
          console.log('Found orders array with length:', data.orders.length);
          setOrders(data.orders);
        } else if (Array.isArray(data)) {
          console.log('Data is array with length:', data.length);
          setOrders(data);
        } else {
          console.error('Unexpected orders data structure:', data);
          setOrders([]);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load your orders. Please try again later.');
        setOrders([]); // Ensure orders is always an array
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      // Confirm cancellation
      const confirmCancel = window.confirm('Are you sure you want to cancel this order? This action cannot be undone.');
      if (!confirmCancel) {
        return;
      }

      console.log('Cancelling order:', orderId);
      const response = await cancelOrder(orderId);
      
      if (response.success) {
        alert('Order cancelled successfully!');
        
        // Update the orders list
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId || order.orderId === orderId
              ? { ...order, status: 'cancelled' }
              : order
          )
        );
        
        // Update selectedOrder if it's the one being cancelled
        if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.orderId === orderId)) {
          setSelectedOrder({ ...selectedOrder, status: 'cancelled' });
        }
      } else {
        alert(response.message || 'Failed to cancel order. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-pending';
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <h1>Your Orders</h1>
          <div className="loading-spinner">Loading your orders...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="container">
          <h1>Your Orders</h1>
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  // If user is not logged in or no orders
  if (!orders || !Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="orders-page">
        <div className="container">
          <h1>Your Orders</h1>
          <div className="no-orders">
            <div className="no-orders-icon">📦</div>
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet or you need to log in to view your order history.</p>
            <div className="no-orders-actions">
              <Link to="/products" className="shop-now-btn">Shop Now</Link>
              <Link to="/login" className="login-btn">Log In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Your Orders</h1>
        
        <div className="orders-list">
          <div className="orders-header">
            <div className="order-col order-id">Order ID</div>
            <div className="order-col order-date">Date</div>
            <div className="order-col order-total">Total</div>
            <div className="order-col order-status">Status</div>
            <div className="order-col order-actions">Actions</div>
          </div>
          
          {Array.isArray(orders) && orders.map(order => (
            <div key={order._id} className="order-row">
              <div className="order-col order-id">{order._id.substring(0, 8)}...</div>
              <div className="order-col order-date">{formatDate(order.orderDate || order.createdAt)}</div>
              <div className="order-col order-total">₹{order.total || order.finalAmount}</div>
              <div className="order-col order-status">
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="order-col order-actions">
                <button 
                  className="view-order-btn"
                  onClick={() => handleOrderClick(order)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="order-details-overlay" onClick={closeOrderDetails}>
          <div className="order-details-modal" onClick={e => e.stopPropagation()}>
            <button className="close-modal" onClick={closeOrderDetails}>×</button>
            
            <div className="order-details-header">
              <h2>Order Details</h2>
              <div className="order-meta">
                <div className="order-number">
                  <span>Order ID:</span> {selectedOrder._id}
                </div>
                <div className="order-date">
                  <span>Date:</span> {formatDate(selectedOrder.orderDate || selectedOrder.createdAt)}
                </div>
              </div>
              <div className="order-status-container">
                <span>Status:</span>
                <span className={`status-badge ${getStatusClass(selectedOrder.status)}`}>
                  {selectedOrder.status}
                </span>
              </div>
            </div>
            
            <div className="order-details-content">
              <div className="order-items-section">
                <h3>Items Ordered</h3>
                <div className="ordered-items">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="ordered-item">
                      <div className="item-name-quantity">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">×{item.quantity}</span>
                      </div>
                      <div className="item-price">₹{item.price} each</div>
                      <div className="item-subtotal">₹{item.subtotal || (item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>
                
                <div className="order-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{selectedOrder.subtotal || selectedOrder.totalAmount}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping:</span>
                    <span>₹{selectedOrder.shipping || selectedOrder.shippingCost || 50}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>₹{selectedOrder.total || selectedOrder.finalAmount}</span>
                  </div>
                </div>
              </div>
              
              <div className="order-info-section">
                <div className="shipping-info">
                  <h3>Shipping Information</h3>
                  <p><strong>{selectedOrder.customerInfo?.fullName || selectedOrder.userDetails?.name || 'N/A'}</strong></p>
                  <p>{selectedOrder.customerInfo?.address || selectedOrder.shippingAddress?.street || 'N/A'}</p>
                  <p>{selectedOrder.customerInfo?.city || selectedOrder.shippingAddress?.city || 'N/A'}, {selectedOrder.customerInfo?.state || selectedOrder.shippingAddress?.state || 'N/A'} {selectedOrder.customerInfo?.zipCode || selectedOrder.shippingAddress?.zipCode || 'N/A'}</p>
                  <p>Phone: {selectedOrder.customerInfo?.phone || selectedOrder.userDetails?.phone || 'N/A'}</p>
                  <p>Email: {selectedOrder.customerInfo?.email || selectedOrder.userDetails?.email || 'N/A'}</p>
                </div>
                
                <div className="payment-info">
                  <h3>Payment Method</h3>
                  <p className="payment-method">
                    {selectedOrder.paymentMethod === 'cod' && 'Cash on Delivery'}
                    {selectedOrder.paymentMethod === 'upi' && 'UPI Payment'}
                    {selectedOrder.paymentMethod === 'card' && 'Credit/Debit Card'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="order-details-actions">
              <button className="continue-shopping-btn" onClick={closeOrderDetails}>Close</button>
              {selectedOrder.status === 'pending' && (
                <button 
                  className="cancel-order-btn"
                  onClick={() => handleCancelOrder(selectedOrder._id || selectedOrder.orderId)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
