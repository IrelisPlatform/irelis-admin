// src/components/candidate/CandidateMessaging.tsx

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Clock,
  Check,
  CheckCheck,
  Briefcase,
  Building2,
  MoreVertical,
  Archive,
  Trash2,
  Star,
  Reply,
  ChevronLeft,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: 'recruiter' | 'candidate';
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: string;
  recruiterName: string;
  recruiterCompany: string;
  recruiterAvatar?: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
  starred: boolean;
}

interface CandidateMessagingProps {
  onTabChange?: (tab: string) => void;
}

export function CandidateMessaging({ onTabChange }: CandidateMessagingProps) {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      recruiterName: 'Amadou Diallo',
      recruiterCompany: 'TechAfrica',
      jobTitle: 'Développeur Full Stack Senior',
      lastMessage: 'Bonjour, j\'ai bien reçu votre candidature. Pouvez-vous me confirmer vos disponibilités pour un entretien cette semaine ?',
      lastMessageTime: 'Il y a 2h',
      unreadCount: 2,
      starred: true,
      messages: [
        {
          id: 'm1',
          senderId: 'r1',
          senderName: 'Amadou Diallo',
          senderRole: 'recruiter',
          content: 'Bonjour, merci pour votre candidature au poste de Développeur Full Stack. Votre profil nous intéresse beaucoup.',
          timestamp: '9 Nov 2025 - 10:30',
          read: true,
        },
        {
          id: 'm2',
          senderId: 'c1',
          senderName: 'Moi',
          senderRole: 'candidate',
          content: 'Bonjour M. Diallo, merci beaucoup pour votre retour. Je suis très intéressé par cette opportunité.',
          timestamp: '9 Nov 2025 - 11:15',
          read: true,
        },
        {
          id: 'm3',
          senderId: 'r1',
          senderName: 'Amadou Diallo',
          senderRole: 'recruiter',
          content: 'Parfait ! J\'aimerais organiser un entretien avec vous. Seriez-vous disponible mardi ou mercredi de cette semaine ?',
          timestamp: '9 Nov 2025 - 14:00',
          read: true,
        },
        {
          id: 'm4',
          senderId: 'r1',
          senderName: 'Amadou Diallo',
          senderRole: 'recruiter',
          content: 'Pouvez-vous me confirmer vos disponibilités pour un entretien cette semaine ?',
          timestamp: '9 Nov 2025 - 16:30',
          read: false,
        },
      ],
    },
    {
      id: '2',
      recruiterName: 'Fatou Koné',
      recruiterCompany: 'Digital Solutions CI',
      jobTitle: 'Chef de Projet Digital',
      lastMessage: 'Merci pour votre réponse. Nous vous recontacterons prochainement.',
      lastMessageTime: 'Il y a 1 jour',
      unreadCount: 0,
      starred: false,
      messages: [
        {
          id: 'm5',
          senderId: 'r2',
          senderName: 'Fatou Koné',
          senderRole: 'recruiter',
          content: 'Bonjour, nous avons bien reçu votre candidature pour le poste de Chef de Projet Digital.',
          timestamp: '8 Nov 2025 - 09:00',
          read: true,
        },
        {
          id: 'm6',
          senderId: 'c1',
          senderName: 'Moi',
          senderRole: 'candidate',
          content: 'Bonjour Mme Koné, je vous remercie. Je reste disponible pour toute information complémentaire.',
          timestamp: '8 Nov 2025 - 10:30',
          read: true,
        },
        {
          id: 'm7',
          senderId: 'r2',
          senderName: 'Fatou Koné',
          senderRole: 'recruiter',
          content: 'Merci pour votre réponse. Nous vous recontacterons prochainement.',
          timestamp: '8 Nov 2025 - 15:00',
          read: true,
        },
      ],
    },
    {
      id: '3',
      recruiterName: 'Jean-Pierre Mbarga',
      recruiterCompany: 'Startup Innovation',
      jobTitle: 'Développeur Frontend React',
      lastMessage: 'Félicitations ! Nous souhaitons vous proposer le poste.',
      lastMessageTime: 'Il y a 3 jours',
      unreadCount: 1,
      starred: true,
      messages: [
        {
          id: 'm8',
          senderId: 'r3',
          senderName: 'Jean-Pierre Mbarga',
          senderRole: 'recruiter',
          content: 'Bonjour, suite à notre entretien de la semaine dernière, je suis heureux de vous annoncer que nous souhaitons vous proposer le poste.',
          timestamp: '6 Nov 2025 - 11:00',
          read: false,
        },
      ],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'starred'>('all');

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'c1',
      senderName: 'Moi',
      senderRole: 'candidate',
      content: messageText,
      timestamp: new Date().toLocaleString('fr-FR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      read: true,
    };

    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: messageText,
            lastMessageTime: 'À l\'instant',
          }
        : conv
    ));

    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage],
    });

    setMessageText('');
    toast.success('Message envoyé');
  };

  const handleMarkAsRead = (conversationId: string) => {
    setConversations(conversations.map(conv =>
      conv.id === conversationId
        ? { ...conv, unreadCount: 0, messages: conv.messages.map(m => ({ ...m, read: true })) }
        : conv
    ));
  };

  const handleToggleStar = (conversationId: string) => {
    setConversations(conversations.map(conv =>
      conv.id === conversationId ? { ...conv, starred: !conv.starred } : conv
    ));
    toast.success(
      conversations.find(c => c.id === conversationId)?.starred
        ? 'Conversation retirée des favoris'
        : 'Conversation ajoutée aux favoris'
    );
  };

  const handleArchive = (conversationId: string) => {
    setConversations(conversations.filter(conv => conv.id !== conversationId));
    if (selectedConversation?.id === conversationId) {
      setSelectedConversation(null);
    }
    toast.success('Conversation archivée');
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch =
      conv.recruiterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.recruiterCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'unread' && conv.unreadCount > 0) ||
      (filterStatus === 'starred' && conv.starred);

    return matchesSearch && matchesFilter;
  });

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Mes messages</h1>
            <p className="text-muted-foreground mt-1">
              Échangez avec les recruteurs intéressés par votre profil
            </p>
          </div>
          {totalUnread > 0 && (
            <Badge className="bg-primary text-primary-foreground">
              {totalUnread} {totalUnread === 1 ? 'nouveau message' : 'nouveaux messages'}
            </Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Liste des conversations */}
        <Card className={`${selectedConversation ? 'hidden lg:block' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              Conversations
            </CardTitle>

            {/* Recherche et filtres */}
            <div className="space-y-3 mt-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une conversation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('all')}
                  className={filterStatus === 'all' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Toutes
                </Button>
                <Button
                  variant={filterStatus === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('unread')}
                  className={filterStatus === 'unread' ? 'bg-primary text-primary-foreground' : ''}
                >
                  Non lues ({conversations.filter(c => c.unreadCount > 0).length})
                </Button>
                <Button
                  variant={filterStatus === 'starred' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus('starred')}
                  className={filterStatus === 'starred' ? 'bg-primary text-primary-foreground' : ''}
                >
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-400px)]">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 text-muted" />
                  <p>Aucune conversation trouvée</p>
                </div>
              ) : (
                <div>
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      onClick={() => {
                        setSelectedConversation(conv);
                        handleMarkAsRead(conv.id);
                      }}
                      className={`p-4 border-b border-border cursor-pointer transition-colors hover:bg-muted ${
                        selectedConversation?.id === conv.id ? 'bg-primary/10 border-l-4 border-l-primary' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(conv.recruiterName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm truncate ${conv.unreadCount > 0 ? 'font-medium text-foreground' : 'text-foreground'}`}>
                                {conv.recruiterName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {conv.recruiterCompany}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {conv.starred && (
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              )}
                              {conv.unreadCount > 0 && (
                                <Badge className="bg-primary text-primary-foreground text-xs">
                                  {conv.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            <Briefcase className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                            <p className="text-xs text-muted-foreground truncate">{conv.jobTitle}</p>
                          </div>
                          <p className={`text-xs text-muted-foreground line-clamp-1 ${conv.unreadCount > 0 ? 'font-medium' : ''}`}>
                            {conv.lastMessage}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{conv.lastMessageTime}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation détaillée */}
        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="lg:hidden text-foreground"
                      onClick={() => setSelectedConversation(null)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(selectedConversation.recruiterName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{selectedConversation.recruiterName}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        {selectedConversation.recruiterCompany}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <Briefcase className="h-3 w-3" />
                        {selectedConversation.jobTitle}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-foreground">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background border-border">
                      <DropdownMenuItem onClick={() => handleToggleStar(selectedConversation.id)} className="text-foreground">
                        <Star className="h-4 w-4 mr-2" />
                        {selectedConversation.starred ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleArchive(selectedConversation.id)} className="text-foreground">
                        <Archive className="h-4 w-4 mr-2" />
                        Archiver
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-480px)] p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((message, index) => {
                      const isCandidate = message.senderRole === 'candidate';
                      return (
                        <div
                          key={message.id}
                          className={`flex ${isCandidate ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${isCandidate ? 'order-2' : 'order-1'}`}>
                            <div
                              className={`rounded-lg p-3 ${
                                isCandidate
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-foreground'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            <div
                              className={`flex items-center gap-2 mt-1 text-xs text-muted-foreground ${
                                isCandidate ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              <Clock className="h-3 w-3" />
                              <span>{message.timestamp}</span>
                              {isCandidate && (
                                message.read ? (
                                  <CheckCheck className="h-3 w-3 text-primary" />
                                ) : (
                                  <Check className="h-3 w-3" />
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>

                <Separator className="bg-border" />

                {/* Zone d'envoi de message */}
                <div className="p-4">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Écrivez votre message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="min-h-[80px] resize-none"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Appuyez sur Entrée pour envoyer, Shift + Entrée pour une nouvelle ligne
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-[calc(100vh-250px)] text-muted-foreground">
              <MessageSquare className="h-16 w-16 mb-4 text-muted" />
              <p className="text-lg mb-2">Sélectionnez une conversation</p>
              <p className="text-sm">Choisissez une conversation pour voir les messages</p>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}