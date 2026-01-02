import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'playing';
  game?: string;
}

interface Game {
  id: number;
  title: string;
  players: number;
  icon: string;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'games' | 'profile'>('chat');
  const [message, setMessage] = useState('');

  const messages: Message[] = [
    { id: 1, user: 'Алекс', avatar: '🎮', text: 'Го в танчики!', time: '14:23' },
    { id: 2, user: 'Мария', avatar: '🌸', text: 'Кто на стрим?', time: '14:25' },
    { id: 3, user: 'Дима', avatar: '⚡', text: 'Собираем команду на рейд', time: '14:27' },
    { id: 4, user: 'Настя', avatar: '🎨', text: 'Новая локация огонь 🔥', time: '14:30' },
  ];

  const friends: Friend[] = [
    { id: 1, name: 'Алекс', avatar: '🎮', status: 'playing', game: 'Battle Royale' },
    { id: 2, name: 'Мария', avatar: '🌸', status: 'online' },
    { id: 3, name: 'Дима', avatar: '⚡', status: 'playing', game: 'MMO Quest' },
    { id: 4, name: 'Настя', avatar: '🎨', status: 'online' },
    { id: 5, name: 'Влад', avatar: '🏆', status: 'offline' },
    { id: 6, name: 'Катя', avatar: '💫', status: 'playing', game: 'Racing Pro' },
  ];

  const games: Game[] = [
    { id: 1, title: 'Minecraft', players: 2847, icon: '⛏️' },
    { id: 2, title: 'Standoff 2', players: 1923, icon: '🔫' },
    { id: 3, title: 'Роблокс', players: 3156, icon: '🎮' },
    { id: 4, title: 'Battle Royale', players: 1247, icon: '🎯' },
    { id: 5, title: 'MMO Quest', players: 892, icon: '⚔️' },
    { id: 6, title: 'Racing Pro', players: 654, icon: '🏎️' },
    { id: 7, title: 'Chess Master', players: 423, icon: '♟️' },
    { id: 8, title: 'Card Battle', players: 356, icon: '🃏' },
    { id: 9, title: 'Puzzle Party', players: 289, icon: '🧩' },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-16 bg-card border-b border-border flex items-center justify-center px-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl animate-pulse-glow">
          🚀
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {activeTab === 'chat' && (
          <>
            <section className="flex-1 flex flex-col">
              <header className="h-16 border-b border-border px-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name="Hash" size={24} className="text-primary" />
                  <h1 className="text-xl font-semibold">Основной чат</h1>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="rounded-xl hover:scale-110 transition-all">
                    <Icon name="Video" size={20} />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-xl hover:scale-110 transition-all">
                    <Icon name="Phone" size={20} />
                  </Button>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-3 animate-fade-in hover:bg-muted/50 p-3 rounded-xl transition-all">
                    <Avatar className="w-10 h-10 border-2 border-primary/50">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-2xl">
                        {msg.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-semibold text-foreground">{msg.user}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <p className="text-foreground/90 mt-1">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-border">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Icon name="Plus" size={20} />
                  </Button>
                  <Input
                    placeholder="Написать сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 bg-muted border-0 rounded-xl"
                  />
                  <Button variant="ghost" size="icon" className="rounded-xl">
                    <Icon name="Smile" size={20} />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </section>

            <aside className="w-64 bg-card border-l border-border p-4">
              <h2 className="text-sm font-semibold uppercase text-muted-foreground mb-4 flex items-center">
                <Icon name="Users" size={16} className="mr-2" />
                Друзья ({friends.filter(f => f.status !== 'offline').length})
              </h2>
              <div className="space-y-2">
                {friends.map((friend) => (
                  <div
                    key={friend.id}
                    className="flex items-center space-x-3 p-2 rounded-xl hover:bg-muted/50 transition-all cursor-pointer group"
                  >
                    <div className="relative">
                      <Avatar className="w-10 h-10 border-2 border-primary/30 group-hover:border-primary transition-all">
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-xl">
                          {friend.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                          friend.status === 'online'
                            ? 'bg-green-500'
                            : friend.status === 'playing'
                            ? 'bg-primary animate-pulse-glow'
                            : 'bg-muted-foreground'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{friend.name}</p>
                      {friend.game && (
                        <p className="text-xs text-primary truncate">{friend.game}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </>
        )}

        {activeTab === 'games' && (
          <section className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-full mx-auto">
              <header className="mb-6">
                <h1 className="text-5xl font-bold mb-3 glow-text">Игровая комната</h1>
                <p className="text-lg text-muted-foreground">Выбери игру и начни играть с друзьями</p>
              </header>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {games.map((game) => (
                  <Card
                    key={game.id}
                    className="p-4 bg-card hover:bg-muted/50 border-2 border-border hover:border-primary/50 transition-all cursor-pointer group hover:scale-105 hover:glow-effect"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-4xl">{game.icon}</div>
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        <Icon name="Users" size={10} className="mr-0.5" />
                        {game.players}
                      </Badge>
                    </div>
                    <h3 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors truncate">
                      {game.title}
                    </h3>
                    <Button className="w-full mt-2 h-9 text-sm bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all">
                      Играть
                      <Icon name="Play" size={14} className="ml-1" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'profile' && (
          <section className="flex-1 p-8">
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 bg-card border-2 border-border">
                <div className="flex items-start space-x-6 mb-8">
                  <Avatar className="w-24 h-24 border-4 border-primary animate-pulse-glow">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-4xl">
                      🎮
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">Игрок_2077</h1>
                    <p className="text-muted-foreground mb-4">Профессиональный геймер</p>
                    <div className="flex space-x-2">
                      <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="Edit" size={16} className="mr-2" />
                        Редактировать
                      </Button>
                      <Button variant="outline">
                        <Icon name="Share2" size={16} className="mr-2" />
                        Поделиться
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <Card className="p-4 bg-muted/50 border-border text-center hover:bg-primary/10 transition-all cursor-pointer">
                    <div className="text-3xl font-bold text-primary mb-1">247</div>
                    <div className="text-sm text-muted-foreground">Побед</div>
                  </Card>
                  <Card className="p-4 bg-muted/50 border-border text-center hover:bg-secondary/10 transition-all cursor-pointer">
                    <div className="text-3xl font-bold text-secondary mb-1">18</div>
                    <div className="text-sm text-muted-foreground">Друзей</div>
                  </Card>
                  <Card className="p-4 bg-muted/50 border-border text-center hover:bg-accent/10 transition-all cursor-pointer">
                    <div className="text-3xl font-bold text-accent mb-1">342</div>
                    <div className="text-sm text-muted-foreground">Часов</div>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <Icon name="Trophy" size={20} className="mr-2 text-accent" />
                    Достижения
                  </h2>
                  <div className="grid grid-cols-4 gap-3">
                    {['🏆', '⭐', '💎', '🎯', '🔥', '⚡', '👑', '🎖️'].map((emoji, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-muted/50 rounded-xl flex items-center justify-center text-3xl hover:bg-primary/20 transition-all cursor-pointer hover:scale-110"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}
      </main>

      <nav className="h-20 bg-card border-t border-border flex items-center justify-center px-6">
        <div className="flex items-center space-x-4">
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('chat')}
            className="w-14 h-14 rounded-xl transition-all hover:scale-110"
          >
            <Icon name="MessageSquare" size={24} />
          </Button>
          
          <Button
            variant={activeTab === 'games' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('games')}
            className="w-14 h-14 rounded-xl transition-all hover:scale-110"
          >
            <Icon name="Gamepad2" size={24} />
          </Button>
          
          <Button
            variant={activeTab === 'profile' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setActiveTab('profile')}
            className="w-14 h-14 rounded-xl transition-all hover:scale-110"
          >
            <Icon name="User" size={24} />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-14 h-14 rounded-xl transition-all hover:scale-110"
          >
            <Icon name="Settings" size={24} />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Index;