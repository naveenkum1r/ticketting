import { OrderCancelledEvent, OrderStatus } from '@2happytickets/common'
import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { Order } from '../../../models/order'
import { natsWrapper } from '../../../nats-wrapper'
import { OrderCancelledListener } from '../order-cancelled-listener'

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: 'fsfsfd',
    version: 0,
  })

  await order.save()

  const data: OrderCancelledEvent['data'] = {
    id: order.id,
    version: 1,
    ticket: {
      id: 'sdfsfsdf',
    },
  }
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, order, data, msg }
}

it('updated the status of the order', async () => {
  const { listener, data, msg, order } = await setup()
  await listener.onMessage(data, msg)

  const updatedOrder = await Order.findById(data.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('acks the message', async () => {
  const { listener, data, msg, order } = await setup()
  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})
