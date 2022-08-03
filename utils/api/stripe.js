import Stripe from 'stripe'

const stripe = Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);

export default stripe