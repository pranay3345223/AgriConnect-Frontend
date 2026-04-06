import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService, ChatMessage } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatScrollContainer') private chatScrollContainer!: ElementRef;
  
  username: string = '';
  isJoined: boolean = false;
  messageInput: string = '';
  messages: ChatMessage[] = [];
  isConnected: boolean = false;
  
  private messagesSub!: Subscription;
  private connectionSub!: Subscription;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.messagesSub = this.chatService.messages$.subscribe(msgs => {
      this.messages = msgs;
    });
    this.connectionSub = this.chatService.connectionStatus$.subscribe(status => {
      this.isConnected = status;
      if (status && !this.isJoined && this.username.trim() !== '') {
         this.isJoined = true; // successfully connected and waiting for chat
      } else if (!status) {
         this.isJoined = false;
      }
    });
  }
  
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatScrollContainer) {
        this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }

  joinChat(): void {
    if (this.username.trim()) {
      this.chatService.connect(this.username);
      // isJoined gets set in the subscription when connected.
    }
  }

  sendMessage(): void {
    if (this.messageInput.trim() && this.isJoined) {
      const msg: ChatMessage = {
        sender: this.username,
        content: this.messageInput,
        type: 'CHAT'
      };
      this.chatService.sendMessage(msg);
      this.messageInput = '';
    }
  }

  ngOnDestroy(): void {
    if (this.messagesSub) this.messagesSub.unsubscribe();
    if (this.connectionSub) this.connectionSub.unsubscribe();
    this.chatService.disconnect();
  }
}
