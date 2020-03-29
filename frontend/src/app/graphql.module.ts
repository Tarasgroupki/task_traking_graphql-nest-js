import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { HttpHeaders } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { AuthService } from './auth/auth.service';
import { ApolloLink } from 'apollo-link';
import { getOperationAST } from 'graphql';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { Socket } from 'ngx-socket-io';
import { SocketIoModule } from 'ngx-socket-io';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const WebSocket = require('isomorphic-ws');

@NgModule({
  exports: [ApolloModule, ApolloModule, HttpLinkModule],
  providers: [
  ],
})
export class GraphQLModule {
  constructor(apollo: Apollo,
              httpLink: HttpLink,
              authService: AuthService) {

    const token = (authService.token) ? authService.token : localStorage.getItem('token');
    const authorization = token ? `Bearer ${token}` : null;
    const headers = new HttpHeaders().append('Authorization', authorization);

    const uri = 'http://localhost:8000/graphql';
    const http = httpLink.create({ uri, headers });

   // const webSocket = SocketIoModule;
    /*const ws = new WebSocketLink(new SubscriptionClient(`http://localhost:8000/`, {
         reconnect: true,
       }, webSocket));*/

    apollo.create({
      // 2
      link: /*split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },*/
     //   ws,
        http,
    // ),
      cache: new InMemoryCache()
    });
  }
}
