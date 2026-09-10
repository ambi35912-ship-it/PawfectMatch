export const initialMatches = [
  {
    id: 'match_luna',
    petId: 'pet_luna',
    petName: 'Luna',
    breed: 'Indie Desi Hound',
    avatar: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=400&q=80',
    ownerName: 'Aanya',
    ownerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    compatibility: 96,
    lastMessage: 'Cubbon Park at 8 AM on Sunday sounds perfect for Milo & Luna!',
    lastMessageTime: '12m ago',
    unread: true,
    hasPlannedPlaydate: true,
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey Arjun! Luna saw Milo\'s profile and did a double-take haha 🐶 She loves fetch too!', time: 'Yesterday 3:14 PM' },
      { id: 'm2', sender: 'me', text: 'Hi Aanya! Milo is always looking for a sprint buddy who can keep up with him! Does Luna like Cubbon Park?', time: 'Yesterday 3:20 PM' },
      { id: 'm3', sender: 'them', text: 'She adores Cubbon Park! The canine lawn near Century Club is her favorite spot.', time: 'Yesterday 3:28 PM' },
      {
        id: 'm4',
        type: 'playdate_invite',
        sender: 'me',
        status: 'accepted',
        title: 'High-Energy Fetch & Agility',
        location: 'Cubbon Park Canine Play Zone',
        address: 'Kasturba Road, Nunegundlapalli, Bengaluru',
        dateTime: 'Sunday, Mar 15 • 8:00 AM',
        time: 'Today 9:15 AM'
      },
      { id: 'm5', sender: 'them', text: 'Cubbon Park at 8 AM on Sunday sounds perfect for Milo & Luna! We will bring her favorite ChuckIt ball! 🎾', time: '12m ago' }
    ]
  },
  {
    id: 'match_winston',
    petId: 'pet_winston',
    petName: 'Winston',
    breed: 'French Bulldog',
    avatar: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80',
    ownerName: 'Marcus',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    compatibility: 91,
    lastMessage: 'Winston says hello! He is ready for some gentle zoomies.',
    lastMessageTime: '2h ago',
    unread: false,
    hasPlannedPlaydate: false,
    messages: [
      { id: 'm_w1', sender: 'them', text: 'Hey there! Winston is small but loves greeting gentle big dogs like Golden Retrievers!', time: '2h ago' },
      { id: 'm_w2', sender: 'me', text: 'Awesome! Milo is super respectful and always lies down to play with smaller pals.', time: '1h ago' }
    ]
  },
  {
    id: 'match_cleo',
    petId: 'pet_cleo',
    petName: 'Cleo',
    breed: 'Golden Doodle',
    avatar: 'https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?auto=format&fit=crop&w=400&q=80',
    ownerName: 'Maya',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    compatibility: 95,
    lastMessage: 'You matched! Say hello to Maya & Cleo.',
    lastMessageTime: 'Yesterday',
    unread: false,
    hasPlannedPlaydate: false,
    messages: []
  }
];
