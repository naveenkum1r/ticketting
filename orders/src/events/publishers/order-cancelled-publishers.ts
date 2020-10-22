import { Publisher, OrderCancelledEvent, Subjects } from '@2happytickets/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled
}
