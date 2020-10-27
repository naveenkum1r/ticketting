import { OrderStatus } from '@2happytickets/common'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Order } from '../../models/order'
import { Payment } from '../../models/payments'
import { stripe } from '../../stripe'

// jest.mock('../../stripe')

it('return a 404 when purchasing a ticket does not extist', async () => {
  await request(app).post('/api/payments').set('Cookie', global.signin()).send({ token: 'fsfsfsdf', orderId: mongoose.Types.ObjectId().toHexString() }).expect(404)
})

it('returns a 401 when purchasing a order that does not belong to a user', async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  })

  await order.save()

  await request(app).post('/api/payments').set('Cookie', global.signin()).send({ token: 'fsfsfsdf', orderId: order.id }).expect(401)
})

it('returns a 400 when purchasing a cancelled order', async () => {
  const userId = mongoose.Types.ObjectId().toHexString()
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled,
  })
  await order.save()

  await request(app).post('/api/payments').set('Cookie', global.signin(userId)).send({ token: 'fsfsfsdf', orderId: order.id }).expect(400)
})

it('returns a 201 with valid inputs', async () => {
  const userId = mongoose.Types.ObjectId().toHexString()
  const price = Math.floor(Math.random() * 100)
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price,
    status: OrderStatus.Created,
  })
  await order.save()

  await request(app).post('/api/payments').set('Cookie', global.signin(userId)).send({ token: 'tok_visa', orderId: order.id }).expect(201)

  // const stripeCharges = await stripe.charges.list({ limit: 50 })
  // const stripeCharge = stripeCharges.data.find((charge) => {
  //   return charge.amount === price * 100
  // })

  // expect(stripeCharge).toBeDefined()
  // expect(stripeCharge?.currency).toEqual('inr')

  // const payment = await Payment.findOne({
  //   orderId: order.id,
  //   stripeId: stripeCharge?.id,
  // })
  // expect(payment).not.toBeNull()
})
