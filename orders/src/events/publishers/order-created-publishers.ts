import { Publisher, OrderCreatedEvent, Subjects } from '@2happytickets/common'

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
}
