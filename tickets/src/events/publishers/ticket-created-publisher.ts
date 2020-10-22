import { Publisher, Subjects, TicketCreatedEvent } from '@2happytickets/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated
}
