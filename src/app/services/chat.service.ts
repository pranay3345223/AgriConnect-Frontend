import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ChatMessage {
  type: 'CHAT' | 'JOIN' | 'LEAVE';
  content: string;
  sender: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private stompClient: Client;
  private messageSubject: BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([]);
  public messages$: Observable<ChatMessage[]> = this.messageSubject.asObservable();
  
  private connectionStatusSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public connectionStatus$: Observable<boolean> = this.connectionStatusSubject.asObservable();

  constructor() {
    this.stompClient = new Client({
      // We use webSocketFactory instead of brokerURL for SockJS fallback
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = (frame) => {
      this.connectionStatusSubject.next(true);
      this.stompClient.subscribe('/topic/public', (message: Message) => {
        if (message.body) {
          const chatMessage: ChatMessage = JSON.parse(message.body);
          const currentMessages = this.messageSubject.value;
          this.messageSubject.next([...currentMessages, chatMessage]);
        }
      });
    };

    this.stompClient.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
    
    this.stompClient.onWebSocketClose = () => {
      this.connectionStatusSubject.next(false);
    };
  }

  connect(username: string): void {
    if (!this.stompClient.active) {
      this.stompClient.activate();
      // Wait for connection to send JOIN message
      setTimeout(() => {
        if (this.stompClient.connected) {
           this.stompClient.publish({
             destination: '/app/chat.addUser',
             body: JSON.stringify({ sender: username, type: 'JOIN' }),
           });
        }
      }, 1000); // give it a sec to activate or listen to connectionStatus$
    }
  }

  sendMessage(message: ChatMessage): void {
    if (this.stompClient.connected) {
      this.stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message),
      });
    }
  }

  disconnect(): void {
    if (this.stompClient.active) {
      this.stompClient.deactivate();
      this.connectionStatusSubject.next(false);
    }
  }
}
