import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matchesMsg',
})
export class MatchesMsgPipe implements PipeTransform {
  transform(replies: Array<any>, msg: number): Array<any> {
    return replies.filter(reply => reply.msgId === msg);
  }
}
