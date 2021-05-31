import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';

const PlaceOrderScreen = ({ history }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);
	const { shippingAddress, paymentMethod, cartItems } = cart;
	let { itemsPrice, shippingPrice, taxPrice, totalPrice } = cart;

	if (!cart.shippingAddress.address) {
		history.push('/shipping');
	} else if (!cart.paymentMethod) {
		history.push('/payment');
	}

	const addDec = (n) => (Math.round(n * 100) / 100).toFixed(2);

	itemsPrice = addDec(
		cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	);
	const totQty = cartItems.reduce((acc, item) => acc + item.qty, 0);
	shippingPrice = addDec(itemsPrice < 500 ? 500 : totQty * 50 + 500);
	taxPrice = addDec(Number((0.15 * itemsPrice).toFixed(2)));
	totalPrice = (
		Number(itemsPrice) +
		Number(shippingPrice) +
		Number(taxPrice)
	).toFixed(2);

	const orderCreate = useSelector((state) => state.orderCreate);
	const { order, success, error } = orderCreate;

	useEffect(() => {
		if (success) {
			history.push(`/order/${order._id}`);
			dispatch({ type: USER_DETAILS_RESET });
			dispatch({ type: ORDER_CREATE_RESET });
		}
	}, [history, success]);

	const placeOrderHandler = (e) => {
		e.preventDefault();
		dispatch(
			createOrder({
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			})
		);
	};

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>
								{shippingAddress.address}, {shippingAddress.city},{' '}
								{shippingAddress.country}
								{shippingAddress.postCode}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{paymentMethod}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<Message>Your cart is empty.</Message>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x Rs{item.price} = Rs
													{item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>Rs{itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>Rs{shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>Rs{taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>Rs{totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type='button'
									className='btn-block'
									disabled={cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
